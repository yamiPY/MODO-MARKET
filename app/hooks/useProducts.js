/**
 * Custom Hooks for Product Management
 *
 * This file contains custom React hooks for managing product-related state and operations.
 * These hooks provide a clean interface for components to interact with product data,
 * handle loading states, and manage errors consistently across the application.
 *
 * Features:
 * - Product fetching with caching
 * - Loading and error state management
 * - Search functionality
 * - Category filtering
 * - Pagination support
 */

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  getAllProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  getCategories,
} from "../utils/api";
import { ERROR_MESSAGES, LOADING_MESSAGES } from "../utils/constants";

/**
 * Custom hook for fetching and managing products list
 *
 * @param {Object} options - Configuration options
 * @param {number} options.limit - Number of products to fetch
 * @param {number} options.skip - Number of products to skip
 * @param {string} options.category - Category to filter by
 * @param {boolean} options.autoFetch - Whether to fetch data automatically
 *
 * @returns {Object} Products state and actions
 */
export const useProducts = (options = {}) => {
  const { limit = 20, skip = 0, category = null, autoFetch = true } = options;

  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  /**
   * Fetches products based on current parameters
   */
  const fetchProducts = useCallback(
    async (resetProducts = false) => {
      try {
        setLoading(true);
        setError(null);

        const currentSkip = resetProducts ? 0 : skip;
        let data;

        if (category) {
          data = await getProductsByCategory(category, {
            limit,
            skip: currentSkip,
          });
        } else {
          data = await getAllProducts({ limit, skip: currentSkip });
        }

        if (resetProducts) {
          setProducts(data.products);
        } else {
          setProducts((prev) => [...prev, ...data.products]);
        }

        setTotal(data.total);
        setHasMore(
          data.products.length === limit && currentSkip + limit < data.total
        );
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message || ERROR_MESSAGES.PRODUCTS_LOAD_FAILED);
      } finally {
        setLoading(false);
      }
    },
    [limit, skip, category]
  );

  /**
   * Loads more products (pagination)
   */
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchProducts(false);
    }
  }, [loading, hasMore, fetchProducts]);

  /**
   * Refreshes the products list
   */
  const refresh = useCallback(() => {
    fetchProducts(true);
  }, [fetchProducts]);

  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    if (autoFetch) {
      fetchProducts(true);
    }
  }, [autoFetch, fetchProducts]);

  // Memoized computed values
  const isEmpty = useMemo(
    () => products.length === 0 && !loading,
    [products.length, loading]
  );
  const isInitialLoading = useMemo(
    () => loading && products.length === 0,
    [loading, products.length]
  );

  return {
    // Data
    products,
    total,

    // State
    loading,
    error,
    isEmpty,
    hasMore,
    isInitialLoading,

    // Actions
    fetchProducts,
    loadMore,
    refresh,

    // Utilities
    clearError: () => setError(null),
  };
};

/**
 * Custom hook for fetching a single product
 *
 * @param {string|number} productId - The product ID to fetch
 * @param {Object} options - Configuration options
 * @param {boolean} options.autoFetch - Whether to fetch data automatically
 *
 * @returns {Object} Product state and actions
 */
export const useProduct = (productId, options = {}) => {
  const { autoFetch = true } = options;

  // State management
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches a single product by ID
   */
  const fetchProduct = useCallback(async () => {
    if (!productId) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getProductById(productId);
      setProduct(data);
    } catch (err) {
      console.error(`Error fetching product ${productId}:`, err);
      setError(err.message || ERROR_MESSAGES.PRODUCT_DETAILS_FAILED);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  // Auto-fetch when productId changes
  useEffect(() => {
    if (autoFetch && productId) {
      fetchProduct();
    }
  }, [autoFetch, productId, fetchProduct]);

  // Memoized computed values
  const isNotFound = useMemo(
    () => !product && !loading && !error,
    [product, loading, error]
  );

  return {
    // Data
    product,

    // State
    loading,
    error,
    isNotFound,

    // Actions
    fetchProduct,
    refresh: fetchProduct,

    // Utilities
    clearError: () => setError(null),
  };
};

/**
 * Custom hook for product search functionality
 *
 * @param {Object} options - Configuration options
 * @param {number} options.limit - Number of results to return
 * @param {number} options.debounceMs - Debounce delay in milliseconds
 *
 * @returns {Object} Search state and actions
 */
export const useProductSearch = (options = {}) => {
  const { limit = 20, debounceMs = 300 } = options;

  // State management
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  /**
   * Performs the search operation
   */
  const performSearch = useCallback(
    async (searchQuery) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await searchProducts(searchQuery, { limit });
        setResults(data.products);
        setHasSearched(true);
      } catch (err) {
        console.error(`Error searching for "${searchQuery}":`, err);
        setError(err.message || ERROR_MESSAGES.SEARCH_FAILED);
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  /**
   * Debounced search function
   */
  const debouncedSearch = useCallback(debounce(performSearch, debounceMs), [
    performSearch,
    debounceMs,
  ]);

  /**
   * Updates search query and triggers search
   */
  const search = useCallback(
    (newQuery) => {
      setQuery(newQuery);
      debouncedSearch(newQuery);
    },
    [debouncedSearch]
  );

  /**
   * Clears search results and query
   */
  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setError(null);
    setHasSearched(false);
  }, []);

  // Memoized computed values
  const isEmpty = useMemo(
    () => hasSearched && results.length === 0 && !loading,
    [hasSearched, results.length, loading]
  );

  const isSearching = useMemo(
    () => loading && query.trim().length > 0,
    [loading, query]
  );

  return {
    // Data
    query,
    results,

    // State
    loading,
    error,
    isEmpty,
    hasSearched,
    isSearching,

    // Actions
    search,
    clearSearch,
    performSearch,

    // Utilities
    clearError: () => setError(null),
  };
};

/**
 * Custom hook for managing product categories
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.autoFetch - Whether to fetch data automatically
 *
 * @returns {Object} Categories state and actions
 */
export const useCategories = (options = {}) => {
  const { autoFetch = true } = options;

  // State management
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches all available categories
   */
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchCategories();
    }
  }, [autoFetch, fetchCategories]);

  return {
    // Data
    categories,

    // State
    loading,
    error,

    // Actions
    fetchCategories,
    refresh: fetchCategories,

    // Utilities
    clearError: () => setError(null),
  };
};

/**
 * Utility function for debouncing
 *
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

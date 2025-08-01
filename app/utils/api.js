/**
 * API Utility Functions
 *
 * This module contains utility functions for making API calls to external services.
 * It includes error handling, caching strategies, and data transformation functions.
 *
 * Features:
 * - Centralized API configuration
 * - Error handling and retry logic
 * - Data caching and revalidation
 * - Type-safe API responses
 * - Performance optimizations
 */

/**
 * API Configuration
 */
const API_CONFIG = {
  BASE_URL: "https://dummyjson.com",
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  CACHE_DURATION: 3600, // 1 hour in seconds
};

/**
 * Custom error class for API-related errors
 */
class APIError extends Error {
  constructor(message, status, endpoint) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.endpoint = endpoint;
  }
}

/**
 * Generic fetch wrapper with error handling and retry logic
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - The API response data
 */
async function fetchWithRetry(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  const fetchOptions = {
    ...options,
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  let lastError;

  for (let attempt = 1; attempt <= API_CONFIG.RETRY_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url, fetchOptions);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new APIError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          url
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      lastError = error;

      // Don't retry on client errors (4xx) or abort errors
      if (error.status >= 400 && error.status < 500) {
        break;
      }

      if (error.name === "AbortError") {
        throw new APIError("Request timeout", 408, url);
      }

      // Wait before retrying (exponential backoff)
      if (attempt < API_CONFIG.RETRY_ATTEMPTS) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }
  }

  clearTimeout(timeoutId);
  throw lastError;
}

/**
 * Fetches all products from the API
 * @param {Object} options - Query options
 * @param {number} options.limit - Number of products to fetch
 * @param {number} options.skip - Number of products to skip
 * @param {string} options.category - Filter by category
 * @returns {Promise<Object>} - Products data with pagination info
 */
export async function getAllProducts(options = {}) {
  try {
    const { limit = 30, skip = 0, category } = options;

    let url = `${API_CONFIG.BASE_URL}/products`;
    const params = new URLSearchParams();

    if (limit) params.append("limit", limit.toString());
    if (skip) params.append("skip", skip.toString());

    if (category) {
      url = `${API_CONFIG.BASE_URL}/products/category/${encodeURIComponent(
        category
      )}`;
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const data = await fetchWithRetry(url, {
      next: { revalidate: API_CONFIG.CACHE_DURATION },
    });

    return {
      products: data.products || [],
      total: data.total || 0,
      skip: data.skip || 0,
      limit: data.limit || limit,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new APIError(
      "Failed to fetch products. Please try again later.",
      error.status || 500,
      "getAllProducts"
    );
  }
}

/**
 * Fetches a single product by ID
 * @param {string|number} id - The product ID
 * @returns {Promise<Object>} - Product data
 */
export async function getProductById(id) {
  try {
    if (!id) {
      throw new APIError("Product ID is required", 400, "getProductById");
    }

    const url = `${API_CONFIG.BASE_URL}/products/${encodeURIComponent(id)}`;
    const data = await fetchWithRetry(url, {
      next: { revalidate: API_CONFIG.CACHE_DURATION },
    });

    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);

    if (error.status === 404) {
      throw new APIError("Product not found", 404, "getProductById");
    }

    throw new APIError(
      "Failed to fetch product details. Please try again later.",
      error.status || 500,
      "getProductById"
    );
  }
}

/**
 * Fetches all available product categories
 * @returns {Promise<string[]>} - Array of category names
 */
export async function getCategories() {
  try {
    const url = `${API_CONFIG.BASE_URL}/products/categories`;
    const categories = await fetchWithRetry(url, {
      next: { revalidate: API_CONFIG.CACHE_DURATION * 2 }, // Cache longer for categories
    });

    return Array.isArray(categories) ? categories : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new APIError(
      "Failed to fetch categories. Please try again later.",
      error.status || 500,
      "getCategories"
    );
  }
}

/**
 * Searches products by query string
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @param {number} options.limit - Number of results to return
 * @returns {Promise<Object>} - Search results
 */
export async function searchProducts(query, options = {}) {
  try {
    if (!query || query.trim().length === 0) {
      throw new APIError("Search query is required", 400, "searchProducts");
    }

    const { limit = 20 } = options;
    const url = `${API_CONFIG.BASE_URL}/products/search`;
    const params = new URLSearchParams({
      q: query.trim(),
      limit: limit.toString(),
    });

    const data = await fetchWithRetry(`${url}?${params.toString()}`, {
      next: { revalidate: 300 }, // Cache search results for 5 minutes
    });

    return {
      products: data.products || [],
      total: data.total || 0,
      query: query.trim(),
    };
  } catch (error) {
    console.error(`Error searching products for "${query}":`, error);
    throw new APIError(
      "Failed to search products. Please try again later.",
      error.status || 500,
      "searchProducts"
    );
  }
}

/**
 * Fetches products by category with pagination
 * @param {string} category - Category name
 * @param {Object} options - Query options
 * @returns {Promise<Object>} - Category products data
 */
export async function getProductsByCategory(category, options = {}) {
  try {
    if (!category) {
      throw new APIError("Category is required", 400, "getProductsByCategory");
    }

    const { limit = 20, skip = 0 } = options;
    const url = `${API_CONFIG.BASE_URL}/products/category/${encodeURIComponent(
      category
    )}`;
    const params = new URLSearchParams();

    if (limit) params.append("limit", limit.toString());
    if (skip) params.append("skip", skip.toString());

    const finalUrl = params.toString() ? `${url}?${params.toString()}` : url;
    const data = await fetchWithRetry(finalUrl, {
      next: { revalidate: API_CONFIG.CACHE_DURATION },
    });

    return {
      products: data.products || [],
      total: data.total || 0,
      category: category,
      skip: data.skip || 0,
      limit: data.limit || limit,
    };
  } catch (error) {
    console.error(`Error fetching products for category "${category}":`, error);
    throw new APIError(
      `Failed to fetch products for category "${category}". Please try again later.`,
      error.status || 500,
      "getProductsByCategory"
    );
  }
}

/**
 * Utility function to format price with currency
 * @param {number} price - The price value
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} - Formatted price string
 */
export function formatPrice(price, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  } catch (error) {
    console.error("Error formatting price:", error);
    return `$${price.toFixed(2)}`;
  }
}

/**
 * Utility function to calculate discounted price
 * @param {number} originalPrice - Original price
 * @param {number} discountPercentage - Discount percentage
 * @returns {Object} - Object with original, discounted, and savings amounts
 */
export function calculateDiscount(originalPrice, discountPercentage) {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;

  return {
    original: originalPrice,
    discounted: discountedPrice,
    savings: discountAmount,
    percentage: discountPercentage,
  };
}

/**
 * Utility function to truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} - Truncated text
 */
export function truncateText(text, maxLength = 100, suffix = "...") {
  if (!text || text.length <= maxLength) {
    return text || "";
  }

  return text.substring(0, maxLength).trim() + suffix;
}

/**
 * Utility function to generate product URL slug
 * @param {string} title - Product title
 * @param {number} id - Product ID
 * @returns {string} - URL-friendly slug
 */
export function generateProductSlug(title, id) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();

  return `${slug}-${id}`;
}

/**
 * Export API configuration for external use
 */
export { API_CONFIG, APIError };

/**
 * Individual Product Page Component
 *
 * This component displays detailed information about a single product.
 * It fetches product data based on the product ID from the URL parameters.
 *
 * Features:
 * - Dynamic product data fetching
 * - Responsive product detail layout
 * - Error handling for missing products
 * - Optimized image loading
 * - Add to cart functionality (UI ready)
 */

import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./product.module.css";

// Import API utilities
import {
  getProductById,
  formatPrice,
  calculateDiscount,
} from "../../../utils/api";

// Import components
import AddToCartButton from "../../../components/AddToCartButton/AddToCartButton";

/**
 * Product Detail Page Component
 *
 * Renders a detailed view of a single product with:
 * - High-quality product image
 * - Product title and description
 * - Price information
 * - Add to cart functionality
 * - Responsive layout for all devices
 *
 * @param {Object} params - URL parameters containing the product ID
 */
const ProductDetailPage = async ({ params }) => {
  // Extract product ID from URL parameters
  const productId = params.id;

  // Fetch product data using API utility
  const product = await getProductById(productId);

  // Handle case where product is not found
  if (!product) {
    notFound();
  }

  return (
    <main className={styles.container}>
      {/* Product Detail Section */}
      <article className={styles.productDetail}>
        {/* Product Image Container */}
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={product.thumbnail}
            alt={`${product.title} - Product Image`}
            width={500}
            height={600}
            priority={true} // Load image immediately for better UX
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>

        {/* Product Information */}
        <div className={styles.details}>
          {/* Product Header */}
          <header className={styles.productHeader}>
            <h1 className={styles.title}>{product.title}</h1>

            {/* Product Category */}
            {product.category && (
              <span className={styles.category}>{product.category}</span>
            )}

            {/* Product Rating */}
            {product.rating && (
              <div className={styles.rating}>
                <span className={styles.stars}>
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                </span>
                <span className={styles.ratingValue}>({product.rating}/5)</span>
              </div>
            )}
          </header>

          {/* Product Description */}
          <div className={styles.descriptionSection}>
            <h2 className={styles.sectionTitle}>Description</h2>
            <p className={styles.description}>{product.description}</p>
          </div>

          {/* Product Specifications */}
          <div className={styles.specifications}>
            {product.brand && (
              <div className={styles.spec}>
                <span className={styles.specLabel}>Brand:</span>
                <span className={styles.specValue}>{product.brand}</span>
              </div>
            )}

            {product.stock && (
              <div className={styles.spec}>
                <span className={styles.specLabel}>Stock:</span>
                <span className={styles.specValue}>
                  {product.stock > 0
                    ? `${product.stock} available`
                    : "Out of stock"}
                </span>
              </div>
            )}

            {product.discountPercentage && (
              <div className={styles.spec}>
                <span className={styles.specLabel}>Discount:</span>
                <span className={styles.specValue}>
                  {product.discountPercentage}% off
                </span>
              </div>
            )}
          </div>

          {/* Price and Purchase Section */}
          <div className={styles.purchaseSection}>
            <div className={styles.priceContainer}>
              <span className={styles.price}>{formatPrice(product.price)}</span>

              {/* Show original price if there's a discount */}
              {product.discountPercentage > 0 && (
                <span className={styles.originalPrice}>
                  {formatPrice(
                    calculateDiscount(product.price, product.discountPercentage)
                      .original
                  )}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <AddToCartButton
              product={product}
              className={styles.addToCartBtn}
            />
          </div>
        </div>
      </article>
    </main>
  );
};

export default ProductDetailPage;

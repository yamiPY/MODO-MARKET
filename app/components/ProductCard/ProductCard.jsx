/**
 * Product Card Component
 *
 * This component displays a product card with image, details, and add to cart functionality.
 * It's a client component to handle user interactions while maintaining the link functionality.
 *
 * Features:
 * - Product image with optimized loading
 * - Product information display
 * - Add to cart functionality
 * - Navigation to product detail page
 * - Responsive design
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, truncateText } from "../../utils/api";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

/**
 * ProductCard Component
 *
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data
 * @param {string} props.styles - CSS styles object
 */
const ProductCard = ({ product, styles }) => {
  /**
   * Handles add to cart button click
   * Prevents event bubbling to avoid navigation
   */
  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link
      key={product.id}
      href={`/products/${product.id}`}
      className={styles.productLink}
    >
      {/* Product Card */}
      <article className={styles.productCard}>
        {/* Product Image */}
        <div className={styles.imageContainer}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={420}
            height={280}
            className={styles.productImage}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>

        {/* Product Details */}
        <div className={styles.details}>
          {/* Price Badge */}
          <div className={styles.price}>{formatPrice(product.price)}</div>

          {/* Product Information */}
          <div className={styles.productInfo}>
            <h2 className={styles.productTitle}>{product.title}</h2>

            <h3 className={styles.productCategory}>{product.category}</h3>

            <p className={styles.description}>
              {/* Truncate long descriptions for better layout */}
              {truncateText(product.description, 120)}
            </p>
          </div>

          {/* Add to Cart Button */}
          <div onClick={handleAddToCartClick}>
            <AddToCartButton
              product={product}
              className={styles.addToCartBtn}
            />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;

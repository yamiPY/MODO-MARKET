/**
 * Add to Cart Button Component
 *
 * This is a client-side component that handles the add to cart functionality.
 * It's separated from server components to handle user interactions.
 *
 * Features:
 * - Interactive add to cart functionality
 * - Loading states and feedback
 * - Accessibility support
 * - Stock validation
 */

"use client";

import React, { useState } from "react";

/**
 * AddToCartButton Component
 *
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data
 * @param {string} props.className - CSS class name
 * @param {boolean} props.disabled - Whether button is disabled
 */
const AddToCartButton = ({ product, className, disabled = false }) => {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles add to cart action
   */
  const handleAddToCart = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // TODO: Implement actual add to cart functionality
      // This could include:
      // - API call to add item to cart
      // - Update global cart state
      // - Show success notification

      console.log(`Added ${product.title} to cart`);
      alert(`${product.title} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isOutOfStock = product.stock === 0;
  const buttonDisabled = disabled || isLoading || isOutOfStock;

  return (
    <button
      className={className}
      onClick={handleAddToCart}
      disabled={buttonDisabled}
      aria-label={`Add ${product.title} to cart`}
      type="button"
    >
      {isLoading ? (
        <>
          <span className="loading-spinner" aria-hidden="true"></span>
          Adding...
        </>
      ) : isOutOfStock ? (
        "Out of Stock"
      ) : (
        "Add to Cart"
      )}
    </button>
  );
};

export default AddToCartButton;

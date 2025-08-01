/**
 * Products Page Component
 *
 * This component displays a grid of products fetched from the DummyJSON API.
 * Each product card includes an image, title, category, description, price, and add to cart button.
 * The products are clickable and navigate to individual product detail pages.
 *
 * Features:
 * - Server-side data fetching
 * - Responsive product grid layout
 * - Optimized images with Next.js Image component
 * - Interactive product cards with hover effects
 * - Dynamic routing to product detail pages
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./products.module.css";

// Import API utilities
import { getAllProducts, formatPrice, truncateText } from "../../utils/api";

/**
 * Products Page Component
 *
 * Renders a responsive grid of product cards with the following features:
 * - Product image with optimized loading
 * - Product title, category, and description
 * - Price display with currency formatting
 * - Add to cart button (UI only)
 * - Navigation to individual product pages
 */
const ProductsPage = async () => {
  // Fetch products data on the server using API utility
  const data = await getAllProducts({ limit: 30 });
  const products = data.products;

  return (
    <main className={styles.container}>
      {/* Product Grid */}
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className={styles.productLink}
          >
            {/* Product Card */}
            <article className={styles.product}>
              {/* Product Image Container */}
              <div className={styles.imageContainer}>
                <Image
                  className={styles.image}
                  src={product.thumbnail}
                  alt={`${product.title} - ${product.category}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 420px"
                  priority={false} // Lazy load for better performance
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

                {/* Add to Cart Button - Static for now */}
                <div className={styles.addToCartBtn}>Add to Cart</div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ProductsPage;

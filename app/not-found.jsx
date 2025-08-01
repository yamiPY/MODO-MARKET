/**
 * 404 Not Found Page Component
 *
 * This component is displayed when a user navigates to a route that doesn't exist.
 * It provides a user-friendly error message and navigation options to help users
 * find what they're looking for.
 *
 * Features:
 * - Clear error message and explanation
 * - Navigation links to popular pages
 * - Search functionality to help find products
 * - Responsive design for all devices
 * - SEO-friendly 404 page
 */

import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import styles from "./not-found.module.css";

/**
 * Metadata for the 404 page
 * Helps with SEO and provides proper page information
 */
export const metadata = {
  title: "Page Not Found - 404",
  description:
    "The page you're looking for doesn't exist. Explore our products and find what you need.",
  robots: {
    index: false,
    follow: true,
  },
};

/**
 * Popular navigation links to help users find content
 */
const popularLinks = [
  {
    href: "/",
    label: "Home",
    description: "Go back to our homepage",
    icon: "🏠",
  },
  {
    href: "/products",
    label: "All Products",
    description: "Browse our complete product catalog",
    icon: "🛍️",
  },
  {
    href: "/contact",
    label: "Contact Us",
    description: "Get in touch with our support team",
    icon: "📞",
  },
  {
    href: "/about",
    label: "About Us",
    description: "Learn more about Modo Mart",
    icon: "ℹ️",
  },
];

/**
 * NotFound Component
 *
 * Renders a comprehensive 404 error page with:
 * - Clear error message and status code
 * - Helpful navigation links
 * - Search suggestions
 * - Contact information
 * - Responsive design
 */
export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        {/* Error Status */}
        <div className={styles.errorStatus}>
          <h1 className={styles.errorCode} aria-label="Error 404">
            404
          </h1>
          <div className={styles.errorIcon} aria-hidden="true">
            🔍
          </div>
        </div>

        {/* Error Message */}
        <div className={styles.errorMessage}>
          <h2 className={styles.title}>Oops! Page Not Found</h2>

          <p className={styles.description}>
            The page you're looking for doesn't exist or has been moved. Don't
            worry, it happens to the best of us!
          </p>
        </div>

        {/* Navigation Help */}
        <div className={styles.helpSection}>
          <h3 className={styles.helpTitle}>Here's what you can do:</h3>

          {/* Popular Links Grid */}
          <div className={styles.linksGrid}>
            {popularLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.helpLink}
              >
                <div className={styles.linkIcon} aria-hidden="true">
                  {link.icon}
                </div>
                <div className={styles.linkContent}>
                  <h4 className={styles.linkTitle}>{link.label}</h4>
                  <p className={styles.linkDescription}>{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Search Suggestion */}
        <div className={styles.searchSection}>
          <h3 className={styles.searchTitle}>
            Looking for something specific?
          </h3>

          <p className={styles.searchDescription}>
            Try searching for products or browse our categories to find what you
            need.
          </p>

          <div className={styles.searchActions}>
            <Link href="/products" className={styles.primaryButton}>
              Browse All Products
            </Link>

            <Link
              href="/products?search=true"
              className={styles.secondaryButton}
            >
              Search Products
            </Link>
          </div>
        </div>

        {/* Additional Help */}
        <div className={styles.additionalHelp}>
          <p className={styles.helpText}>
            Still can't find what you're looking for?{" "}
            <Link href="/contact" className={styles.contactLink}>
              Contact our support team
            </Link>{" "}
            and we'll be happy to help!
          </p>
        </div>

        {/* Back Button */}
        <div className={styles.backSection}>
          <Link href="/" className={styles.backButton}>
            ← Go Back to Home
          </Link>
        </div>
      </div>

      {/* Background Decoration */}
      <div className={styles.backgroundDecoration} aria-hidden="true">
        <div className={styles.decorationElement}></div>
        <div className={styles.decorationElement}></div>
        <div className={styles.decorationElement}></div>
      </div>
    </main>
  );
}

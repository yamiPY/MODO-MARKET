/**
 * Global Loading Component
 *
 * This component is displayed while pages are loading in the Next.js app.
 * It provides a consistent loading experience across all routes and includes
 * accessibility features and smooth animations.
 *
 * Features:
 * - Animated loading spinner
 * - Accessible loading states
 * - Responsive design
 * - Smooth transitions
 * - Brand-consistent styling
 */

import React from "react";
import styles from "./loading.module.css";

/**
 * Loading Component
 *
 * Renders a full-screen loading indicator with:
 * - Animated spinner with brand colors
 * - Loading text with accessibility support
 * - Responsive design for all devices
 * - Smooth fade-in animation
 */
export default function Loading() {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      {/* Loading Spinner */}
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner} aria-hidden="true">
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
        </div>

        {/* Brand Logo/Icon */}
        <div className={styles.brandIcon} aria-hidden="true">
          🛍️
        </div>
      </div>

      {/* Loading Text */}
      <div className={styles.loadingText}>
        <h2 className={styles.title}>Loading...</h2>
        <p className={styles.subtitle}>
          Please wait while we prepare your content
        </p>
      </div>

      {/* Progress Indicator */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} aria-hidden="true">
          <div className={styles.progressFill}></div>
        </div>
      </div>

      {/* Screen Reader Text */}
      <span className="sr-only">Page is loading, please wait...</span>

      {/* Background Animation */}
      <div className={styles.backgroundAnimation} aria-hidden="true">
        <div className={styles.animationElement}></div>
        <div className={styles.animationElement}></div>
        <div className={styles.animationElement}></div>
      </div>
    </div>
  );
}

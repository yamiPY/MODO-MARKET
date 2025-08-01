/**
 * Dark Mode Toggle Component
 *
 * This component provides a visual toggle switch for switching between
 * light and dark themes. It integrates with the ThemeContext to manage
 * the global theme state across the application.
 *
 * Features:
 * - Animated toggle switch with smooth transitions
 * - Visual indicators (sun/moon icons) for current theme
 * - Accessible keyboard navigation
 * - Persistent theme preference via context
 * - Responsive design for all screen sizes
 */

"use client";

import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./dark.module.css";

/**
 * DarkMode Component
 *
 * Renders a toggle switch that allows users to switch between light and dark themes.
 * The component uses the ThemeContext to access and modify the current theme state.
 *
 * Visual Design:
 * - Light theme: Sun icon (🌕) on the left, switch positioned left
 * - Dark theme: Moon icon (🌑) on the right, switch positioned right
 * - Smooth CSS transitions for switch movement
 */
function DarkMode() {
  // Access theme context for current theme and toggle function
  const { toggleTheme, theme } = useContext(ThemeContext);

  /**
   * Handles keyboard navigation for accessibility
   * Allows users to toggle theme using Enter or Space keys
   */
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleTheme();
    }
  };

  return (
    <div
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      className={styles.container}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      aria-pressed={theme === "dark"}
      title={`Current theme: ${theme}. Click to switch to ${
        theme === "light" ? "dark" : "light"
      } theme.`}
    >
      {/* Light theme icon (Sun) */}
      <div className={`${styles.icon} ${styles.lightIcon}`} aria-hidden="true">
        🌕
      </div>

      {/* Dark theme icon (Moon) */}
      <div className={`${styles.icon} ${styles.darkIcon}`} aria-hidden="true">
        🌑
      </div>

      {/* Toggle switch indicator */}
      <div
        className={styles.switcher}
        style={{
          left: theme === "light" ? "2px" : "36px",
          transition: "left 0.3s ease-in-out",
        }}
        aria-hidden="true"
      />

      {/* Screen reader only text */}
      <span className="sr-only">
        {theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      </span>
    </div>
  );
}

export default DarkMode;

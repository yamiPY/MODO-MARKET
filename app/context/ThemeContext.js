/**
 * Theme Context Provider
 *
 * This context manages the global theme state for the entire application.
 * It provides functionality for switching between light and dark themes,
 * with persistent storage and system preference detection.
 *
 * Features:
 * - Light/Dark theme switching
 * - Persistent theme storage in localStorage
 * - System theme preference detection
 * - Smooth theme transitions
 * - SSR-safe hydration handling
 * - Automatic DOM attribute updates
 */

"use client";

import React, { createContext, useEffect, useState, useCallback } from "react";

/**
 * Theme Context
 * Provides theme state and toggle function to child components
 */
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  isLoading: true,
});

/**
 * Available theme options
 */
const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

/**
 * Local storage key for theme persistence
 */
const THEME_STORAGE_KEY = "modo-mart-theme";

/**
 * ThemeProvider Component
 *
 * Wraps the application and provides theme context to all child components.
 * Handles theme initialization, persistence, and system preference detection.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 */
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(THEMES.LIGHT);
  const [mounted, setMounted] = useState(false);

  /**
   * Applies theme to the document
   * Updates both data attribute and class name for CSS targeting
   *
   * @param {string} newTheme - Theme to apply
   */
  const applyTheme = useCallback((newTheme) => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", newTheme);
      document.documentElement.className = newTheme;

      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          "content",
          newTheme === THEMES.DARK ? "#1a1a1a" : "#007bff"
        );
      }
    }
  }, []);

  /**
   * Gets the user's system theme preference
   *
   * @returns {string} - System theme preference
   */
  const getSystemTheme = useCallback(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? THEMES.DARK
        : THEMES.LIGHT;
    }
    return THEMES.LIGHT;
  }, []);

  /**
   * Toggles between light and dark themes
   * Persists the new theme to localStorage
   */
  const toggleTheme = useCallback(() => {
    const newTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    setTheme(newTheme);

    // Persist to localStorage
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    }

    // Apply to document
    applyTheme(newTheme);

    // Announce theme change for screen readers
    if (typeof document !== "undefined") {
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent = `Theme switched to ${newTheme} mode`;
      document.body.appendChild(announcement);

      // Remove announcement after screen readers have processed it
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  }, [theme, applyTheme]);

  /**
   * Initialize theme on component mount
   * Handles SSR hydration and theme restoration
   */
  useEffect(() => {
    let initialTheme = THEMES.LIGHT;

    // Try to get stored theme first
    if (typeof localStorage !== "undefined") {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme && Object.values(THEMES).includes(storedTheme)) {
        initialTheme = storedTheme;
      } else {
        // Fall back to system preference
        initialTheme = getSystemTheme();
      }
    }

    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, [getSystemTheme, applyTheme]);

  /**
   * Listen for system theme changes
   * Updates theme if user hasn't manually set a preference
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e) => {
      // Only update if no stored preference exists
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (!storedTheme) {
        const newTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [applyTheme]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div className="theme-loading">{children}</div>;
  }

  const contextValue = {
    theme,
    toggleTheme,
    isLoading: false,
    isDark: theme === THEMES.DARK,
    isLight: theme === THEMES.LIGHT,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={`theme ${theme}`} data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

/**
 * Custom hook for using theme context
 * Provides a convenient way to access theme state and functions
 *
 * @returns {Object} Theme context value
 */
export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

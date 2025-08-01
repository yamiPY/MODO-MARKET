/**
 * Application Constants
 *
 * This file contains all the constant values used throughout the application.
 * Centralizing constants makes the codebase more maintainable and consistent.
 *
 * Categories:
 * - Site Configuration
 * - API Configuration
 * - UI Constants
 * - Theme Constants
 * - Navigation Constants
 * - Error Messages
 * - Success Messages
 */

/**
 * Site Configuration
 * Basic information about the application
 */
export const SITE_CONFIG = {
  NAME: "Modo Mart",
  TAGLINE: "Modern E-commerce Platform",
  DESCRIPTION:
    "Your go-to online shop for practical, creative, and affordable products",
  URL: "https://modo-mart.vercel.app",
  AUTHOR: "Modo Mart Team",
  EMAIL: "support@modo-mart.com",
  PHONE: "+1 (555) 123-4567",
  ADDRESS: "123 Commerce Street, Digital City, DC 12345",
};

/**
 * API Configuration
 * External API endpoints and configuration
 */
export const API_ENDPOINTS = {
  BASE_URL: "https://dummyjson.com",
  PRODUCTS: "/products",
  PRODUCT_BY_ID: "/products/{id}",
  CATEGORIES: "/products/categories",
  SEARCH: "/products/search",
  CATEGORY_PRODUCTS: "/products/category/{category}",
};

/**
 * Pagination Constants
 * Default values for pagination across the app
 */
export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  DEFAULT_SKIP: 0,
};

/**
 * UI Constants
 * Common UI-related constant values
 */
export const UI_CONSTANTS = {
  // Text truncation lengths
  PRODUCT_DESCRIPTION_LENGTH: 120,
  PRODUCT_TITLE_LENGTH: 50,
  CATEGORY_NAME_LENGTH: 30,

  // Image dimensions
  PRODUCT_IMAGE_WIDTH: 420,
  PRODUCT_IMAGE_HEIGHT: 280,
  PRODUCT_DETAIL_IMAGE_WIDTH: 500,
  PRODUCT_DETAIL_IMAGE_HEIGHT: 600,

  // Animation durations (in milliseconds)
  TRANSITION_FAST: 150,
  TRANSITION_NORMAL: 300,
  TRANSITION_SLOW: 500,

  // Breakpoints (in pixels)
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1200,
    LARGE: 1400,
  },
};

/**
 * Theme Constants
 * Theme-related configuration
 */
export const THEME_CONFIG = {
  THEMES: {
    LIGHT: "light",
    DARK: "dark",
  },
  STORAGE_KEY: "modo-mart-theme",
  DEFAULT_THEME: "light",

  // Theme colors
  COLORS: {
    LIGHT: {
      PRIMARY: "#007bff",
      SECONDARY: "#6c757d",
      SUCCESS: "#28a745",
      DANGER: "#dc3545",
      WARNING: "#ffc107",
      INFO: "#17a2b8",
    },
    DARK: {
      PRIMARY: "#0d6efd",
      SECONDARY: "#6c757d",
      SUCCESS: "#198754",
      DANGER: "#dc3545",
      WARNING: "#ffc107",
      INFO: "#0dcaf0",
    },
  },
};

/**
 * Navigation Constants
 * Navigation menu configuration
 */
export const NAVIGATION = {
  MAIN_MENU: [
    {
      href: "/",
      label: "Home",
      exact: true,
      icon: "🏠",
    },
    {
      href: "/products",
      label: "Products",
      exact: false,
      icon: "🛍️",
    },
    {
      href: "/contact",
      label: "Contact",
      exact: true,
      icon: "📞",
    },
    {
      href: "/about",
      label: "About",
      exact: true,
      icon: "ℹ️",
    },
  ],

  FOOTER_LINKS: {
    COMPANY: [
      { href: "/about", label: "About Us" },
      { href: "/careers", label: "Careers" },
      { href: "/press", label: "Press" },
      { href: "/blog", label: "Blog" },
    ],
    SUPPORT: [
      { href: "/contact", label: "Contact Us" },
      { href: "/help", label: "Help Center" },
      { href: "/shipping", label: "Shipping Info" },
      { href: "/returns", label: "Returns" },
    ],
    LEGAL: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
};

/**
 * Error Messages
 * Standardized error messages for consistent UX
 */
export const ERROR_MESSAGES = {
  // API Errors
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  SERVER_ERROR: "Server error. Please try again later.",
  NOT_FOUND: "The requested item was not found.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "Access to this resource is forbidden.",
  TIMEOUT: "Request timeout. Please try again.",

  // Product Errors
  PRODUCT_NOT_FOUND:
    "Product not found. It may have been removed or is temporarily unavailable.",
  PRODUCTS_LOAD_FAILED:
    "Failed to load products. Please refresh the page and try again.",
  PRODUCT_DETAILS_FAILED: "Failed to load product details. Please try again.",

  // Search Errors
  SEARCH_FAILED: "Search failed. Please try again with different keywords.",
  EMPTY_SEARCH: "Please enter a search term.",
  NO_RESULTS: "No products found matching your search.",

  // Cart Errors
  ADD_TO_CART_FAILED: "Failed to add item to cart. Please try again.",
  CART_LOAD_FAILED: "Failed to load cart items.",
  OUT_OF_STOCK: "This item is currently out of stock.",

  // Form Errors
  REQUIRED_FIELD: "This field is required.",
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_PHONE: "Please enter a valid phone number.",
  PASSWORD_TOO_SHORT: "Password must be at least 8 characters long.",

  // General Errors
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
  PAGE_NOT_FOUND: "Page not found. The page you're looking for doesn't exist.",
  MAINTENANCE:
    "We're currently performing maintenance. Please try again later.",
};

/**
 * Success Messages
 * Standardized success messages for consistent UX
 */
export const SUCCESS_MESSAGES = {
  // Product Actions
  ADDED_TO_CART: "Item added to cart successfully!",
  REMOVED_FROM_CART: "Item removed from cart.",
  CART_UPDATED: "Cart updated successfully.",

  // User Actions
  LOGIN_SUCCESS: "Welcome! You have been logged in successfully.",
  LOGOUT_SUCCESS: "You have been logged out successfully.",
  PROFILE_UPDATED: "Profile updated successfully.",
  PASSWORD_CHANGED: "Password changed successfully.",

  // Form Submissions
  MESSAGE_SENT:
    "Your message has been sent successfully. We'll get back to you soon!",
  SUBSCRIPTION_SUCCESS: "Thank you for subscribing to our newsletter!",
  FEEDBACK_SUBMITTED: "Thank you for your feedback!",

  // General Success
  OPERATION_SUCCESS: "Operation completed successfully.",
  CHANGES_SAVED: "Your changes have been saved.",
};

/**
 * Loading Messages
 * Messages to show during loading states
 */
export const LOADING_MESSAGES = {
  LOADING_PRODUCTS: "Loading products...",
  LOADING_PRODUCT: "Loading product details...",
  SEARCHING: "Searching...",
  ADDING_TO_CART: "Adding to cart...",
  PROCESSING: "Processing...",
  SAVING: "Saving...",
  LOADING: "Loading...",
};

/**
 * Accessibility Constants
 * ARIA labels and accessibility-related constants
 */
export const A11Y = {
  LABELS: {
    MAIN_NAVIGATION: "Main navigation",
    PRODUCT_GRID: "Product grid",
    SEARCH_FORM: "Product search",
    THEME_TOGGLE: "Toggle theme",
    ADD_TO_CART: "Add to cart",
    PRODUCT_IMAGE: "Product image",
    PRICE: "Product price",
    RATING: "Product rating",
  },

  ANNOUNCEMENTS: {
    THEME_CHANGED: "Theme switched to {theme} mode",
    ITEM_ADDED: "{item} added to cart",
    SEARCH_RESULTS: "{count} products found",
    PAGE_LOADED: "Page loaded",
  },
};

/**
 * Social Media Links
 * Social media platform URLs and configuration
 */
export const SOCIAL_MEDIA = {
  FACEBOOK: "https://facebook.com/modomartofficial",
  TWITTER: "https://twitter.com/modomartofficial",
  INSTAGRAM: "https://instagram.com/modomartofficial",
  LINKEDIN: "https://linkedin.com/company/modomart",
  YOUTUBE: "https://youtube.com/@modomartofficial",
  PINTEREST: "https://pinterest.com/modomartofficial",
};

/**
 * SEO Constants
 * SEO-related configuration and meta data
 */
export const SEO = {
  DEFAULT_TITLE: "Modo Mart - Modern E-commerce Platform",
  TITLE_TEMPLATE: "%s | Modo Mart",
  DEFAULT_DESCRIPTION:
    "Discover amazing products at unbeatable prices. Shop now at Modo Mart for the best online shopping experience.",
  DEFAULT_KEYWORDS: [
    "e-commerce",
    "online shopping",
    "products",
    "modo mart",
    "shopping",
    "retail",
  ],
  DEFAULT_IMAGE: "/HeroImage.svg",
  TWITTER_HANDLE: "@modomartofficial",

  // Structured data
  ORGANIZATION: {
    "@type": "Organization",
    name: SITE_CONFIG.NAME,
    url: SITE_CONFIG.URL,
    logo: `${SITE_CONFIG.URL}/logo.png`,
    sameAs: Object.values(SOCIAL_MEDIA),
  },
};

/**
 * Feature Flags
 * Toggle features on/off for development and testing
 */
export const FEATURE_FLAGS = {
  ENABLE_CART: false, // Shopping cart functionality
  ENABLE_WISHLIST: false, // Wishlist functionality
  ENABLE_REVIEWS: false, // Product reviews
  ENABLE_SEARCH: true, // Search functionality
  ENABLE_FILTERS: false, // Product filtering
  ENABLE_SORTING: false, // Product sorting
  ENABLE_NEWSLETTER: false, // Newsletter subscription
  ENABLE_CHAT: false, // Customer chat support
  ENABLE_PWA: false, // Progressive Web App features
  ENABLE_ANALYTICS: false, // Analytics tracking
};

/**
 * Development Constants
 * Constants used during development
 */
export const DEV_CONFIG = {
  DEBUG_MODE: process.env.NODE_ENV === "development",
  API_TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  CACHE_DURATION: 3600, // 1 hour in seconds

  // Mock data flags
  USE_MOCK_DATA: false,
  SIMULATE_SLOW_NETWORK: false,
  SIMULATE_ERRORS: false,
};

// Export all constants as a single object for convenience
export default {
  SITE_CONFIG,
  API_ENDPOINTS,
  PAGINATION,
  UI_CONSTANTS,
  THEME_CONFIG,
  NAVIGATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  LOADING_MESSAGES,
  A11Y,
  SOCIAL_MEDIA,
  SEO,
  FEATURE_FLAGS,
  DEV_CONFIG,
};

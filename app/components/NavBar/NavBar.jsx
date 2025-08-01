/**
 * Navigation Bar Component
 *
 * This component provides the main navigation for the application.
 * It includes the site logo, navigation links, theme toggle, and login functionality.
 *
 * Features:
 * - Responsive navigation menu with hamburger menu
 * - Active link highlighting based on current route
 * - Dark/light theme toggle integration
 * - Login button with authentication (UI ready)
 * - Accessible navigation structure
 * - Mobile-first responsive design
 * - Smooth animations and transitions
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Component imports
import LogInButton from "./LogInButton";
import DarkMode from "../darkMode/DarkMode";

// Styles
import "./navbar.css";

/**
 * Navigation items configuration
 * Centralized navigation structure for easy maintenance
 */
const navigationItems = [
  { href: "/", label: "Home", exact: true },
  { href: "/products", label: "Products", exact: false },
  { href: "/contact", label: "Contact", exact: true },
  { href: "/about", label: "About", exact: true },
];

/**
 * NavBar Component
 *
 * Renders the main navigation bar with:
 * - Brand logo linking to home page
 * - Responsive navigation menu with hamburger toggle
 * - Theme toggle button
 * - Login/authentication button
 * - Mobile-first responsive design
 *
 * Uses Next.js usePathname hook to determine active navigation item
 */
const NavBar = () => {
  // State management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Get current pathname for active link highlighting
  const pathname = usePathname();

  /**
   * Check if device is mobile on mount and resize
   */
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      // Close mobile menu when switching to desktop
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    // Check on mount
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  /**
   * Close mobile menu when route changes
   */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  /**
   * Determines if a navigation item should be marked as active
   * @param {string} href - The navigation item's href
   * @param {boolean} exact - Whether to match exactly or include sub-routes
   * @returns {boolean} - Whether the item is active
   */
  const isActiveLink = (href, exact) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  /**
   * Toggle mobile menu visibility
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * Handle mobile menu item click
   */
  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className="navbar-container"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Main Navigation Bar */}
      <div className="navbar-content">
        {/* Brand Logo */}
        <div className="brand-section">
          <Link
            className="logo"
            href="/"
            aria-label="Modo Mart - Go to homepage"
          >
            MODO MARKET
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <ul
          className={`nav-links ${
            isMobile ? "nav-links-mobile" : "nav-links-desktop"
          }`}
          role="menubar"
        >
          {/* Theme Toggle */}
          <li role="none">
            <DarkMode />
          </li>

          {/* Navigation Items */}
          {navigationItems.map((item) => (
            <li key={item.href} role="none">
              <Link
                className={
                  isActiveLink(item.href, item.exact)
                    ? "nav-link active"
                    : "nav-link"
                }
                href={item.href}
                role="menuitem"
                aria-current={
                  isActiveLink(item.href, item.exact) ? "page" : undefined
                }
                onClick={isMobile ? handleMobileMenuClick : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Authentication Button */}
          <li role="none">
            <LogInButton
              val="Login"
              message="Welcome! You have been logged in successfully!"
            />
          </li>
        </ul>

        {/* Mobile Menu Toggle Button */}
        {isMobile && (
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? "active" : ""}`}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && (
        <div
          className={`mobile-menu ${
            isMobileMenuOpen ? "mobile-menu-open" : ""
          }`}
          id="mobile-navigation-menu"
          aria-hidden={!isMobileMenuOpen}
        >
          <ul className="mobile-nav-links" role="menubar">
            {/* Navigation Items */}
            {navigationItems.map((item) => (
              <li key={item.href} role="none">
                <Link
                  className={
                    isActiveLink(item.href, item.exact)
                      ? "mobile-nav-link active"
                      : "mobile-nav-link"
                  }
                  href={item.href}
                  role="menuitem"
                  aria-current={
                    isActiveLink(item.href, item.exact) ? "page" : undefined
                  }
                  onClick={handleMobileMenuClick}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Mobile Actions */}
            <li role="none" className="mobile-actions">
              <div className="mobile-theme-toggle">
                <DarkMode />
              </div>
              <LogInButton
                val="Login"
                message="Welcome! You have been logged in successfully!"
              />
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default NavBar;

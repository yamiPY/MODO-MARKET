/**
 * Login Button Component
 *
 * This component renders a login/authentication button in the navigation bar.
 * Currently displays a placeholder alert, but can be extended to integrate
 * with authentication providers like NextAuth, Auth0, or custom auth systems.
 *
 * Features:
 * - Customizable button text and success message
 * - Click handler for authentication flow
 * - Accessible button design
 * - Integration ready for auth providers
 */

"use client";

import React, { useState } from "react";

/**
 * LogInButton Component
 *
 * Renders an authentication button with customizable text and behavior.
 * Currently shows a demo alert but can be extended for real authentication.
 *
 * @param {Object} props - Component props
 * @param {string} props.val - Button text to display
 * @param {string} props.message - Success message to show after login
 */
const LogInButton = ({ val = "Login", message = "Login successful!" }) => {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles the login button click
   * Currently shows a demo alert, but this is where you would
   * integrate with your authentication provider
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Replace with actual authentication logic
      // Examples:
      // - signIn() from next-auth
      // - Auth0 login redirect
      // - Custom authentication API call

      alert(message);

      // TODO: Handle successful authentication
      // - Redirect to dashboard
      // - Update user state
      // - Store authentication tokens
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="login-btn"
      disabled={isLoading}
      aria-label={`${val} - Authenticate to access your account`}
      type="button"
    >
      {isLoading ? (
        <>
          <span className="loading-spinner" aria-hidden="true"></span>
          Logging in...
        </>
      ) : (
        val
      )}
    </button>
  );
};

export default LogInButton;

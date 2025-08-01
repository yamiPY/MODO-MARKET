/**
 * Root Layout Component
 *
 * This is the main layout component that wraps all pages in the application.
 * It provides the basic HTML structure, font loading, theme context, and common components.
 *
 * Features:
 * - Google Fonts integration (Lalezar for Arabic, Montserrat for Latin)
 * - Theme context provider for dark/light mode
 * - Global navigation and footer
 * - SEO metadata configuration
 * - Responsive design foundation
 */

import { Geist_Mono, Lalezar, Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import ThemeProvider from "./context/ThemeContext";

/**
 * Lalezar font configuration for Arabic text support
 * Used for headings and special text elements
 */
const lalezarFont = Lalezar({
  variable: "--font-lalezar-sans",
  subsets: ["arabic"],
  weight: ["400"],
  display: "swap", // Optimize font loading
});

/**
 * Montserrat font configuration for Latin text
 * Used for body text and general content
 */
const montserratFont = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap", // Optimize font loading
});

/**
 * SEO Metadata configuration
 * Defines default meta tags for the entire application
 */
export const metadata = {
  title: {
    default: "Modo Mart - Modern E-commerce Platform",
    template: "%s | Modo Mart",
  },
  description:
    "Modo Mart is your go-to online shop for practical, creative, and affordable products — from home tools and accessories to digital items and unique gifts. Fast shipping, hand-picked quality, and customer-first service.",
  keywords: [
    "e-commerce",
    "online shopping",
    "products",
    "modo mart",
    "shopping",
  ],
  authors: [{ name: "Modo Mart Team" }],
  creator: "Modo Mart",
  publisher: "Modo Mart",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://modo-mart.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Modo Mart - Modern E-commerce Platform",
    description:
      "Discover amazing products at unbeatable prices. Shop now at Modo Mart!",
    url: "https://modo-mart.vercel.app",
    siteName: "Modo Mart",
    images: [
      {
        url: "/HeroImage.svg",
        width: 1200,
        height: 630,
        alt: "Modo Mart - Modern E-commerce Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modo Mart - Modern E-commerce Platform",
    description:
      "Discover amazing products at unbeatable prices. Shop now at Modo Mart!",
    images: ["/HeroImage.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * Root Layout Component
 *
 * Provides the foundational structure for all pages including:
 * - HTML document structure
 * - Font loading and CSS variables
 * - Theme context for dark/light mode
 * - Global navigation and footer components
 * - Responsive container structure
 *
 * @param {Object} children - The page content to be rendered
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://dummyjson.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Viewport meta tag for responsive design */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#007bff" />
      </head>

      <body
        className={`${lalezarFont.variable} ${montserratFont.variable}`}
        suppressHydrationWarning
      >
        {/* Theme Provider for dark/light mode context */}
        <ThemeProvider>
          {/* Main application container */}
          <div className="main-container">
            {/* Global navigation header */}
            <NavBar />

            {/* Main content area */}
            <main className="content-wrapper">{children}</main>

            {/* Global footer */}
            <Footer />
          </div>
        </ThemeProvider>

        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
      </body>
    </html>
  );
}

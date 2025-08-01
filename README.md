# 🛒 Modo Mart - Modern E-commerce Platform

A modern, responsive e-commerce platform built with Next.js 15, featuring a clean design, dark/light theme support, and dynamic product management.

![Modo Mart](./public/HeroImage.svg)

## ✨ Features

### 🎨 **Design & UI**

- **Modern Design**: Clean, minimalist interface with smooth animations
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Responsive Layout**: Optimized for all devices (mobile, tablet, desktop)
- **CSS Modules**: Scoped styling with CSS custom properties
- **Smooth Transitions**: Enhanced user experience with fluid animations

### 🛍️ **E-commerce Features**

- **Product Catalog**: Dynamic product listing with real-time data
- **Product Details**: Individual product pages with detailed information
- **Category Filtering**: Browse products by categories
- **Search Functionality**: Find products quickly
- **Shopping Cart**: Add/remove items (UI ready)
- **Responsive Images**: Optimized image loading with Next.js Image component

### 🚀 **Technical Features**

- **Next.js 15**: Latest version with App Router
- **Server Components**: Improved performance with RSC
- **API Integration**: Fetch data from external APIs (DummyJSON)
- **SEO Optimized**: Meta tags and structured data
- **Performance**: Optimized loading and rendering
- **TypeScript Ready**: Easy migration to TypeScript

## 🏗️ Project Structure

```
modo-mart/
├── app/
│   ├── (dynamic-pages)/
│   │   └── products/
│   │       ├── [id]/
│   │       │   ├── page.jsx          # Individual product page
│   │       │   └── product.module.css
│   │       ├── page.jsx              # Products listing page
│   │       └── products.module.css
│   ├── (static-pages)/
│   │   ├── about/
│   │   │   └── page.jsx              # About page
│   │   └── contact/
│   │       └── page.jsx              # Contact page
│   ├── components/
│   │   ├── NavBar/                   # Navigation component
│   │   ├── Footer/                   # Footer component
│   │   ├── Hero/                     # Hero section component
│   │   └── darkMode/                 # Theme toggle component
│   ├── context/
│   │   └── ThemeContext.js           # Theme management context
│   ├── globals.css                   # Global styles and CSS variables
│   ├── layout.jsx                    # Root layout component
│   ├── page.jsx                      # Home page
│   └── page.module.css               # Home page styles
├── public/                           # Static assets
│   ├── images/                       # Product and UI images
│   └── icons/                        # Social media icons
├── package.json                      # Dependencies and scripts
└── README.md                         # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/modo-mart.git
   cd modo-mart
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🎨 Theming System

The application uses a comprehensive CSS custom properties system for theming:

### CSS Variables

```css
:root {
  /* Colors */
  --primary: #007bff;
  --secondary: #6c757d;
  --success: #28a745;
  --danger: #dc3545;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Typography */
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

### Dark Mode Support

The theme system automatically switches between light and dark modes based on user preference, with smooth transitions between themes.

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Features

- Flexible grid layouts
- Responsive typography
- Touch-friendly interactions
- Optimized images for all screen sizes

## 🔧 API Integration

### Data Sources

- **Products**: [DummyJSON Products API](https://dummyjson.com/products)
- **Categories**: Dynamic category filtering
- **Product Details**: Individual product endpoints

### API Functions

```javascript
// Fetch all products
async function getProducts() {
  const response = await fetch("https://dummyjson.com/products");
  return response.json();
}

// Fetch single product
async function getProduct(id) {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  return response.json();
}
```

## 🎯 Performance Optimizations

### Next.js Features

- **Image Optimization**: Automatic image optimization and lazy loading
- **Code Splitting**: Automatic code splitting for optimal loading
- **Server Components**: Reduced client-side JavaScript
- **Static Generation**: Pre-rendered pages for better performance

### Custom Optimizations

- **CSS Modules**: Scoped styles to prevent conflicts
- **Lazy Loading**: Components and images load on demand
- **Caching**: Efficient caching strategies
- **Minification**: Optimized production builds

## 🛠️ Development Guidelines

### Code Style

- Use functional components with hooks
- Implement proper error handling
- Follow Next.js best practices
- Use semantic HTML elements
- Maintain consistent naming conventions

### Component Structure

```jsx
// Component template
import React from "react";
import styles from "./Component.module.css";

const Component = ({ prop1, prop2 }) => {
  // Component logic here

  return <div className={styles.container}>{/* Component JSX */}</div>;
};

export default Component;
```

### CSS Guidelines

- Use CSS Modules for component styles
- Leverage CSS custom properties
- Implement mobile-first responsive design
- Use semantic class names
- Maintain consistent spacing and typography

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

- **Netlify**: Static site deployment
- **AWS**: Full-stack deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **DummyJSON** - For providing the product API
- **React Team** - For the powerful UI library
- **Vercel** - For hosting and deployment platform

## 📞 Support

For support, email support@modo-mart.com or join our Slack channel.

## 🔮 Roadmap

### Upcoming Features

- [ ] User Authentication
- [ ] Shopping Cart Functionality
- [ ] Payment Integration
- [ ] Order Management
- [ ] Product Reviews
- [ ] Wishlist Feature
- [ ] Advanced Search & Filters
- [ ] Admin Dashboard
- [ ] Multi-language Support
- [ ] PWA Features

---

**Made with ❤️ by the Modo Mart Team**
#   M O D O - M A R K E T  
 #   M O D O - M A R K E T  
 
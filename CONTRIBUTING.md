# Contributing to Modo Mart

Thank you for your interest in contributing to Modo Mart! We welcome contributions from developers of all skill levels. This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or later)
- **npm** or **yarn** package manager
- **Git** for version control
- A code editor (we recommend **VS Code**)

### Development Setup

1. **Fork the repository**

   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/yourusername/modo-mart.git
   cd modo-mart
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 How to Contribute

### Reporting Issues

Before creating an issue, please:

1. **Search existing issues** to avoid duplicates
2. **Use the issue templates** when available
3. **Provide detailed information** including:
   - Steps to reproduce the issue
   - Expected vs actual behavior
   - Screenshots or videos if applicable
   - Browser and device information
   - Console errors (if any)

### Suggesting Features

We welcome feature suggestions! Please:

1. **Check existing feature requests** first
2. **Create a detailed proposal** including:
   - Problem statement
   - Proposed solution
   - Alternative solutions considered
   - Implementation considerations
   - Mockups or wireframes (if applicable)

### Code Contributions

#### Branch Naming Convention

Use descriptive branch names with prefixes:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `style/` - Code style improvements
- `test/` - Adding or updating tests

Examples:

```bash
feature/add-shopping-cart
fix/product-image-loading
docs/update-api-documentation
refactor/optimize-product-components
```

#### Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**

```bash
feat(products): add product filtering functionality
fix(navbar): resolve mobile menu toggle issue
docs(readme): update installation instructions
style(components): improve CSS organization
refactor(api): optimize product data fetching
test(products): add unit tests for product components
```

#### Pull Request Process

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

   - Follow the coding standards (see below)
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**

   ```bash
   npm run build
   npm run lint
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use the PR template
   - Provide a clear description
   - Link related issues
   - Add screenshots for UI changes

## 🎨 Coding Standards

### JavaScript/JSX Guidelines

- **Use functional components** with hooks
- **Follow ESLint rules** configured in the project
- **Use meaningful variable names**
- **Add JSDoc comments** for functions and components
- **Handle errors gracefully**
- **Use TypeScript types** when possible

**Example:**

```jsx
/**
 * Product Card Component
 *
 * Displays a product with image, title, price, and actions
 *
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data
 * @param {Function} props.onAddToCart - Add to cart handler
 */
const ProductCard = ({ product, onAddToCart }) => {
  // Component implementation
};
```

### CSS Guidelines

- **Use CSS Modules** for component styles
- **Follow BEM methodology** for class naming
- **Use CSS custom properties** for theming
- **Implement mobile-first** responsive design
- **Add comments** for complex styles

**Example:**

```css
/* Product card component styles */
.productCard {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border-radius: var(--radius-md);
  transition: transform var(--transition-normal);
}

.productCard:hover {
  transform: translateY(-2px);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .productCard {
    margin-bottom: var(--spacing-md);
  }
}
```

### File Organization

```
app/
├── components/           # Reusable components
│   ├── ComponentName/
│   │   ├── ComponentName.jsx
│   │   ├── ComponentName.module.css
│   │   └── index.js
├── hooks/               # Custom hooks
├── utils/               # Utility functions
├── context/             # React contexts
├── (dynamic-pages)/     # Dynamic routes
└── (static-pages)/      # Static routes
```

### Component Structure

```jsx
/**
 * Component documentation
 */

// React imports
import React, { useState, useEffect } from "react";

// Next.js imports
import Image from "next/image";
import Link from "next/link";

// Internal imports
import { useProducts } from "../hooks/useProducts";
import { formatPrice } from "../utils/helpers";

// Styles
import styles from "./Component.module.css";

/**
 * Component implementation
 */
const Component = ({ prop1, prop2 }) => {
  // State and hooks
  const [state, setState] = useState(null);

  // Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // Render
  return <div className={styles.container}>{/* Component JSX */}</div>;
};

export default Component;
```

## 🧪 Testing Guidelines

### Writing Tests

- **Write unit tests** for utility functions
- **Write integration tests** for components
- **Test user interactions** and edge cases
- **Mock external dependencies**

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📚 Documentation

### Code Documentation

- **Add JSDoc comments** to all functions and components
- **Document complex logic** with inline comments
- **Update README.md** for significant changes
- **Include examples** in documentation

### API Documentation

When adding new API functions:

1. **Document parameters** and return values
2. **Provide usage examples**
3. **Include error handling** information
4. **Update the API reference**

## 🔍 Code Review Process

### For Contributors

- **Self-review** your code before submitting
- **Test thoroughly** on different devices/browsers
- **Address feedback** promptly and professionally
- **Keep PRs focused** and reasonably sized

### For Reviewers

- **Be constructive** and helpful in feedback
- **Focus on code quality** and maintainability
- **Check for accessibility** and performance
- **Verify tests** and documentation

## 🚀 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backward-compatible functionality
- **PATCH** version for backward-compatible bug fixes

### Release Checklist

- [ ] All tests pass
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated
- [ ] Version is bumped appropriately
- [ ] Release notes are prepared

## 🤝 Community Guidelines

### Code of Conduct

- **Be respectful** and inclusive
- **Welcome newcomers** and help them learn
- **Focus on constructive** feedback
- **Respect different perspectives** and approaches

### Communication

- **Use clear, concise language**
- **Be patient** with questions and discussions
- **Provide context** for your suggestions
- **Acknowledge contributions** from others

## 📞 Getting Help

### Resources

- **Documentation**: Check the README and inline docs
- **Issues**: Search existing issues for solutions
- **Discussions**: Use GitHub Discussions for questions
- **Discord**: Join our community Discord server

### Contact

- **Email**: developers@modo-mart.com
- **GitHub**: Create an issue or discussion
- **Discord**: @modomartdev

## 🎯 Development Roadmap

### Current Priorities

1. **Shopping Cart Implementation**
2. **User Authentication System**
3. **Product Search & Filtering**
4. **Performance Optimizations**
5. **Accessibility Improvements**

### Future Plans

- Payment Integration
- Order Management
- Product Reviews
- Admin Dashboard
- Mobile App
- PWA Features

## 📄 License

By contributing to Modo Mart, you agree that your contributions will be licensed under the same license as the project (MIT License).

## 🙏 Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **Release notes** for significant contributions
- **Hall of Fame** on our website
- **Special badges** on Discord

---

Thank you for contributing to Modo Mart! Your efforts help make this project better for everyone. 🚀

**Happy Coding!** 💻✨

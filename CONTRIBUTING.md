# Contributing to VerteidIQ

We love your input! We want to make contributing to VerteidIQ as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## 🚀 Development Process

We use GitHub to host code, track issues and feature requests, as well as accept pull requests.

### **Branch Strategy**
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `hotfix/*` - Critical fixes
- `release/*` - Release preparation

### **Pull Request Process**

1. **Fork the repo** and create your branch from `develop`
2. **Add tests** if you've added code that should be tested
3. **Update documentation** if you've changed APIs
4. **Ensure the test suite passes** (`npm test`)
5. **Run linting** (`npm run lint`)
6. **Issue the pull request**

## 🐛 Bug Reports

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce (be specific!)
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening)

## 💡 Feature Requests

We track feature requests as [GitHub Issues](https://github.com/losa201/PTaaS/issues).

**Include:**
- **User story:** As a [persona], I want [functionality] so that [benefit]
- **Acceptance criteria:** Clear definition of done
- **Business value:** Why this feature matters
- **Technical considerations:** Any implementation thoughts

## 🔧 Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/PTaaS.git

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint
```

## 📝 Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### **TypeScript Guidelines**
- Use TypeScript for all new code
- Prefer interfaces over types for object shapes
- Use proper typing - avoid `any`
- Document complex types with JSDoc comments

### **React Guidelines**
- Use functional components with hooks
- Prefer custom hooks for complex logic
- Use proper prop types and default values
- Follow the React Hooks rules

### **CSS Guidelines**
- Use Tailwind CSS utility classes
- Create reusable component variants
- Follow mobile-first responsive design
- Maintain consistent spacing and typography

## 🧪 Testing

### **Unit Tests**
```bash
npm run test:unit
```

### **Integration Tests**
```bash
npm run test:integration
```

### **E2E Tests**
```bash
npm run test:e2e
```

### **Testing Guidelines**
- Write tests for all business logic
- Use React Testing Library for component tests
- Mock external dependencies
- Test user interactions, not implementation details

## 📚 Documentation

- Update README.md if needed
- Add JSDoc comments for complex functions
- Update component documentation
- Include examples in documentation

## 🏷️ Commit Messages

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect meaning of code
- `refactor`: Code change that neither fixes bug nor adds feature
- `perf`: Change that improves performance
- `test`: Adding missing tests
- `chore`: Changes to build process or auxiliary tools

**Examples:**
```
feat(auth): add two-factor authentication
fix(api): handle null response from security scan
docs(readme): update installation instructions
style(hero): improve responsive layout on mobile
```

## 🔒 Security

### **Security Issues**
**DO NOT** open a public issue for security vulnerabilities.

Instead, email us directly at: [security@verteidiq.com](mailto:security@verteidiq.com)

### **Security Guidelines**
- Never commit secrets, API keys, or credentials
- Use environment variables for sensitive data
- Validate all user inputs
- Follow OWASP security guidelines
- Keep dependencies updated

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

- 📧 **Email:** [dev@verteidiq.com](mailto:dev@verteidiq.com)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/losa201/PTaaS/discussions)
- 📚 **Documentation:** [docs.verteidiq.com](https://docs.verteidiq.com)

---

**Thank you for contributing to VerteidIQ! 🚀**
# Playwright + Cucumber + Docker Test Automation Framework

![Tests](https://github.com/IZ-KS/playwright-cucumber-docker/workflows/Playwright%20Tests/badge.svg)

A modern end-to-end test automation framework combining Playwright's reliability with Cucumber's BDD approach, containerized with Docker for consistent execution across environments.

## ✨ Features

- **🎭 Playwright** - Fast and reliable end-to-end testing across all modern browsers
- **🥒 Cucumber BDD** - Behavior-Driven Development with Gherkin syntax for readable test scenarios
- **📘 TypeScript** - Type-safe test automation with IntelliSense support
- **🐳 Docker** - Containerized test execution for consistent environments
- **🏗️ Page Object Model** - Organized and maintainable code structure
- **📊 Rich Reporting** - HTML and JSON reports with screenshots on failure
- **🔄 CI/CD Ready** - GitHub Actions workflow included

## 📋 Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Docker**: (Optional) For containerized execution

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/IZ-KS/playwright-cucumber-docker.git
cd playwright-cucumber-docker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Run Tests

```bash
npm test
```

## 📁 Project Structure

```
playwright-cucumber-docker/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
│       └── playwright.yml
├── .vscode/                # VS Code settings
├── src/
│   ├── hooks/              # Cucumber hooks
│   │   ├── hooks.ts        # Before/After hooks
│   │   └── pageFixtures.ts # Page fixture setup
│   └── test/
│       ├── features/       # Gherkin feature files
│       │   ├── addToCart.feature
│       │   └── login.feature
│       └── steps/          # Step definitions
│           ├── addToCart.ts
│           └── loginSteps.ts
├── test-results/           # Test execution reports
│   ├── cucumber-report.html
│   ├── cucumber-report.json
│   └── screenshots/        # Failure screenshots
├── .gitignore
├── cucumber.json           # Cucumber configuration
├── package.json
├── tsconfig.json           # TypeScript configuration
└── README.md
```

## ⚙️ Configuration

### Cucumber Configuration

The `cucumber.json` file in the root directory configures test execution:

```json
{
  "default": {
    "require": ["src/test/steps/**/*.ts", "src/hooks/**/*.ts"],
    "requireModule": ["ts-node/register"],
    "format": [
      "progress",
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json"
    ],
    "parallel": 1,
    "publishQuiet": true
  }
}
```

## 🧪 Running Tests

### Run All Tests (Headless)
```bash
npm test
```

### Run Tests in Headed Mode
```bash
npm run test:headed
```

### Run Tests in Specific Browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run Specific Feature File
```bash
npx cucumber-js src/test/features/login.feature
```

### Hooks Example

```typescript
import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { pageFixture } from './pageFixtures';

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

Before(async function () {
  const context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;
});

After(async function ({ pickle, result }) {
  if (result?.status === Status.FAILED) {
    const screenshot = await pageFixture.page.screenshot({
      path: `test-results/screenshots/${pickle.name}.png`,
      fullPage: true
    });
    this.attach(screenshot, 'image/png');
  }
  await pageFixture.page.close();
});

AfterAll(async function () {
  await browser.close();
});
```

## 📊 Test Reports 

After test execution, reports are automatically generated in the `test-results/` directory:

- **HTML Report**: `test-results/cucumber-report.html`
- **JSON Report**: `test-results/cucumber-report.json`
- **Screenshots**: `test-results/screenshots/` (captured on test failures)

### View HTML Report

```bash
# macOS/Linux
open test-results/cucumber-report.html

# Windows
start test-results/cucumber-report.html
```

## 🐳 Docker Support

### Building Docker Image

```bash
docker build -t playwright-cucumber-tests .
```

### Running Tests in Docker

```bash
docker run --rm -v $(pwd)/test-results:/app/test-results playwright-cucumber-tests
```

## 🔄 CI/CD Integration

This project includes a GitHub Actions workflow that automatically runs tests on every push and pull request.

### Workflow Configuration

The `.github/workflows/playwright.yml` file configures CI/CD:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    container:
      image: mcr.microsoft.com/playwright:v1.40.0-jammy
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run Cucumber tests
        run: npm test
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: test-results/
          retention-days: 30
```

### Viewing Test Results in CI

1. Navigate to the **Actions** tab in your GitHub repository
2. Click on the workflow run you want to inspect
3. Download the `test-results` artifact to view reports locally

## 🗺️ Roadmap

Future enhancements planned for this framework:

- [ ] Complete Docker containerization
- [ ] Enhanced Page Object Model implementation
- [ ] Parallel test execution across multiple browsers
- [ ] Integration with Allure reporting
- [ ] API testing capabilities
- [ ] Visual regression testing
- [ ] Database integration for test data management
- [ ] Cross-environment configuration management

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**IZ-KS**
- GitHub: [@IZ-KS](https://github.com/IZ-KS)

## 💬 Support

For questions or issues, please [open an issue](https://github.com/IZ-KS/playwright-cucumber-docker/issues) on GitHub.

---

⭐ If you find this project helpful, please consider giving it a star!
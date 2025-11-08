# Playwright + Cucumber Test Automation Framework

## 📋 Description

This project is an end-to-end test automation framework built with Playwright and Cucumber, containerized with Docker. It follows the Page Object Model (POM) design pattern for maintainable and scalable test automation.

## 🚀 Features

- **Playwright**: Fast and reliable end-to-end testing
- **Cucumber BDD**: Behavior-Driven Development with Gherkin syntax
- **TypeScript**: Type-safe test automation
- **Docker**: Containerized test execution
- **Page Object Model**: Organized and maintainable code structure

## 📦 Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Docker**: (Optional) For containerized execution

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/IZ-KS/playwright-cucumber-docker.git
cd https://github.com/IZ-KS/playwright-cucumber-docker.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Initialize Playwright

```bash
npm init playwright@latest
```

During the installation, you'll be prompted to:
- Choose TypeScript or JavaScript (Select TypeScript)
- Name of your Tests folder (default: tests)
- Add a GitHub Actions workflow (optional)
- Install Playwright browsers (Yes)

### 4. Install Cucumber

```bash
npm install @cucumber/cucumber --save-dev
npm install @types/node --save-dev
```

## 📁 Project Structure

```
playwright-cucumber-docker/
├── .github/
│   └── workflows/             # GitHub Actions CI/CD
├── .vscode/                   # VS Code settings
├── node_modules/              # Dependencies (not in Git)
├── src/
│   ├── hooks/                 # Cucumber hooks
│   │   ├── hooks.ts          # Before/After hooks
│   │   └── pageFixtures.ts   # Page fixture setup
│   └── test/
│       ├── features/          # Gherkin feature files
│       │   ├── addToCart.feature
│       │   └── login.feature
│       └── steps/             # Step definitions
│           ├── addToCart.ts
│           └── loginSteps.ts
├── test-results/              # Test execution reports
│   └── .last-run.json
├── .gitignore
├── cucumber.json              # Cucumber configuration
├── package-lock.json
├── package.json
├── playwright.yml             # Playwright config (if applicable)
├── tsconfig.json              # TypeScript configuration
└── README.md
```

## ⚙️ Configuration

### Cucumber Configuration

Create or update your `cucumber.json` file in the root directory:

```json
{
  "default": {
    "require": ["src/test/steps/**/*.ts", "src/hooks/**/*.ts"],
    "requireModule": ["ts-node/register"],
    "format": ["progress", "html:test-results/cucumber-report.html", "json:test-results/cucumber-report.json"],
    "parallel": 1,
    "publishQuiet": true
  }
}
```

### Update package.json scripts

```json
{
  "scripts": {
    "test": "cucumber-js",
    "test:headed": "cucumber-js --parallel 1",
    "test:chromium": "BROWSER=chromium cucumber-js",
    "test:firefox": "BROWSER=firefox cucumber-js",
    "test:webkit": "BROWSER=webkit cucumber-js"
  }
}
```

## 📝 Writing Tests

### Feature File Example

### Run all tests

```bash
npm test
```

### Run tests in headed mode

```bash
npm run test:headed
```

### Run tests on specific browser

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run specific feature file

```bash
npx cucumber-js src/test/features/addToCart.feature
```

## 🚧 Coming Soon

The following features are planned for future releases:

- [ ] **Docker Containerization** - Run tests in isolated Docker containers
- [ ] **Page Object Model** - Implement POM design pattern for better code organization
- [ ] **Cross-browser Testing** - Parallel execution across Chrome, Firefox, and Safari
- [ ] **Advanced Reporting** - Integration with Allure or other reporting frameworks
- [ ] **API Testing** - Add API test automation capabilities
- [ ] **Visual Regression Testing** - Automated screenshot comparison

Contributions and suggestions are welcome!

## 🔄 CI/CD with GitHub Actions

This project uses GitHub Actions for continuous integration. Tests run automatically on every push and pull request.

### Workflow Configuration

Create `.github/workflows/playwright.yml`:

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

### Viewing Test Results

After each workflow run:
1. Go to the **Actions** tab in your GitHub repository
2. Click on the workflow run
3. Download the **test-results** artifact to view reports locally

### Status Badge

Add this badge to the top of your README to show test status:

```markdown
![Tests](https://github.com/yourusername/your-repo-name/workflows/Playwright%20Tests/badge.svg)
```

### Feature File Example

```gherkin
Feature: Shopping Cart Functionality

  Background:
    Given User can access the application

  Scenario Outline: User adds an item to the cart
    And User enters username as "<username>"
    And User enters password as "<password>"
    When User clicks on the login button
    When User adds the product to the cart
    Then The cart icon should get updated

  Examples:
    | username      | password     | productName          |
    | standard_user | secret_sauce | Sauce Labs Backpack  |
```

### Step Definition Example

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from '../../hooks/pageFixtures';

Given('User enters username as {string}', async function (username: string) {
  await pageFixture.page.locator('#user-name').fill(username);
});

Given('User enters password as {string}', async function (password: string) {
  await pageFixture.page.locator('#password').fill(password);
});

When('User clicks on the login button', async function () {
  await pageFixture.page.locator('#login-button').click();
});
```

### Hooks Example

```typescript
// src/hooks/hooks.ts
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

## 🧪 Running Tests

### Run all tests

After test execution, reports are generated in the `test-results/` directory:
- Cucumber HTML Report: `test-results/cucumber-report.html`
- Playwright Trace: Available for failed tests

## 📊 Test Reports

After test execution, reports are generated in the `test-results/` directory:
- Cucumber HTML Report: `test-results/cucumber-report.html`
- Cucumber JSON Report: `test-results/cucumber-report.json`
- Screenshots (on failure): `test-results/screenshots/`
- Playwright Trace: Available for failed tests

To view the HTML report:
```bash
open test-results/cucumber-report.html
# or on Windows
start test-results/cucumber-report.html
```

Adding Building Docker image

## 🚧 Coming Soon

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Contributions and suggestions are welcome!

## 🤝 Contributing

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - [GitHub Profile](https://github.com/IZ-KS)

## 🙏 Acknowledgments

- [Playwright Documentation](https://playwright.dev/)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📞 Contact

For questions or issues, please open an issue on GitHub
# Playwright + Cucumber + Docker Test Automation Framework

## 📋 Description

This project is an end-to-end test automation framework built with Playwright and Cucumber, containerized with Docker for learning purposes. It follows BDD practices with Gherkin syntax for maintainable and scalable test automation.

## 🚀 Features

- **Playwright**: Fast and reliable end-to-end testing (v1.56.1)
- **Cucumber BDD**: Behavior-Driven Development with Gherkin syntax
- **TypeScript**: Type-safe test automation
- **Docker**: Containerized test execution and CI/CD pipeline
- **GitHub Actions**: Automated testing on every push
- **Docker Hub Integration**: Automated image builds and deployments

## 📦 Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Docker**: For containerized execution (optional for local development)
- **Docker Hub Account**: For pushing images (optional)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/IZ-KS/playwright-cucumber-docker.git
cd playwright-cucumber-docker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers (for local development)

```bash
npx playwright install
```

## 📁 Project Structure

```
playwright-cucumber-docker/
├── .github/
│   └── workflows/
│       └── docker.yml           # GitHub Actions workflow
├── .vscode/                     # VS Code settings
├── src/
│   ├── hooks/                   # Cucumber hooks
│   │   ├── hooks.ts            # Before/After hooks
│   │   └── pageFixtures.ts     # Page fixture setup
│   └── test/
│       ├── features/            # Gherkin feature files
│       │   ├── addToCart.feature
│       │   ├── checkout.feature
│       │   └── login.feature
│       └── steps/               # Step definitions
│           ├── addToCart.ts
│           ├── checkoutSteps.ts
│           └── loginSteps.ts
├── test-results/                # Test execution reports
├── .dockerignore
├── .gitignore
├── cucumber.json                # Cucumber configuration
├── Dockerfile                   # Docker configuration
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## ⚙️ Configuration

### Cucumber Configuration

The `cucumber.json` file is configured for:
- TypeScript support with `ts-node`
- JSON and HTML report generation
- Parallel execution control
- Custom timeout settings

```json
{
  "default": {
    "require": ["src/test/steps/**/*.ts", "src/hooks/**/*.ts"],
    "requireModule": ["ts-node/register"],
    "format": [
      "progress",
      "json:test-results/cucumber-report.json"
    ],
    "parallel": 1,
    "timeout": 30000,
    "publishQuiet": true
  }
}
```

## 🧪 Running Tests

### Run all tests locally

```bash
npm test
```

### Run specific feature file

```bash
npx cucumber-js src/test/features/login.feature
```

### Run specific scenario by line number

```bash
npx cucumber-js src/test/features/login.feature:10
```

## 🐳 Docker Setup

### Build Docker image locally

```bash
docker build -t playwright-cucumber-tests .
```

### Run tests in Docker

```bash
docker run --rm -v $(pwd)/test-results:/app/test-results playwright-cucumber-tests
```

### Pull from Docker Hub

```bash
docker pull izks/playwright-cucumber-docker:latest
docker run --rm -v $(pwd)/test-results:/app/test-results izks/playwright-cucumber-docker:latest
```

## 🔄 CI/CD with GitHub Actions

This project uses GitHub Actions for continuous integration and Docker Hub for image registry.

### Workflow Features:
- ✅ Automated testing on every push to `main` or `master`
- ✅ Builds Docker image with latest Playwright version
- ✅ Pushes image to Docker Hub (`izks/playwright-cucumber-docker`)
- ✅ Runs Cucumber tests inside Docker container
- ✅ Uploads test results as artifacts

### Viewing Test Results

After each workflow run:
1. Go to the **Actions** tab in your GitHub repository
2. Click on the workflow run
3. Download the **cucumber-test-results** artifact to view reports locally

### Docker Hub

Images are automatically pushed to: [`izks/playwright-cucumber-docker`](https://hub.docker.com/r/izks/playwright-cucumber-docker)

Available tags:
- `latest` - Latest successful build
- `<commit-sha>` - Specific commit builds

## 📝 Writing Tests

### Feature File Example

```gherkin
Feature: Shopping Cart Functionality

    Background:
        Given User can access the application
        And User is logged in as "standard_user"

    Scenario: Add single item to cart
        When User adds "Sauce Labs Backpack" to the cart
        Then The cart icon should show 1 item

    Scenario: Add multiple items to cart
        When User adds "Sauce Labs Backpack" to the cart
        And User adds "Sauce Labs Bike Light" to the cart
        Then The cart icon should show 2 items
```

### Step Definition Example

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixtures';

Given('User is logged in as {string}', async function (username: string) {
    await pageFixture.page.locator('#user-name').fill(username);
    await pageFixture.page.locator('#password').fill('secret_sauce');
    await pageFixture.page.locator('#login-button').click();
    await pageFixture.page.waitForURL('**/inventory.html', { timeout: 10000 });
    await pageFixture.page.waitForLoadState('networkidle');
});

When('User adds {string} to the cart', async function (productName: string) {
    const productId = productName.toLowerCase().replace(/\s+/g, '-');
    await pageFixture.page.waitForSelector(`#add-to-cart-${productId}`, { 
        state: 'visible',
        timeout: 10000 
    });
    await pageFixture.page.locator(`#add-to-cart-${productId}`).click();
});

Then('The cart icon should show {int} item', async function (count: number) {
    if (count === 0) {
        await expect(pageFixture.page.locator('.shopping_cart_badge')).not.toBeVisible();
    } else {
        await pageFixture.page.waitForSelector('.shopping_cart_badge', { timeout: 5000 });
        const cartBadge = await pageFixture.page.locator('.shopping_cart_badge').textContent();
        expect(Number(cartBadge)).toBe(count);
    }
});
```

## 📊 Test Reports

After test execution, reports are generated in the `test-results/` directory:
- **Cucumber JSON Report**: `test-results/cucumber-report.json`
- **Screenshots** (on failure): `test-results/screenshots/`

To view reports locally:
```bash
# Windows
start test-results/cucumber-report.json

# Mac/Linux
open test-results/cucumber-report.json
```

## 🚧 Coming Soon

The following features are planned for future releases:

- [ ] **Advanced HTML Reporting** - Integration with Multiple Cucumber HTML Reporter or Allure
- [ ] **Page Object Model** - Implement POM design pattern for better code organization
- [ ] **Cross-browser Testing** - Parallel execution across Chrome, Firefox, and Safari
- [ ] **API Testing** - Add API test automation capabilities
- [ ] **Visual Regression Testing** - Automated screenshot comparison
- [ ] **Test Data Management** - External data files and fixtures

Contributions and suggestions are welcome!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Isaac Lim - [GitHub Profile](https://github.com/IZ-KS)

## 🙏 Acknowledgments

- [Playwright Documentation](https://playwright.dev/)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Docker Documentation](https://docs.docker.com/)

## 📞 Contact

For questions or issues, please open an issue on GitHub at:
https://github.com/IZ-KS/playwright-cucumber-docker/issues

---

⭐ If you find this project helpful, please give it a star!

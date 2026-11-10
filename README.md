#  Playwright & TypeScript E2E & API Test Automation Suite

An end-to-end and API automated testing framework for the **OrangeHRM** application, built using **Playwright**, **TypeScript**, and the **Page Object Model (POM)** design pattern. Features CI/CD integration with **GitHub Actions** and automated test artifact reporting.

---

## 🛠️ Tech Stack

* **Framework:** [Playwright]
* **Language:** [TypeScript]
* **Design Pattern:** Page Object Model (POM)
* **CI/CD:** GitHub Actions
* **Reporting:** Playwright HTML Reporter & Screenshot/Trace Artifacts

---

##  Project Structure

```text
playwright-orangehrm-tests/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD pipelines
├── pages/                  # Page Object Models (UI locators and page actions)
├── test-data/              # Test datasets and static payload files
├── tests/
│   ├── APIs/               # API test specifications & auth setups
│   │   ├── .auth.setup.ts  # Global authentication setup
│   │   ├── auth-url.spec.ts
│   │   ├── authentication.ts
│   │   ├── employee-api.spec.ts
│   │   └── oauth-server.ts
│   └── UI/                 # UI end-to-end test specifications
│       ├── add-employy.spec.ts
│       ├── add-leave-entitlements.spec.ts
│       ├── login.spec.ts
│       ├── logout.spec.ts
│       └── search.spec.ts
├── playwright.config.ts    # Global Playwright configuration
├── package.json            # Dependencies and test execution scripts
└── .gitignore

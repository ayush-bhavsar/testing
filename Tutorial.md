# 🎭 Complete Playwright Testing Tutorial: From Basics to Advanced

> **Learn Playwright automation testing step-by-step using the included practice web page**

---

## 📚 Table of Contents

1. [Introduction to Playwright](#introduction-to-playwright)
2. [Environment Setup](#environment-setup)
3. [Level 1: Basics - Your First Test](#level-1-basics---your-first-test)
4. [Level 2: Locators and Selectors](#level-2-locators-and-selectors)
5. [Level 3: Form Interactions](#level-3-form-interactions)
6. [Level 4: Assertions and Validations](#level-4-assertions-and-validations)
7. [Level 5: Handling Dynamic Content](#level-5-handling-dynamic-content)
8. [Level 6: Advanced Interactions](#level-6-advanced-interactions)
9. [Level 7: Page Object Model](#level-7-page-object-model)
10. [Level 8: Best Practices & Tips](#level-8-best-practices--tips)
11. [Practice Exercises](#practice-exercises)
12. [Troubleshooting Guide](#troubleshooting-guide)

---

## Introduction to Playwright

### What is Playwright?

Playwright is a modern, open-source automation framework developed by Microsoft that allows you to:
- Automate Chromium, Firefox, and WebKit browsers
- Write tests in JavaScript/TypeScript, Python, .NET, and Java
- Run tests in headless or headed mode
- Test across multiple platforms (Windows, macOS, Linux)
- Capture screenshots and videos
- Intercept network requests
- Test mobile viewports

### Why Use This Practice Page?

This repository contains a **specially designed practice web page** (`index.html`) with:
- ✅ All common web elements (forms, buttons, modals, tables)
- ✅ Dynamic content and async operations
- ✅ Data-testid attributes for reliable testing
- ✅ Realistic scenarios (login, registration, CRUD operations)
- ✅ No external dependencies - works offline!

---

## Environment Setup

### Step 1: Install Node.js

Download and install Node.js from [nodejs.org](https://nodejs.org/) (LTS version recommended).

Verify installation:
```bash
node --version
npm --version
```

### Step 2: Create a Test Project

```bash
# Create a new directory for your tests
mkdir playwright-practice
cd playwright-practice

# Initialize npm project
npm init -y
```

### Step 3: Install Playwright

```bash
# Install Playwright with browsers
npm init playwright@latest

# Or manually install
npm install -D @playwright/test
npx playwright install
```

### Step 4: Project Structure

```
playwright-practice/
├── tests/
│   ├── example.spec.js
│   └── login.spec.js
├── pages/
│   └── loginPage.js
├── playwright.config.js
├── package.json
└── index.html (copy from this repo)
```

### Step 5: Configure Playwright

Update `playwright.config.js`:

```javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'file://' + process.cwd() + '/index.html',
    headless: false, // Set to true for CI/CD
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
```

---

## Level 1: Basics - Your First Test

### Understanding Test Structure

Every Playwright test follows this structure:

```javascript
import { test, expect } from '@playwright/test';

test('test description', async ({ page }) => {
  // 1. Navigate to page
  // 2. Interact with elements
  // 3. Make assertions
});
```

### Your First Test: Opening the Page

Create `tests/first-test.spec.js`:

```javascript
import { test, expect } from '@playwright/test';

test('should open the practice page', async ({ page }) => {
  // Navigate to the page
  await page.goto('./index.html');
  
  // Verify page title is visible
  const title = page.locator('[data-testid="page-title"]');
  await expect(title).toBeVisible();
  await expect(title).toContainText('Playwright Automation Testing Practice Page');
  
  console.log('✅ First test passed!');
});
```

### Running Your First Test

```bash
# Run all tests
npx playwright test

# Run in headed mode (see the browser)
npx playwright test --headed

# Run specific test file
npx playwright test tests/first-test.spec.js

# Run with UI mode (recommended for learning)
npx playwright test --ui
```

### 🎯 Exercise 1.1: Verify Navigation Links

**Task**: Write a test to verify all navigation links are present.

<details>
<summary>Click to see solution</summary>

```javascript
test('should have all navigation links', async ({ page }) => {
  await page.goto('./index.html');
  
  await expect(page.locator('[data-testid="home-link"]')).toBeVisible();
  await expect(page.locator('[data-testid="about-link"]')).toBeVisible();
  await expect(page.locator('[data-testid="contact-link"]')).toBeVisible();
  await expect(page.locator('[data-testid="external-link"]')).toBeVisible();
});
```
</details>

---

## Level 2: Locators and Selectors

### Understanding Locators

Playwright provides multiple ways to locate elements:

#### 1. **Data-TestID (Recommended)**
```javascript
page.locator('[data-testid="username-input"]')
```
✅ **Best Practice**: Most stable, doesn't change with UI updates

#### 2. **ID Selector**
```javascript
page.locator('#username')
```
✅ Fast and specific, but may change

#### 3. **CSS Selector**
```javascript
page.locator('.btn-primary')
page.locator('button.btn.btn-primary')
```
⚠️ Can be fragile if styling changes

#### 4. **Text Selector**
```javascript
page.locator('text=Login')
page.getByText('Login')
```
✅ Good for buttons and links

#### 5. **Role-Based Selectors**
```javascript
page.getByRole('button', { name: 'Login' })
page.getByRole('textbox', { name: 'Username' })
```
✅ Excellent for accessibility

### Locator Cheat Sheet for Our Practice Page

| Element Type | Data-TestID | Alternative |
|--------------|-------------|-------------|
| Login Username | `[data-testid="username-input"]` | `#username` |
| Login Password | `[data-testid="password-input"]` | `#password` |
| Login Button | `[data-testid="login-submit-btn"]` | `#login-btn` |
| Modal | `[data-testid="modal"]` | `#modal` |
| Table Row 1 | `[data-testid="user-row-1"]` | `tr[data-user-id="1"]` |

### 🎯 Exercise 2.1: Practice Different Selectors

**Task**: Locate the same element using 3 different methods.

<details>
<summary>Click to see solution</summary>

```javascript
test('locate login button using different methods', async ({ page }) => {
  await page.goto('./index.html');
  
  // Method 1: Data-testid (recommended)
  const btn1 = page.locator('[data-testid="login-submit-btn"]');
  await expect(btn1).toBeVisible();
  
  // Method 2: ID selector
  const btn2 = page.locator('#login-btn');
  await expect(btn2).toBeVisible();
  
  // Method 3: Text selector
  const btn3 = page.getByRole('button', { name: 'Login' });
  await expect(btn3).toBeVisible();
  
  // All three should point to the same element
  expect(await btn1.textContent()).toBe(await btn2.textContent());
});
```
</details>

---

## Level 3: Form Interactions

### Basic Form Actions

#### Filling Text Inputs

```javascript
// Fill username
await page.fill('[data-testid="username-input"]', 'admin');

// Alternative using type (simulates typing)
await page.type('[data-testid="username-input"]', 'admin');
```

#### Clicking Buttons

```javascript
await page.click('[data-testid="login-submit-btn"]');
```

#### Selecting from Dropdown

```javascript
// Select by value
await page.selectOption('[data-testid="country-select"]', 'us');

// Select by label
await page.selectOption('[data-testid="country-select"]', { label: 'United States' });
```

#### Handling Checkboxes

```javascript
// Check a checkbox
await page.check('[data-testid="skill-javascript-checkbox"]');

// Uncheck
await page.uncheck('[data-testid="skill-javascript-checkbox"]');

// Toggle
if (await page.isChecked('[data-testid="skill-javascript-checkbox"]')) {
  await page.uncheck('[data-testid="skill-javascript-checkbox"]');
}
```

#### Handling Radio Buttons

```javascript
await page.check('[data-testid="gender-male-radio"]');
```

### Complete Login Test Example

```javascript
test('successful login flow', async ({ page }) => {
  await page.goto('./index.html');
  
  // Fill in credentials
  await page.fill('[data-testid="username-input"]', 'admin');
  await page.fill('[data-testid="password-input"]', 'password123');
  
  // Submit form
  await page.click('[data-testid="login-submit-btn"]');
  
  // Wait for success message
  await page.waitForSelector('[data-testid="login-message"]');
  
  // Verify success
  const message = page.locator('[data-testid="login-message"]');
  await expect(message).toHaveClass(/success/);
  await expect(message).toContainText('Login successful');
});
```

### 🎯 Exercise 3.1: Complete Registration Form

**Task**: Fill out the entire registration form with valid data.

<details>
<summary>Click to see solution</summary>

```javascript
test('complete registration form', async ({ page }) => {
  await page.goto('./index.html');
  
  // Fill personal information
  await page.fill('[data-testid="fullname-input"]', 'John Doe');
  await page.fill('[data-testid="email-input"]', 'john.doe@example.com');
  await page.fill('[data-testid="reg-password-input"]', 'SecurePass123!');
  
  // Select gender
  await page.check('[data-testid="gender-male-radio"]');
  
  // Select multiple skills
  await page.check('[data-testid="skill-javascript-checkbox"]');
  await page.check('[data-testid="skill-python-checkbox"]');
  await page.check('[data-testid="skill-java-checkbox"]');
  
  // Select country
  await page.selectOption('[data-testid="country-select"]', 'us');
  
  // Submit form
  await page.click('[data-testid="register-submit-btn"]');
  
  // Verify result is displayed
  await expect(page.locator('[data-testid="registration-result"]')).toBeVisible();
  await expect(page.locator('[data-testid="registration-result"]')).toContainText('Registration Successful');
});
```
</details>

### 🎯 Exercise 3.2: Test Failed Login

**Task**: Test login with invalid credentials and verify error message.

<details>
<summary>Click to see solution</summary>

```javascript
test('failed login with invalid credentials', async ({ page }) => {
  await page.goto('./index.html');
  
  await page.fill('[data-testid="username-input"]', 'wronguser');
  await page.fill('[data-testid="password-input"]', 'wrongpass');
  await page.click('[data-testid="login-submit-btn"]');
  
  const message = page.locator('[data-testid="login-message"]');
  await expect(message).toBeVisible();
  await expect(message).toHaveClass(/error/);
  await expect(message).toContainText('Invalid username or password');
});
```
</details>

---

## Level 4: Assertions and Validations

### Common Assertions

#### Visibility Assertions

```javascript
// Element is visible
await expect(page.locator('[data-testid="modal"]')).toBeVisible();

// Element is hidden
await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
await expect(page.locator('[data-testid="modal"]')).toBeHidden();
```

#### Text Assertions

```javascript
// Exact text match
await expect(page.locator('[data-testid="page-title"]'))
  .toHaveText('Playwright Automation Testing Practice Page');

// Contains text
await expect(page.locator('[data-testid="login-message"]'))
  .toContainText('successful');

// Text content
const text = await page.locator('[data-testid="page-title"]').textContent();
expect(text).toBe('Playwright Automation Testing Practice Page');
```

#### Count Assertions

```javascript
// Count elements
await expect(page.locator('[data-testid="users-table-body"] tr')).toHaveCount(3);

// Get count
const rowCount = await page.locator('[data-testid="users-table-body"] tr').count();
expect(rowCount).toBeGreaterThan(0);
```

#### Attribute Assertions

```javascript
// Has attribute
await expect(page.locator('[data-testid="external-link"]'))
  .toHaveAttribute('target', '_blank');

// Has class
await expect(page.locator('[data-testid="login-submit-btn"]'))
  .toHaveClass(/btn-primary/);
```

#### State Assertions

```javascript
// Enabled/Disabled
await expect(page.locator('[data-testid="login-submit-btn"]')).toBeEnabled();
await expect(page.locator('[data-testid="login-submit-btn"]')).not.toBeDisabled();

// Checked
await expect(page.locator('[data-testid="skill-javascript-checkbox"]')).toBeChecked();
```

### 🎯 Exercise 4.1: Comprehensive Validation Test

**Task**: Create a test that validates multiple aspects of the page.

<details>
<summary>Click to see solution</summary>

```javascript
test('comprehensive page validation', async ({ page }) => {
  await page.goto('./index.html');
  
  // Verify page structure
  await expect(page.locator('[data-testid="page-title"]')).toBeVisible();
  await expect(page.locator('[data-testid="main-navigation"]')).toBeVisible();
  
  // Verify form elements are present
  await expect(page.locator('[data-testid="login-form"]')).toBeVisible();
  await expect(page.locator('[data-testid="registration-form"]')).toBeVisible();
  
  // Verify table has initial data
  await expect(page.locator('[data-testid="users-table-body"] tr')).toHaveCount(3);
  
  // Verify buttons are enabled
  await expect(page.locator('[data-testid="login-submit-btn"]')).toBeEnabled();
  await expect(page.locator('[data-testid="show-modal-btn"]')).toBeEnabled();
  
  // Verify external link has correct attribute
  await expect(page.locator('[data-testid="external-link"]'))
    .toHaveAttribute('target', '_blank');
});
```
</details>

---

## Level 5: Handling Dynamic Content

### Working with Waits

#### Automatic Waiting (Built-in)

Playwright automatically waits for elements to be:
- Attached to DOM
- Visible
- Stable (not animating)
- Enabled
- Editable (for input fields)

```javascript
// Playwright waits automatically
await page.click('[data-testid="login-submit-btn"]');
```

#### Explicit Waits

```javascript
// Wait for selector
await page.waitForSelector('[data-testid="login-message"]');

// Wait for specific state
await page.waitForSelector('[data-testid="modal"]', { state: 'visible' });
await page.waitForSelector('[data-testid="loading-spinner"]', { state: 'hidden' });

// Wait for timeout
await page.waitForTimeout(3000); // Not recommended unless necessary
```

#### Wait for Load State

```javascript
// Wait for page to be fully loaded
await page.waitForLoadState('load');
await page.waitForLoadState('domcontentloaded');
await page.waitForLoadState('networkidle');
```

### Testing Delayed Content

Our practice page has a button that shows content after 3 seconds:

```javascript
test('delayed content appears after wait', async ({ page }) => {
  await page.goto('./index.html');
  
  // Click button to trigger delayed content
  await page.click('[data-testid="delayed-content-btn"]');
  
  // Immediately verify element is not visible
  await expect(page.locator('[data-testid="hidden-element"]')).not.toBeVisible();
  
  // Wait for element to appear (with timeout)
  await expect(page.locator('[data-testid="hidden-element"]'))
    .toBeVisible({ timeout: 5000 });
  
  // Verify content
  await expect(page.locator('[data-testid="hidden-element"]'))
    .toContainText('This element appeared after a delay');
});
```

### Testing Dynamic Data Loading

```javascript
test('load dynamic data successfully', async ({ page }) => {
  await page.goto('./index.html');
  
  // Initially, dynamic content should not be visible
  await expect(page.locator('[data-testid="dynamic-content"]')).not.toBeVisible();
  
  // Click load data button
  await page.click('[data-testid="load-data-btn"]');
  
  // Wait for loading to complete
  await page.waitForSelector('[data-testid="dynamic-content"]', { state: 'visible' });
  
  // Verify data items are loaded
  await expect(page.locator('[data-testid^="data-item-"]')).toHaveCount(5);
  
  // Verify data grid is present
  await expect(page.locator('[data-testid="data-grid"]')).toBeVisible();
});
```

### 🎯 Exercise 5.1: Test Loading Spinner

**Task**: Verify that the loading spinner appears and disappears during login.

<details>
<summary>Click to see solution</summary>

```javascript
test('loading spinner appears during login', async ({ page }) => {
  await page.goto('./index.html');
  
  // Fill credentials
  await page.fill('[data-testid="username-input"]', 'admin');
  await page.fill('[data-testid="password-input"]', 'password123');
  
  // Start login (don't await yet)
  const clickPromise = page.click('[data-testid="login-submit-btn"]');
  
  // Verify loading spinner appears
  await expect(page.locator('[data-testid="loading-spinner"]')).toBeVisible();
  
  // Wait for click to complete
  await clickPromise;
  
  // Verify loading spinner disappears
  await expect(page.locator('[data-testid="loading-spinner"]')).not.toBeVisible();
  
  // Verify login success
  await expect(page.locator('[data-testid="login-message"]')).toBeVisible();
});
```
</details>

---

## Level 6: Advanced Interactions

### Working with Modals

```javascript
test('complete modal interaction', async ({ page }) => {
  await page.goto('./index.html');
  
  // Initially modal should not be visible
  await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
  
  // Open modal
  await page.click('[data-testid="show-modal-btn"]');
  await expect(page.locator('[data-testid="modal"]')).toBeVisible();
  
  // Interact with modal
  await page.fill('[data-testid="modal-input"]', 'Test data');
  
  // Click OK button
  await page.click('[data-testid="modal-ok-btn"]');
  
  // Handle alert dialog
  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Test data');
    await dialog.accept();
  });
  
  // Modal should close
  await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
});
```

### Working with Tables

#### Reading Table Data

```javascript
test('read table data', async ({ page }) => {
  await page.goto('./index.html');
  
  // Get all rows
  const rows = page.locator('[data-testid="users-table-body"] tr');
  const rowCount = await rows.count();
  
  console.log(`Found ${rowCount} users`);
  
  // Read specific row data
  const firstRow = rows.nth(0);
  const name = await firstRow.locator('td').nth(1).textContent();
  const email = await firstRow.locator('td').nth(2).textContent();
  const role = await firstRow.locator('td').nth(3).textContent();
  
  console.log(`User: ${name}, Email: ${email}, Role: ${role}`);
  
  expect(name).toBe('John Doe');
});
```

#### Adding Table Rows

```javascript
test('add new user to table', async ({ page }) => {
  await page.goto('./index.html');
  
  // Get initial count
  const initialCount = await page.locator('[data-testid="users-table-body"] tr').count();
  
  // Click add user button
  await page.click('[data-testid="add-user-btn"]');
  
  // Verify new row added
  await expect(page.locator('[data-testid="users-table-body"] tr'))
    .toHaveCount(initialCount + 1);
});
```

#### Deleting Table Rows

```javascript
test('delete user from table', async ({ page }) => {
  await page.goto('./index.html');
  
  // Get initial count
  const initialCount = await page.locator('[data-testid="users-table-body"] tr').count();
  
  // Set up dialog handler for confirmation
  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    await dialog.accept();
  });
  
  // Click delete button for first user
  await page.click('[data-testid="delete-user-1"]');
  
  // Wait a bit for animation
  await page.waitForTimeout(1000);
  
  // Verify row was deleted
  await expect(page.locator('[data-testid="users-table-body"] tr'))
    .toHaveCount(initialCount - 1);
});
```

### File Upload Testing

```javascript
test('upload file successfully', async ({ page }) => {
  await page.goto('./index.html');
  
  // Prepare file upload
  const fileInput = page.locator('[data-testid="profile-picture-input"]');
  
  // Upload a file
  await fileInput.setInputFiles({
    name: 'profile.jpg',
    mimeType: 'image/jpeg',
    buffer: Buffer.from('fake-image-content')
  });
  
  // Verify file preview appears
  await expect(page.locator('[data-testid="file-preview-container"]')).toBeVisible();
  await expect(page.locator('[data-testid="file-preview-name"]'))
    .toContainText('profile.jpg');
});
```

### Handling Multiple Tabs

```javascript
test('external link opens in new tab', async ({ page, context }) => {
  await page.goto('./index.html');
  
  // Listen for new page
  const pagePromise = context.waitForEvent('page');
  
  // Click external link
  await page.click('[data-testid="external-link"]');
  
  // Get the new page
  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  
  // Verify new page URL
  expect(newPage.url()).toBe('https://example.com/');
  
  // Close new tab
  await newPage.close();
});
```

### 🎯 Exercise 6.1: Complete CRUD Operations

**Task**: Create a test that performs Create, Read, Update, and Delete operations on the table.

<details>
<summary>Click to see solution</summary>

```javascript
test('complete CRUD operations on users table', async ({ page }) => {
  await page.goto('./index.html');
  
  // READ: Verify initial data
  const initialCount = await page.locator('[data-testid="users-table-body"] tr').count();
  expect(initialCount).toBe(3);
  
  // CREATE: Add new user
  await page.click('[data-testid="add-user-btn"]');
  await expect(page.locator('[data-testid="users-table-body"] tr'))
    .toHaveCount(initialCount + 1);
  
  // READ: Verify new user appears
  const rows = page.locator('[data-testid="users-table-body"] tr');
  const lastRow = rows.nth(initialCount);
  await expect(lastRow).toBeVisible();
  
  // DELETE: Remove the first user
  page.on('dialog', dialog => dialog.accept());
  await page.click('[data-testid="delete-user-1"]');
  await page.waitForTimeout(1000);
  
  // VERIFY: Count should be back to original
  await expect(page.locator('[data-testid="users-table-body"] tr'))
    .toHaveCount(initialCount);
});
```
</details>

---

## Level 7: Page Object Model

### What is Page Object Model (POM)?

Page Object Model is a design pattern that:
- Creates object-oriented classes for each page
- Encapsulates page elements and actions
- Improves test maintainability
- Reduces code duplication

### Creating Page Objects

#### LoginPage Class

Create `pages/LoginPage.js`:

```javascript
export class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-submit-btn"]');
    this.loginMessage = page.locator('[data-testid="login-message"]');
  }
  
  async goto() {
    await this.page.goto('./index.html');
  }
  
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  
  async getLoginMessage() {
    await this.loginMessage.waitFor();
    return await this.loginMessage.textContent();
  }
  
  async isLoginSuccessful() {
    await this.loginMessage.waitFor();
    const classList = await this.loginMessage.getAttribute('class');
    return classList.includes('success');
  }
}
```

#### Using the Page Object

```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login using page object', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login('admin', 'password123');
  
  expect(await loginPage.isLoginSuccessful()).toBe(true);
  expect(await loginPage.getLoginMessage()).toContain('Login successful');
});
```

### Complete Page Object Example

#### RegistrationPage Class

Create `pages/RegistrationPage.js`:

```javascript
export class RegistrationPage {
  constructor(page) {
    this.page = page;
    
    this.fullNameInput = page.locator('[data-testid="fullname-input"]');
    this.emailInput = page.locator('[data-testid="email-input"]');
    this.passwordInput = page.locator('[data-testid="reg-password-input"]');
    this.countrySelect = page.locator('[data-testid="country-select"]');
    this.registerButton = page.locator('[data-testid="register-submit-btn"]');
    this.registrationResult = page.locator('[data-testid="registration-result"]');
  }
  
  async goto() {
    await this.page.goto('./index.html');
  }
  
  async fillPersonalInfo(fullName, email, password) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }
  
  async selectGender(gender) {
    await this.page.check(`[data-testid="gender-${gender}-radio"]`);
  }
  
  async selectSkills(skills) {
    for (const skill of skills) {
      await this.page.check(`[data-testid="skill-${skill}-checkbox"]`);
    }
  }
  
  async selectCountry(countryCode) {
    await this.countrySelect.selectOption(countryCode);
  }
  
  async submitForm() {
    await this.registerButton.click();
  }
  
  async register(userData) {
    await this.fillPersonalInfo(userData.fullName, userData.email, userData.password);
    await this.selectGender(userData.gender);
    await this.selectSkills(userData.skills);
    await this.selectCountry(userData.country);
    await this.submitForm();
  }
  
  async isRegistrationSuccessful() {
    await this.registrationResult.waitFor();
    const text = await this.registrationResult.textContent();
    return text.includes('Registration Successful');
  }
}
```

#### Using RegistrationPage

```javascript
import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';

test('complete registration using page object', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  
  await registrationPage.goto();
  
  const userData = {
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    password: 'SecurePass123!',
    gender: 'female',
    skills: ['javascript', 'python'],
    country: 'us'
  };
  
  await registrationPage.register(userData);
  
  expect(await registrationPage.isRegistrationSuccessful()).toBe(true);
});
```

### 🎯 Exercise 7.1: Create TablePage Object

**Task**: Create a page object for table operations (add, delete, read).

<details>
<summary>Click to see solution</summary>

```javascript
// pages/TablePage.js
export class TablePage {
  constructor(page) {
    this.page = page;
    
    this.addUserButton = page.locator('[data-testid="add-user-btn"]');
    this.tableBody = page.locator('[data-testid="users-table-body"]');
    this.tableRows = page.locator('[data-testid="users-table-body"] tr');
  }
  
  async goto() {
    await this.page.goto('./index.html');
  }
  
  async addUser() {
    await this.addUserButton.click();
  }
  
  async getUserCount() {
    return await this.tableRows.count();
  }
  
  async deleteUser(userId) {
    this.page.on('dialog', dialog => dialog.accept());
    await this.page.click(`[data-testid="delete-user-${userId}"]`);
    await this.page.waitForTimeout(1000);
  }
  
  async getUserData(rowIndex) {
    const row = this.tableRows.nth(rowIndex);
    const cells = row.locator('td');
    
    return {
      id: await cells.nth(0).textContent(),
      name: await cells.nth(1).textContent(),
      email: await cells.nth(2).textContent(),
      role: await cells.nth(3).textContent()
    };
  }
  
  async getAllUsers() {
    const count = await this.getUserCount();
    const users = [];
    
    for (let i = 0; i < count; i++) {
      users.push(await this.getUserData(i));
    }
    
    return users;
  }
}

// Usage in test
import { TablePage } from '../pages/TablePage';

test('table operations with page object', async ({ page }) => {
  const tablePage = new TablePage(page);
  
  await tablePage.goto();
  
  const initialCount = await tablePage.getUserCount();
  await tablePage.addUser();
  expect(await tablePage.getUserCount()).toBe(initialCount + 1);
  
  const firstUser = await tablePage.getUserData(0);
  expect(firstUser.name).toBe('John Doe');
});
```
</details>

---

## Level 8: Best Practices & Tips

### 1. **Use Data-TestID Selectors**

✅ **Good:**
```javascript
page.locator('[data-testid="login-submit-btn"]')
```

❌ **Avoid:**
```javascript
page.locator('body > div > section:nth-child(2) > form > button')
```

### 2. **Write Independent Tests**

Each test should be able to run independently:

```javascript
test.beforeEach(async ({ page }) => {
  await page.goto('./index.html');
});

test('test 1', async ({ page }) => {
  // This test doesn't depend on test 2
});

test('test 2', async ({ page }) => {
  // This test doesn't depend on test 1
});
```

### 3. **Use Proper Waits**

✅ **Good:**
```javascript
await expect(page.locator('[data-testid="modal"]')).toBeVisible();
```

❌ **Avoid:**
```javascript
await page.waitForTimeout(3000); // Brittle and slow
```

### 4. **Group Related Tests**

```javascript
test.describe('Login Tests', () => {
  test('successful login', async ({ page }) => {
    // Test code
  });
  
  test('failed login', async ({ page }) => {
    // Test code
  });
});

test.describe('Registration Tests', () => {
  test('successful registration', async ({ page }) => {
    // Test code
  });
});
```

### 5. **Use Fixtures for Common Setup**

```javascript
// fixtures.js
import { test as base } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  }
});

// In test file
test('login test', async ({ loginPage }) => {
  await loginPage.login('admin', 'password123');
  // ...
});
```

### 6. **Take Screenshots on Failure**

Configure in `playwright.config.js`:

```javascript
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry',
}
```

### 7. **Use Soft Assertions for Multiple Checks**

```javascript
test('multiple validations', async ({ page }) => {
  await page.goto('./index.html');
  
  await expect.soft(page.locator('[data-testid="page-title"]')).toBeVisible();
  await expect.soft(page.locator('[data-testid="main-navigation"]')).toBeVisible();
  await expect.soft(page.locator('[data-testid="login-form"]')).toBeVisible();
  
  // Test continues even if some assertions fail
});
```

### 8. **Organize Tests by Feature**

```
tests/
├── auth/
│   ├── login.spec.js
│   └── registration.spec.js
├── table/
│   ├── add-user.spec.js
│   └── delete-user.spec.js
└── modal/
    └── modal-interactions.spec.js
```

### 9. **Use Test Data Factories**

```javascript
// testData.js
export class UserFactory {
  static createValidUser() {
    return {
      fullName: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'SecurePass123!',
      gender: 'male',
      skills: ['javascript', 'python'],
      country: 'us'
    };
  }
  
  static createInvalidUser() {
    return {
      fullName: '',
      email: 'invalid-email',
      password: '123',
      gender: '',
      skills: [],
      country: ''
    };
  }
}

// In test
import { UserFactory } from './testData';

test('register valid user', async ({ page, registrationPage }) => {
  const user = UserFactory.createValidUser();
  await registrationPage.register(user);
  // ...
});
```

### 10. **Use Tags for Test Organization**

```javascript
test.only('this test runs alone', async ({ page }) => {
  // Only this test runs
});

test.skip('skip this test', async ({ page }) => {
  // This test is skipped
});

test('normal test', async ({ page }) => {
  // Regular test
});
```

Run specific tests:
```bash
# Run only @smoke tagged tests
npx playwright test --grep @smoke

# Skip @slow tests
npx playwright test --grep-invert @slow
```

---

## Practice Exercises

### 🎯 Beginner Exercises

#### Exercise 1: Navigation Test Suite
Create a test suite that validates all navigation links work correctly.

#### Exercise 2: Form Validation
Test form validation by submitting empty forms and verifying error messages.

#### Exercise 3: Login Scenarios
Test multiple login scenarios:
- Valid credentials
- Invalid username
- Invalid password
- Empty fields

### 🎯 Intermediate Exercises

#### Exercise 4: Registration E2E Test
Create a complete end-to-end test that:
1. Fills registration form
2. Submits the form
3. Verifies success message
4. Checks that user appears in table

#### Exercise 5: Modal Workflow
Test complete modal workflow:
1. Open modal
2. Fill input
3. Click OK
4. Verify alert message
5. Close modal with Cancel
6. Close modal with X button

#### Exercise 6: Table Operations
Create tests for all table operations:
1. Add multiple users
2. Verify user count increases
3. Delete users
4. Verify user count decreases

### 🎯 Advanced Exercises

#### Exercise 7: Data-Driven Testing
Create data-driven tests that test multiple scenarios:

```javascript
const testCases = [
  { username: 'admin', password: 'password123', shouldSucceed: true },
  { username: 'testuser', password: 'test123', shouldSucceed: true },
  { username: 'invalid', password: 'wrong', shouldSucceed: false },
];

testCases.forEach(({ username, password, shouldSucceed }) => {
  test(`login with ${username}`, async ({ page }) => {
    // Test implementation
  });
});
```

#### Exercise 8: Complete Page Object Implementation
Create page objects for all pages and rewrite existing tests to use them.

#### Exercise 9: Custom Assertions
Create custom assertions for common validations:

```javascript
async function expectSuccessMessage(page, selector) {
  const element = page.locator(selector);
  await expect(element).toBeVisible();
  await expect(element).toHaveClass(/success/);
}
```

#### Exercise 10: Performance Testing
Measure and assert page load times:

```javascript
test('page loads within acceptable time', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('./index.html');
  const loadTime = Date.now() - startTime;
  
  expect(loadTime).toBeLessThan(2000); // Should load in under 2 seconds
});
```

---

## Troubleshooting Guide

### Common Issues and Solutions

#### Issue 1: "Timeout while waiting for element"

**Problem:**
```
TimeoutError: locator.click: Timeout 30000ms exceeded
```

**Solutions:**
1. Increase timeout: `{ timeout: 60000 }`
2. Check selector is correct
3. Ensure element is not hidden or disabled
4. Wait for page to load: `await page.waitForLoadState()`

#### Issue 2: "Element is not stable"

**Problem:**
```
Element is outside of the viewport or it is covered by another element
```

**Solutions:**
1. Scroll element into view: `await element.scrollIntoViewIfNeeded()`
2. Wait for animations: `await page.waitForTimeout(500)`
3. Use `force: true`: `await element.click({ force: true })`

#### Issue 3: "Dialog not handled"

**Problem:**
```
A dialog opened but was not handled
```

**Solution:**
```javascript
page.on('dialog', async dialog => {
  await dialog.accept();
});
```

#### Issue 4: Tests fail in headless mode but pass in headed mode

**Solutions:**
1. Add waits for animations
2. Increase timeouts
3. Use `await page.waitForLoadState('networkidle')`
4. Check for race conditions

#### Issue 5: File path issues

**Problem:**
```
Failed to load resource: net::ERR_FILE_NOT_FOUND
```

**Solution:**
Use absolute paths or configure baseURL:
```javascript
// playwright.config.js
use: {
  baseURL: 'file://' + process.cwd() + '/',
}

// In test
await page.goto('./index.html');
```

---

## Additional Resources

### Official Documentation
- 📚 [Playwright Documentation](https://playwright.dev/)
- 🎓 [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- 💡 [Best Practices](https://playwright.dev/docs/best-practices)

### Video Tutorials
- [Playwright Tutorial for Beginners](https://www.youtube.com/results?search_query=playwright+tutorial)
- [Advanced Playwright Techniques](https://www.youtube.com/results?search_query=playwright+advanced)

### Community
- [Playwright Discord](https://discord.com/invite/playwright)
- [Playwright GitHub](https://github.com/microsoft/playwright)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/playwright)

### Practice Sites (Additional)
- [Demo QA](https://demoqa.com/)
- [The Internet](https://the-internet.herokuapp.com/)
- [Sauce Demo](https://www.saucedemo.com/)

---

## Next Steps

### 1. **Complete All Exercises**
Work through beginner, intermediate, and advanced exercises.

### 2. **Build a Complete Test Suite**
Create a comprehensive test suite for the entire practice page.

### 3. **Learn CI/CD Integration**
Set up GitHub Actions or similar to run tests automatically.

Example GitHub Actions workflow:

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright
        run: npx playwright install --with-deps
      - name: Run tests
        run: npx playwright test
```

### 4. **Explore Advanced Topics**
- API testing with Playwright
- Visual regression testing
- Mobile browser testing
- Accessibility testing

### 5. **Contribute**
Share your learning journey, create tutorials, or contribute to open-source projects!

---

## 🎉 Congratulations!

You've completed the Playwright tutorial! You now have the knowledge to:
- ✅ Write basic to advanced Playwright tests
- ✅ Use proper selectors and locators
- ✅ Handle dynamic content and async operations
- ✅ Implement Page Object Model
- ✅ Follow best practices
- ✅ Debug and troubleshoot issues

**Keep practicing and happy testing! 🎭**

---

## Quick Reference Card

### Most Used Commands

```javascript
// Navigation
await page.goto(url)

// Interactions
await page.click(selector)
await page.fill(selector, text)
await page.check(selector)
await page.selectOption(selector, value)

// Assertions
await expect(locator).toBeVisible()
await expect(locator).toHaveText(text)
await expect(locator).toHaveCount(number)

// Waits
await page.waitForSelector(selector)
await page.waitForLoadState('networkidle')

// Getting data
await locator.textContent()
await locator.getAttribute(name)
await locator.count()
```

### Useful Shortcuts

```bash
# Run tests
npx playwright test

# Run in UI mode
npx playwright test --ui

# Run specific test
npx playwright test login.spec.js

# Debug mode
npx playwright test --debug

# Generate tests (Codegen)
npx playwright codegen
```

---

**Created with ❤️ for Playwright learners**

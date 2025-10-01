# Playwright Testing Practice Page

A comprehensive web page designed specifically for practicing Playwright automation testing skills. This page includes various interactive elements, forms, and dynamic content to help you master web automation testing.

## 🎯 Features

### 1. **Login Form**
- **Location**: Top section
- **Elements**: Username, password fields, submit button
- **Test Credentials**:
  - `admin` / `password123`
  - `testuser` / `test123`
- **IDs**: `#username`, `#password`, `#login-btn`, `#login-message`

### 2. **Registration Form**
- **Elements**: Name, email, password, gender (radio), skills (checkboxes), country (dropdown), file upload
- **Validation**: Required field validation
- **IDs**: `#full-name`, `#email`, `#reg-password`, `#gender-*`, `#skill-*`, `#country`, `#profile-picture`

### 3. **Interactive Buttons**
- **Show Modal**: Opens a modal dialog (`#show-modal-btn`)
- **Load Data**: Dynamically loads content (`#load-data-btn`)
- **Delayed Content**: Shows content after 3-second delay (`#delayed-content-btn`)
- **Tooltip Button**: Has hover tooltip (`#tooltip-btn`)

### 4. **Data Table**
- **Dynamic table**: Add/remove user rows
- **IDs**: `#users-table`, `#add-user-btn`, `.delete-btn`
- **Initial data**: 3 sample users

### 5. **Modal Dialog**
- **Elements**: Title, text input, OK/Cancel buttons
- **IDs**: `#modal`, `#modal-input`, `#modal-ok-btn`, `#modal-cancel-btn`, `#close-modal`

### 6. **Navigation**
- **Links**: Home, About, Contact, External link (opens new tab)
- **IDs**: `#home-link`, `#about-link`, `#contact-link`, `#external-link`

### 7. **Special Elements**
- **Hidden Element**: Appears after delay (`#hidden-element`)
- **Loading Spinner**: Shows during async operations (`#loading-spinner`)
- **File Upload**: Image file validation (`#profile-picture`)

## 🚀 Getting Started

1. **Clone or download** the files to your local machine
2. **Open `index.html`** in your browser
3. **Start testing** with Playwright!

### Quick Test
```bash
# Open in browser
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux
```

## 📝 Sample Playwright Test Cases

### Basic Login Test (Using Data-TestIDs)
```javascript
import { test, expect } from '@playwright/test';

test('successful login with data-testids', async ({ page }) => {
  await page.goto('file://path/to/index.html');
  
  await page.fill('[data-testid="username-input"]', 'admin');
  await page.fill('[data-testid="password-input"]', 'password123');
  await page.click('[data-testid="login-submit-btn"]');
  
  await expect(page.locator('[data-testid="login-message"]')).toContainText('Login successful');
});

// Alternative using ID selectors (also available)
test('successful login with IDs', async ({ page }) => {
  await page.goto('file://path/to/index.html');
  
  await page.fill('#username', 'admin');
  await page.fill('#password', 'password123');
  await page.click('#login-btn');
  
  await expect(page.locator('#login-message')).toContainText('Login successful');
});
```

### Form Filling Test (Using Data-TestIDs)
```javascript
test('registration form with data-testids', async ({ page }) => {
  await page.goto('file://path/to/index.html');
  
  await page.fill('[data-testid="fullname-input"]', 'John Doe');
  await page.fill('[data-testid="email-input"]', 'john@example.com');
  await page.fill('[data-testid="reg-password-input"]', 'securepass123');
  await page.check('[data-testid="gender-male-radio"]');
  await page.check('[data-testid="skill-javascript-checkbox"]');
  await page.check('[data-testid="skill-python-checkbox"]');
  await page.selectOption('[data-testid="country-select"]', 'us');
  
  await page.click('[data-testid="register-submit-btn"]');
  
  await expect(page.locator('[data-testid="registration-result"]')).toBeVisible();
});
```

### Modal Interaction Test (Using Data-TestIDs)
```javascript
test('modal dialog with data-testids', async ({ page }) => {
  await page.goto('file://path/to/index.html');
  
  await page.click('[data-testid="show-modal-btn"]');
  await expect(page.locator('[data-testid="modal"]')).toBeVisible();
  
  await page.fill('[data-testid="modal-input"]', 'Test input');
  await page.click('[data-testid="modal-ok-btn"]');
  
  await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
});
```

### Dynamic Content Test (Using Data-TestIDs)
```javascript
test('load dynamic content with data-testids', async ({ page }) => {
  await page.goto('file://path/to/index.html');
  
  await page.click('[data-testid="load-data-btn"]');
  
  // Wait for loading to complete
  await expect(page.locator('[data-testid="dynamic-content"]')).toBeVisible();
  await expect(page.locator('[data-testid^="data-item-"]')).toHaveCount(5);
});
```

### Table Manipulation Test (Using Data-TestIDs)
```javascript
test('add and delete table rows with data-testids', async ({ page }) => {
  await page.goto('file://path/to/index.html');
  
  // Get initial row count
  const initialRows = await page.locator('[data-testid="users-table-body"] tr').count();
  
  // Add new user
  await page.click('[data-testid="add-user-btn"]');
  await expect(page.locator('[data-testid="users-table-body"] tr')).toHaveCount(initialRows + 1);
  
  // Delete first user (user ID 1)
  await page.click('[data-testid="delete-user-1"]');
  await page.click('text=OK'); // Confirm dialog
  await expect(page.locator('[data-testid="users-table-body"] tr')).toHaveCount(initialRows);
});
```

### Wait and Timing Test (Using Data-TestIDs)
```javascript
test('delayed content appearance with data-testids', async ({ page }) => {
  await page.goto('file://path/to/index.html');
  
  await page.click('[data-testid="delayed-content-btn"]');
  
  // Element should not be visible immediately
  await expect(page.locator('[data-testid="hidden-element"]')).not.toBeVisible();
  
  // Wait for element to appear (should appear after 3 seconds)
  await expect(page.locator('[data-testid="hidden-element"]')).toBeVisible({ timeout: 5000 });
});
```

### File Upload Test (Using Data-TestIDs)
```javascript
test('file upload with data-testids', async ({ page }) => {
  await page.goto('file://path/to/index.html');
  
  // Create a test file
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.click('[data-testid="profile-picture-input"]');
  const fileChooser = await fileChooserPromise;
  
  await fileChooser.setFiles({
    name: 'test-image.jpg',
    mimeType: 'image/jpeg',
    buffer: Buffer.from('fake-image-data')
  });
  
  await expect(page.locator('[data-testid="file-preview-container"]')).toBeVisible();
  await expect(page.locator('[data-testid="file-preview-image"]')).toBeVisible();
  await expect(page.locator('[data-testid="file-preview-name"]')).toContainText('test-image.jpg');
});
```

### Navigation Test (Using Data-TestIDs)
```javascript
test('navigation links with data-testids', async ({ page, context }) => {
  await page.goto('file://path/to/index.html');
  
  // Test external link (opens in new tab)
  const pagePromise = context.waitForEvent('page');
  await page.click('[data-testid="external-link"]');
  const newPage = await pagePromise;
  
  await expect(newPage).toHaveURL('https://example.com');
  
  // Test internal navigation links
  await page.click('[data-testid="home-link"]');
  await page.click('[data-testid="about-link"]');
  await page.click('[data-testid="contact-link"]');
});
```

## 🎨 Element Selectors Quick Reference

### Forms (ID Selectors)
- `#username` - Login username field
- `#password` - Login password field
- `#login-btn` - Login submit button
- `#full-name` - Registration name field
- `#email` - Registration email field
- `#country` - Country dropdown
- `#gender-male`, `#gender-female`, `#gender-other` - Gender radio buttons
- `#skill-javascript`, `#skill-python`, `#skill-java`, `#skill-csharp` - Skill checkboxes

### Forms (Data-TestID Selectors)
- `[data-testid="username-input"]` - Login username field
- `[data-testid="password-input"]` - Login password field
- `[data-testid="login-submit-btn"]` - Login submit button
- `[data-testid="fullname-input"]` - Registration name field
- `[data-testid="email-input"]` - Registration email field
- `[data-testid="reg-password-input"]` - Registration password field
- `[data-testid="country-select"]` - Country dropdown
- `[data-testid="gender-male-radio"]` - Male gender radio
- `[data-testid="gender-female-radio"]` - Female gender radio
- `[data-testid="gender-other-radio"]` - Other gender radio
- `[data-testid="skill-javascript-checkbox"]` - JavaScript skill checkbox
- `[data-testid="skill-python-checkbox"]` - Python skill checkbox
- `[data-testid="skill-java-checkbox"]` - Java skill checkbox
- `[data-testid="skill-csharp-checkbox"]` - C# skill checkbox
- `[data-testid="profile-picture-input"]` - Profile picture file input
- `[data-testid="register-submit-btn"]` - Registration submit button

### Buttons (Data-TestID Selectors)
- `[data-testid="show-modal-btn"]` - Show modal button
- `[data-testid="load-data-btn"]` - Load dynamic content button
- `[data-testid="delayed-content-btn"]` - Show delayed content button
- `[data-testid="tooltip-btn"]` - Tooltip button
- `[data-testid="add-user-btn"]` - Add table row button
- `[data-testid="delete-user-1"]` - Delete user 1 button (dynamic IDs for new users)

### Modal Elements (Data-TestID Selectors)
- `[data-testid="modal"]` - Modal container
- `[data-testid="modal-content"]` - Modal content wrapper
- `[data-testid="modal-title"]` - Modal title
- `[data-testid="modal-text"]` - Modal body text
- `[data-testid="modal-input"]` - Modal text input
- `[data-testid="modal-ok-btn"]` - Modal OK button
- `[data-testid="modal-cancel-btn"]` - Modal Cancel button
- `[data-testid="modal-close-btn"]` - Modal close (X) button

### Navigation (Data-TestID Selectors)
- `[data-testid="main-navigation"]` - Main navigation container
- `[data-testid="home-link"]` - Home navigation link
- `[data-testid="about-link"]` - About navigation link
- `[data-testid="contact-link"]` - Contact navigation link
- `[data-testid="external-link"]` - External navigation link

### Dynamic Content (Data-TestID Selectors)
- `[data-testid="dynamic-content"]` - Dynamically loaded content area
- `[data-testid="hidden-element"]` - Element that appears with delay
- `[data-testid="loading-spinner"]` - Loading spinner overlay
- `[data-testid="data-grid"]` - Grid container for loaded data
- `[data-testid="data-item-{id}"]` - Dynamically created data items

### Table Elements (Data-TestID Selectors)
- `[data-testid="users-table"]` - Main data table
- `[data-testid="users-table-body"]` - Table body
- `[data-testid="user-row-1"]` - First user row (dynamic IDs for new rows)
- `[data-testid="user-row-2"]` - Second user row
- `[data-testid="user-row-3"]` - Third user row

### File Upload (Data-TestID Selectors)
- `[data-testid="file-preview-container"]` - File preview wrapper
- `[data-testid="file-preview-image"]` - Preview image
- `[data-testid="file-preview-name"]` - File name display
- `[data-testid="file-preview-clear"]` - Clear preview button

### Legacy Selectors (still available)
- `.delete-btn` - Delete table row buttons (class selector)
- `[data-user-id]` - Elements with user ID attributes

## 🧪 Advanced Testing Scenarios

### 1. **Form Validation Testing**
- Test required field validation
- Test email format validation
- Test file type validation
- Test password strength requirements

### 2. **Async Operations**
- Test loading states
- Test timeout scenarios
- Test race conditions
- Test retry mechanisms

### 3. **User Interactions**
- Test keyboard navigation
- Test mouse interactions
- Test drag and drop (if implemented)
- Test touch events (mobile)

### 4. **Visual Testing**
- Screenshot comparisons
- Element positioning tests
- CSS animation tests
- Responsive design tests

### 5. **Performance Testing**
- Page load times
- JavaScript execution times
- Memory usage monitoring
- Network request monitoring

## 🔧 Customization

The page is designed to be easily customizable:

- **Add new form fields** in the HTML
- **Modify validation rules** in `script.js`
- **Update styling** in `styles.css`
- **Add new interactive elements** following existing patterns

## 📚 Learning Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Web Testing Strategies](https://playwright.dev/docs/test-assertions)
- [Selector Strategies](https://playwright.dev/docs/selectors)

## 🤝 Contributing

Feel free to extend this practice page with additional elements:
- More form controls (date pickers, sliders, etc.)
- Advanced table features (sorting, filtering, pagination)
- Canvas or SVG interactions
- WebSocket connections
- Local storage interactions
- Drag and drop functionality

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Testing with Playwright! 🎭**
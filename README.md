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

### Basic Login Test
```javascript
import { test, expect } from '@playwright/test';

test('successful login', async ({ page }) => {
  await page.goto('file://path/to/index.html');
  
  await page.fill('#username', 'admin');
  await page.fill('#password', 'password123');
  await page.click('#login-btn');
  
  await expect(page.locator('#login-message')).toContainText('Login successful');
});
```

### Form Filling Test
```javascript
test('registration form', async ({ page }) => {
  await page.goto('file://path/to/index.html');
  
  await page.fill('#full-name', 'John Doe');
  await page.fill('#email', 'john@example.com');
  await page.fill('#reg-password', 'securepass123');
  await page.check('#gender-male');
  await page.check('#skill-javascript');
  await page.check('#skill-python');
  await page.selectOption('#country', 'us');
  
  await page.click('#register-btn');
  
  await expect(page.locator('#registration-result')).toBeVisible();
});
```

### Modal Interaction Test
```javascript
test('modal dialog', async ({ page }) => {
  await page.goto('file://path/to/index.html');
  
  await page.click('#show-modal-btn');
  await expect(page.locator('#modal')).toBeVisible();
  
  await page.fill('#modal-input', 'Test input');
  await page.click('#modal-ok-btn');
  
  await expect(page.locator('#modal')).not.toBeVisible();
});
```

### Dynamic Content Test
```javascript
test('load dynamic content', async ({ page }) => {
  await page.goto('file://path/to/index.html');
  
  await page.click('#load-data-btn');
  
  // Wait for loading to complete
  await expect(page.locator('#dynamic-content')).toBeVisible();
  await expect(page.locator('.data-item')).toHaveCount(5);
});
```

### Table Manipulation Test
```javascript
test('add and delete table rows', async ({ page }) => {
  await page.goto('file://path/to/index.html');
  
  // Get initial row count
  const initialRows = await page.locator('#users-table tbody tr').count();
  
  // Add new user
  await page.click('#add-user-btn');
  await expect(page.locator('#users-table tbody tr')).toHaveCount(initialRows + 1);
  
  // Delete first user
  await page.click('#users-table tbody tr:first-child .delete-btn');
  await page.click('text=OK'); // Confirm dialog
  await expect(page.locator('#users-table tbody tr')).toHaveCount(initialRows);
});
```

### Wait and Timing Test
```javascript
test('delayed content appearance', async ({ page }) => {
  await page.goto('file://path/to/index.html');
  
  await page.click('#delayed-content-btn');
  
  // Element should not be visible immediately
  await expect(page.locator('#hidden-element')).not.toBeVisible();
  
  // Wait for element to appear (should appear after 3 seconds)
  await expect(page.locator('#hidden-element')).toBeVisible({ timeout: 5000 });
});
```

### File Upload Test
```javascript
test('file upload', async ({ page }) => {
  await page.goto('file://path/to/index.html');
  
  // Create a test file
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.click('#profile-picture');
  const fileChooser = await fileChooserPromise;
  
  await fileChooser.setFiles({
    name: 'test-image.jpg',
    mimeType: 'image/jpeg',
    buffer: Buffer.from('fake-image-data')
  });
  
  await expect(page.locator('#file-preview')).toBeVisible();
});
```

### Navigation Test
```javascript
test('navigation links', async ({ page, context }) => {
  await page.goto('file://path/to/index.html');
  
  // Test external link (opens in new tab)
  const pagePromise = context.waitForEvent('page');
  await page.click('#external-link');
  const newPage = await pagePromise;
  
  await expect(newPage).toHaveURL('https://example.com');
});
```

## 🎨 Element Selectors Quick Reference

### Forms
- `#username` - Login username field
- `#password` - Login password field
- `#login-btn` - Login submit button
- `#full-name` - Registration name field
- `#email` - Registration email field
- `#country` - Country dropdown
- `#gender-male`, `#gender-female`, `#gender-other` - Gender radio buttons
- `#skill-javascript`, `#skill-python`, `#skill-java`, `#skill-csharp` - Skill checkboxes

### Buttons
- `#show-modal-btn` - Show modal button
- `#load-data-btn` - Load dynamic content button
- `#delayed-content-btn` - Show delayed content button
- `#add-user-btn` - Add table row button
- `.delete-btn` - Delete table row buttons

### Modal Elements
- `#modal` - Modal container
- `#modal-input` - Modal text input
- `#modal-ok-btn` - Modal OK button
- `#modal-cancel-btn` - Modal Cancel button
- `#close-modal` - Modal close (X) button

### Dynamic Content
- `#dynamic-content` - Dynamically loaded content area
- `#hidden-element` - Element that appears with delay
- `#loading-spinner` - Loading spinner overlay
- `.data-item` - Dynamically created data items

### Table Elements
- `#users-table` - Main data table
- `#users-table tbody tr` - Table rows
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
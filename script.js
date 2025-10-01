// Global variables
let userIdCounter = 4; // Starting from 4 since we have 3 initial users
let isLoadingData = false;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    setupTooltips();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Login form
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', handleLogin);

    // Registration form
    const registrationForm = document.getElementById('registration-form');
    registrationForm.addEventListener('submit', handleRegistration);

    // Interactive buttons
    document.getElementById('show-modal-btn').addEventListener('click', showModal);
    document.getElementById('load-data-btn').addEventListener('click', loadMoreData);
    document.getElementById('delayed-content-btn').addEventListener('click', showDelayedContent);

    // Modal controls
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('modal-ok-btn').addEventListener('click', handleModalOk);
    document.getElementById('modal-cancel-btn').addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Table controls
    document.getElementById('add-user-btn').addEventListener('click', addNewUser);

    // Delete buttons (event delegation)
    document.getElementById('users-table-body').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const userId = event.target.getAttribute('data-user-id');
            deleteUser(userId);
        }
    });

    // File upload
    document.getElementById('profile-picture').addEventListener('change', handleFileUpload);
}

// Login form handler
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('login-message');
    
    // Show loading spinner
    showLoadingSpinner();
    
    // Simulate API call delay
    setTimeout(() => {
        hideLoadingSpinner();
        
        if (username === 'admin' && password === 'password123') {
            showMessage(messageEl, 'Login successful! Welcome back!', 'success');
            // Clear form
            document.getElementById('login-form').reset();
        } else if (username === 'testuser' && password === 'test123') {
            showMessage(messageEl, 'Login successful! Welcome test user!', 'success');
            document.getElementById('login-form').reset();
        } else {
            showMessage(messageEl, 'Invalid username or password. Try admin/password123 or testuser/test123', 'error');
        }
    }, 1500);
}

// Registration form handler
function handleRegistration(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const resultEl = document.getElementById('registration-result');
    
    // Get form values
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const gender = formData.get('gender');
    const skills = formData.getAll('skills');
    const country = formData.get('country');
    
    // Validate required fields
    if (!fullName || !email || !gender || !country) {
        showMessage(resultEl, 'Please fill in all required fields.', 'error');
        return;
    }
    
    // Show loading spinner
    showLoadingSpinner();
    
    // Simulate API call delay
    setTimeout(() => {
        hideLoadingSpinner();
        
        // Display registration data
        const resultHTML = `
            <h3>Registration Successful!</h3>
            <div class="registration-data">
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Gender:</strong> ${gender}</p>
                <p><strong>Skills:</strong> ${skills.length > 0 ? skills.join(', ') : 'None selected'}</p>
                <p><strong>Country:</strong> ${getCountryName(country)}</p>
            </div>
        `;
        
        resultEl.innerHTML = resultHTML;
        resultEl.style.display = 'block';
        
        // Clear form
        document.getElementById('registration-form').reset();
        
        // Add user to table
        addUserToTable(fullName, email, 'User');
    }, 2000);
}

// Modal functions
function showModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Focus on modal input for better accessibility
    setTimeout(() => {
        document.getElementById('modal-input').focus();
    }, 100);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
    
    // Clear modal input
    document.getElementById('modal-input').value = '';
}

function handleModalOk() {
    const inputValue = document.getElementById('modal-input').value;
    if (inputValue.trim()) {
        alert(`You entered: "${inputValue}"`);
    }
    closeModal();
}

// Load more data functionality
function loadMoreData() {
    if (isLoadingData) return;
    
    isLoadingData = true;
    const contentEl = document.getElementById('dynamic-content');
    const loadBtn = document.getElementById('load-data-btn');
    
    // Update button state
    loadBtn.textContent = 'Loading...';
    loadBtn.disabled = true;
    
    // Show content area
    contentEl.style.display = 'block';
    contentEl.innerHTML = '<div class="loading-indicator">Fetching data...</div>';
    
    // Simulate API call
    setTimeout(() => {
        const currentTime = new Date().toLocaleString();
        const randomData = generateRandomData();
        
        contentEl.innerHTML = `
            <h4>Loaded Data (${currentTime})</h4>
            <div class="data-grid" data-testid="data-grid">
                ${randomData.map(item => `
                    <div class="data-item" data-item-id="${item.id}" data-testid="data-item-${item.id}">
                        <strong>${item.name}</strong><br>
                        <span class="data-detail">${item.description}</span><br>
                        <small class="data-timestamp">Created: ${item.timestamp}</small>
                    </div>
                `).join('')}
            </div>
            <p><em>This data was loaded dynamically for testing purposes.</em></p>
        `;
        
        // Reset button
        loadBtn.textContent = 'Load More Data';
        loadBtn.disabled = false;
        isLoadingData = false;
        
        // Add some CSS for the loaded data
        addDynamicStyles();
        
    }, 1500);
}

// Show delayed content
function showDelayedContent() {
    const hiddenEl = document.getElementById('hidden-element');
    const btn = document.getElementById('delayed-content-btn');
    
    // Update button state
    btn.textContent = 'Loading... (3s)';
    btn.disabled = true;
    
    let countdown = 3;
    const countdownInterval = setInterval(() => {
        countdown--;
        btn.textContent = `Loading... (${countdown}s)`;
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
    
    // Show element after delay
    setTimeout(() => {
        hiddenEl.style.display = 'block';
        btn.textContent = 'Content Shown!';
        btn.style.backgroundColor = '#2ecc71';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            btn.textContent = 'Show Hidden Content (3s delay)';
            btn.disabled = false;
            btn.style.backgroundColor = '';
            hiddenEl.style.display = 'none';
        }, 3000);
    }, 3000);
}

// Table functions
function addNewUser() {
    const names = ['Alice Johnson', 'Bob Wilson', 'Carol Brown', 'David Lee', 'Emma Davis', 'Frank Miller'];
    const roles = ['User', 'Admin', 'Moderator', 'Guest'];
    const domains = ['example.com', 'test.com', 'sample.org', 'demo.net'];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const randomEmail = `${randomName.toLowerCase().replace(' ', '.')}@${randomDomain}`;
    
    addUserToTable(randomName, randomEmail, randomRole);
}

function addUserToTable(name, email, role) {
    const tableBody = document.getElementById('users-table-body');
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-user-id', userIdCounter);
    newRow.setAttribute('data-testid', `user-row-${userIdCounter}`);
    
    newRow.innerHTML = `
        <td>${userIdCounter}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${role}</td>
        <td><button class="btn btn-danger btn-small delete-btn" data-user-id="${userIdCounter}" data-testid="delete-user-${userIdCounter}">Delete</button></td>
    `;
    
    tableBody.appendChild(newRow);
    
    // Add animation
    newRow.style.backgroundColor = '#d4edda';
    setTimeout(() => {
        newRow.style.backgroundColor = '';
    }, 2000);
    
    userIdCounter++;
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const row = document.querySelector(`tr[data-user-id="${userId}"]`);
        if (row) {
            row.style.backgroundColor = '#f8d7da';
            setTimeout(() => {
                row.remove();
            }, 500);
        }
    }
}

// File upload handler
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            event.target.value = '';
            return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB.');
            event.target.value = '';
            return;
        }
        
        console.log('File selected:', file.name, 'Size:', file.size, 'Type:', file.type);
        
        // You could add preview functionality here
        showFilePreview(file);
    }
}

function showFilePreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        // Create or update preview
        let preview = document.getElementById('file-preview');
        if (!preview) {
            preview = document.createElement('div');
            preview.id = 'file-preview';
            preview.style.marginTop = '10px';
            document.getElementById('profile-picture').parentNode.appendChild(preview);
        }
        
        preview.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;" data-testid="file-preview-container">
                <img src="${e.target.result}" alt="Preview" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" data-testid="file-preview-image">
                <span data-testid="file-preview-name">Selected: ${file.name}</span>
                <button type="button" onclick="clearFilePreview()" style="background: #e74c3c; color: white; border: none; padding: 2px 6px; border-radius: 2px; cursor: pointer;" data-testid="file-preview-clear">×</button>
            </div>
        `;
    };
    reader.readAsDataURL(file);
}

function clearFilePreview() {
    const preview = document.getElementById('file-preview');
    const fileInput = document.getElementById('profile-picture');
    if (preview) preview.remove();
    if (fileInput) fileInput.value = '';
}

// Utility functions
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}`;
    element.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

function showLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'block';
}

function hideLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = 'none';
}

function getCountryName(countryCode) {
    const countries = {
        'us': 'United States',
        'ca': 'Canada',
        'uk': 'United Kingdom',
        'au': 'Australia',
        'de': 'Germany',
        'fr': 'France',
        'in': 'India',
        'jp': 'Japan'
    };
    return countries[countryCode] || countryCode;
}

function generateRandomData() {
    const items = [];
    const adjectives = ['Amazing', 'Incredible', 'Fantastic', 'Wonderful', 'Spectacular', 'Brilliant'];
    const nouns = ['Widget', 'Component', 'Element', 'Feature', 'Module', 'Service'];
    
    for (let i = 0; i < 5; i++) {
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        
        items.push({
            id: Date.now() + i,
            name: `${adj} ${noun} #${i + 1}`,
            description: `This is a dynamically generated ${noun.toLowerCase()} for testing purposes.`,
            timestamp: new Date().toLocaleString()
        });
    }
    
    return items;
}

function addDynamicStyles() {
    // Add CSS for dynamically loaded content if not already added
    if (!document.getElementById('dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            .data-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
                margin: 15px 0;
            }
            .data-item {
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background-color: #fff;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                transition: transform 0.2s ease;
            }
            .data-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            }
            .data-detail {
                color: #666;
                font-style: italic;
            }
            .data-timestamp {
                color: #999;
            }
            .loading-indicator {
                text-align: center;
                padding: 20px;
                color: #666;
            }
        `;
        document.head.appendChild(style);
    }
}

function setupTooltips() {
    // Enhanced tooltip functionality could be added here
    // For now, we rely on the browser's default title attribute behavior
    
    // You could implement custom tooltips using libraries like Popper.js or Tippy.js
    console.log('Tooltips initialized - hover over elements with title attributes');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // ESC key closes modal
    if (event.key === 'Escape') {
        const modal = document.getElementById('modal');
        if (modal.style.display === 'block') {
            closeModal();
        }
    }
    
    // Ctrl+Enter in modal input triggers OK button
    if (event.ctrlKey && event.key === 'Enter' && event.target.id === 'modal-input') {
        handleModalOk();
    }
});

// Expose some functions globally for testing purposes
window.testHelpers = {
    showModal,
    closeModal,
    addUserToTable,
    deleteUser,
    loadMoreData,
    showDelayedContent,
    clearFilePreview
};

// Console welcome message for testers
console.log(`
🎭 Playwright Testing Practice Page Loaded!
═══════════════════════════════════════════

Available test scenarios:
• Login: admin/password123 or testuser/test123
• Registration form with validation
• Modal dialogs with various interactions
• Dynamic table with add/delete operations
• File uploads with validation
• Loading states and delays
• Tooltips and hover effects

Test helper functions available at window.testHelpers
Happy testing! 🚀
`);

// Performance monitoring (for advanced testing scenarios)
if (window.performance && window.performance.mark) {
    window.performance.mark('page-interactive');
    
    // Log page load time after everything is ready
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = window.performance.getEntriesByType('navigation')[0];
            console.log('Page Performance:', {
                'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                'Load Complete': perfData.loadEventEnd - perfData.loadEventStart,
                'Total Load Time': perfData.loadEventEnd - perfData.navigationStart
            });
        }, 100);
    });
}
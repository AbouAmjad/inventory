let currentUser = null;
const API_BASE_URL = 'https://api.render.com/deploy/srv-d47gmgk9c44c73c6j2j0?key=ZO9kCYvfj-8'; // Replace with your actual Render URL

// Check if user is already logged in (from sessionStorage)
document.addEventListener('DOMContentLoaded', function() {
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
        loadInventory();
    }
});

// Handle Google Sign-In
function handleGoogleSignIn(response) {
    const id_token = response.credential;
    
    // Show loading state
    const signinButton = document.querySelector('.g_id_signin');
    signinButton.innerHTML = 'Authenticating...';
    
    fetch(`${API_BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUser = data.user;
            // Save user in sessionStorage
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            showDashboard();
            loadInventory();
        } else {
            alert('Access denied. Your email is not authorized to use this system.');
            // Reset signin button
            window.location.reload();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Authentication failed. Please try again.');
        window.location.reload();
    });
}

function showDashboard() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    
    // Update user info
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-avatar').src = currentUser.picture;
    
    // Clear form fields
    document.getElementById('item-name').value = '';
    document.getElementById('item-quantity').value = '';
    document.getElementById('item-price').value = '';
}

function logout() {
    // Clear session storage
    sessionStorage.removeItem('currentUser');
    
    // Reset Google Sign-In
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(currentUser.email, () => {
        console.log('Consent revoked');
    });
    
    // Show login page
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    
    currentUser = null;
    
    // Reload to reset Google Sign-In button
    setTimeout(() => {
        window.location.reload();
    }, 100);
}

// Inventory Management Functions
async function loadInventory() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/inventory`, {
            headers: {
                'Authorization': `Bearer ${currentUser.id_token}`
            }
        });
        
        if (response.status === 401) {
            // Token expired, force logout
            logout();
            return;
        }
        
        const data = await response.json();
        displayInventory(data.items);
    } catch (error) {
        console.error('Error loading inventory:', error);
        alert('Failed to load inventory. Please try again.');
    }
}

async function addItem() {
    const name = document.getElementById('item-name').value.trim();
    const quantity = document.getElementById('item-quantity').value;
    const price = document.getElementById('item-price').value;

    if (!name || !quantity || !price) {
        alert('Please fill all fields');
        return;
    }

    if (quantity < 0 || price < 0) {
        alert('Quantity and price must be positive numbers');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.id_token}`
            },
            body: JSON.stringify({ 
                name, 
                quantity: parseInt(quantity), 
                price: parseFloat(price) 
            })
        });

        if (response.status === 401) {
            logout();
            return;
        }

        if (response.ok) {
            // Clear form
            document.getElementById('item-name').value = '';
            document.getElementById('item-quantity').value = '';
            document.getElementById('item-price').value = '';
            
            // Reload inventory
            loadInventory();
        } else {
            throw new Error('Failed to add item');
        }
    } catch (error) {
        console.error('Error adding item:', error);
        alert('Failed to add item. Please try again.');
    }
}

async function deleteItem(itemId) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/api/inventory/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${currentUser.id_token}`
            }
        });

        if (response.status === 401) {
            logout();
            return;
        }

        if (response.ok) {
            loadInventory();
        } else {
            throw new Error('Failed to delete item');
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item. Please try again.');
    }
}

function displayInventory(items) {
    const tbody = document.getElementById('inventory-tbody');
    tbody.innerHTML = '';

    if (items.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; color: #666;">
                    No items in inventory. Add your first item above.
                </td>
            </tr>
        `;
        return;
    }

    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${escapeHtml(item.name)}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <button class="delete-btn" onclick="deleteItem('${item.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Helper function to prevent XSS
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

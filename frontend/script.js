let currentUser = null;
const API_BASE_URL = 'https://your-render-app.onrender.com'; // Replace with your Render URL

// Handle Google Sign-In
function handleGoogleSignIn(response) {
    const id_token = response.credential;
    
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
            showDashboard();
            loadInventory();
        } else {
            alert('Access denied. Your email is not authorized.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Authentication failed');
    });
}

function showDashboard() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-avatar').src = currentUser.picture;
}

function logout() {
    google.accounts.id.disableAutoSelect();
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    currentUser = null;
}

// Inventory Management
async function loadInventory() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/inventory`, {
            headers: {
                'Authorization': `Bearer ${currentUser.id_token}`
            }
        });
        
        const data = await response.json();
        displayInventory(data.items);
    } catch (error) {
        console.error('Error loading inventory:', error);
    }
}

async function addItem() {
    const name = document.getElementById('item-name').value;
    const quantity = document.getElementById('item-quantity').value;
    const price = document.getElementById('item-price').value;

    if (!name || !quantity || !price) {
        alert('Please fill all fields');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.id_token}`
            },
            body: JSON.stringify({ name, quantity: parseInt(quantity), price: parseFloat(price) })
        });

        if (response.ok) {
            document.getElementById('item-name').value = '';
            document.getElementById('item-quantity').value = '';
            document.getElementById('item-price').value = '';
            loadInventory();
        }
    } catch (error) {
        console.error('Error adding item:', error);
    }
}

async function deleteItem(itemId) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
        await fetch(`${API_BASE_URL}/api/inventory/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${currentUser.id_token}`
            }
        });
        loadInventory();
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}

function displayInventory(items) {
    const tbody = document.getElementById('inventory-tbody');
    tbody.innerHTML = '';

    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <button class="delete-btn" onclick="deleteItem('${item.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}
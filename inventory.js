// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });
}

if (overlay) {
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
}

// Inventory Management
let inventoryItems = JSON.parse(localStorage.getItem('inventoryItems')) || [
    {
        id: 1,
        name: 'Printer Paper A4',
        category: 'Office Supplies',
        quantity: 150,
        image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Standard A4 printer paper, 500 sheets per pack'
    },
    {
        id: 2,
        name: 'Ink Cartridges',
        category: 'Office Supplies',
        quantity: 8,
        image: 'https://images.unsplash.com/photo-1572012022327-aa30df66e192?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Compatible ink cartridges for HP printers'
    },
    {
        id: 3,
        name: 'Pens',
        category: 'Office Supplies',
        quantity: 50,
        image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Black ballpoint pens, pack of 50'
    }
];

// Initialize inventory functionality
const initializeInventory = () => {
    const addItemBtn = document.getElementById('addItemBtn');
    const addItemForm = document.getElementById('addItemForm');
    const cancelAddBtn = document.getElementById('cancelAddBtn');
    const itemForm = document.getElementById('itemForm');
    const exportInventoryBtn = document.getElementById('exportInventoryBtn');
    
    // Show/hide add item form
    if (addItemBtn) {
        addItemBtn.addEventListener('click', () => {
            addItemForm.style.display = 'block';
        });
    }
    
    if (cancelAddBtn) {
        cancelAddBtn.addEventListener('click', () => {
            addItemForm.style.display = 'none';
            itemForm.reset();
        });
    }
    
    // Handle form submission
    if (itemForm) {
        itemForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newItem = {
                id: inventoryItems.length > 0 ? Math.max(...inventoryItems.map(item => item.id)) + 1 : 1,
                name: document.getElementById('itemName').value,
                category: document.getElementById('itemCategory').value,
                quantity: parseInt(document.getElementById('itemQuantity').value),
                image: document.getElementById('itemImage').value || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                description: document.getElementById('itemDescription').value
            };
            
            inventoryItems.push(newItem);
            saveInventory();
            renderInventoryItems();
            
            // Reset form and hide it
            itemForm.reset();
            addItemForm.style.display = 'none';
            
            alert('Item added successfully!');
        });
    }
    
    // Export inventory to Excel
    if (exportInventoryBtn) {
        exportInventoryBtn.addEventListener('click', () => {
            const data = [
                ['ID', 'Name', 'Category', 'Quantity', 'Description']
            ];
            
            inventoryItems.forEach(item => {
                data.push([
                    item.id,
                    item.name,
                    item.category,
                    item.quantity,
                    item.description
                ]);
            });
            
            const ws = XLSX.utils.aoa_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Inventory Data");
            XLSX.writeFile(wb, "Inventory_Items.xlsx");
            
            alert('Inventory exported successfully!');
        });
    }
    
    // Render inventory items
    renderInventoryItems();
};

// Render inventory items to the grid
const renderInventoryItems = () => {
    const inventoryGrid = document.getElementById('inventoryGrid');
    if (!inventoryGrid) return;
    
    inventoryGrid.innerHTML = '';
    
    if (inventoryItems.length === 0) {
        inventoryGrid.innerHTML = '<p>No inventory items found. Add your first item!</p>';
        return;
    }
    
    inventoryItems.forEach(item => {
        const quantityClass = item.quantity < 10 ? 'low' : item.quantity < 30 ? 'medium' : 'high';
        
        const itemElement = document.createElement('div');
        itemElement.className = 'inventory-item';
        itemElement.innerHTML = `
            <div class="item-image">
                ${item.image ? 
                    `<img src="${item.image}" alt="${item.name}">` : 
                    `<div class="placeholder"><i class="fas fa-box"></i></div>`
                }
            </div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <span class="item-category">${item.category}</span>
                <div class="item-info">
                    <div class="item-quantity ${quantityClass}">Qty: ${item.quantity}</div>
                </div>
                <p class="item-description">${item.description}</p>
                <div class="item-actions">
                    <button class="btn-edit" data-id="${item.id}"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn-delete" data-id="${item.id}"><i class="fas fa-trash"></i> Delete</button>
                </div>
            </div>
        `;
        
        inventoryGrid.appendChild(itemElement);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.closest('button').getAttribute('data-id'));
            if (confirm('Are you sure you want to delete this item?')) {
                deleteInventoryItem(itemId);
            }
        });
    });
    
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.closest('button').getAttribute('data-id'));
            editInventoryItem(itemId);
        });
    });
};

// Delete an inventory item
const deleteInventoryItem = (id) => {
    inventoryItems = inventoryItems.filter(item => item.id !== id);
    saveInventory();
    renderInventoryItems();
};

// Edit an inventory item (placeholder for now)
const editInventoryItem = (id) => {
    alert('Edit functionality will be implemented in the next version!');
};

// Save inventory to localStorage
const saveInventory = () => {
    localStorage.setItem('inventoryItems', JSON.stringify(inventoryItems));
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeInventory();
});

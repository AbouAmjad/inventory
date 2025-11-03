// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

mobileMenuBtn.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', function() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Navigation functionality
const navItems = document.querySelectorAll('.sidebar-menu li');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        // Add active class to clicked item
        this.classList.add('active');
        
        // Get page name
        const pageName = this.getAttribute('data-page');
        
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        document.getElementById(`${pageName}-page`).classList.add('active');
        
        // Close sidebar on mobile after selection
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});

// Initialize the consumption chart
const initializeChart = () => {
    const ctx = document.getElementById('consumptionChart').getContext('2d');
    const consumptionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Consumables Used',
                data: [320, 290, 380, 410, 390, 420],
                backgroundColor: 'rgba(46, 139, 87, 0.7)',
                borderColor: 'rgba(46, 139, 87, 1)',
                borderWidth: 1,
                borderRadius: 5,
            }, {
                label: 'Consumables Cost',
                data: [3200, 2900, 3800, 4100, 3900, 4200],
                backgroundColor: 'rgba(60, 179, 113, 0.7)',
                borderColor: 'rgba(60, 179, 113, 1)',
                borderWidth: 1,
                type: 'line',
                yAxisID: 'y1',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Units Consumed'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                y1: {
                    position: 'right',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cost ($)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
    return consumptionChart;
};

let consumptionChart;

// Time filter functionality
const initializeTimeFilter = () => {
    const timeFilterButtons = document.querySelectorAll('.time-filter button');
    timeFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            timeFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart based on selected time period
            if (this.textContent === 'Daily') {
                consumptionChart.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                consumptionChart.data.datasets[0].data = [45, 52, 38, 61, 55, 30, 25];
                consumptionChart.data.datasets[1].data = [450, 520, 380, 610, 550, 300, 250];
            } else if (this.textContent === 'Weekly') {
                consumptionChart.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                consumptionChart.data.datasets[0].data = [180, 220, 190, 210];
                consumptionChart.data.datasets[1].data = [1800, 2200, 1900, 2100];
            } else {
                consumptionChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                consumptionChart.data.datasets[0].data = [320, 290, 380, 410, 390, 420];
                consumptionChart.data.datasets[1].data = [3200, 2900, 3800, 4100, 3900, 4200];
            }
            
            consumptionChart.update();
        });
    });
};

// Export to Excel functionality
const initializeExportButton = () => {
    document.getElementById('exportBtn').addEventListener('click', function() {
        // Create sample data for export
        const data = [
            ['Item ID', 'Item Name', 'Category', 'Quantity Used', 'Date', 'Cost'],
            ['#INV-7842', 'Printer Paper A4', 'Office Supplies', '45 units', 'Jun 12, 2023', '$45.00'],
            ['#INV-5391', 'Ink Cartridges', 'Office Supplies', '12 units', 'Jun 12, 2023', '$240.00'],
            ['#INV-6723', 'Pens', 'Office Supplies', '23 units', 'Jun 11, 2023', '$11.50'],
            ['#INV-1984', 'Staplers', 'Office Supplies', '5 units', 'Jun 11, 2023', '$25.00'],
            ['#INV-2468', 'Sticky Notes', 'Office Supplies', '18 units', 'Jun 10, 2023', '$27.00']
        ];

        // Create worksheet
        const ws = XLSX.utils.aoa_to_sheet(data);
        
        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Consumption Data");
        
        // Export to Excel
        XLSX.writeFile(wb, "Inventory_Consumption_Report.xlsx");
        
        // Show success message
        alert('Export successful! Your Excel file has been downloaded.');
    });
};

// Inventory Management
let inventoryItems = JSON.parse(localStorage.getItem('inventoryItems')) || [
    {
        id: 1,
        name: 'Printer Paper A4',
        category: 'Office Supplies',
        quantity: 150,
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Standard A4 printer paper, 500 sheets per pack'
    },
    {
        id: 2,
        name: 'Ink Cartridges',
        category: 'Office Supplies',
        quantity: 8,
        price: 240.00,
        image: 'https://images.unsplash.com/photo-1572012022327-aa30df66e192?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Compatible ink cartridges for HP printers'
    },
    {
        id: 3,
        name: 'Pens',
        category: 'Office Supplies',
        quantity: 50,
        price: 11.50,
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
    addItemBtn.addEventListener('click', () => {
        addItemForm.style.display = 'block';
    });
    
    cancelAddBtn.addEventListener('click', () => {
        addItemForm.style.display = 'none';
        itemForm.reset();
    });
    
    // Handle form submission
    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newItem = {
            id: inventoryItems.length > 0 ? Math.max(...inventoryItems.map(item => item.id)) + 1 : 1,
            name: document.getElementById('itemName').value,
            category: document.getElementById('itemCategory').value,
            quantity: parseInt(document.getElementById('itemQuantity').value),
            price: parseFloat(document.getElementById('itemPrice').value),
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
    
    // Export inventory to Excel
    exportInventoryBtn.addEventListener('click', () => {
        const data = [
            ['ID', 'Name', 'Category', 'Quantity', 'Price', 'Description']
        ];
        
        inventoryItems.forEach(item => {
            data.push([
                item.id,
                item.name,
                item.category,
                item.quantity,
                `$${item.price.toFixed(2)}`,
                item.description
            ]);
        });
        
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Inventory Data");
        XLSX.writeFile(wb, "Inventory_Items.xlsx");
        
        alert('Inventory exported successfully!');
    });
    
    // Render inventory items
    renderInventoryItems();
};

// Render inventory items to the grid
const renderInventoryItems = () => {
    const inventoryGrid = document.getElementById('inventoryGrid');
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
                    <div class="item-price">$${item.price.toFixed(2)}</div>
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
    consumptionChart = initializeChart();
    initializeTimeFilter();
    initializeExportButton();
    initializeInventory();
});

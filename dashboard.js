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

// Initialize the consumption chart
const initializeChart = () => {
    const ctx = document.getElementById('consumptionChart');
    if (!ctx) return;
    
    const consumptionChart = new Chart(ctx.getContext('2d'), {
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
    if (timeFilterButtons.length === 0) return;
    
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
    const exportBtn = document.getElementById('exportBtn');
    if (!exportBtn) return;
    
    exportBtn.addEventListener('click', function() {
        // Create sample data for export
        const data = [
            ['Item ID', 'Item Name', 'Category', 'Quantity Used', 'Date'],
            ['#INV-7842', 'Printer Paper A4', 'Office Supplies', '45 units', 'Jun 12, 2023'],
            ['#INV-5391', 'Ink Cartridges', 'Office Supplies', '12 units', 'Jun 12, 2023'],
            ['#INV-6723', 'Pens', 'Office Supplies', '23 units', 'Jun 11, 2023'],
            ['#INV-1984', 'Staplers', 'Office Supplies', '5 units', 'Jun 11, 2023'],
            ['#INV-2468', 'Sticky Notes', 'Office Supplies', '18 units', 'Jun 10, 2023']
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

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    consumptionChart = initializeChart();
    initializeTimeFilter();
    initializeExportButton();
});

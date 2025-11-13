// Catalogue Manager Class
class CatalogueManager {
    constructor() {
        this.items = this.loadItems();
        this.init();
    }

    init() {
        this.renderCatalogue();
        this.updateStats();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add item form
        document.getElementById('addItemForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addItem();
        });

        // Edit item form
        document.getElementById('editItemForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEdit();
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelEdit').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('editModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    loadItems() {
        const items = localStorage.getItem('catalogueItems');
        if (items) {
            return JSON.parse(items);
        }
        // Return sample data if no items exist
        return [
            {
                id: Date.now(),
                name: 'Sample Product',
                description: 'This is a sample product. Click Edit to modify or Delete to remove it.',
                price: 29.99,
                quantity: 15
            }
        ];
    }

    saveItems() {
        localStorage.setItem('catalogueItems', JSON.stringify(this.items));
    }

    addItem() {
        const name = document.getElementById('itemName').value.trim();
        const description = document.getElementById('itemDescription').value.trim();
        const price = parseFloat(document.getElementById('itemPrice').value);
        const quantity = parseInt(document.getElementById('itemQuantity').value);

        const newItem = {
            id: Date.now(),
            name,
            description,
            price,
            quantity
        };

        this.items.push(newItem);
        this.saveItems();
        this.renderCatalogue();
        this.updateStats();

        // Clear form
        document.getElementById('addItemForm').reset();

        // Show success feedback
        this.showNotification('Item added successfully!');
    }

    deleteItem(id) {
        if (confirm('Are you sure you want to delete this item?')) {
            this.items = this.items.filter(item => item.id !== id);
            this.saveItems();
            this.renderCatalogue();
            this.updateStats();
            this.showNotification('Item deleted successfully!');
        }
    }

    editItem(id) {
        const item = this.items.find(item => item.id === id);
        if (!item) return;

        document.getElementById('editItemId').value = item.id;
        document.getElementById('editItemName').value = item.name;
        document.getElementById('editItemDescription').value = item.description;
        document.getElementById('editItemPrice').value = item.price;
        document.getElementById('editItemQuantity').value = item.quantity;

        document.getElementById('editModal').style.display = 'block';
    }

    saveEdit() {
        const id = parseInt(document.getElementById('editItemId').value);
        const name = document.getElementById('editItemName').value.trim();
        const description = document.getElementById('editItemDescription').value.trim();
        const price = parseFloat(document.getElementById('editItemPrice').value);
        const quantity = parseInt(document.getElementById('editItemQuantity').value);

        const itemIndex = this.items.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            this.items[itemIndex] = {
                id,
                name,
                description,
                price,
                quantity
            };
            this.saveItems();
            this.renderCatalogue();
            this.updateStats();
            this.closeModal();
            this.showNotification('Item updated successfully!');
        }
    }

    closeModal() {
        document.getElementById('editModal').style.display = 'none';
    }

    renderCatalogue() {
        const catalogueList = document.getElementById('catalogueList');

        if (this.items.length === 0) {
            catalogueList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📦</div>
                    <p>No items in catalogue. Add your first item to get started!</p>
                </div>
            `;
            return;
        }

        catalogueList.innerHTML = this.items.map(item => {
            const quantityClass = item.quantity === 0 ? 'out-of-stock' : 
                                 item.quantity < 10 ? 'low-stock' : '';
            const quantityText = item.quantity === 0 ? 'Out of Stock' : `Qty: ${item.quantity}`;

            return `
                <div class="catalogue-item">
                    <div class="item-header">
                        <h3 class="item-title">${this.escapeHtml(item.name)}</h3>
                        <span class="item-quantity ${quantityClass}">${quantityText}</span>
                    </div>
                    <p class="item-description">${this.escapeHtml(item.description)}</p>
                    <div class="item-footer">
                        <div class="item-price">$${item.price.toFixed(2)}</div>
                        <div class="item-actions">
                            <button class="btn btn-small btn-edit" onclick="catalogueManager.editItem(${item.id})">Edit</button>
                            <button class="btn btn-small btn-delete" onclick="catalogueManager.deleteItem(${item.id})">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateStats() {
        const totalItems = this.items.length;
        const totalStock = this.items.reduce((sum, item) => sum + item.quantity, 0);

        document.getElementById('totalItems').textContent = totalItems;
        document.getElementById('totalStock').textContent = totalStock;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message) {
        // Simple notification - could be enhanced with a proper toast system
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            z-index: 2000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the catalogue manager
let catalogueManager;
document.addEventListener('DOMContentLoaded', () => {
    catalogueManager = new CatalogueManager();
});

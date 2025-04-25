class OrderTracker {
    constructor() {
        this.orders = JSON.parse(localStorage.getItem('orders') || '[]');
        this.orderHistoryList = document.getElementById('orderHistoryList');
        this.orderHistoryBtn = document.getElementById('orderHistoryBtn');
        this.newOrderSection = document.getElementById('newOrderSection');
        this.orderHistorySection = document.getElementById('orderHistorySection');

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        if (this.orderHistoryBtn) {
            this.orderHistoryBtn.addEventListener('click', () => this.toggleOrderHistory());
        }
    }

    toggleOrderHistory() {
        const isShowingHistory = this.orderHistorySection.style.display === 'block';
        
        this.newOrderSection.style.display = isShowingHistory ? 'block' : 'none';
        this.orderHistorySection.style.display = isShowingHistory ? 'none' : 'block';
        
        if (!isShowingHistory) {
            this.displayOrderHistory();
        }
    }

    addOrder(orderDetails) {
        const order = {
            id: `ORD${Date.now()}`,
            date: new Date().toISOString(),
            status: 'Order Received',
            ...orderDetails
        };

        this.orders.unshift(order);
        localStorage.setItem('orders', JSON.stringify(this.orders));
        
        // Send email notification
        this.sendOrderConfirmationEmail(order);
        
        return order;
    }

    displayOrderHistory() {
        if (!this.orderHistoryList) return;

        this.orderHistoryList.innerHTML = this.orders.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <h3>Order #${order.id}</h3>
                    <span class="order-date">${new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div class="order-details">
                    <p>Status: <span class="status-${order.status.toLowerCase().replace(/\s+/g, '-')}">${order.status}</span></p>
                    <p>Print Size: ${order.printSize}</p>
                    <p>Copies: ${order.copies}</p>
                    <p>Total: $${order.total}</p>
                </div>
                <button onclick="orderTracker.trackOrder('${order.id}')" class="track-btn">Track Order</button>
            </div>
        `).join('');
    }

    async sendOrderConfirmationEmail(order) {
        // In a real application, this would call an API endpoint
        console.log('Sending order confirmation email:', {
            to: order.email,
            subject: `Order Confirmation - ${order.id}`,
            body: `
                Thank you for your order!
                Order ID: ${order.id}
                Total: $${order.total}
                Status: ${order.status}
                
                We'll keep you updated on your order status.
            `
        });
    }

    async trackOrder(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        // Show order status tracker
        const statusTracker = document.querySelector('.order-status');
        statusTracker.style.display = 'block';
        
        // Update status steps
        const steps = document.querySelectorAll('.status-step');
        const currentStepIndex = this.getStatusIndex(order.status);
        
        steps.forEach((step, index) => {
            if (index <= currentStepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    getStatusIndex(status) {
        const statuses = [
            'Order Received',
            'Payment Confirmed',
            'Processing',
            'Printing',
            'Quality Check',
            'Shipping',
            'Delivered'
        ];
        return statuses.indexOf(status);
    }
}

// Initialize order tracker
const orderTracker = new OrderTracker();
// Mock Data
const categories = [
    { id: 1, name: 'Burger', icon: '🍔', filter: 'burger' },
    { id: 2, name: 'Pizza', icon: '🍕', filter: 'pizza' },
    { id: 3, name: 'Sushi', icon: '🍣', filter: 'sushi' },
    { id: 4, name: 'Hot Dog', icon: '🌭', filter: 'hotdog' },
    { id: 5, name: 'Drinks', icon: '🥤', filter: 'drinks' },
    { id: 6, name: 'Vegan', icon: '🥗', filter: 'vegan' }
];

const foodItems = [
    {
        id: 1,
        title: 'Classic Cheese Burger',
        desc: 'Juicy beef patty with melted cheddar cheese, lettuce, tomato, and our signature sauce.',
        price: 8.99,
        rating: 4.8,
        reviews: 320,
        category: 'burger',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 2,
        title: 'Double Smash Burger',
        desc: 'Two smashed patties with double cheese, caramelized onions and pickles.',
        price: 12.50,
        rating: 4.9,
        reviews: 412,
        category: 'burger',
        image: 'https://images.unsplash.com/photo-1594212691516-069e8f8dc1e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 3,
        title: 'Margherita Pizza',
        desc: 'Traditional pizza with San Marzano tomatoes, fresh mozzarella, and basil.',
        price: 14.00,
        rating: 4.7,
        reviews: 215,
        category: 'pizza',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 4,
        title: 'Pepperoni Supreme',
        desc: 'Loaded with double pepperoni, mozzarella, and a robust tomato sauce.',
        price: 16.50,
        rating: 4.8,
        reviews: 530,
        category: 'pizza',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 5,
        title: 'Salmon Nigiri',
        desc: 'Fresh premium salmon sliced over vinegared rice.',
        price: 18.00,
        rating: 4.9,
        reviews: 128,
        category: 'sushi',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 6,
        title: 'Spicy Tuna Roll',
        desc: 'Spicy ground tuna and cucumber rolled in rice and seaweed.',
        price: 12.00,
        rating: 4.6,
        reviews: 204,
        category: 'sushi',
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 7,
        title: 'Healthy Green Salad',
        desc: 'Fresh greens, cherry tomatoes, cucumbers, and balsamic vinaigrette.',
        price: 9.50,
        rating: 4.5,
        reviews: 95,
        category: 'vegan',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 8,
        title: 'Iced Lemon Tea',
        desc: 'Refreshing home-made iced tea with fresh lemons.',
        price: 4.50,
        rating: 4.4,
        reviews: 310,
        category: 'drinks',
        image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
];

// State
let cart = [];
let currentFilter = 'all';

// DOM Elements
const categoryGrid = document.getElementById('category-grid');
const foodGrid = document.getElementById('food-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartBadge = document.getElementById('cart-badge');
const cartSummary = document.getElementById('cart-summary');
const subtotalEl = document.getElementById('subtotal');
const totalPriceEl = document.getElementById('total-price');
const toastContainer = document.getElementById('toast-container');
const navbar = document.querySelector('.navbar');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderFoodItems(foodItems);
    setupEventListeners();
    updateCartUI();
});

// Setup Event Listeners
function setupEventListeners() {
    // Scroll event for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 30px';
            navbar.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '15px 30px';
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
        }
    });

    // Category Filter Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            e.target.classList.add('active');
            
            const filter = e.target.getAttribute('data-filter');
            filterFoodItems(filter);
        });
    });

    // Cart Toggle
    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
}

// Render Categories
function renderCategories() {
    categoryGrid.innerHTML = '';
    categories.forEach(category => {
        const div = document.createElement('div');
        div.className = `category-item ${category.filter === 'burger' ? 'active' : ''}`;
        div.innerHTML = `
            <div class="cat-icon" style="font-size: 2rem;">${category.icon}</div>
            <h3>${category.name}</h3>
        `;
        div.addEventListener('click', () => {
            // UI Update
            document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
            div.classList.add('active');
            
            // Logic Update
            filterFoodItems(category.filter);
            
            // Also update the buttons in popular section
            filterBtns.forEach(btn => {
                if (btn.getAttribute('data-filter') === category.filter) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        });
        categoryGrid.appendChild(div);
    });
}

// Render Food Items
function renderFoodItems(items) {
    foodGrid.innerHTML = '';
    
    if (items.length === 0) {
        foodGrid.innerHTML = '<p class="text-gray" style="grid-column: 1/-1; text-align:center;">No items found in this category.</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="food-img">
            <div class="food-meta">
                <div class="rating"><span class="star">⭐</span> ${item.rating} <span class="text-gray small">(${item.reviews})</span></div>
            </div>
            <h3 class="food-title">${item.title}</h3>
            <p class="food-desc">${item.desc}</p>
            <div class="space-between" style="align-items: center; margin-top: 15px;">
                <div class="food-price">$${item.price.toFixed(2)}</div>
                <button class="add-btn" data-id="${item.id}" aria-label="Add to cart">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        `;
        
        // Add to cart event
        const addBtn = card.querySelector('.add-btn');
        addBtn.addEventListener('click', () => addToCart(item));
        
        foodGrid.appendChild(card);
    });
}

// Filter Food Items
function filterFoodItems(filter) {
    currentFilter = filter;
    let filtered = [];
    
    if (filter === 'all') {
        filtered = foodItems;
    } else {
        filtered = foodItems.filter(item => item.category === filter);
    }
    
    // Add simple animation
    foodGrid.style.opacity = '0';
    setTimeout(() => {
        renderFoodItems(filtered);
        foodGrid.style.transition = 'opacity 0.3s ease';
        foodGrid.style.opacity = '1';
    }, 200);
}

// Cart Functionality
function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('active');
    
    if (cartSidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartUI();
    showToast(`Added ${item.title} to cart`);
    
    // Animate cart icon
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateQuantity(id, action) {
    const item = cart.find(item => item.id === id);
    if (!item) return;
    
    if (action === 'increase') {
        item.quantity += 1;
    } else if (action === 'decrease') {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }
    }
    updateCartUI();
}

function updateCartUI() {
    // Update Badge
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartBadge.textContent = totalItems;
    
    if (totalItems > 0) {
        cartBadge.style.display = 'flex';
        cartSummary.classList.remove('hide');
    } else {
        cartBadge.style.display = 'none';
        cartSummary.classList.add('hide');
    }
    
    // Render Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-basket-shopping text-gray"></i>
                <p>Your cart is empty</p>
                <button class="btn-primary" onclick="toggleCart()">Start Shopping</button>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;
        
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <div class="qty-btn-group">
                            <button class="qty-btn decrease" data-id="${item.id}"><i class="fa-solid fa-minus" style="font-size:0.7rem;"></i></button>
                            <input type="text" class="qty-input" value="${item.quantity}" readonly>
                            <button class="qty-btn increase" data-id="${item.id}"><i class="fa-solid fa-plus" style="font-size:0.7rem;"></i></button>
                        </div>
                        <i class="fa-solid fa-trash remove-item" data-id="${item.id}"></i>
                    </div>
                </div>
            `;
            
            // Add listeners for this item
            div.querySelector('.decrease').addEventListener('click', () => updateQuantity(item.id, 'decrease'));
            div.querySelector('.increase').addEventListener('click', () => updateQuantity(item.id, 'increase'));
            div.querySelector('.remove-item').addEventListener('click', () => removeFromCart(item.id));
            
            cartItemsContainer.appendChild(div);
        });
        
        // Update Totals
        const deliveryFee = 2.00;
        const total = subtotal + deliveryFee;
        
        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        totalPriceEl.textContent = `$${total.toFixed(2)}`;
    }
}

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = `
        <i class="fa-solid fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 500); // Wait for transition
    }, 3000);
}

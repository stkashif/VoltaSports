// State
let cart = JSON.parse(localStorage.getItem('volta_cart')) || [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.querySelector('.nav-links');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    updateCartUI();

    // Event Listeners
    setupFilters();
    setupCartToggles();
    setupMobileNav();
});

// Star Rating Generator
window.generateStars = function (rating) {
    let html = '<div style="display: flex; align-items: center; gap: 2px;">';
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            html += '<span>★</span>';
        } else if (rating > i - 1) {
            html += '<span style="position: relative; display: inline-block;">' +
                '<span style="position: absolute; left: 0; overflow: hidden; width: 50%; color: #fbbf24;">★</span>' +
                '<span style="color: var(--text-secondary); opacity: 0.3;">★</span>' +
                '</span>';
        } else {
            html += '<span style="color: var(--text-secondary); opacity: 0.3;">★</span>';
        }
    }
    html += '</div>';

    return html;
};

// Render Products
function renderProducts(filter) {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';

    let filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    const isHomePage = document.querySelector('.hero') !== null;
    if (isHomePage) {
        if (filter === 'all') {
            const categories = [...new Set(products.map(p => p.category))];
            filteredProducts = [];
            categories.forEach(cat => {
                filteredProducts.push(...products.filter(p => p.category === cat).slice(0, 3));
            });
        } else {
            filteredProducts = filteredProducts.slice(0, 3);
        }
    }

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <a href="product-details.html?id=${product.id}" style="display:block; width:100%; height:100%;">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </a>
            </div>
            <div class="product-category">${product.category}</div>
            <a href="product-details.html?id=${product.id}"><h3 class="product-name">${product.name}</h3></a>
            <div class="product-rating">
                ${window.generateStars(product.rating)}
                <span style="color: var(--text-secondary); font-size: 0.8rem; margin-left: 5px;">${product.rating}</span>
            </div>
            <div class="product-price-row">
                <div class="product-price">Rs. ${product.price.toLocaleString()}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})" aria-label="Add to cart">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Setup Filters
function setupFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            e.target.classList.add('active');
            // Render
            renderProducts(e.target.dataset.filter);
        });
    });
}

// Cart Toggle
function setupCartToggles() {
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
        });
    }

    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
}

function closeCart() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// Mobile Nav
function setupMobileNav() {
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = ''; // Reset to CSS default rules
                navLinks.style.flexDirection = '';
                navLinks.style.position = '';
                navLinks.style.top = '';
                navLinks.style.left = '';
                navLinks.style.width = '';
                navLinks.style.background = '';
                navLinks.style.padding = '';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(30, 30, 30, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.alignItems = 'center';
            }
        });

        // Close nav when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = '';
                }
            });
        });
    }
}

// Cart Logic
window.addToCart = function (productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();

    // Removed opening of cart when adding to cart from grid
    /*
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    */
}

window.removeFromCart = function (productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

window.updateQuantity = function (productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('volta_cart', JSON.stringify(cart));
}

function updateCartUI() {
    if (!cartCount || !cartItemsContainer || !cartTotalPrice) return;

    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Render items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div style="text-align:center; color: var(--text-secondary); margin-top: 2rem; font-size: 0.9rem;">Your cart is empty.<br><br>Why not add some premium table tennis gear?</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">Rs. ${item.price.toLocaleString()}</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');
    }

    // Update total
    const totalCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `Rs. ${totalCost.toLocaleString()}`;
}

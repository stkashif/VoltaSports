document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-detail-container');
    if (!container) return;

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (!productId || isNaN(productId)) {
        showError(container, "Product not found. Please browse our shop for valid products.");
        return;
    }

    // Find product
    const product = products.find(p => p.id === productId);

    if (!product) {
        showError(container, "Product not found.");
        return;
    }

    renderProductDetails(container, product);
    setupGallery();
});

function showError(container, message) {
    container.innerHTML = `
        <div class="error-message">
            <h2>Oops!</h2>
            <p>${message}</p>
            <a href="shop.html" class="btn btn-primary" style="margin-top: 2rem;">Back to Shop</a>
        </div>
    `;
}

let currentQuantity = 1;

function renderProductDetails(container, product) {
    // Generate star rating string
    const starString = window.generateStars ? window.generateStars(product.rating) : '';

    // Setup thumbnails and main image
    let images = product.images || [product.image];

    let thumbnailsHtml = '';
    if (images.length > 1) {
        thumbnailsHtml = `
            <div class="thumbnail-list">
                ${images.map((img, idx) => `
                    <div class="thumbnail-container ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                        <img src="${img}" alt="${product.name} View ${idx + 1}" class="thumbnail-image">
                    </div>
                `).join('')}
            </div>
        `;
    }

    document.title = `${product.name} - Volta`;

    container.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-gallery">
                <div class="main-image-container">
                    <img src="${images[0]}" alt="${product.name}" class="main-image" id="main-product-image">
                </div>
                ${thumbnailsHtml}
            </div>
            
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h1 class="product-title">${product.name}</h1>
                
                <div class="product-rating">
                    <span>${starString}</span>
                    <span style="color: var(--text-secondary); font-size: 1rem; margin-left: 0.5rem;">${product.rating}</span>
                </div>
                
                <div class="product-price">Rs. ${product.price.toLocaleString()}</div>
                
                <p class="product-description">${product.description}</p>
                
                <div class="product-add-to-cart">
                    <div class="quantity-selector">
                        <button class="quantity-btn" id="btn-dec">-</button>
                        <div class="quantity-value" id="qty-val">${currentQuantity}</div>
                        <button class="quantity-btn" id="btn-inc">+</button>
                    </div>
                    <button class="btn btn-primary btn-add-cart" id="btn-add-main">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    // Quantity controls
    document.getElementById('btn-dec').addEventListener('click', () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            document.getElementById('qty-val').textContent = currentQuantity;
        }
    });

    document.getElementById('btn-inc').addEventListener('click', () => {
        currentQuantity++;
        document.getElementById('qty-val').textContent = currentQuantity;
    });

    // Add to cart main
    document.getElementById('btn-add-main').addEventListener('click', () => {
        // Find existing logic from app.js but with specific quantity
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += currentQuantity;
        } else {
            cart.push({ ...product, quantity: currentQuantity });
        }

        // Use global functions from app.js to update UI and storage
        if (typeof window.saveCart === 'function') window.saveCart();
        if (typeof window.updateCartUI === 'function') window.updateCartUI();

        // Removed opening of cart when adding to cart
        /*
        const cartDrawer = document.getElementById('cart-drawer');
        const cartOverlay = document.getElementById('cart-overlay');
        if (cartDrawer && cartOverlay) {
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
        }
        */
    });
}

function setupGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail-container');
    const mainImage = document.getElementById('main-product-image');

    if (!thumbnails.length || !mainImage) return;

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Remove active from all
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add to clicked
            thumb.classList.add('active');

            // Update main image
            const imgEl = thumb.querySelector('img');
            mainImage.src = imgEl.src;
        });
    });
}

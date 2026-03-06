document.addEventListener('DOMContentLoaded', () => {
    const summaryItemsContainer = document.getElementById('checkout-summary-items');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const totalEl = document.getElementById('checkout-total');
    const form = document.getElementById('checkout-form');

    if (!summaryItemsContainer) return; // Not on the checkout page

    // Local cart variable, retrieved from app.js standard logic
    const currentCart = JSON.parse(localStorage.getItem('volta_cart')) || [];

    // Redirect if empty
    if (currentCart.length === 0) {
        alert("Your cart is empty. Let's add some gear before checking out!");
        window.location.href = "shop.html";
        return;
    }

    renderOrderSummary(currentCart);

    function renderOrderSummary(cartData) {
        summaryItemsContainer.innerHTML = '';
        let subtotal = 0;
        const shippingCost = 250;

        cartData.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const div = document.createElement('div');
            div.className = 'summary-item';
            div.innerHTML = `
                <div class="summary-item-info">
                    <img src="${item.image}" alt="${item.name}" class="summary-item-img">
                    <div class="summary-item-text">
                        <p>${item.name}</p>
                        <span>Qty: ${item.quantity}</span>
                    </div>
                </div>
                <div class="summary-item-price">Rs. ${itemTotal.toLocaleString()}</div>
            `;
            summaryItemsContainer.appendChild(div);
        });

        // Update totals
        subtotalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;

        const finalTotal = subtotal + shippingCost;
        totalEl.textContent = `Rs. ${finalTotal.toLocaleString()}`;
    }

    // Handle Submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Store information for the summary page
            localStorage.setItem('volta_last_order', JSON.stringify({
                cart: currentCart,
                total: document.getElementById('checkout-total').textContent
            }));

            // Clear cart
            localStorage.removeItem('volta_cart');

            // Redirect to success page
            window.location.href = "order-received.html";
        });
    }

    // Toggle different shipping address section
    const shipDifferentCheckbox = document.getElementById('ship-different');
    const shippingAddressContainer = document.getElementById('shipping-address-container');

    if (shipDifferentCheckbox && shippingAddressContainer) {
        shipDifferentCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                shippingAddressContainer.style.display = 'block';
                // Make fields required dynamically if checked
                document.getElementById('ship-first-name').setAttribute('required', 'true');
                document.getElementById('ship-last-name').setAttribute('required', 'true');
                document.getElementById('ship-address').setAttribute('required', 'true');
                document.getElementById('ship-city').setAttribute('required', 'true');
            } else {
                shippingAddressContainer.style.display = 'none';
                // Remove required attribute
                document.getElementById('ship-first-name').removeAttribute('required');
                document.getElementById('ship-last-name').removeAttribute('required');
                document.getElementById('ship-address').removeAttribute('required');
                document.getElementById('ship-city').removeAttribute('required');
            }
        });
    }
});

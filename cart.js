// Shopping Cart Module for Amul Store
(function () {
    const STORAGE_KEY_CART = "amul_cart";
    const STORAGE_KEY_COUPON = "amul_coupon";

    const VALID_COUPONS = {
        "AMUL20": { discountPercent: 20, desc: "20% Off on All Amul Beverages" },
        "AMUL10": { discountPercent: 10, desc: "10% Instant Savings" },
        "FREESHIP": { freeShipping: true, desc: "Free Express Delivery" }
    };

    function getCartItems() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY_CART)) || [];
        } catch (e) {
            return [];
        }
    }

    function saveCartItems(items) {
        localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(items));
        updateCartBadge();
        renderCartDrawer();
        window.dispatchEvent(new CustomEvent("amul:cart-updated", { detail: items }));
    }

    function getAppliedCoupon() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY_COUPON)) || null;
        } catch (e) {
            return null;
        }
    }

    function setAppliedCoupon(coupon) {
        if (coupon) {
            localStorage.setItem(STORAGE_KEY_COUPON, JSON.stringify(coupon));
        } else {
            localStorage.removeItem(STORAGE_KEY_COUPON);
        }
        renderCartDrawer();
    }

    function addToCart(productId, packSize = null, price = null, quantity = 1) {
        const product = window.AmulProducts ? window.AmulProducts.getProductById(productId) : null;
        if (!product) return;

        const actualPackSize = packSize || product.packs[0].size;
        const actualPrice = price !== null ? price : (product.packs[0].price || product.price);
        const itemId = `${productId}_${actualPackSize.replace(/\s+/g, "_")}`;

        const items = getCartItems();
        const existingIndex = items.findIndex(i => i.id === itemId);

        if (existingIndex > -1) {
            items[existingIndex].quantity += quantity;
        } else {
            items.push({
                id: itemId,
                productId: product.id,
                name: product.name,
                flavour: product.flavour,
                packSize: actualPackSize,
                price: actualPrice,
                quantity: quantity,
                image: product.image || "./frames/ezgif-frame-004.jpg",
                colorGradient: product.colorGradient,
                accentColor: product.accentColor,
                icon: product.icon
            });
        }

        saveCartItems(items);
        if (window.AmulAuth) {
            window.AmulAuth.showToast(`Added ${product.name} (${actualPackSize}) to cart!`, "success");
        }
        
        // Auto open cart drawer on first add
        openCartDrawer();
    }

    function updateQuantity(itemId, delta) {
        let items = getCartItems();
        const itemIndex = items.findIndex(i => i.id === itemId);
        if (itemIndex > -1) {
            items[itemIndex].quantity += delta;
            if (items[itemIndex].quantity <= 0) {
                items.splice(itemIndex, 1);
            }
            saveCartItems(items);
        }
    }

    function removeFromCart(itemId) {
        let items = getCartItems();
        items = items.filter(i => i.id !== itemId);
        saveCartItems(items);
        if (window.AmulAuth) {
            window.AmulAuth.showToast("Item removed from cart.", "info");
        }
    }

    function clearCart() {
        saveCartItems([]);
        setAppliedCoupon(null);
    }

    function calculateTotals() {
        const items = getCartItems();
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

        let coupon = getAppliedCoupon();
        let discount = 0;
        let isFreeDeliveryCoupon = false;

        if (coupon && VALID_COUPONS[coupon.code]) {
            const rule = VALID_COUPONS[coupon.code];
            if (rule.discountPercent) {
                discount = Math.round((subtotal * rule.discountPercent) / 100);
            }
            if (rule.freeShipping) {
                isFreeDeliveryCoupon = true;
            }
        }

        const freeDeliveryThreshold = 199;
        const baseDelivery = 30;
        const deliveryFee = (subtotal === 0 || subtotal >= freeDeliveryThreshold || isFreeDeliveryCoupon) ? 0 : baseDelivery;
        const taxableAmount = Math.max(0, subtotal - discount);
        const taxes = Math.round(taxableAmount * 0.05); // 5% GST on packaged beverages
        const grandTotal = subtotal === 0 ? 0 : (taxableAmount + deliveryFee + taxes);

        return {
            itemsCount: totalItemsCount,
            subtotal,
            discount,
            deliveryFee,
            taxes,
            grandTotal,
            freeDeliveryThreshold,
            amountNeededForFreeDelivery: Math.max(0, freeDeliveryThreshold - subtotal),
            coupon
        };
    }

    function updateCartBadge() {
        const totals = calculateTotals();
        const badges = document.querySelectorAll(".cart-badge-count");
        const totalDisplays = document.querySelectorAll(".cart-badge-total");

        badges.forEach(b => {
            b.innerText = totals.itemsCount;
            if (totals.itemsCount > 0) {
                b.classList.remove("hidden");
                b.classList.add("flex");
            } else {
                b.classList.add("hidden");
                b.classList.remove("flex");
            }
        });

        totalDisplays.forEach(t => {
            t.innerText = `₹${totals.grandTotal}`;
        });
    }

    function renderCartDrawer() {
        const container = document.getElementById("cart-drawer-items");
        const summaryContainer = document.getElementById("cart-drawer-summary");
        const freeDeliveryBar = document.getElementById("cart-free-delivery-banner");
        if (!container) return;

        const items = getCartItems();
        const totals = calculateTotals();

        // Free Delivery Progress
        if (freeDeliveryBar) {
            if (items.length === 0) {
                freeDeliveryBar.classList.add("hidden");
            } else {
                freeDeliveryBar.classList.remove("hidden");
                if (totals.amountNeededForFreeDelivery === 0) {
                    freeDeliveryBar.innerHTML = `
                        <div class="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-3 rounded-2xl flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                            <span class="material-icons text-base text-emerald-600">verified</span>
                            <span>Congratulations! You have unlocked <b>FREE Express Delivery</b>.</span>
                        </div>
                    `;
                } else {
                    const progressPercent = Math.min(100, Math.round((totals.subtotal / totals.freeDeliveryThreshold) * 100));
                    freeDeliveryBar.innerHTML = `
                        <div class="bg-pink-50 dark:bg-pink-950/30 p-3 rounded-2xl border border-pink-100 dark:border-pink-900">
                            <div class="flex justify-between text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                <span>Add <b>₹${totals.amountNeededForFreeDelivery}</b> more for <span class="text-primary font-bold">FREE Delivery</span></span>
                                <span>${progressPercent}%</span>
                            </div>
                            <div class="w-full bg-pink-200/60 dark:bg-pink-900/50 h-1.5 rounded-full overflow-hidden">
                                <div class="bg-primary h-full rounded-full transition-all duration-300" style="width: ${progressPercent}%;"></div>
                            </div>
                        </div>
                    `;
                }
            }
        }

        if (items.length === 0) {
            container.innerHTML = `
                <div class="h-full flex flex-col items-center justify-center text-center p-8 py-16">
                    <div class="w-24 h-24 rounded-full bg-pink-50 dark:bg-surface-dark border border-pink-100 dark:border-gray-800 flex items-center justify-center mb-4">
                        <span class="material-icons text-5xl text-primary/40">shopping_bag</span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 font-display">Your Cart is Empty</h3>
                    <p class="text-xs text-gray-500 max-w-xs mt-1 mb-6">
                        Explore our chilled Amul Tru juices, Kool flavoured milk, and delicious shakes to fill your bag!
                    </p>
                    <button onclick="window.AmulCart.closeCartDrawer(); document.getElementById('store').scrollIntoView({behavior: 'smooth'});" class="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full text-xs font-bold shadow-md shadow-primary/20">
                        Explore Refreshing Drinks
                    </button>
                </div>
            `;
            if (summaryContainer) {
                summaryContainer.innerHTML = "";
            }
            return;
        }

        // Render Cart Items
        container.innerHTML = items.map(item => `
            <div class="flex items-center gap-3 p-3 bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <!-- Thumbnail -->
                <div class="w-16 h-16 rounded-xl bg-gradient-to-br ${item.colorGradient} p-0.5 flex items-center justify-center flex-shrink-0 shadow-inner relative overflow-hidden">
                    <img src="${item.image || './frames/ezgif-frame-004.jpg'}" alt="${item.name}" class="w-full h-full object-cover rounded-lg" />
                </div>

                <!-- Info -->
                <div class="flex-1 min-w-0">
                    <h4 class="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">${item.name}</h4>
                    <p class="text-[11px] text-gray-400 font-medium">${item.packSize}</p>
                    <div class="flex items-baseline gap-1 mt-1">
                        <span class="text-xs font-bold text-primary">₹${item.price}</span>
                        <span class="text-[10px] text-gray-400">x ${item.quantity} = ₹${item.price * item.quantity}</span>
                    </div>
                </div>

                <!-- Quantity Steppers & Delete -->
                <div class="flex flex-col items-end gap-1.5">
                    <button onclick="window.AmulCart.removeFromCart('${item.id}')" class="text-gray-400 hover:text-red-500 transition-colors p-0.5">
                        <span class="material-icons text-sm">delete_outline</span>
                    </button>
                    <div class="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 border border-gray-200 dark:border-gray-700">
                        <button onclick="window.AmulCart.updateQuantity('${item.id}', -1)" class="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold">
                            -
                        </button>
                        <span class="w-6 text-center text-xs font-bold text-gray-800 dark:text-gray-200">${item.quantity}</span>
                        <button onclick="window.AmulCart.updateQuantity('${item.id}', 1)" class="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold">
                            +
                        </button>
                    </div>
                </div>
            </div>
        `).join("");

        // Render Summary Container
        if (summaryContainer) {
            summaryContainer.innerHTML = `
                <!-- Coupon Section -->
                <div class="mb-4">
                    <form onsubmit="event.preventDefault(); window.AmulCart.applyCouponFromInput();" class="flex gap-2">
                        <div class="relative flex-1">
                            <input type="text" id="coupon-input-code" placeholder="Enter Coupon (e.g. AMUL20)" class="w-full text-xs uppercase font-semibold tracking-wider bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary dark:text-white" value="${totals.coupon ? totals.coupon.code : ''}">
                        </div>
                        <button type="submit" class="bg-gray-900 dark:bg-gray-700 hover:bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors">
                            ${totals.coupon ? 'Applied' : 'Apply'}
                        </button>
                    </form>
                    ${totals.coupon ? `
                        <div class="flex items-center justify-between mt-2 px-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                            <span>Coupon ${totals.coupon.code} applied! (${totals.coupon.desc})</span>
                            <button onclick="window.AmulCart.removeCoupon()" class="text-red-500 underline text-[11px]">Remove</button>
                        </div>
                    ` : `
                        <div class="flex gap-2 mt-1.5 px-1">
                            <span onclick="window.AmulCart.applyCoupon('AMUL20')" class="cursor-pointer text-[10px] bg-pink-50 dark:bg-pink-950/40 text-primary border border-dashed border-primary/40 px-2 py-0.5 rounded-md font-mono font-bold hover:bg-pink-100">AMUL20</span>
                            <span onclick="window.AmulCart.applyCoupon('FREESHIP')" class="cursor-pointer text-[10px] bg-pink-50 dark:bg-pink-950/40 text-primary border border-dashed border-primary/40 px-2 py-0.5 rounded-md font-mono font-bold hover:bg-pink-100">FREESHIP</span>
                        </div>
                    `}
                </div>

                <!-- Price Breakdown -->
                <div class="space-y-2 text-xs border-t border-gray-100 dark:border-gray-800 pt-3">
                    <div class="flex justify-between text-gray-500 dark:text-gray-400">
                        <span>Items Subtotal</span>
                        <span class="font-semibold text-gray-800 dark:text-gray-200">₹${totals.subtotal}</span>
                    </div>
                    ${totals.discount > 0 ? `
                        <div class="flex justify-between text-emerald-600 font-semibold">
                            <span>Promo Discount</span>
                            <span>-₹${totals.discount}</span>
                        </div>
                    ` : ''}
                    <div class="flex justify-between text-gray-500 dark:text-gray-400">
                        <span>Delivery Fee</span>
                        <span class="${totals.deliveryFee === 0 ? 'text-emerald-600 font-semibold' : 'text-gray-800 dark:text-gray-200 font-semibold'}">
                            ${totals.deliveryFee === 0 ? 'FREE' : `₹${totals.deliveryFee}`}
                        </span>
                    </div>
                    <div class="flex justify-between text-gray-500 dark:text-gray-400">
                        <span>GST & Taxes (5%)</span>
                        <span class="font-semibold text-gray-800 dark:text-gray-200">₹${totals.taxes}</span>
                    </div>
                    <div class="flex justify-between text-sm font-extrabold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-gray-800">
                        <span>Total Payable</span>
                        <span class="text-primary text-base font-extrabold">₹${totals.grandTotal}</span>
                    </div>
                </div>

                <!-- Checkout Button -->
                <button onclick="window.AmulCheckout.openCheckoutModal()" class="w-full mt-4 bg-primary hover:bg-primary-dark text-white py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-between shadow-lg shadow-primary/30 active:scale-98 transition-all">
                    <span>Proceed to Checkout</span>
                    <div class="flex items-center gap-1 font-extrabold">
                        <span>₹${totals.grandTotal}</span>
                        <span class="material-icons text-sm">arrow_forward</span>
                    </div>
                </button>
            `;
        }
    }

    function applyCoupon(code) {
        const upper = code.trim().toUpperCase();
        if (VALID_COUPONS[upper]) {
            setAppliedCoupon({ code: upper, ...VALID_COUPONS[upper] });
            if (window.AmulAuth) {
                window.AmulAuth.showToast(`Coupon ${upper} applied successfully!`, "success");
            }
        } else {
            if (window.AmulAuth) {
                window.AmulAuth.showToast("Invalid coupon code. Try AMUL20 or FREESHIP", "error");
            }
        }
    }

    function applyCouponFromInput() {
        const input = document.getElementById("coupon-input-code");
        if (input && input.value) {
            applyCoupon(input.value);
        }
    }

    function removeCoupon() {
        setAppliedCoupon(null);
        if (window.AmulAuth) {
            window.AmulAuth.showToast("Coupon removed.", "info");
        }
    }

    function openCartDrawer() {
        const drawer = document.getElementById("cart-drawer");
        const backdrop = document.getElementById("cart-drawer-backdrop");
        if (!drawer || !backdrop) return;

        backdrop.classList.remove("opacity-0", "pointer-events-none");
        backdrop.classList.add("opacity-100", "pointer-events-auto");

        drawer.classList.remove("translate-x-full");
        drawer.classList.add("translate-x-0");

        renderCartDrawer();
    }

    function closeCartDrawer() {
        const drawer = document.getElementById("cart-drawer");
        const backdrop = document.getElementById("cart-drawer-backdrop");
        if (!drawer || !backdrop) return;

        backdrop.classList.remove("opacity-100", "pointer-events-auto");
        backdrop.classList.add("opacity-0", "pointer-events-none");

        drawer.classList.remove("translate-x-0");
        drawer.classList.add("translate-x-full");
    }

    document.addEventListener("DOMContentLoaded", () => {
        updateCartBadge();
    });

    window.AmulCart = {
        getCartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        calculateTotals,
        applyCoupon,
        applyCouponFromInput,
        removeCoupon,
        openCartDrawer,
        closeCartDrawer,
        updateCartBadge,
        renderCartDrawer
    };
})();

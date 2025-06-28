document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Cart Items:", cartItems);

    const cartContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const discountElement = document.getElementById("discount");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");
    const removeAllBtn = document.getElementById("remove-all");

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p class='text-gray-500 text-center'>Your cart is empty.</p>";
        return;
    }

    let subtotal = 0;
    let discount = 0;
    let tax = 0;
    let total = 0;

    cartItems.forEach(item => {
        subtotal += item.price * item.quantity;
        let shortDesc = item.description.length > 100 ? item.description.substring(0, 100) + "..." : item.description;
        
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("flex", "items-center", "p-4", "border-b", "rounded-lg", "bg-white", "shadow-sm", "gap-4", "flex-col", "md:flex-row");
        
        itemDiv.innerHTML = `
            <div class="flex items-center gap-4 w-full">
                <img src="${item.image}" class="h-16 w-16 object-cover rounded-md border" alt="${item.name}">
                <div class="flex-1">
                    <h3 class="font-semibold text-sm md:text-lg">${item.name}</h3>
                    <p class="text-gray-500 text-xs md:text-sm desc hidden md:block" data-full="${item.description}">
                        ${shortDesc}
                    </p>
                    <p class="text-gray-500 text-xs">Seller: <span class="text-blue-600">Artel Market</span></p>
                </div>
                <button class="text-gray-500 md:hidden">⋮</button>
            </div>
            
            <div class="flex items-center justify-between w-full md:w-auto">
                <div class="flex items-center border rounded px-2 quantity-container">
                    <button class="text-lg px-2 md:hidden decrease-btn" data-id="${item.id}">−</button>
                    <span class="px-2 md:hidden">${item.quantity}</span>
                    <button class="text-lg px-2 md:hidden increase-btn" data-id="${item.id}">+</button>
                    <select class="hidden md:block quantity-selector border rounded px-2 py-1" data-id="${item.id}">
                        ${[...Array(10).keys()].map(i => `<option value="${i+1}" ${item.quantity == i+1 ? 'selected' : ''}>${i+1}</option>`).join('')}
                    </select>
                </div>
                <p class="font-semibold text-lg">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        cartContainer.appendChild(itemDiv);
    });

    // Apply Discounts & Taxes
    discount = subtotal > 100 ? subtotal * 0.05 : 0;
    tax = subtotal * 0.01;
    total = subtotal - discount + tax;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    discountElement.textContent = `-$${discount.toFixed(2)}`;
    taxElement.textContent = `+$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;

    // Update quantity using dropdown for desktop
    document.querySelectorAll(".quantity-selector").forEach(select => {
        select.addEventListener("change", function () {
            const itemId = this.dataset.id;
            const newQuantity = parseInt(this.value);
            cartItems = cartItems.map(item => item.id == itemId ? { ...item, quantity: newQuantity } : item);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            location.reload();
        });
    });

    // Update quantity using buttons for mobile
    document.querySelectorAll(".increase-btn").forEach(button => {
        button.addEventListener("click", function () {
            const itemId = this.dataset.id;
            cartItems = cartItems.map(item => item.id == itemId ? { ...item, quantity: item.quantity + 1 } : item);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            location.reload();
        });
    });
    
    document.querySelectorAll(".decrease-btn").forEach(button => {
        button.addEventListener("click", function () {
            const itemId = this.dataset.id;
            cartItems = cartItems.map(item => item.id == itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            location.reload();
        });
    });

    // Remove all items
    removeAllBtn.addEventListener("click", function () {
        localStorage.removeItem("cart");
        location.reload();
    });
});

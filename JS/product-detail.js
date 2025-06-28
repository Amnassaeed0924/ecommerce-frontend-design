document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Extract product ID from the URL (assuming URL contains ?id=123)
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get("id");

        // Fetch JSON data
        
        const response = await fetch("../JS/products.json");
        const products = await response.json();

        // Find the product based on the ID
        const product = products.find(p => p.id == productId);

        if (!product) {
            console.error("Product not found");
            return;
        }

        // Update HTML elements dynamically
        document.getElementById("productImage").src = product.image;
        document.getElementById("productName").textContent = product.name;
        document.getElementById("productReviews").textContent = product.reviews;
        document.getElementById("productOrders").textContent = `${product.orders} sold`;
        document.getElementById("originalPrice1").textContent = `$${product.originalPrice}`;
        document.getElementById("originalPrice2").textContent = `$${product.originalPrice}`;
        document.getElementById("discountedPrice").textContent = `$${product.price}`;
        document.getElementById("productDescription").textContent = product.description;

        // Attach event listeners to both Add to Cart buttons
        document.getElementById("addToCartBtn").addEventListener("click", () => addToCart(product));
        document.getElementById("addToCartBtn2").addEventListener("click", () => addToCart(product));

    } catch (error) {
        console.error("Error fetching product data:", error);
    }
});

// Function to add product to cart
function addToCart(product) {
    // Get existing cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    let existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
        console.log("Product already in cart. Updating quantity.");
        existingItem.quantity += 1; // Increase quantity if already added
    } else {
        console.log("Adding new product to cart.");
        product.quantity = 1; // Set initial quantity

        // Ensure product details are included
        const productToAdd = {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            reviews: product.reviews,
            orders: product.orders,
            description: product.description,
            quantity: 1
        };

        cartItems.push(productToAdd);
    }

    // Save updated cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));
    console.log("Updated Cart:", JSON.parse(localStorage.getItem("cart")));

    alert("Product added to cart!");
}
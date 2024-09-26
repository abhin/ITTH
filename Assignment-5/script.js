// Get references to the DOM elements
const productForm = document.getElementById("product-form");
const productList = document.getElementById("product-list");
const totalAmountElement = document.getElementById("total-amount");

let cart = [];

// Function to update the total amount
function updateTotalAmount() {
  let total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  totalAmountElement.textContent = total.toFixed(2);
}

// Function to render the product list
function renderProductList() {
  productList.innerHTML = ""; // Clear the product list

  cart.forEach((product, index) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
            <div class="product-info">
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h4>${product.name}</h4>
                    <p>Price: $${product.price}</p>
                    <p>Quantity: ${product.quantity}</p>
                </div>
            </div>
            <div class="product-actions">
                <button onclick="increaseQuantity(${index})">+</button>
                <button onclick="decreaseQuantity(${index})">-</button>
                <button class="remove-btn" onclick="removeProduct(${index})">Remove</button>
            </div>
        `;

    productList.appendChild(productDiv);
  });

  // Update the total amount
  updateTotalAmount();
}

// Function to add a new product to the cart
productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("product-name").value;
  const image = document.getElementById("product-image").value;
  const price = parseFloat(document.getElementById("product-price").value);

  // Create a new product object
  const newProduct = {
    name,
    image,
    price,
    quantity: 1,
  };

  // Add the new product to the cart
  cart.push(newProduct);

  // Clear the form
  productForm.reset();

  // Render the updated product list
  renderProductList();
});

// Function to increase the quantity of a product
function increaseQuantity(index) {
  cart[index].quantity++;
  renderProductList();
}

// Function to decrease the quantity of a product
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    removeProduct(index);
  }
  renderProductList();
}

// Function to remove a product from the cart
function removeProduct(index) {
  cart.splice(index, 1);
  renderProductList();
}

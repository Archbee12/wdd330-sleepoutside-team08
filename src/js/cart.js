import { getLocalStorage, setLocalStorage } from "./utils.mjs";

//  Step 1: Render the cart contents with a quantity input
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = `
      <li style="text-align: center; padding: 2rem;">Your cart is empty.</li>`;
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item)).join("");
  document.querySelector(".product-list").innerHTML = htmlItems;

  renderCartTotal(cartItems);
  attachQuantityListeners(); //  Attach quantity change listeners
  attachRemoveListeners(); //  Attach remove button functionality
}

//  Step 2: Add quantity input field and remove button in the template
function cartItemTemplate(item) {
  const quantity = item.Quantity || 1;
  const itemSubtotal = (item.FinalPrice * quantity).toFixed(2);

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    
    <label for="qty-${item.Id}">Qty:</label>
    <input 
      type="number" 
      id="qty-${item.Id}" 
      class="quantity-input" 
      value="${quantity}" 
      min="1" 
      data-id="${item.Id}" 
    />

    <p class="cart-card__subtotal">Subtotal: $${itemSubtotal}</p>

    <button class="remove-item" data-id="${item.Id}">Remove</button>
  </li>`;
}

//  Step 3: Recalculate totals based on Quantity
function calculateCartTotal(cartItems) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.Quantity || 1),
    0,
  );
  return total.toFixed(2);
}

function renderCartTotal(cartItems) {
  // First, remove any existing total summary section
  const existingSummary = document.querySelector(".cart-summary");
  if (existingSummary) {
    existingSummary.remove();
  }

  const total = calculateCartTotal(cartItems);
  const summaryHTML = `
    <section class="cart-summary" style="text-align:right; margin: 2rem;">
      <hr />
      <p><strong>Total:</strong> $${total}</p>
    </section>
  `;

  document
    .querySelector(".products")
    .insertAdjacentHTML("beforeend", summaryHTML);
}

//  Step 4: Attach event listeners to quantity inputs
function attachQuantityListeners() {
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", (event) => {
      const newQty = parseInt(event.target.value);
      const id = event.target.dataset.id;

      if (newQty < 1 || isNaN(newQty)) {
        event.target.value = 1; // fallback to 1
        return;
      }

      let cart = getLocalStorage("so-cart") || [];
      const itemIndex = cart.findIndex((item) => item.Id === id);

      if (itemIndex > -1) {
        // Update quantity
        cart[itemIndex].Quantity = newQty;
        setLocalStorage("so-cart", cart);

        // Update subtotal on that item
        const subtotalElement = input
          .closest(".cart-card")
          .querySelector(".cart-card__subtotal");
        const newSubtotal = (cart[itemIndex].FinalPrice * newQty).toFixed(2);
        subtotalElement.textContent = `Subtotal: $${newSubtotal}`;

        // Remove and re-render only the total section
        const summaryEl = document.querySelector(".cart-summary");
        if (summaryEl) summaryEl.remove();

        renderCartTotal(cart);
      }
    });
  });
}

//  Step 5: (Optional but recommended) Remove item button logic
function attachRemoveListeners() {
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.dataset.id;

      let cart = getLocalStorage("so-cart") || [];
      cart = cart.filter((item) => item.Id !== id);

      setLocalStorage("so-cart", cart);
      renderCartContents(); //  Refresh cart
    });
  });
}

//  Initialize
renderCartContents();

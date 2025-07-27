import { loadHeaderFooter, getLocalStorage, initSearchBar } from "./utils.mjs";
import { updateCartCount } from "./CartCount.mjs";

loadHeaderFooter().then(() => {
  initSearchBar(); // ✅ Attaches search form listener
  updateCartCount(); // ✅ Runs after header is injected
});

//  Step 1: Render the cart contents with a quantity input
function renderCartContents() {
  let cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".remove-btn").forEach((icon) => {
    icon.addEventListener("click", () => {
      const removeId = icon.dataset.id;
      // let cartItems = getLocalStorage("so-cart") || [];

      cartItems = cartItems
        .map((item) => {
          if (item.Id === removeId) {
            item.quantity = (item.quantity || 1) - 1;
          }

          return item;
        })
        .filter((item) => item.quantity > 0);

      localStorage.setItem("so-cart", JSON.stringify(cartItems));

      renderCartContents();
      updateCartCount();
    });
  });

  document.querySelectorAll(".increase").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      let cart = getLocalStorage("so-cart") || [];

      cart = cart.map((item) => {
        if (item.Id == id) {
          item.quantity = (item.quantity || 1) + 1;
        }
        return item;
      });

      localStorage.setItem("so-cart", JSON.stringify(cart));
      renderCartContents();
    });
  });

  document.querySelectorAll(".decrease").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      let cart = getLocalStorage("so-cart") || [];

      cart = cart.map((item) => {
        if (item.Id == id) {
          item.quantity = (item.quantity || 1) - 1;
        }
        return item;
      });

      localStorage.setItem("so-cart", JSON.stringify(cart));
      renderCartContents();
    });
  });

  updateCartTotal(cartItems);
}

function updateCartTotal(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = cartFooter.querySelector(".cart-total");

  if (cartItems.length > 0) {
    const total = cartItems.reduce((sum, item) => {
      const quantity = item.quantity || 1;
      return sum + item.FinalPrice * quantity;
    }, 0);

    cartFooter.classList.remove("hide");
    cartTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
  } else {
    cartFooter.classList.add("hide");
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item)).join("");
  document.querySelector(".product-list").innerHTML = htmlItems;

  renderCartTotal(cartItems);
  attachquantityListeners(); //  Attach quantity change listeners
  attachRemoveListeners(); //  Attach remove button functionality
}

//  Step 2: Add quantity input field and remove button in the template
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider" data-id="${item.Id}">
    <span class="remove-btn" data-id="${item.Id}">❌</span>
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="quantity-controls">
      <button class="decrease" data-id="${item.Id}">-</button>
      <span class="cart-card__quantity">Qty: ${item.quantity || 1}</span>
      <button class="increase" data-id="${item.Id}">+</button>
    </div>
    <p class="cart-card__price">$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
  </li>`;
}

//  Step 3: Recalculate totals based on Quantity
function calculateCartTotal(cartItems) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
    0,
  );
  return total.toFixed(2);
}

function renderCartTotal(cartItems) {
  const existingSummary = document.querySelector(".cart-summary");
  if (existingSummary) {
    existingSummary.remove();
  }

  const total = calculateCartTotal(cartItems);
  const summaryHTML = `
    <section class="cart-summary" style="text-align:right; margin: 2rem;">
      <hr />
      <p><strong>Total:</strong> $${total}</p>
      <button id="checkout-btn" class="checkout-button">Proceed to Checkout</button>
    </section>
  `;

  document
    .querySelector(".products")
    .insertAdjacentHTML("beforeend", summaryHTML);

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to proceed to checkout?")) {
        window.location.href = "../checkout/index.html";
      }
    });
  }
}

//  Step 4: Attach event listeners to quantity inputs
function attachquantityListeners() {
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

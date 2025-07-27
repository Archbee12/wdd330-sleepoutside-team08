import { loadHeaderFooter, getLocalStorage, initSearchBar } from "./utils.mjs";
import { updateCartCount } from "./CartCount.mjs";
// loadHeaderFooter();
// initSearchBar();

loadHeaderFooter().then(() => {
  initSearchBar();      // ✅ Attaches search form listener
  updateCartCount();    // ✅ Runs after header is injected
});

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
}

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

  return newItem;
}

renderCartContents();

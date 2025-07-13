import { qs, getLocalStorage } from "./utils.mjs";

const CART_KEY = "so-cart";

/**
 * Build the HTML for a single cart item.
 */
function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <h2 class="card__name">${item.Name}</h2>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

/**
 * Read cart from storage, render items, and show/hide the total.
 */
function renderCart() {
  // 1️⃣ Load or default to empty array
  const items = getLocalStorage(CART_KEY) || [];
  
  // 2️⃣ Render the list
  const listEl = qs(".product-list");
  listEl.innerHTML = items.map(cartItemTemplate).join("");

  // 3️⃣ Compute & display total if any items exist
  const footer = qs(".cart-footer");
  if (items.length > 0) {
    footer.classList.remove("hide");
    const total = items
      .reduce((sum, item) => sum + Number(item.FinalPrice), 0)
      .toFixed(2);
    qs(".cart-total", footer).textContent = `Total: $${total}`;
  } else {
    footer.classList.add("hide");
  }
}

// Kick off rendering once DOM is ready
document.addEventListener("DOMContentLoaded", renderCart);

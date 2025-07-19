
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const count = cart.reduce((sum, item) => sum + (item.Quantity || 1), 0);
  const cartCountEl = document.querySelector(".cart-count");
  if (cartCountEl) cartCountEl.textContent = count;
}

// Load header/footer and update cart count after header loads
loadHeaderFooter({ onHeaderLoaded: updateCartCount });

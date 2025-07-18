import { getLocalStorage } from "./utils.mjs";
import Alert from "./alert.js";

const alertSystem = new Alert("/data/alerts.json");
alertSystem.init();


function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const count = cart.reduce((sum, item) => sum + (item.Quantity || 1), 0);
  document.querySelector(".cart-count").textContent = count;
}

// Call this on load
updateCartCount();

import { updateCartCount } from "./CartCount.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// loadHeaderFooter();
// document.addEventListener("DOMContentLoaded", () => {
//   updateCartCount();

// })
// Call this on load
loadHeaderFooter().then(() => {
  updateCartCount(); // ✅ Now header is in the DOM, no error
});

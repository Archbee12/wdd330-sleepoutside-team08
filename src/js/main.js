import { updateCartCount } from "./CartCount.mjs";
import { loadHeaderFooter } from "./utils.mjs";


document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();

  updateCartCount();

});


// Call this on load

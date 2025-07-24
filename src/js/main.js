import { updateCartCount } from "./CartCount.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.mjs";

const alert = new Alert("/json/alerts.json");
alert.init();

// loadHeaderFooter();
// document.addEventListener("DOMContentLoaded", () => {
//   updateCartCount();

// })
// Call this on load
loadHeaderFooter().then(() => {
  updateCartCount(); // ✅ Now header is in the DOM, no error
});

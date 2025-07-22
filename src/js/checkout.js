import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// Load the header and footer
loadHeaderFooter();

// Initialize checkout process
const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const zipInput = document.querySelector("#zip");

  // ✅ Immediately recalculate total if ZIP has value (e.g., from autofill)
  if (zipInput && zipInput.value) {
    checkout.calculateOrderTotal();
  }

  // 📦 Recalculate totals after ZIP code is entered or changed
  if (zipInput) {
    zipInput.addEventListener("blur", () => {
      checkout.calculateOrderTotal();
    });
  }

  const checkoutForm = document.querySelector("#checkout-form");

  // ✅ Hook up form submission
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent actual form submission

      // 🚫 If form is invalid
      if (!checkoutForm.checkValidity()) {
        alert("Please fill out all required fields.");
      } else {
        // ✅ Run checkout logic
        checkout.checkout(e.target);
        alert("Order Submitted!");
      }
    });
  }
});

import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// Load the header and footer
loadHeaderFooter();

// Initialize checkout process
const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

// Recalculate totals after ZIP code is entered
document.addEventListener("DOMContentLoaded", () => {
  const zipInput = document.querySelector("#zip");
  if (zipInput) {
    zipInput.addEventListener("blur", () => {
      checkout.calculateOrderTotal();
    });
  }

  const checkoutForm = document.querySelector("#checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      if (!e.target.checkValidity()) {
        e.preventDefault();
        alert("Please fill out all required fields.");
      } else {
        e.preventDefault(); // just for demo/testing
        alert("Order Submitted!");
        // console.log("Final order data:", order);
      }
    });
  } else {
    // do nothing
  }
});

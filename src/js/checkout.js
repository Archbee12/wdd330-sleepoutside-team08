import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { updateCartCount } from "./CartCount.mjs";

loadHeaderFooter().then(() => {
  updateCartCount();
});

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.addEventListener("DOMContentLoaded", () => {
  const zipInput = document.querySelector("#zip");
  if (zipInput) {
    zipInput.addEventListener("blur", checkout.calculateOrderTotal.bind(checkout));
  }

  const checkoutForm = document.querySelector("#checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!e.target.checkValidity()) {
        alert("Please fill out all required fields.");
        return;
      }

      await checkout.checkout();
    });
  }
});

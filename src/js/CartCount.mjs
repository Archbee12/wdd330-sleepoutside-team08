import { getLocalStorage } from "./utils.mjs";


export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCount = document.getElementById("cart-count");

  const count = cartItems.length;
  console.log("Cart count updated:", count);



  if (count > 0) {
    cartCount.textContent = count;
    cartCount.classList.remove("hide");
  }
  else {
    cartCount.classList.add("hide");
  }
}

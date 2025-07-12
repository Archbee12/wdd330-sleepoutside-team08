// src/cart.js

/**
 * Read and parse a JSON value from localStorage.
 * @param {string} key
 * @returns {any|null}
 */
export function getLocalStorage(key) {
  const json = localStorage.getItem(key);
  return json ? JSON.parse(json) : null;
}

/**
 * Stringify and write a value to localStorage.
 * @param {string} key
 * @param {any} value
 */
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Add a product object to the cart in localStorage under 'so-cart'.
 * If the cart doesn’t exist yet, start a new array.
 * @param {Object} product
 */
export function addProductToCart(product) {
  // 1️⃣ Grab existing cart (or empty array)
  const cart = getLocalStorage("so-cart") || [];

  // 2️⃣ Append the new product
  cart.push(product);

  // 3️⃣ Save the updated array back
  setLocalStorage("so-cart", cart);
}

/**
 * Return the current array of products in the cart.
 * @returns {Object[]}
 */
export function getCartProducts() {
  return getLocalStorage("so-cart") || [];
}

/**
 * Remove all items from the cart.
 */
export function clearCart() {
  localStorage.removeItem("so-cart");
}

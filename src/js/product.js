import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // get current products in cart
  let products = getLocalStorage("so-cart");

  // confirm if cart is empty
  if (!products) {
    let newProductList = products.concat(product);
    setLocalStorage("so-cart", newProductList);
  } else {
    /**
     * so cart was empty
     * we need to create a new array
     * and add the product to it
     */
    setLocalStorage("so-cart", Array(product));
  }
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

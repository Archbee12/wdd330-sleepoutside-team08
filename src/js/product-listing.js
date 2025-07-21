import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { updateCartCount } from "./CartCount.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter(); // wait for header/footer to load
  updateCartCount(); // update cart icon badge

  // Get the category from the URL
  const category = getParam("category") || "tents";

  // Select the list element (now guaranteed to exist)
  const listElement = document.querySelector(".product-list");

  // Instantiate and initialize product list
  const dataSource = new ProductData(category);
  const productList = new ProductList(category, dataSource, listElement);
  productList.init();
});

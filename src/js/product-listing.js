import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";





// Get the category from the URL
const category = getParam("category") ?? "tents";

// Instantiate and initialize product list
const dataSource = new ProductData();
// Select the list element
const listElement = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, listElement);
listing.init();

loadHeaderFooter();

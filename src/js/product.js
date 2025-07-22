import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
// import ProductList from "./ProductList.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices("tents");
const productID = getParam("product");

const listing = new ProductDetails(productID, dataSource);

// const category = getParam("category");
// const dataSource = new ExternalServices();
// const element = document.querySelector(".product-list");
// const listing = new ProductList(category, dataSource, element);

listing.init();

import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
// import ProductList from "./ProductList.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productID = getParam("products");

const listing = new ProductDetails(productID, dataSource);

// const category = getParam("category");
// const dataSource = new ProductData();
// const element = document.querySelector(".product-list");
// const listing = new ProductList(category, dataSource, element);

listing.init();

import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("product");

const dataSource = new ProductData("tents");
const product = new ProductDetails(productId, dataSource);
product.init();

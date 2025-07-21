import ProductDetails from "./ProductDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("product");

const dataSource = new ExternalServices("tents");
const product = new ProductDetails(productId, dataSource);
product.init();

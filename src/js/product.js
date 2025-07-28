import { loadHeaderFooter, getParam, initSearchBar } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
// import ProductList from "./ProductList.mjs";
import ProductDetails from "./ProductDetails.mjs";



loadHeaderFooter().then(() => {
  initSearchBar(); // ✅ Correct way to initialize search bar after header loads
});

const dataSource = new ExternalServices();
const productID = getParam("product");

const listing = new ProductDetails(productID, dataSource);

listing.init();

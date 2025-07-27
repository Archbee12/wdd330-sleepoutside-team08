import { loadHeaderFooter, getParam, initSearchBar } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
// import ProductList from "./ProductList.mjs";
import ProductDetails from "./ProductDetails.mjs";


// loadHeaderFooter().then(() => {
//   const searchForm = document.getElementById("searchForm");
//   if (searchForm) {
//     searchForm.addEventListener("submit", (e) => {
//       e.preventDefault();
//       const query = document.getElementById("searchInput").value.trim();
//       if (query) {
//         // Redirect to the product listing page with search query
//         window.location.href = `/product-listing.html?search=${encodeURIComponent(query)}`;
//       }
//     });
//   }
// });

loadHeaderFooter().then(() => {
  initSearchBar(); // ✅ Correct way to initialize search bar after header loads
});

const dataSource = new ExternalServices();
const productID = getParam("product");

const listing = new ProductDetails(productID, dataSource);

// const category = getParam("category");
// const dataSource = new ExternalServices();
// const element = document.querySelector(".product-list");
// const listing = new ProductList(category, dataSource, element);

listing.init();

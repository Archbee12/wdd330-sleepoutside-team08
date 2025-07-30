import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductList from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { updateCartCount } from "./CartCount.mjs";
import { updateBreadcrumb } from "./BreadCrumbs.mjs";
import { initQuickView } from "./QuickView.mjs";




document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  updateCartCount();
  initQuickView();

  const category = getParam("category") || "tents";

  const listElement = document.querySelector(".product-list");

  const dataSource = new ExternalServices(category);
  const productList = new ProductList(category, dataSource, listElement);
  await productList.init();

  const productCount = listElement.children.length;
  updateBreadcrumb("listing", {category, count: productCount});

});

import { renderListWithTemplate, getDiscountInfo } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

function productCardTemplate(product) {
  const { isDiscounted, discountPercent } = getDiscountInfo(product);
  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <div class="product-card__image-wrapper">
          <img src="${product.Images?.PrimaryMedium}" alt="${product.Name}">
          ${isDiscounted ? `<span class="discount-badge">${discountPercent}% OFF</span>` : ""}
        </div>
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">
          $${product.FinalPrice}
          ${isDiscounted ? `<span class="original-price">$${product.SuggestedRetailPrice}</span>` : ""}
        </p>
      </a>
    </li>
  `;
}

class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  // async init() {
  //   const list = await this.dataSource.getData(this.category);
  //   this.renderList(list);
  //   document.querySelector(".title").textContent = this.category;
  // }

  async init() {
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get("search");
    let list = [];

    if (searchTerm) {
      // If search param is present, search using the API
      document.querySelector(".title").textContent = `Search results for "${searchTerm}"`;
      list = await this.dataSource.searchProducts(searchTerm);
    } else {
      // Default category-based product list
      list = await this.dataSource.getData(this.category);
      document.querySelector(".title").textContent = this.category;
    }

    this.products = list;

    if (list.length === 0) {
      this.listElement.innerHTML = "<p>No products found.</p>";
    } else {
      this.renderList(list);
    }

    const sortList = document.getElementById("sort");
    if (sortList) {
      sortList.addEventListener("change", (e) => {
        this.displaySortList(e.target.value);
      });
    }
  }

  displaySortList(sortType) {
    let sorted = [...this.products];

    if (sortType === "name") {
      sorted.sort((a, b) => a.Name.localeCompare(b.Name));
    }

    else if (sortType === "price") {
      sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }

    this.renderList(sorted);
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));

    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}

export function renderProductList() {
  const category = 'tents';
  const dataSource = new ExternalServices(); 
  const listElement = document.querySelector('.product-list');

  const productList = new ProductList(category, dataSource, listElement);
  productList.init();
}

export default ProductList;

import { renderListWithTemplate, getDiscountInfo } from './utils.mjs';
import ProductData from './ProductData.mjs';

function productCardTemplate(product) {
  const { isDiscounted, discountPercent } = getDiscountInfo(product);
  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <div class="product-card__image-wrapper">
          <img src="${product.Image}" alt="${product.Name}">
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
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", false);
  }
}

export function renderProductList() {
  const category = 'tents';
  const dataSource = new ProductData(); 
  const listElement = document.querySelector('.product-list');

  const productList = new ProductList(category, dataSource, listElement);
  productList.init();
}


export default ProductList;

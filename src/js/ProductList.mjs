import { renderListWithTemplate, getDiscountInfo } from './utils.mjs';

function productCardTemplate(product) {
  const { isDiscounted, discountPercent } = getDiscountInfo(product);
  return `
    <li class="product-card">
      <a href="../product_pages/product.html?product=${product.Id}">
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

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category); // Pass category!
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", false);
  }
}

import { getLocalStorage, setLocalStorage, getDiscountInfo } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) {
      document.querySelector("main").innerHTML = `
        <h2 style="text-align:center; padding:2rem;">Product not found.</h2>`;
      return;
    }

    this.renderProductDetails();

    const addToCartBtn = document.getElementById("addToCart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    let cart = getLocalStorage("so-cart") || [];

    const existingItemIndex = cart.findIndex(item => item.Id === this.product.Id);

    if (existingItemIndex > -1) {
      cart[existingItemIndex].Quantity = (cart[existingItemIndex].Quantity || 1) + 1;
    } else {
      this.product.Quantity = 1;
      cart.push(this.product);
    }

    setLocalStorage("so-cart", cart);
  }

  renderProductDetails() {
    const isDiscounted = getDiscountInfo(this.product);

    const brandEl = document.getElementById("productBrand");
    if (brandEl) {
      brandEl.textContent = this.product.Brand?.Name || "Brand Not Found";
    }

    const nameEl = document.getElementById("productName");
    if (nameEl) {
      nameEl.textContent = this.product.NameWithoutBrand || this.product.Name || "Product Name";
    }

    const priceEl = document.querySelector("#productPrice");
    if (priceEl) {
      if (isDiscounted) {
        priceEl.innerHTML = `
          <span class="final-price">$${this.product.FinalPrice.toFixed(2)}</span>
          <span class="original-price">$${this.product.SuggestedRetailPrice.toFixed(2)}</span>
        `;
      } else {
        priceEl.textContent = `$${this.product.FinalPrice.toFixed(2)}`;
      }
    }

    const colorEl = document.querySelector("#productColor");
    if (colorEl) {
      colorEl.textContent = this.product.Colors?.[0]?.ColorName || "Unknown";
    }

    const descEl = document.querySelector("#productDesc");
    if (descEl) {
      descEl.innerHTML = this.product.DescriptionHtmlSimple || "No description available.";
    }

    const imageEl = document.getElementById("productImage");
    if (imageEl) {
      imageEl.src = this.product.Images?.PrimaryLarge || "../images/default.jpg";
      imageEl.alt = this.product.NameWithoutBrand || this.product.Name;
    }

    const addToCartBtn = document.getElementById("addToCart");
    if (addToCartBtn) {
      addToCartBtn.dataset.id = this.product.Id;
    }
  }
}

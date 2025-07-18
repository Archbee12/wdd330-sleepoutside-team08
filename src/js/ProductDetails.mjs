import { getLocalStorage, setLocalStorage, getDiscountInfo } from "./utils.mjs";



export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    // console.log("Product ID:", this.productId);

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

    // Check if item is already in cart
    const existingItemIndex = cart.findIndex(item => item.Id === this.product.Id);

    if (existingItemIndex > -1) {
      // Increment quantity
      cart[existingItemIndex].Quantity = (cart[existingItemIndex].Quantity || 1) + 1;
    } else {
      // Add new item with quantity 1
      this.product.Quantity = 1;
      cart.push(this.product);
    }

    setLocalStorage("so-cart", cart);
  }

  renderProductDetails() {
    const brandEl = document.getElementById("productBrand");
    if (brandEl) {
      brandEl.textContent = this.product.Brand?.Name || "Brand Not Found";
    }

    const nameEl = document.getElementById("productName");
    if (nameEl) {
      nameEl.textContent = this.product.NameWithoutBrand || this.product.Name || "Product Name";
    }

    

    // document.querySelector('#productPrice').textContent = this.product.FinalPrice;
    const priceElement = document.querySelector('#productPrice');

    if (isDiscounted) {
      priceElement.innerHTML = `
        <span class="final-price">$${this.product.FinalPrice.toFixed(2)}</span>
        <span class="original-price">$${this.product.SuggestedRetailPrice.toFixed(2)}</span>
      `;
    } else {
      priceElement.textContent = `$${this.product.FinalPrice.toFixed(2)}`;
    }

    
    document.querySelector('#productColor').textContent = this.product.Colors[0].ColorName;
    document.querySelector('#productDesc').innerHTML = this.product.DescriptionHtmlSimple;
    const imageEl = document.getElementById("productImage");
    if (imageEl) {
      imageEl.src = this.product.Image || "../images/default.jpg";
      imageEl.alt = this.product.NameWithoutBrand || this.product.Name;
    }

    const priceEl = document.querySelector("#productPrice");
    if (priceEl) {
      const price = parseFloat(this.product.FinalPrice) || 0;
      priceEl.textContent = `$${price.toFixed(2)}`;
    }

    const colorEl = document.querySelector("#productColor");
    if (colorEl) {
      colorEl.textContent = this.product.Colors?.[0]?.ColorName || "Unknown";
    }

    const descEl = document.querySelector("#productDesc");
    if (descEl) {
      descEl.innerHTML = this.product.DescriptionHtmlSimple || "No description available.";
    }

    const addToCartBtn = document.getElementById("addToCart");
    if (addToCartBtn) {
      addToCartBtn.dataset.id = this.product.Id;
    }
  }
}

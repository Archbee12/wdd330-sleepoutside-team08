import { getLocalStorage, setLocalStorage, getDiscountInfo, loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./CartCount.mjs";


loadHeaderFooter().then(() => {
  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = document.getElementById("searchInput").value.trim();
      if (query) {
        // Redirect to the product listing page with search query
        window.location.href = `/product-listing.html?search=${encodeURIComponent(query)}`;
      }
    });
  }
});

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    // console.log("Loaded Product ID:", this.productId);

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

  addProductToCart(product) {
    let cart = getLocalStorage("so-cart") || [];

    const existingItems = cart.find(item => item.Id === this.product.Id);
    
    if (existingItems) {
      existingItems.quantity = (existingItems.quantity || 1) + 1;
    }

    else {
      this.product.quantity = 1;
      cart.push(this.product);

      // or this
      // const addedProduct = { ...this.product, quantity: 1 };
      // cart.push(addedProduct);
    }

    setLocalStorage("so-cart", cart);

    updateCartCount();


  }

  renderProductDetails() {
    const isDiscounted = getDiscountInfo(this.product);

    const brandEl = document.getElementById("productBrand");
    if (brandEl) {
      brandEl.textContent = this.product.Brand?.Name || "Brand Not Found";
    }

    

    document.querySelector('h2').textContent = this.product.Brand.Name;
    document.querySelector('h3').textContent = this.product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = this.product.Images.PrimaryMedium;
    productImage.alt = this.product.NameWithoutBrand;

    

    // document.querySelector('#productPrice').textContent = this.product.FinalPrice;
    const priceElement = document.querySelector('#productPrice');

    if (isDiscounted) {
      priceElement.innerHTML = `
        <span class="final-price">$${this.product.FinalPrice.toFixed(2)}</span>
        <span class="original-price">$${this.product.SuggestedRetailPrice.toFixed(2)}</span>
      `;
    } else {
      priceElement.textContent = `$${this.product?.FinalPrice.toFixed(2)}`;
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

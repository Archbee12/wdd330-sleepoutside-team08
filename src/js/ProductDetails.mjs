import { getLocalStorage, setLocalStorage, getDiscountInfo } from "./utils.mjs";



export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init () {
    this.product = await this.dataSource.findProductById(this.productId);
    // console.log("Product ID:", this.productId);

    this.renderProductDetails();

    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart(product) {
    let cart = getLocalStorage("so-cart") || [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
  }

  renderProductDetails() {

    const { isDiscounted, discountPercent } = getDiscountInfo(this.product);


    if (!this.product || !this.product.Brand || !this.product.Brand.Name) {
      
      return;
    }

    

    document.querySelector('h2').textContent = this.product.Brand.Name;
    document.querySelector('h3').textContent = this.product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = this.product.Image;
    productImage.alt = this.product.NameWithoutBrand;

    

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

    document.querySelector('#addToCart').dataset.id = this.product.Id;
  }
  
}

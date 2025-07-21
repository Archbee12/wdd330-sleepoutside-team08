import { getLocalStorage } from "./utils.mjs"; // or correct path

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    const subtotalElement = document.querySelector(`${this.outputSelector} #subtotal`);
    this.itemTotal = this.list.reduce((total, item) => {
      return total + item.FinalPrice * item.quantity;
    }, 0);
    subtotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    const shippingElement = document.querySelector(`${this.outputSelector} #shipping`);
    const taxElement = document.querySelector(`${this.outputSelector} #tax`);
    const orderTotalElement = document.querySelector(`${this.outputSelector} #order-total`);

    const itemCount = this.list.reduce((count, item) => count + item.quantity, 0);

    this.tax = this.itemTotal * 0.06;
    this.shipping = 10 + (itemCount - 1) * 2;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    shippingElement.innerText = `$${this.shipping.toFixed(2)}`;
    taxElement.innerText = `$${this.tax.toFixed(2)}`;
    orderTotalElement.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
}

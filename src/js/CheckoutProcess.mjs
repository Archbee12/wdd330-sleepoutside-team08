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
    this.calculateOrderTotal();
    this.displayOrderSummary(); // 🆕 call to display HTML if needed
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce((total, item) => {
      return total + item.FinalPrice * item.quantity;
    }, 0);
  }

  calculateOrderTotal() {
    const itemCount = this.list.reduce((count, item) => count + item.quantity, 0);

    this.tax = this.itemTotal * 0.06;
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
  }

  displayOrderSummary() {
    const base = document.querySelector(this.outputSelector);

    if (!base) return;

    const subtotalElement = base.querySelector("#subtotal");
    const shippingElement = base.querySelector("#shipping");
    const taxElement = base.querySelector("#tax");
    const orderTotalElement = base.querySelector("#order-total");

    if (subtotalElement) subtotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    if (shippingElement) shippingElement.innerText = `$${this.shipping.toFixed(2)}`;
    if (taxElement) taxElement.innerText = `$${this.tax.toFixed(2)}`;
    if (orderTotalElement) orderTotalElement.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
}

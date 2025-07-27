import ExternalServices from "./ExternalServices.mjs";

import { formDataToJSON, getLocalStorage } from "./utils.mjs";

const services = new ExternalServices(); 

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
    this.displayOrderTotals();
  }

  calculateItemSubTotal() {
    this.itemTotal = 0;
    let totalItems = 0;

    this.list.forEach(item => {
      const quantity = item.quantity || 1;
      this.itemTotal += item.FinalPrice * quantity;
      totalItems += quantity;
    });

    // Update UI
    const subtotalElem = document.querySelector(`${this.outputSelector} #subtotal`);
    const itemCountElem = document.querySelector(`${this.outputSelector} #num-items`);

    if (subtotalElem) subtotalElem.textContent = `$${this.itemTotal.toFixed(2)}`;
    if (itemCountElem) itemCountElem.textContent = totalItems;
  }

  calculateOrderTotal() {
    // Tax: 6% of item total
    this.tax = this.itemTotal * 0.06;

    // Shipping: $10 for first item, $2 each additional
    const totalItems = this.list.reduce((sum, item) => sum + (item.quantity || 1), 0);
    this.shipping = totalItems > 0 ? 10 + (totalItems - 1) * 2 : 0;

    // Total
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const total = document.querySelector(`${this.outputSelector} #order-total`);

    if (tax) tax.textContent = `$${this.tax.toFixed(2)}`;
    if (shipping) shipping.textContent = `$${this.shipping.toFixed(2)}`;
    if (total) total.textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  packageItems(items) {
    return items.map(item => ({
      id: item.Id || item.id,
      name: item.Name || item.name,
      price: item.FinalPrice || item.price,
      quantity: item.quantity || 1
    }));
  }

  async checkout() {
    console.log("checkout function triggered")
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    console.log("Order from form:", order);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = this.packageItems(this.list);
    console.log("Final order data:", order);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    };

    try {
      const response = await fetch("https://wdd330-backend.onrender.com:3000/checkout", options);
      const result = await response.json();
      console.log("Server response:", result);
    } catch (err) {
      console.error("Checkout error:", err);
    }

    try {
      const response = await services.checkout(order);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
}
import { getLocalStorage, formDataToJSON } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

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
    this.renderOrderSummary();
  }

  calculateItemSubTotal() {
    const subtotalElement = document.querySelector(`${this.outputSelector} #subtotal`);
    this.itemTotal = this.list.reduce((total, item) => {
      return total + item.FinalPrice * item.quantity;
    }, 0);
    subtotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    const taxElement = document.querySelector(`${this.outputSelector} #tax`);
    const shippingElement = document.querySelector(`${this.outputSelector} #shipping`);
    const totalElement = document.querySelector(`${this.outputSelector} #order-total`);

    const itemCount = this.list.reduce((sum, item) => sum + item.quantity, 0);

    this.tax = this.itemTotal * 0.06;
    this.shipping = 10 + (itemCount > 1 ? (itemCount - 1) * 2 : 0);
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    taxElement.innerText = `$${this.tax.toFixed(2)}`;
    shippingElement.innerText = `$${this.shipping.toFixed(2)}`;
    totalElement.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  renderOrderSummary() {
    const summaryElement = document.querySelector(`${this.outputSelector} .checkout-summary`);
    if (!summaryElement) return;

    summaryElement.innerHTML = this.list
      .map(item => {
        return `<li>${item.Name} [${item.quantity}pcs] - $${(item.FinalPrice * item.quantity).toFixed(2)}</li>`;
      })
      .join('');
  }

  packageItems(items) {
    return items.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity,
    }));
  }

  async checkout(form) {
    const formData = formDataToJSON(form);
    const items = this.packageItems(this.list);

    const order = {
      orderDate: new Date().toISOString(),
      fname: formData.fname,
      lname: formData.lname,
      street: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      cardNumber: formData["cc-number"],
      expiration: formData["exp-date"],
      code: formData.cvv,
      items: items,
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2),
    };

    try {
      const response = await new ExternalServices().checkout(order);
      console.log("Order submitted successfully:", response);
      return response;
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  }
}

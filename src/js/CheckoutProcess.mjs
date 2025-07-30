import ExternalServices from "./ExternalServices.mjs";

import { getLocalStorage, alertMessage } from "./utils.mjs";

const services = new ExternalServices(); 

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function validCardNumber(cardNumber) {
  const regex = /^\d{13,19}$/;
  return regex.test(cardNumber);
}

function validExpirationDate(dateStr) {
  // Check format: MM/YY
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(dateStr)) return false;

  // Extract parts
  const [monthStr, yearStr] = dateStr.split("/");
  const month = parseIngitt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  // Convert to full year
  const currentYear = new Date().getFullYear() % 100; // Get last two digits
  const fullYear = year + 2000;

  // Compare with current date
  const expiryDate = new Date(fullYear, month); // 1st of next month
  const now = new Date();

  return expiryDate > now;
}


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
    // console.log("checkout function triggered")
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    // console.log("Order from form:", order);


    order.orderDate = new Date().toISOString(),
    order.orderTotal = this.orderTotal,
    order.tax = this.tax,
    order.shipping = this.shipping,
    order.items = this.packageItems(this.list),
    order.customer = {
      fname: order.fname,
      lname: order.lname,
      street: order.street,
      city: order.city,
      state: order.state,
      zip: order.zip
    },
    order.payment = {
      cardNumber: order.cardNumber,
      expiration: order.expiration,
      code: order.code
    }
    console.log("Final order data:", order);

    // if (!validCardNumber(order.cardNumber) || !validCVV(order.code)) {
    //   this.displayCheckoutError({ message: "Oops! Please check card details and try again." });
    //   return;
    // }

    if (!validCardNumber(order.cardNumber)) {
      this.displayCheckoutError({ message: "Invalid card number. Please check and try again." });
      return;
    }

    if (!validExpirationDate(order.expiration)) {
    this.displayCheckoutError({ message: "Invalid or expired expiration date." });
    return;
  }



    try {
      const response = await services.checkout(order);
      // console.log("Order success:", response);
      window.location.href = "success.html";
      localStorage.removeItem("so-cart");
    } catch (err) {
          console.error("Unexpected error during checkout:", err);
          console.error("Type of err:", typeof err);
          console.error("err.message:", err.message);

          // Try if err is a Response (Fetch API error)
          if (err instanceof Response) {
            try {
              const errorData = await err.json();
              this.displayCheckoutError({ message: errorData.message || "Checkout failed. Please check your input." });
            } catch (jsonError) {
              this.displayCheckoutError({ message: "Unable to parse server error. Please try again." });
            }
          } 
          // If error was thrown manually (like throw new Error("msg"))
          else if (err instanceof Error) {
            this.displayCheckoutError({ message: err.message });
          } 
          // If the message is buried deeper or unknown
          else {
            this.displayCheckoutError({ message: "Invalid Card Number. Please try again." });
          }
        }


  }

  displayCheckoutError(error) {
    const message = error.message || "Checkout failed. Please check your input.";
    alertMessage(message);
    }
  

}
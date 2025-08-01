export default class CheckoutProcess {
  constructor(cart) {
    this.cart = cart;
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.total = 0;
  }

  calculateSubtotal() {
    this.subtotal = this.cart.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0);
    return this.subtotal;
  }

  calculateTax() {
    this.tax = this.subtotal * 0.06;
    return this.tax;
  }

  calculateShipping() {
    this.shipping = 10 + (this.cart.length - 1) * 2;
    return this.shipping;
  }

  calculateTotal() {
    this.total = this.subtotal + this.tax + this.shipping;
    return this.total;
  }

  updateOrderSummary() {
    this.calculateSubtotal();
    this.calculateTax();
    this.calculateShipping();
    this.calculateTotal();

    document.getElementById('subtotal').textContent = `$${this.subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${this.tax.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${this.shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${this.total.toFixed(2)}`;
  }

  packageItems() {
    return this.cart.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.Quantity
    }));
  }

  createOrderData(formData) {
    const orderData = {
      fname: formData.get('fname'),
      lname: formData.get('lname'),
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      zip: formData.get('zip'),
      cardNumber: formData.get('cardNumber'),
      expDate: formData.get('expDate'),
      securityCode: formData.get('securityCode'),
      items: this.packageItems(),
      orderTotal: this.total.toFixed(2),
      shipping: this.shipping.toFixed(2),
      tax: this.tax.toFixed(2),
      orderDate: new Date().toISOString()
    };

    return orderData;
  }

  async submitOrder(orderData) {
    const response = await fetch('http://wdd330-backend.onrender.com/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    const result = await response.json();
    if (result.success) {
      alert('Order submitted successfully!');
      window.location.href = '/thank-you.html';
    } else {
      alert('Error submitting the order.');
    }
  }
}

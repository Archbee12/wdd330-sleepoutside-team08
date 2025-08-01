import { getLocalStorage } from './utils.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const cart = getLocalStorage('so-cart') || [];
  const subtotalEl = document.getElementById('subtotal');
  const taxEl = document.getElementById('tax');
  const shippingEl = document.getElementById('shipping');
  const totalEl = document.getElementById('total');

  const updateOrderSummary = () => {
    // Calculate Subtotal
    const subtotal = cart.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0);
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    // Calculate Tax (6%)
    const tax = subtotal * 0.06;
    taxEl.textContent = `$${tax.toFixed(2)}`;

    // Calculate Shipping ($10 for the first item, $2 for each additional item)
    const shipping = 10 + (cart.length - 1) * 2;
    shippingEl.textContent = `$${shipping.toFixed(2)}`;

    // Calculate Total
    const total = subtotal + tax + shipping;
    totalEl.textContent = `$${total.toFixed(2)}`;
  };

  updateOrderSummary();
});

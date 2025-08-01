import CheckoutProcess from './CheckoutProcess.mjs'; // Assuming CheckoutProcess is in a separate module.

document.addEventListener('DOMContentLoaded', () => {
  // Get cart data from local storage
  const cart = JSON.parse(localStorage.getItem('so-cart')) || [];
  
  // Create an instance of CheckoutProcess and pass the cart
  const checkoutProcess = new CheckoutProcess(cart);

  // Populate the order summary (subtotal, tax, shipping, and total)
  checkoutProcess.updateOrderSummary();

  // Checkout form submission handler
  const checkoutForm = document.getElementById('checkoutForm');
  
  checkoutForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Validate form fields (ensure all fields are filled out)
    if (!checkoutForm.checkValidity()) {
      alert("Please fill out all required fields.");
      return;
    }

    // Collect form data
    const formData = new FormData(checkoutForm);
    const orderData = checkoutProcess.createOrderData(formData); // Create order data using the form data

    try {
      // Send the order data to the server
      const response = await fetch('http://wdd330-backend.onrender.com/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Order submitted successfully!');
        window.location.href = '/thank-you.html'; // Redirect to a thank-you page
      } else {
        alert('Error submitting the order.');
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert('An error occurred while submitting the order.');
    }
  });
});

import CheckoutProcess from './CheckoutProcess.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('so-cart')) || []; // Getting cart from localStorage
    const checkoutProcess = new CheckoutProcess(cart);

    // Update order summary
    checkoutProcess.updateOrderSummary();

    // Event listener for form submission
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Validate form before submission
        if (!checkoutForm.checkValidity()) {
            alert("Please fill out all required fields.");
            return;
        }

        // Collect form data
        const formData = new FormData(checkoutForm);
        const orderData = checkoutProcess.createOrderData(formData);

        // Send the order data to the server
        const response = await fetch('http://wdd330-backend.onrender.com/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();

        if (result.success) {
            alert("Order successfully submitted!");
            localStorage.removeItem('so-cart'); // Clear the cart
            window.location.href = '/thank-you.html'; // Redirect to the success page
        } else {
            alert("Error submitting the order.");
        }
    });
});

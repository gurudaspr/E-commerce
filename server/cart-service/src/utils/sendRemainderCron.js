import axios from 'axios';
import Cart from '../models/cart.model.js'; // Adjust the path as needed
import { sendCartReminderEmail } from './sendReminderEmail.js'; // Adjust the path as needed

// Function to send cart reminders
export const sendCartReminder = async () => {
    try {
        // Fetch all carts
        const carts = await Cart.find(); // Fetch all carts without filtering by time

        // Process each cart
        for (const cart of carts) {
            const { user: userId, cartItems } = cart;

            // Fetch user details from user service
            const userResponse = await axios.get(`${process.env.AUTH_SERVICE_URL}/user/${userId}`);
            const user = userResponse.data;

            // Fetch product details for each item in the cart
            const products = [];
            for (const item of cartItems) {
                const productResponse = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/products/${item.product}`);
                const product = productResponse.data;

                products.push({
                    name: product.name,
                    quantity: item.quantity,
                    price: product.price,
                    image: product.image
                });
            }

            // Send reminder email if there are products in the cart
            if (products.length > 0) {
                await sendCartReminderEmail(user.email, products);
                console.log(`Reminder email sent to ${user.email}`);
            }
        }
    } catch (error) {
        console.error('Error in cart reminder:', error);
    }
};


// Execute the function
sendCartReminder();

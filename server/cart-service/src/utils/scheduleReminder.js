import schedule from 'node-schedule';
import axios from 'axios';
import Cart from '../models/cart.model.js'
import  sendReminderEmail  from './sendReminderEmail.js';

export const scheduleReminder = (cart) => {
    console.log('Inside schedule reminder');

    // Fetch environment variables or use defaults for product and auth service URLs
    const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://product-service:5002';
    const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://auth-service:5001';

    // Schedule job to run 10 minutes after the item is added to the cart
    const job = schedule.scheduleJob(new Date(Date.now() +  2 * 1000), async function () {
        try {
            // Fetch the latest cart data to ensure it's still valid
            const latestCart = await Cart.findOne({ _id: cart._id });
            if (latestCart && latestCart.cartItems.length > 0) {
                // Call the product service to get details of products in the cart
                const productIds = latestCart.cartItems.map(item => item.product);
                const productDetailsResponse = await axios.post(`${productServiceUrl}/api/v1/products/inCart`, {
                    productIds
                });

                // Call the auth service to get user details
                const userResponse = await axios.get(`${authServiceUrl}/api/v1/user/details/${latestCart.user}`);

                // Extract the necessary details
                const productDetails = productDetailsResponse.data.products;
                const user = userResponse.data.user;
                // Send the reminder email
                await sendReminderEmail(user.email, productDetails);

                console.log(`Reminder email sent to user ${user.name}`);
            }
        } catch (error) {
            console.error('Error sending reminder email:', error);
        }
    });
};

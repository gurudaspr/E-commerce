import schedule from 'node-schedule';
import axios from 'axios';
import Cart from '../models/cart.model.js'
import  sendReminderEmail  from './sendReminderEmail.js';

export const scheduleReminder = (userId, productId) => {

  // Fetch environment variables or use defaults for product and auth service URLs
  const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://product-service:5002';
  const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://auth-service:5001';

  // Schedule job to run 10 minutes after the item is added to the cart
  const job = schedule.scheduleJob(new Date(Date.now() + 10 * 60 * 1000), async function () {
      try {
          // Fetch the latest cart data to ensure the product is still in the cart
          const latestCart = await Cart.findOne({ user: userId });
          const productStillInCart = latestCart && latestCart.cartItems.some(item => item.product.toString() === productId);

          if (productStillInCart) {
              // Call the product service to get details of the specific product
              const productDetailsResponse = await axios.get(`${productServiceUrl}/api/v1/products/productById/${productId}`);

              // Call the auth service to get user details
              const userResponse = await axios.get(`${authServiceUrl}/api/v1/user/details/${userId}`);

              // Extract the necessary details
              const productDetails = [productDetailsResponse.data.product]; // Wrap in array to maintain consistency
              const user = userResponse.data.user;

              // Send the reminder email
              await sendReminderEmail(user.email, productDetails);

              console.log(`Reminder email sent to user ${user.name}`);
          } else {
              console.log(`Product  no longer in cart for user , skipping reminder`);
          }
      } catch (error) {
          console.error('Error processing reminder:', error);
      }
  });
};

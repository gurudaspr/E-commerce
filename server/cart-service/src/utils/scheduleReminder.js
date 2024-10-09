import schedule from 'node-schedule';
import Cart from '../models/cart.model.js';
import sendCartReminderEmail from './sendReminderEmail.js';
import axios from 'axios';


export function scheduleReminder(userId, cart) {
  // Schedule a reminder after 10 minutes
  const job = schedule.scheduleJob(new Date(Date.now() + 10 * 60 * 1000), async function() {
    try {
      // Fetch the latest cart data
      const cart = await Cart.findOne({ _id: cart });
      if (cart) {

        const productDetails = axios.post(`${process.env.PRODUCT_SERVICE_URL}/api/v1/products/${cart.cartItems.product}`);
        const user = await axios.get(`${process.env.USER_SERVICE_URL}/api/v1/user/details/${cart.user}`);
        await sendCartReminderEmail(user.email, productDetails);
        console.log(`Reminder email sent to user ${userId}`);
      }
    } catch (error) {
      console.error('Error sending reminder email:', error);
    }
  });
}
import nodemailer from 'nodemailer';

// Create the transporter with hardcoded values
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'contact.ashflix@gmail.com', // Hardcoded email
    pass: 'hjsvopggvshjmuwt', // Hardcoded password (app password or regular password)
  },
});

// Function to send cart reminder email
export default function sendCartReminderEmail(to, products) {
  const subject = "Reminder: Items Waiting in Your Cart - Zestamart";
  
  // Calculate the total price
  const totalPrice = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  // Format the product details into HTML
  const productDetails = products
    .map(
      (product) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #e0e0e0;">
            <img src="${product.image}" alt="${product.name}" style="width: 100px; height: auto;">
          </td>
          <td style="padding: 10px; border: 1px solid #e0e0e0;">${product.name}</td>
          <td style="padding: 10px; border: 1px solid #e0e0e0;">${product.quantity}</td>
          <td style="padding: 10px; border: 1px solid #e0e0e0;">₹${product.price}</td>
        </tr>`
    )
    .join('');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; border: 1px solid #e0e0e0; border-radius: 8px;">
      <div style="text-align: center; padding: 10px;">
        <h1 style="color: #ff6600;">Zestamart</h1>
        <p style="font-size: 18px;">Your All-in-One Shopping Solution!</p>
      </div>
      <h2>Items Are Waiting in Your Cart!</h2>
      <p>You've added the following items to your cart. Don't miss out!</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f8f8f8;">
            <th style="padding: 10px; border: 1px solid #e0e0e0;">Product Image</th>
            <th style="padding: 10px; border: 1px solid #e0e0e0;">Product Name</th>
            <th style="padding: 10px; border: 1px solid #e0e0e0;">Quantity</th>
            <th style="padding: 10px; border: 1px solid #e0e0e0;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${productDetails}
        </tbody>
      </table>
      <h3 style="text-align: right;">Total Price: ₹${totalPrice.toFixed(2)}</h3>
      <div style="text-align: center; margin: 20px 0;">
        <a href="http://localhost:5173/user/cart" style="background-color: #007bff; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold;">Review Your Cart</a>
      </div>
      <p>If you didn’t add these items, you can ignore this email.</p>
      <p>Thanks, <br> The Zestamart Team</p>
      <footer style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #777;">
        <p>Zestamart - Your Fashion, Your Way!</p>
        <p style="font-size: 12px; color: #aaa;">© 2024 Zestamart, All rights reserved.</p>
      </footer>
    </div>
  `;

  const mailOptions = {
    from: 'contact.ashflix@gmail.com',
    to: to,
    subject: subject,
    html: htmlContent,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      resolve(info);
    });
  });
}

// Test the function
const testProducts = [
  {
    name: 'Samsung Oled TV',
    image: 'https://res.cloudinary.com/dn4kcza7g/image/upload/v1725637414/e-commerce/products/oymvqnmtwstkbuv1kyg9.jpg',
    quantity: 2,
    price: 60000,
  },
];

// Call the function to send the test email
sendCartReminderEmail('gurudaspranavam007@gmail.com', testProducts)
  .then(info => {
    console.log('Email sent:', info.response);
  })
  .catch(error => {
    console.error('Error sending email:', error);
  });

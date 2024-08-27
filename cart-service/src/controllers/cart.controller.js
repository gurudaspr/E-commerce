import Cart from '../models/cart.model.js';
import axios from 'axios';



// Add a new cart
export const addCart = async (req, res) => {
    const { userId } = req.user;
    const { productId } = req.params;
    try {

        const existingCart = await Cart.findOne({ user: userId });
        if (existingCart) {

            existingCart.cartItems.push({
                product: productId,
                createdAt: Date.now()
            });
            await existingCart.save();
            return res.status(201).json(existingCart);
        }
        const cart = new Cart({
            user: userId,
            cartItems: [{
                product: productId,
                createdAt: Date.now()
            }]
        });
        await cart.save();
        res.status(201).json(cart);
    }
    catch (err) {
        console.log(" error in adding cart", err);
        res.status(500).json({ message: 'Error adding cart', error: err.message });
    }
}

// get cart by user id

export const getCartByUser = async (req, res) => {
    // Use a fixed userId for testing
    const userId = "66c573ffbdbd6696e1585149";
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }   
        const allProductsId = cart.cartItems.map(item => item.product);
        console.log("Product IDs:", allProductsId);

        // Call product-service with a POST request and product IDs array
        const productApi = await axios.post(`${process.env.PRODUCT_SERVICE_URL}/api/v1/products/inCart`, {
            productIds: allProductsId,
        });
        console.log('Response from product service:', productApi.data);
        const cartProducts = productApi.data.products;
        return res.status(200).json(cartProducts);
    } catch (err) {
        console.error("Error in getting cart:", err.message);
        return res.status(500).json({ message: 'Error getting cart', error: err.message });
    }
};

import Cart from '../models/cart.model.js';
import axios from 'axios';
import _ from 'lodash';
import { scheduleReminder } from '../utils/scheduleReminder.js';



// Add a new cart
export const addCart = async (req, res) => {
    const { userId } = req.user; 
    const { productId } = req.params;
    try {
        const existingCart = await Cart.findOne({ user: userId });
        if (existingCart) {
            const existingProduct = existingCart.cartItems.find(item => item.product.toString() === productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
                await existingCart.save();
                return res.status(201).json(existingCart);
            }
            // Add the new product
            existingCart.cartItems.push({
                product: productId,
                createdAt: Date.now()
            });
            await existingCart.save();
            console.log('Setting schedule reminder for existing cart');
            scheduleReminder(userId, productId);
            return res.status(201).json(existingCart);
        }
        // Create a new cart and add the product to it
        const cart = new Cart({
            user: userId,
            cartItems: [{
                product: productId,
                createdAt: Date.now()
            }]
        });
        await cart.save();
        console.log('Setting schedule reminder for new cart');
        scheduleReminder(userId, productId);
        res.status(201).json({ message: 'Product added to cart successfully', cart });
    } catch (err) {
        console.log("Error in adding cart", err);
        res.status(500).json({ message: 'Error adding cart', error: err.message });
    }
}

// get cart by user id
export const getCartByUser = async (req, res) => {
    const { userId } = req.user;
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItemsMap = _.keyBy(cart.cartItems, item => item.product.toString());
        const allProductsId = _.keys(cartItemsMap);

        // Call product-service with a POST request and product IDs array
        const productApi = await axios.post(`${process.env.PRODUCT_SERVICE_URL}/api/v1/products/inCart`, {
            productIds: allProductsId,
        });
        const cartProducts = _.map(productApi.data.products, product => ({
            ...product,
            quantity: _.get(cartItemsMap, [product._id.toString(), 'quantity'], 0)
        }));

        return res.status(200).json({
            message: 'Cart items fetched successfully',
            cartItems: cartProducts
        });
    } catch (err) {
        console.error("Error in getting cart:", err.message);
        return res.status(500).json({ message: 'Error getting cart', error: err.message });
    }
};


export const updateCart = async (req, res) => {
    const { userId } = req.user;
    const { productId, status } = req.query;
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const cartItemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
        if (cartItemIndex === -1) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        if (status === 'inc') {
            cart.cartItems[cartItemIndex].quantity += 1;
        } else if (status === 'dec') {
            if (cart.cartItems[cartItemIndex].quantity > 1) {
                cart.cartItems[cartItemIndex].quantity -= 1;
            } else {
                cart.cartItems.splice(cartItemIndex, 1);
            }
        }
        await cart.save();
        return res.status(200).json(cart);
    } catch (err) {
        console.error("Error in updating cart:", err.message);
        return res.status(500).json({ message: 'Error updating cart', error: err.message });
    }
};

//remove item from cart

export const removeItemFromCart = async (req, res) => {
    const { userId } = req.user;
    const { productId } = req.params;
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const cartItemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
        if (cartItemIndex === -1) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        cart.cartItems.splice(cartItemIndex, 1);
        await cart.save();
        return res.status(200).json(cart);
    } catch (err) {
        console.error("Error in removing item from cart:", err.message);
        return res.status(500).json({ message: 'Error removing item from cart', error: err.message });
    }
}
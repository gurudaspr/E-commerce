import Cart from '../models/cart.model.js';
import axios from 'axios';



// Add a new cart
export const addCart = async (req, res) => {
    const { userId } = req.user;
    const { productId } = req.params;
    try {

        const existingCart = await Cart.findOne({ user: userId });
        if (existingCart) {
            // Check if the product is already in the cart
            const existingProuct = existingCart.cartItems.find(item => item.product.toString() === productId);
            if (existingProuct) {
                existingProuct.quantity += 1;
                await existingCart.save();
                return res.status(201).json(existingCart);
            }
            // Add the product to the  empty cart
            existingCart.cartItems.push({
                product: productId,
                createdAt: Date.now()
            });
            await existingCart.save();
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
    const { userId } = req.user;
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


export const updateCart = async (req, res) => {
    const { userId } = req.user;
    console.log(userId, 'userId');
    const { productId, status } = req.query;
    console.log(req.params, 'params');
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
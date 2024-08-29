import express from "express";
import { addCart, getCartByUser, removeItemFromCart, updateCart } from "../controllers/cart.controller.js";
import { verifyJwtToken } from "../middlewares/verifyJwtToken.js";


const router = express.Router();


router.get('/', verifyJwtToken, getCartByUser)   // Get all carts
router.post('/:productId', verifyJwtToken, addCart)  // Add a new cart
router.patch('/', verifyJwtToken, updateCart) // Update a product in a cart
router.delete('/:productId', verifyJwtToken, removeItemFromCart) // Delete an item from a cart
export default router;
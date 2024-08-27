import express from "express";
import { addCart, getCartByUser } from "../controllers/cart.controller.js";
import { verifyJwtToken } from "../middlewares/verifyJwtToken.js";


const router = express.Router();


router.get('/',verifyJwtToken, getCartByUser)   // Get all carts
router.post('/:productId', verifyJwtToken,  addCart)  // Add a new cart
// router.put('/:productId', ) // Update a cart
// router.delete('/:productId', ) // Delete a cart
// router.get('/:id', ) // Get a cart by id
export default router;
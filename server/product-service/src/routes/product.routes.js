import express from 'express';
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct, restoreProduct, getProductByIdInCart, getRandomProducts, updateAverageRating } from '../controllers/product.controller.js';
import { verifyJwtToken, verifyRole } from '../middlewares/verifyJwtToken.js';
import upload from '../middlewares/upload.middleware.js';



const router = express.Router();

// Product routes
router.get('/', getProducts);
router.get('/random', getRandomProducts);
router.get('/:id',  getProductById);
router.post('/', verifyJwtToken, verifyRole('admin'), upload.single('image'), addProduct);
router.patch('/:id', verifyJwtToken, verifyRole('admin'), upload.single('image'), updateProduct);
router.delete('/:id', verifyJwtToken, verifyRole('admin'), deleteProduct);
router.post('/inCart', getProductByIdInCart);
router.post('/restore/:id', verifyJwtToken, verifyRole('admin'), restoreProduct);


// Product rating service routes from review service
router.post('/avgRating/:id', updateAverageRating);







export default router;
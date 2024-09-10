import express from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller.js';
import { verifyJwtToken, verifyRole } from '../middlewares/verifyJwtToken.js';


const router = express.Router();


// Category routes
router.get('/', getAllCategories);
router.get('/:id', verifyJwtToken, getCategoryById);
router.post('/', verifyJwtToken, verifyRole('admin'), createCategory);
router.put('/:id', verifyJwtToken, verifyRole('admin'), updateCategory);
router.delete('/:id', verifyJwtToken, verifyRole('admin'), deleteCategory);

export default router;
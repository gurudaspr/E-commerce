import express from 'express';
import { getUserProfile, updateProfile } from '../controllers/user.controller.js';
import {verifyJwtToken} from '../middlewares/verifyJwtToken.js';





const router = express.Router();

router.get('/profile', verifyJwtToken, getUserProfile);
router.patch('/profile', verifyJwtToken, updateProfile);



// route to get user details by id

router.get('/:id', getUserById);


export default router;
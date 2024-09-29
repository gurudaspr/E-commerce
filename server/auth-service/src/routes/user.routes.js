import express from 'express';
import { getUserById, getUserProfile, updateProfile } from '../controllers/user.controller.js';
import {verifyJwtToken} from '../middlewares/verifyJwtToken.js';





const router = express.Router();

router.get('/profile', verifyJwtToken, getUserProfile);
router.patch('/profile', verifyJwtToken, updateProfile);



// route to get user details by id

router.get('/details/:id', getUserById);


export default router;
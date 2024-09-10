import express from 'express';
import { changePassword, forgotPassword, login, register, resetPassword, verifyEmail } from  '../controllers/auth.controller.js';
import {verifyJwtToken} from '../middlewares/verifyJwtToken.js';


const router = express.Router();

router.post('/register', register);
router.get('/verify-email', verifyEmail);
router.post('/login',login );
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password',verifyJwtToken, changePassword);

export default router;
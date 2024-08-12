import express from 'express';
import {sendOtpToUser , verifyOtp, register} from '../controllers/auth.controller.js';


const router = express.Router();

router.post ('/sendotp',sendOtpToUser)
router.post ('/verifyotp',verifyOtp)
router.post ('/register',register)
// router.post ('/login',)

export default router;
import express from 'express';
import { addAddress, getAddresses } from '../controllers/address.controller.js';
import { verifyJwtToken } from '../middlewares/verifyJwtToken.js';



const router = express.Router(); 


router.post('/',verifyJwtToken, addAddress)
router.get('/',verifyJwtToken,getAddresses)



export default router;
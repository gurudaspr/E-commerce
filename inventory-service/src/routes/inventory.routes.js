import express from "express";

import { addInventory} from "../controllers/inventory.controller.js";
import  { verifyJwtToken, verifyRole } from "../middlewares/verifyJwtToken.js";


const router = express.Router();


// Inventory routes
router.post('/', verifyJwtToken, verifyRole('admin'), addInventory);

export default router; 
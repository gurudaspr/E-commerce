import express from "express";

import { addInventory, deleteInventory, getAllInventory, getInventoryByProduct, updateInventory} from "../controllers/inventory.controller.js";
import  { verifyJwtToken, verifyRole } from "../middlewares/verifyJwtToken.js";


const router = express.Router();


router.get('/', getAllInventory); //Get all inventory records


router.post('/', verifyJwtToken, verifyRole('admin'), addInventory); // POST /inventory - Add a new inventory record

router.put('/:productId', verifyJwtToken, verifyRole('admin'), updateInventory); //Update inventory for a specific product

router.delete('/:productId', verifyJwtToken, verifyRole('admin'), deleteInventory); //Delete an inventory record for a specific product

router.get('/:productId', getInventoryByProduct); // Get inventory details for a specific product

export default router; 
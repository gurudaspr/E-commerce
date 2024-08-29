
import Inventory from '../models/inventory.model.js';


// Add a new inventory  
export const addInventory = async (req, res) => {
    const { productId, quantity, reorderThreshold } = req.body;
    try {
        if (!productId || !quantity) {
            return res
                .status(400)
                .json({ success: false, message: "Please provide all the required fields" });
        }
        const existingInventory = await Inventory.findOne({ product: productId });
        if (existingInventory) {
            return res
                .status(400)
                .json({ success: false, message: "Inventory already exists for this product" });
        }
        const inventory = new Inventory({
            product: productId,
            quantity,
            reorderThreshold
        });
        await inventory.save();
        res.status(201).json(inventory);
    }
    catch (err) {
        console.log(" error in adding inventory", err);
        res.status(500).json({ message: 'Error adding inventory', error: err.message });
    }
}


// Get inventory details for a specific product

export const getInventoryByProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const inventory = await Inventory.findOne({ product: productId });
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }
        res.status(200).json(inventory);
    }
    catch (err) {
        console.log(" error in getting inventory",err);
        res.status(500).json({ message: 'Error getting inventory by product', error: err.message });
    }
}
// Get all inventories
export const getAllInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find().populate({
            path: 'product',
            strictPopulate: false  // Disable strict population checks
          });
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }
        res.status(200).json(inventory);
    }
    catch (err) {
        console.log(" error in getting inventory", err);
        res.status(500).json({ message: 'Error getting inventory', error: err.message });
    }
}
// Update an inventory
export const updateInventory = async (req, res) => {
    const { productId } = req.params;
    const { quantity, reorderThreshold } = req.body;
    try {
        const existingInventory = await Inventory.findOne({ product: productId });
        if (!existingInventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }
        existingInventory.quantity = quantity;
        existingInventory.reorderThreshold = reorderThreshold;
        await existingInventory.save();
        res.status(200).json(existingInventory);
    }
    catch (err) {
        console.log(" error in updating inventory", err);
        res.status(500).json({ message: 'Error updating inventory', error: err.message });
    }
}

// Delete an inventory
export const deleteInventory = async (req, res) => {
    const { productId } = req.params;
    try {
        const existingInventory = await Inventory.findOne({ product: productId });
        if (!existingInventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }
        existingInventory.deletedAt = new Date();
        await existingInventory.save();
        res.status(200).json(existingInventory);
    }
    catch (err) {
        console.log(" error in deleting inventory", err);
        res.status(500).json({ message: 'Error deleting inventory', error: err.message });

    }
}       
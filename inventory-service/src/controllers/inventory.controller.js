import Inventory from '../models/inventory.model.js';



export const addInventory = async (req, res) => {
    const { productId,quantity, reorderThreshold } = req.body;
    try {
        if (!productId || !quantity ) {
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
        console.log(" error in adding inventory");
        res.status(500).json({ message: err.message });
    }
}

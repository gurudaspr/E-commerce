
import cloudinary from '../config/cloudinary.js';
import Product from '../models/product.model.js';
import axios from 'axios';




export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ deletedAt: null }).populate('category');
        res.status(200).json({ message: 'Products fetched successfully', products: products });
    } catch (error) {
        console.error('Error getting products', error);
        res.status(500).json({ message: 'Error getting products', error: error.message });
    }
};

// Get product details by id with inventory details
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        let inventoryDetails;
        try {
            const inventoryResponse = await axios.get(`${process.env.INVENTORY_SERVICE_URL}/api/v1/inventory/${id}`);
            inventoryDetails = inventoryResponse.data;
        } catch (inventoryError) {
            console.error('Error fetching inventory details', inventoryError);
            inventoryDetails = { error: 'Unable to fetch inventory details' };
        }

        res.status(200).json({
            message: 'Product fetched successfully',
            product: product,
            inventory: inventoryDetails
        });
    } catch (error) {
        console.error('Error getting product by id', error);
        res.status(500).json({ message: 'Error getting product by id', error: error.message });
    }
};

// Add a new product
export const addProduct = async (req, res) => {

    try {
        if (!req.file) {
            return res
                .status(400)
                .json({ success: false, message: "No file uploaded" });
        }
        const { name, description, price, category, stock } = req.body;
        if (!name || !description || !price || !category) {
            return res
                .status(400)
                .json({ success: false, message: "Please provide all the required fields" });
        }
        const folderPath = "e-commerce/products";
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: folderPath,
            tags: "product",
            resource_type: "auto"
        });

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            image: result.secure_url,
            // stock,
        });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error('Error adding product', error);
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
};



export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const new_data = req.body;

        // Find the existing product
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ status: false, message: 'Product not found' });
        }

        // If there's a new file uploaded
        if (req.file) {
            // Delete the old image from Cloudinary
            if (existingProduct.image) {
                const publicId = existingProduct.image.split('/').slice(7, -1).join('/') + '/' + existingProduct.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }

            // Upload the new image
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "e-commerce/products",
                tags: "product",
                resource_type: "auto"
            });

            // Add the new image URL to the data to be updated
            new_data.image = result.secure_url;
        }
        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(id, new_data, { new: true });

        res.status(200).json({
            status: true,
            message: 'Product updated successfully',
            product: updatedProduct
        });

    } catch (error) {
        console.error("Error in updateProduct:", error);
        res.status(500).json({ status: false, error: "Internal Server Error" });
    }
};



export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        //delete from cloudinary
        const publicId = existingProduct.image.split('/').slice(7, -1).join('/') + '/' + existingProduct.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.deletedAt = new Date();
        await product.save();
        res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting product', error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

export const restoreProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.deletedAt = null;
        await product.save();
        res.status(200).json({ message: 'Product restored successfully' });
    } catch (error) {
        console.error('Error restoring product', error);
        res.status(500).json({ message: 'Error restoring product', error: error.message });
    }
};



// get product by id in cart 


export const getProductByIdInCart = async (req, res) => {
    console.log("hitting product service");
    try {
        const productIds = req.body.productIds;
        console.log("productIds:", productIds);



        // Find products by these IDs
        const products = await Product.find({
            _id: { $in: productIds }
        });

        // Return the products
        res.status(200).json({ products });
    } catch (error) {
        console.error('Error getting product by id in cart:');
        res.status(500).json({ message: 'Error getting product by id in cart', error: error.message });
    }
};

//select random 3 products
export const getRandomProducts = async (req, res) => {
    try {
        // Use the $sample aggregation to get 3 random products
        const products = await Product.aggregate([{ $sample: { size: 3 } }]);
        res.status(200).json({ products });
    } catch (error) {
        console.error('Error getting random products:', error);
        res.status(500).json({ message: 'Error getting random products', error: error.message });
    }
};
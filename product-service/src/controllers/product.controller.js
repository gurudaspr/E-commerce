
import cloudinary from '../config/cloudinary.js';
import Product from '../models/product.model.js';




export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error getting products', error);
        res.status(500).json({ message: 'Error getting products', error: error.message });
    }
};
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error getting product by id', error);
        res.status(500).json({ message: 'Error getting product by id', error: error.message });
    }
};
export const addProduct = async (req, res) => {

    try {
        if (!req.file) {
            return res
              .status(400)
              .json({ success: false, message: "No file uploaded" });
          }
        const { name, description, price, category, stock} = req.body;
        console.log(name, description, price, category, stock);
        if (!name || !description || !price || !category || !stock) {
            return res
              .status(400)
              .json({ success: false, message: "Please provide all the required fields" });
          }

        const folderPath = "e-commerce/products";
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: folderPath,
          });

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            image: result.secure_url,
            stock,
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error adding product', error);
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
};



export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, image, stock, reviews } = req.body;
        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            category,
            image,
            stock,
            reviews
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product', error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error deleting product', error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
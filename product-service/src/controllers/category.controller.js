import Category from "../models/category.model.js";



export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({deletedAt:null});
        res.status(200).json({ message: 'Categories fetched successfully', categories: categories });
    } catch (error) {
        console.error('Error getting categories', error);
        res.status(500).json({ message: 'Error getting categories', error: error.message });
    }
};
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category || category.deletedAt) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category fetched successfully', category: category });
    }
    catch (error) {
        console.error('Error getting category by id', error);
        res.status(500).json({ message: 'Error getting category by id', error: error.message });
    }

};
export const createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        if (!name || !description) {
            return res
                .status(400)
                .json({ success: false, message: "Please provide all the required fields" });
        }
        const newCategory = new Category({
            name,
            description,
        });
        await newCategory.save();
        res.status(201).json({ message: 'Category added successfully', category: newCategory });
    } catch (error) {
        console.error("Error in createCategory:", error);
        res.status(500).json({ status: false, error: "Internal Server Error" });

    }

};


export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const new_data = req.body;
  
    try {
      const existingCategory = await Category.findById(id);
      if (!existingCategory) {
        return res.status(404).json({ status: false, message: 'Category not found' });
      }
  
      // Update the category with the new data
      const updatedCategory = await Category.findByIdAndUpdate(id, new_data, { new: true });
  
      res.status(200).json({
        status: true,
        message: 'Category updated successfully',
        category: updatedCategory
      });
  
    } catch (error) {
      console.error("Error in updateCategory:", error);
      res.status(500).json({ status: false, error: "Internal Server Error" });
    }
  };


export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        existingCategory.deletedAt = new Date();
        await existingCategory.save();
        res.status(200).json({ message: 'Category deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting category', error);
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }

};
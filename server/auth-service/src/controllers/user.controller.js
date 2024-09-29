import User from "../models/user.model.js";



export const getUserProfile = async (req, res) => {
    const userId = req.user.userId;
    try {
        // Select only 'name' and 'email' fields
        const user = await User.findById(userId).select('name email');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error retrieving user profile', error);
        res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
    }
}

export const updateProfile = async(req, res) => {
    const userId = req.user.userId 
    const { name } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'Invalid user' });
        }
        if (name) {
            user.name = name;
        }
        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    }
    catch (error) {
        console.error('Error updating user', error);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
}


// get user by id
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select('name email');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error('Error getting user by id', error);
        res.status(500).json({ message: 'Error getting user by id', error: error.message });
    }
};
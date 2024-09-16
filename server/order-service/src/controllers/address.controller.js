import Address from "../models/address.model.js";


export const addAddress = async (req, res) => {
    const { address, city, state, pincode } = req.body;
    const userId = req.user.userId;
    try {
        if (!address || !city || !state || !pincode) {
            return res.status(400).send('Address is required');
        }
        const newAddress = new Address({
            user: userId,
            address,
            city,
            state,
            pincode
        });
        await newAddress.save();
        res.status(201).send(newAddress);
    }
    catch (error) {
        console.error('Error adding address:', error.message);
        res.status(500).send('Error adding address');
    }
}


export const getAddresses = async (req, res) => {
    const userId = req.user.userId;
    try {
        const addresses = await Address.find({ user: userId });
        res.status(200).json({ message: 'Addresses fetched successfully', addresses });
    }
    catch (error) {
        console.error('Error getting addresses:', error.message);
        res.status(500).send('Error getting addresses');
    }
}
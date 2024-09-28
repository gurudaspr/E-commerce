import Review from '../models/review.model.js';

export const addReview = async (req, res) => {
    const { productId, userId, rating, comment } = req.body;

    if (!productId || !userId || !rating || !comment) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const review = new Review({
            productId,
            userId,
            rating,
            comment
        });

        await review.save();
        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    } 
};

export const getReviewsByProductId = async (req, res) => {
    const { productId } = req.params;
    try {
        const reviews = await Review.find({ productId });
        res.status(200).json({ message: 'Reviews retrieved successfully', reviews });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reviews', error });
    }   
};

import Review from '../models/review.model.js';
import axios from 'axios';
import _ from 'lodash';

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

export const addReview = async (req, res) => {
    const { productId, userId, rating, comment } = req.body;
    console.log(productId, userId, rating, comment);

    if (!productId || !userId || !rating || !comment) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Create and save the new review
        const review = new Review({
            productId,
            userId,
            rating,
            comment
        });

        await review.save();

        // Get all reviews for the product to calculate the new average rating
        const reviews = await Review.find({ productId });

        const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = (totalRatings / reviews.length).toFixed(1);

        // Update the product's average rating via API call
        await axios.post(`${PRODUCT_SERVICE_URL}/api/v1/products/avgRating/${productId}`, { averageRating });

        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    } 
};

export const getReviewsByProductId = async (req, res) => {
    const { productId } = req.params;
  
    try {
      const reviews = await Review.find({ productId });
  
      // Get unique user IDs from reviews
      const userIds = _.uniq(reviews.map((review) => review.userId));
  
      // Fetch user details for unique user IDs
      const authServiceUrl = process.env.AUTH_SERVICE_URL; 
      const userPromises = userIds.map((userId) =>
        axios.get(`${authServiceUrl}/api/v1/user/details/${userId}`)
      );
  
      const userResponses = await Promise.all(userPromises);
      const usersById = _.keyBy(
        userResponses.map((response) => response.data.user),
        '_id'
      );
  
      // Combine user details with reviews
      const reviewsWithUserDetails = reviews.map((review) => ({
        ...review._doc,
        user: usersById[review.userId],
      }));
  
      res.status(200).json({ message: 'Reviews with user details retrieved successfully', reviews: reviewsWithUserDetails });
    } catch (error) {
      console.error('Error retrieving reviews with user details', error);
      res.status(500).json({ message: 'Error retrieving reviews', error: error.message });
    }
  };
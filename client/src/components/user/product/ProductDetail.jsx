import React, { useEffect, useState } from "react";
import axiosInstance from "../../../config/axios";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import CardReview from '../card/ReviewCard';

export function ProductDetail({ productId }) {
  const [product, setProduct] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${productId}`);
        setProduct(response.data.product);
        setInventory(response.data.inventory.inventory);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/reviews/product/${productId}`);
        setReviews(response.data.reviews);
      } catch (err) {
        setError(err);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [productId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index}>
        {index < Math.round(rating) ? (
          <StarIcon className="h-5 w-5 text-yellow-900" />
        ) : (
          <StarIconOutline className="h-5 w-5 text-gray-300" />
        )}
      </span>
    ));
  };

  const renderStockStatus = () => {
    if (inventory === null || inventory.quantity === 0) {
      return <Typography className="text-red-600">Out of Stock</Typography>;
    } else if (inventory.quantity < 10) {
      return <Typography className="text-orange-600">Only a few items left</Typography>;
    } else {
      return <Typography className="text-green-600">In Stock</Typography>;
    }
  };

  return (
    <section className="py-16 px-4 sm:px-8">
      {product && (
        <div className="mx-auto container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="h-[24rem] w-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <Typography variant="h3" className="mb-4">
                  {product.name}
                </Typography>
                <Typography variant="h5" className="mb-4">₹{product.price}</Typography>
                <Typography className="mb-4 text-base font-normal leading-relaxed text-gray-700 break-words w-[50%]">
                  {product.description}
                </Typography>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex">
                    {renderStars(product.averageRating)}
                  </div>
                  <Typography className="text-sm font-bold text-gray-700">
                    {product.averageRating.toFixed(1)}/5 ({reviews.length} reviews)
                  </Typography>
                </div>
                <div className="mb-4">
                  {renderStockStatus()}
                </div>
                <div className="mt-10">
                <Button 
                  color="gray" 
                  className="w-full md:w-96" 
                  // disabled={inventory === null || inventory.quantity === 0}
                >
                  Add to Cart
                </Button>
              </div>
              </div>
              
            </div>
          </div>

          <div className="mt-16 md:ml-20">
            <Typography variant="h4" className="mb-6">
              Customer Reviews
            </Typography>
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <CardReview
                    key={review._id}
                    comment={review.comment || ""}
                    username={review.user.name}
                    rating={review.rating}
                    date={new Date(review.createdAt).toLocaleDateString()}
                  />
                ))
              ) : (
                <Typography>No reviews available for this product.</Typography>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetail;
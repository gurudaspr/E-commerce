import React, { useEffect, useState } from "react";
import axiosInstance from "../../../config/axios";
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import CardReview from '../card/ReviewCard';

export function ProductDetail({ productId }) {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${productId}`);
        setProduct(response.data.product);
        console.log(response.data);
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

  return (
    <section className="py-16 px-8">
      {product && (
        <div className="mx-auto container flex flex-col md:flex-row items-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-[24rem] w-full object-contain md:w-1/2" // Set height and width for all screens
          />
          <div className="md:w-1/2 md:pl-8"> {/* Add padding on larger screens */}
            <Typography className="mb-4" variant="h3">
              {product.name}
            </Typography>
            <Typography variant="h5">${product.price}</Typography>
            <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500">
              {product.description}
            </Typography>
            <div className="my-8 flex items-center gap-2">
              <div className="flex">
                {renderStars(product.averageRating)}
              </div>
              <Typography className="!text-sm font-bold !text-gray-700">
                {product.averageRating.toFixed(1)}/5 ({reviews.length} reviews)
              </Typography>
            </div>
            <Typography color="blue-gray" variant="h6">
              Color
            </Typography>
            <div className="my-8 mt-3 flex items-center gap-2">
              {/* Add color options dynamically if needed */}
              <div className="h-5 w-5 rounded border border-gray-900 bg-blue-gray-600 "></div>
              <div className="h-5 w-5 rounded border border-blue-gray-100 "></div>
              <div className="h-5 w-5 rounded border border-blue-gray-100 bg-gray-900 "></div>
            </div>
            <div className="mb-4 flex w-full items-center gap-3 md:w-1/2">
              <Button color="gray" className="w-52">
                Add to Cart
              </Button>
              <IconButton color="gray" variant="text" className="shrink-0">
                <HeartIcon className="h-6 w-6" />
              </IconButton>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="mt-16">
        <Typography variant="h4" className="mb-6">
          Customer Reviews
        </Typography>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <CardReview
              key={review._id}
              comment={review.comment || ""}
              username={review.userId || "Anonymous"}
              rating={review.rating}
              date={new Date(review.createdAt).toLocaleDateString()}
            />
          ))
        ) : (
          <Typography>No reviews available for this product.</Typography>
        )}
      </div>
    </section>
  );
}

export default ProductDetail;

import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { FaStar, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ img, name, price, rating = 3, onAddToCart }) => {
  return (
    <Card shadow={false} className="border border-gray-300 w-[250px] flex flex-col h-full transition-transform hover:scale-105">
      <CardBody className="flex flex-col justify-between h-full pb-4">
        {/* Product Image */}
        <div className="w-full h-40 flex items-center justify-center overflow-hidden relative">
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover" // Apply mix-blend-mode for blending
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between mt-auto ">
          {/* Product Name and Price */}
          <div className="flex justify-between pt-4">
            <Typography className="mb-2 text-sm font-medium" color="blue-gray">
              {name}
            </Typography>
            <Typography variant="h6" className="text-gray-600">
            ₹{price}
            </Typography>
          </div>

          {/* Rating System */}
          <div className="flex pb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <FaStar key={i} className=" text-yellow-900" />
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <FaStar key={i} className=" text-gray-300" />
                ))}
                 <Typography className="ml-2 text-sm text-gray-500">({rating})</Typography>
              </div>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="flex justify-between mt-auto">
            <Button
              size="sm"
              color="blue-gray"
              className="mt-2"
              onClick={onAddToCart} // Function to handle adding to cart
            >
              <FaShoppingCart className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              color="light-green"
              className="mt-2"
              onClick={onAddToCart} // Function to handle adding to cart
            >
              Buy Now
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;

// Updated ProductCard component
import { Card, CardBody, Typography, Button } from '@material-tailwind/react';
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/solid';

const ProductCard = ({ img, name, price, averageRating, handleAddToCart, handleBuyNow, productId, handleNavigateToProductDetail }) => {
    const handleCardClick = () => {
        handleNavigateToProductDetail(productId); // Navigate to product detail page
    };

    return (
        <Card
            shadow={false}
            className="border border-gray-300 w-[250px] flex flex-col h-full transition-transform hover:scale-105 cursor-pointer"
            onClick={handleCardClick}
        >
            <CardBody className="flex flex-col justify-between h-full pb-4">
                {/* Product Image */}
                <div className="w-full h-40 flex items-center justify-center overflow-hidden relative">
                    <img
                        src={img}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-between mt-auto">
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
                        {Array.from({ length: Math.round(averageRating) }).map((_, i) => (
                            <StarIcon key={i} className="text-yellow-900 h-5 w-5" />
                        ))}
                        {Array.from({ length: 5 - Math.round(averageRating) }).map((_, i) => (
                            <StarIcon key={i} className="text-gray-300 h-5 w-5" />
                        ))}
                        <Typography className="ml-2 text-sm text-gray-500">({averageRating.toFixed(1)})</Typography>
                    </div>

                    {/* Add to Cart and Buy Now Buttons */}
                    <div className="flex justify-center mt-auto">
                        <Button
                            size='sm'
                            fullWidth
                            variant="outlined"
                            className="mt-2 flex items-center justify-center gap-3 text-black hover:bg-black hover:text-white transition duration-200"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card click from triggering
                                handleAddToCart(productId);
                            }}
                        >
                            <ShoppingCartIcon className="h-full w-full max-h-5 max-w-5 flex-shrink-0" />
                            <span className="flex-1 text-center">Add To Cart</span>
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default ProductCard;

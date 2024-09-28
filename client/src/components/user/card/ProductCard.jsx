// Updated ProductCard component
import { Card, CardBody, Typography, Button } from '@material-tailwind/react';
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/solid';

const ProductCard = ({ img, name, price, averageRating , handleAddToCart, handleBuyNow, productId, handleNavigateToProductDetail }) => {
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
                    <div className="flex justify-between mt-auto">
                        <Button
                            size="sm"
                            color="blue-gray"
                            className="mt-2"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card click from triggering
                                handleAddToCart(productId);
                            }}
                        >
                            <ShoppingCartIcon className="h-6 w-6" />
                        </Button>
                        <Button
                            size="sm"
                            color="light-green"
                            className="mt-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleBuyNow(productId);
                            }}
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

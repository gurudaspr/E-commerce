import useFetchProducts from '../../hooks/useFetchProducts';
import ProductCard from '../../components/user/card/ProductCard';
import { useProductStore } from '../../store/useProductStore';
import FilterSidebar from '../../components/user/filter/FilterSidebar';
import useCart from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore'; // Import the auth store

const ProductsPage = () => {
    const { filteredProducts, isLoading, error } = useProductStore();
    useFetchProducts(); // Fetch products when component mounts
    const { addToCart } = useCart();
    const navigate = useNavigate(); // Hook for navigating
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // Access authentication state

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleAddToCart = (product) => {
        console.log(product, 'add to cart');
        addToCart(product);
    };

    const handleBuyNow = (product) => {
        console.log(product, 'buy now');
    };

    const handleNavigateToProductDetail = (productId) => {
        if (isAuthenticated) {
            navigate(`/user/product/${productId}`); // Navigate to user product detail page
        } else {
            navigate(`/product/${productId}`); // Navigate to public product detail page
        }
    };

    return (
        <div className='flex pt-24 min-h-screen'>
            <div className='md:w-1/4'>
                <FilterSidebar />
            </div>
            <div className='w-full md:w-3/5'>
                <div className="flex">
                    <div className="flex-1 p-4">
                        <div className="mx-auto container flex flex-col items-center justify-center">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        productId={product._id}
                                        img={product.image}
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
                                        handleAddToCart={handleAddToCart}
                                        handleBuyNow={handleBuyNow}
                                        handleNavigateToProductDetail={handleNavigateToProductDetail}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;

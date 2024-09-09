import React from 'react';
import useFetchProducts from '../../hooks/useFetchProducts';
import ProductCard from '../../components/user/card/ProductCard';
import { useProductStore } from '../../store/useProductStore';
import FilterSidebar from '../../components/user/filter/FilterSidebar';

const UserDashboardPage = () => {
    const { filteredProducts, isLoading, error } = useProductStore();
    useFetchProducts(); // Fetch products when component mounts

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (


        <div className='flex pt-24'>
            <div className=' md:w-1/6'>
                <FilterSidebar />
            </div>
            <div className='w-full md:w-3/4 '>
                <div className="flex">
                    <div className="flex-1 p-4">
                        <div className="mx-auto container flex flex-col items-center justify-center">
                            <div className="grid grid-cols-1 gap-8 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        img={product.image}
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
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

export default UserDashboardPage;
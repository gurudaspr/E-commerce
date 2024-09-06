import React from 'react'

import useFetchProducts from '../../hooks/useFetchProducts';
import ProductCard from '../../components/user/card/ProductCard';
import { useProductStore } from '../../store/useProductStore'

const UserDashboardPage = () => {
    const { products, isLoading, error } = useProductStore();  // Zustand store data
    useFetchProducts();  // Fetch products when component mounts

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div className="mx-auto container flex flex-col items-center justify-center">
            <div className=" grid grid-cols-1 gap-8 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        img={product.image}
                        name={product.name}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    );
};
export default UserDashboardPage
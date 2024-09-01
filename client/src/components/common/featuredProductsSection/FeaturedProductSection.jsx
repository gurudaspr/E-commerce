import React from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';

// ProductListCard Component
function ProductListCard({ img, name, price }) {
    return (
        <Card shadow={false} className="border border-gray-300">
            <CardBody className="pb-0">
                <img src={img} alt={name} className="min-w-[280px] w-full" />
                <div className="flex justify-between mt-4">
                    <div>
                        <Typography className="mb-2" color="blue-gray" variant="h5">
                            {name}
                        </Typography>
                        <div className="mb-5 flex items-center gap-2">
                            {/* Add color options here if needed */}
                        </div>
                    </div>
                    <Typography
                        variant="h5"
                        className="text-gray-600"
                    >
                        {price}
                    </Typography>
                </div>
            </CardBody>
        </Card>
    );
}

// FeaturedProductSection Component
const PRODUCTS = [
    {
        img: 'https://www.material-tailwind.com/image/product-4.png',
        name: 'Linen Suit',
        price: '₹2,500'
    },
    {
        img: 'https://www.material-tailwind.com/image/product-3.png',
        name: 'Tweed Suit',
        price: '₹2,300'
    },
    {
        img: 'https://www.material-tailwind.com/image/product-5.png',
        name: 'Premium Suit',
        price: '₹1,240'
    },
    // Add more products as needed
];

export function FeaturedProductSection() {
    return (
        <section className="py-10 px-8">
            <div className="mx-auto text-center mb-16">
                <Typography variant="h1" className="my-4 text-4xl">
                    Discover Our Top Picks
                </Typography>
                <Typography className="!font-normal text-gray-500 mx-auto max-w-2xl">
                    Explore our selection of top-rated products, carefully curated to bring you the best in quality and style.
                </Typography>
            </div>
            <div className="mx-auto container">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
                    {PRODUCTS.map(({ img, name, price }, index) => (
                        <ProductListCard
                            key={index}
                            img={img}
                            name={name}
                            price={price}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedProductSection;

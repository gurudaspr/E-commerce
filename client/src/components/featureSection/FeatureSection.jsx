import React from 'react';
import { Card, CardBody, Typography, Avatar } from '@material-tailwind/react';
import { ShoppingBagIcon, TruckIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Exclusive Deals',
    description: 'Get access to exclusive deals and discounts tailored just for you.',
    icon: <ShoppingBagIcon className="w-12 h-12 mx-auto text-gray-500" />,
  },
  {
    title: 'Fast Delivery',
    description: 'Enjoy speedy delivery and track your orders in real-time.',
    icon: <TruckIcon className="w-12 h-12 mx-auto text-gray-500" />,
  },
  {
    title: 'Secure Payments',
    description: 'Experience secure and hassle-free transactions with multiple payment options.',
    icon: <LockClosedIcon className="w-12 h-12 mx-auto text-gray-500" />,
  },
];

const FeatureSection = () => {
  return (
    <section className="py-16 px-8 lg:py-28">
      <div className="container mx-auto text-center mb-12">
        <Typography
          color="blue-gray"
          className="mb-2 font-bold uppercase"
        >
          Features
        </Typography>
        <Typography
          color="blue-gray"
          className="mb-4 text-2xl font-bold lg:text-4xl"
        >
          What We Offer
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto max-w-lg text-gray-500"
        >
          Discover our amazing features designed to enhance your shopping experience.
        </Typography>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-gray-100/50 overflow-hidden"
            shadow={false}
          >
            <CardBody className="text-center">
              {feature.icon}
              <Typography
                variant="h4"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                {feature.title}
              </Typography>
              <Typography className="text-center mb-4 text-base font-normal leading-7 text-gray-500">
                {feature.description}
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;

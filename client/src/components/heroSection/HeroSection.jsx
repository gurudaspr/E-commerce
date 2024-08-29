import React from 'react';
import { Button, Typography } from '@material-tailwind/react';

const HeroSection = () => {
  return (
    <div className="relative bg-gray-800 h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50"></div> {/* Overlay */}

      <div className="container mx-auto text-center px-4 lg:px-0 relative z-10">
        <Typography
          variant="h1"
          color="white"
          className="text-4xl lg:text-6xl font-bold mb-4"
        >
          Welcome to ZestaMart
        </Typography>

        <Typography
          variant="h5"
          color="white"
          className="text-lg lg:text-2xl mb-8"
        >
          Your one-stop shop for everything you love.
        </Typography>

        <Typography
          variant="body1"
          color="white"
          className="mb-6 max-w-xl mx-auto text-gray-300"
        >
          At ZestaMart, we offer a wide range of products tailored to meet your needs. Discover quality items, unbeatable prices, and exceptional service all in one place.
        </Typography>

        <div className="flex justify-center space-x-4">
          <Button color="light-blue" size="lg" className="px-6">
            Shop Now
          </Button>
          <Button variant="outlined" color="white" size="lg" className="px-6">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

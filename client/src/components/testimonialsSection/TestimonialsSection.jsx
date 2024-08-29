import React from 'react';
import { Card, CardBody, Typography, Avatar } from '@material-tailwind/react';

const testimonials = [
  {
    name: 'Rijo Sebastian',
    role: 'Verified Buyer',
    review: 'Fantastic experience! The products are top-notch and the customer service was outstanding. Highly recommend!',
    image: 'https://rijoksd.netlify.app/me.png',
    rating: 5,
  },
  {
    name: 'Sreeraj K',
    role: 'Regular Customer',
    review: 'Great quality and fast delivery. I’ve been a loyal customer for years and I’m always satisfied with my purchases.',
    image: 'https://sreeraj-1122.github.io/portfolio/static/media/sree.5d24a7a90e5ef2f7ed13.jpg',
    rating: 4,
  },
  {
    name: 'Gurudas P R',
    role: 'New Shopper',
    review: 'I was impressed with the ease of shopping and the quality of the items. Will definitely be shopping here again!',
    image: 'https://gurudaspr.github.io/assets/img/guruprofile.jpg',
    rating: 5,
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16 px-8 lg:py-28">
      <div className="container mx-auto text-center mb-12">
        <Typography
          color="blue-gray"
          className="mb-2 font-bold uppercase"
        >
          Testimonials
        </Typography>
        <Typography
          color="blue-gray"
          className="mb-4 text-2xl font-bold lg:text-4xl"
        >
          What Our Customers Say
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto max-w-lg text-gray-500"
        >
          Hear directly from our valued customers about their experiences.
        </Typography>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-8">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="bg-gray-100/50 overflow-hidden"
            shadow={false}
          >
            <CardBody className="text-center p-6">
              <Avatar
                size="xl"
                variant="circular"
                alt={testimonial.name}
                className="mx-auto border-2 border-white mb-4"
                src={testimonial.image}
              />
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                {testimonial.name}
              </Typography>
              <Typography
                color="blue-gray"
                className="mb-4 text-sm font-medium"
              >
                {testimonial.role}
              </Typography>
              <Typography className="text-center mb-4 text-base font-normal leading-7 text-gray-500">
                {testimonial.review}
              </Typography>
              <div className="flex justify-center">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="none"
                  >
                    <path d="M12 2l2.09 4.26L18 8.27l-3.5 3.42 1.07 4.93L12 13.77l-3.57 2.85L9.5 11.69 6 8.27l3.91-.01L12 2z" />
                  </svg>
                ))}
                {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="none"
                  >
                    <path d="M12 2l2.09 4.26L18 8.27l-3.5 3.42 1.07 4.93L12 13.77l-3.57 2.85L9.5 11.69 6 8.27l3.91-.01L12 2z" />
                  </svg>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;

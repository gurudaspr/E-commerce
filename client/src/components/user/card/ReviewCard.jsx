import React from "react";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

export function CardReview({ username, comment, rating, date }) {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index}>
        {index < Math.round(rating) ? (
          <StarIcon className="h-5 w-5 text-yellow-900" />
        ) : (
          <StarIconOutline className="h-5 w-5 text-gray-300 " />
        )}
      </span>
    ));
  };

  return (
    <Card shadow={false}>
      <CardBody className="pt-0">
        <div className="flex mb-2">
          {renderStars(rating)}
        </div>
        <Typography
          variant="h6"
          color="blue-gray"
          className="font-bold mb-2 mt-1"
        >
          {comment}
        </Typography>
        <Typography
          variant="h6"
          color="blue-gray"
          className="font-medium mt-3"
        >
          {username}
        </Typography>
        <Typography
          variant="small"
          className="font-normal !text-gray-500"
        >
          {date}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default CardReview;
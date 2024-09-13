import React from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

const CheckoutForm = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      <div className="flex-1">
        <Typography variant="h5" color="blue-gray" className="mb-6">
          Contact
        </Typography>
        <div className="mb-4">
          <Input type="email" label="Your Email" />
        </div>
        <Checkbox
          label={
            <Typography color="blue-gray" className="flex font-medium">
              I agree the
              <Typography
                as="a"
                href="#"
                color="blue"
                className="font-medium hover:text-blue-700 transition-colors"
              >
                &nbsp;Terms and Conditions
              </Typography>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />

        <Typography variant="h5" color="blue-gray" className="mt-8 mb-6">
          Shipping Address
        </Typography>
        <div className="mb-4">
          <Input label="Address" />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Input label="City" />
          <Input label="Postal Code" />
          <Input label="Country" />
        </div>

        <Typography variant="h5" color="blue-gray" className="mt-8 mb-6">
          Payment Details
        </Typography>
        <div className="mb-4">
          <Input label="Card Number" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input label="Expiration Date" />
          <Input label="CVC" />
        </div>
        <Checkbox
          label={
            <Typography color="blue-gray" className="flex font-medium">
              I agree the
              <Typography
                as="a"
                href="#"
                color="blue"
                className="font-medium hover:text-blue-700 transition-colors"
              >
                &nbsp;Terms and Conditions
              </Typography>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />

        <Typography variant="h5" color="blue-gray" className="mt-8 mb-6">
          Billing Address
        </Typography>
        <Checkbox
          label={
            <Typography color="blue-gray" className="flex font-medium">
              Same as shipping address
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />

        <Button fullWidth className="mt-6">
          Proceed to Payment
        </Button>
      </div>

      <Card className="flex-1 p-6 bg-gray-900 text-white">
        <Typography variant="h5" className="mb-6">
          Order Summary
        </Typography>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded"></div>
            <div>
              <Typography variant="h6">Pink Blouse</Typography>
              <Typography variant="small" color="gray">Silk, Size: XS</Typography>
            </div>
            <Typography variant="h6" className="ml-auto">$1,300</Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded"></div>
            <div>
              <Typography variant="h6">Premium Suit</Typography>
              <Typography variant="small" color="gray">Linen, Size: M</Typography>
            </div>
            <Typography variant="h6" className="ml-auto">$790</Typography>
          </div>
        </div>
        <hr className="my-6 border-gray-700" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <Typography>Subtotal</Typography>
            <Typography>$2,090</Typography>
          </div>
          <div className="flex justify-between">
            <Typography>Shipping Fee</Typography>
            <Typography>$10</Typography>
          </div>
          <div className="flex justify-between">
            <Typography>Tax Estimate</Typography>
            <Typography>$0</Typography>
          </div>
          <div className="flex justify-between font-bold">
            <Typography>Order Total</Typography>
            <Typography>$2,100</Typography>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CheckoutForm;
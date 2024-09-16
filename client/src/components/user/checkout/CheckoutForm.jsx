import React, { useState } from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Radio,
} from "@material-tailwind/react";

const savedAddresses = [
  { id: 1, address: '123 Main St', city: 'Anytown', postalCode: '12345', country: 'USA' },
  { id: 2, address: '456 Elm St', city: 'Othertown', postalCode: '67890', country: 'USA' },
];
const CheckoutForm = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({ address: '', city: '', postalCode: '', country: '' });
  const [useNewAddress, setUseNewAddress] = useState(false);

  const handleAddressChange = (e) => {
    setSelectedAddress(parseInt(e.target.value));
    setUseNewAddress(false);
  };

  const handleNewAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto flex md:flex-row gap-8 p-4  md:pt-20 justify-end flex-col-reverse">
      <div className=" md:fixed top-28 p-6 left-52 border border-gray-300  rounded-xl  ">
      <Typography variant="h5" color="blue-gray" className="mt-8 mb-6">
        Shipping Address
      </Typography>

      {savedAddresses.map((address) => (
        <div key={address.id} className="mb-4 w-[100%]">
          <Radio
            name="address"
            value={address.id}
            onChange={handleAddressChange}
            checked={selectedAddress === address.id}
            label={
              <Typography color="blue-gray" className="font-medium">
                {`${address.address}, ${address.city}, ${address.postalCode}, ${address.country}`}
              </Typography>
            }
          />
        </div>
      ))}

      <div className="mb-4">
        <Radio
          name="address"
          value="new"
          onChange={() => setUseNewAddress(true)}
          checked={useNewAddress}
          label={
            <Typography color="blue-gray" className="font-medium">
              Use a new address
            </Typography>
          }
        />
      </div>

      {useNewAddress && (
        <>
          <div className="mb-4">
            <Input name="address" label="Address" onChange={handleNewAddressChange} value={newAddress.address} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input name="city" label="City" onChange={handleNewAddressChange} value={newAddress.city} />
            <Input name="postalCode" label="Postal Code" onChange={handleNewAddressChange} value={newAddress.postalCode} />
            <Input name="country" label="Country" onChange={handleNewAddressChange} value={newAddress.country} />
          </div>
        </>
      )}

      <Checkbox
        label={
          <Typography color="blue-gray" className="flex font-medium">
            I agree to the
            <Typography
              as="a"
              href="#"
              color="blue"
              className="font-medium hover:text-blue-700 transition-colors ml-1"
            >
              Terms and Conditions
            </Typography>
          </Typography>
        }
        containerProps={{ className: "-ml-2.5" }}
      />

      <Button fullWidth className="mt-6">
        Proceed to Payment
      </Button>
      </div>

      <Card className=" p-6 bg-gray-900 text-white w-full md:w-1/2 ">
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
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded"></div>
            <div>
              <Typography variant="h6">Premium Suit</Typography>
              <Typography variant="small" color="gray">Linen, Size: M</Typography>
            </div>
            <Typography variant="h6" className="ml-auto">$790</Typography>
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
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../../../config/axios';
import {
  Card,
  Input,
  Button,
  Typography,
  Radio,
  Select,
  Option,
} from "@material-tailwind/react";
import { PlusIcon } from '@heroicons/react/24/solid';

// Validation schema
const schema = yup.object().shape({
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  pincode: yup.string().required('Pincode is required'),
  state: yup.string().required('State is required'),
});

// List of Indian states
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep", "Delhi", "Puducherry"
];

const CheckoutForm = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);

  const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      address: '',
      city: '',
      pincode: '',
      state: '',
    },
  });

  // Fetch saved addresses from the API
  const fetchSavedAddresses = async () => {
    try {
      const response = await axiosInstance.get('/addresses');
      console.log('Fetched saved addresses:', response.data);
      setSavedAddresses(response.data.addresses);
    } catch (error) {
      console.error('Failed to fetch saved addresses:', error);
    }
  };

  useEffect(() => {
    fetchSavedAddresses();
  }, []);

  useEffect(() => {
    console.log('Saved addresses:', savedAddresses);
  }, [savedAddresses]);

  const handleAddressChange = (addressId) => {
    setSelectedAddress(addressId);
    setUseNewAddress(false);

    if (addressId) {
      const selectedAddr = savedAddresses.find(addr => addr.id === addressId);
      setValue('address', selectedAddr.address);
      setValue('city', selectedAddr.city);
      setValue('pincode', selectedAddr.pincode);
      setValue('state', selectedAddr.state);
    } else {
      reset({
        address: '',
        city: '',
        pincode: '',
        state: '',
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/addresses', data);
      console.log('Address saved:', response.data);
      setSavedAddresses(prevAddresses => [...prevAddresses, response.data]);
      setUseNewAddress(false);
      setSelectedAddress(response.data.id);
      // Show success message to user
      alert('Address added successfully!');
    } catch (error) {
      console.error('Error saving address:', error);
      // Show error message to user
      alert('Error saving address. Please try again.');
    }
  };

  const handleAddNewAddress = () => {
    setUseNewAddress(true);
    setSelectedAddress(null);
    reset({
      address: '',
      city: '',
      pincode: '',
      state: '',
    });
  };

  return (
    <div className="container mx-auto flex md:flex-row gap-8 p-4 md:pt-20 flex-col-reverse">
      <div className="md:w-2/3">
        <Card className="p-6 border border-gray-300 rounded-xl">
          <Typography variant="h5" color="blue-gray" className="mt-8 mb-6">
            Shipping Address
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {savedAddresses.map((address) => (
              <div key={address.id} className="mb-4">
                <Radio
                  name="address"
                  value={address.id}
                  onChange={() => handleAddressChange(address.id)}
                  checked={selectedAddress === address.id}
                  label={
                    <Typography color="blue-gray" className="font-medium">
                      {`${address.address}, ${address.city}, ${address.state}, ${address.pincode}`}
                    </Typography>
                  }
                />
              </div>
            ))}

            <div className="mb-4">
              <div
                onClick={handleAddNewAddress}
                className="flex items-center gap-2 cursor-pointer"
              >
                <PlusIcon className="h-6 w-6 text-blue-700" />
                <Typography color="blue-gray" className="font-medium">
                  Add a new address
                </Typography>
              </div>
            </div>

            {useNewAddress && (
              <>
                <div className="mb-4">
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Address"
                        error={!!errors.address}
                      />
                    )}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-4">
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="City"
                        error={!!errors.city}
                      />
                    )}
                  />
                  <Controller
                    name="pincode"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Pincode"
                        error={!!errors.pincode}
                      />
                    )}
                  />
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="State" error={!!errors.state}>
                        {indianStates.map((state) => (
                          <Option key={state} value={state}>{state}</Option>
                        ))}
                      </Select>
                    )}
                  />
                  <Button type="submit" size="sm" color="blue">
                    Save Address
                  </Button>
                </div>
              </>
            )}
          </form>

          <Button 
            type="button" 
            fullWidth 
            className="mt-6" 
            onClick={handleSubmit((data) => {
              if (selectedAddress) {
                // Proceed to payment with selected address
                console.log('Proceeding to payment with address:', data);
                // Add your logic here to proceed to payment
              } else if (useNewAddress) {
                // Submit the new address form
                onSubmit(data);
              } else {
                // No address selected or added
                alert('Please select an address or add a new one before proceeding.');
              }
            })}
          >
            Proceed to Payment
          </Button>
        </Card>
      </div>

      <Card className="p-6 bg-gray-900 text-white w-full md:w-1/2">
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
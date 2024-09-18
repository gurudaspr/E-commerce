import React from 'react';
import useCheckout from '../../../hooks/useCheckout';
import useCheckoutStore from '../../../store/useCheckOutStore' 
import {
  Card, Input, Button, Typography, Radio, Select, Option,
} from "@material-tailwind/react";
import { PlusIcon } from '@heroicons/react/24/solid';
import { Controller } from 'react-hook-form';

const indianStates = ["Andhra Pradesh", "Assam", "Bihar", "Goa", "Gujarat", "Karnataka", "Kerala", "Maharashtra", "Punjab", "Tamil Nadu", "Uttar Pradesh", "West Bengal", "Delhi"];

const CheckoutForm = () => {
  const {
    addresses,
    loading,
    error,
    selectedAddressId,
    setSelectedAddressId,
    useNewAddress,
    setUseNewAddress,
    saveAddress,
    handleProceedToPayment,
    control,
    handleSubmit,
    errors,
  } = useCheckout();

  const checkoutItems = useCheckoutStore((state) => state.checkoutItems);

  const onSubmit = (data) => {
    saveAddress(data);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="red">{error}</Typography>;

  const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const baseShipping = 50;
  const shipping = subtotal > 1000 ? 0 : baseShipping;
  const total = subtotal + shipping;


  return (
    <div className="container mx-auto flex flex-col-reverse md:flex-row gap-8 p-4 md:pt-20">
      <div className="md:w-2/3">
        <Card className="p-6 border border-gray-300 rounded-xl">
          <Typography variant="h5" color="blue-gray" className="mt-8 mb-6">
            Shipping Address
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div key={address._id} className="mb-4">
                  <Radio
                    name="address"
                    value={address._id}
                    onChange={() => setSelectedAddressId(address._id)}
                    checked={selectedAddressId === address._id}
                    label={`${address.address}, ${address.city}, ${address.state}, ${address.pincode}`}
                  />
                </div>
              ))
            ) : (
              <Typography color="red" className="mb-4">
                No saved addresses found. Please add a new address.
              </Typography>
            )}

            <div className="mb-4 flex items-center gap-2 cursor-pointer" onClick={() => setUseNewAddress(true)}>
              <PlusIcon className="h-6 w-6 text-blue-700" />
              <Typography color="blue-gray" className="font-medium">
                Add a new address
              </Typography>
            </div>

            {useNewAddress && (
              <>
                <div className="mb-4">
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => <Input {...field} label="Address" error={!!errors.address} />}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <Controller name="city" control={control} render={({ field }) => <Input {...field} label="City" error={!!errors.city} />} />
                  <Controller name="pincode" control={control} render={({ field }) => <Input {...field} label="Pincode" error={!!errors.pincode} />} />
                </div>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="State" error={!!errors.state}>
                      {indianStates.map(state => <Option key={state} value={state}>{state}</Option>)}
                    </Select>
                  )}
                />
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                <Button type="submit" size="sm" color="blue" className="mt-4">
                  Save Address
                </Button>
              </>
            )}
          </form>

          <Button fullWidth className="mt-6" onClick={handleProceedToPayment}>
            Proceed to Payment
          </Button>
        </Card>
      </div>

      <Card className="p-6 bg-gray-900 text-white w-full md:w-1/2">
        <Typography variant="h5" className="mb-6">
          Order Summary
        </Typography>

        <div className="space-y-4">
          {checkoutItems.map((item) => (
            <div key={item._id} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="small" color="gray">
                  Quantity: {item.quantity}
                </Typography>
              </div>
              <Typography variant="h6" className="ml-auto">
                ₹{(item.price * item.quantity).toFixed(2)}
              </Typography>
            </div>
          ))}
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <Typography>Subtotal</Typography>
            <Typography>₹{subtotal.toFixed(2)}</Typography>
          </div>

          <div className="flex justify-between">
            <Typography>Shipping Fee</Typography>
            <Typography>
              {shipping === 0 ? (
                <span className="text-green-500">FREE</span>
              ) : (
                `₹${shipping.toFixed(2)}`
              )}
            </Typography>
          </div>

          {/* Coupon Input */}
          <div className="mt-4">
            <Typography variant="small" className="mb-2">
              Apply Coupon
            </Typography>
            <div className="flex gap-2">
              <Input variant="outlined" color="blue" label="Coupon Code" placeholder="Coupon Code" />
              <Button size="sm" color="blue">
                Apply
              </Button>
            </div>
          </div>

          {/* Order Total */}
          <div className="flex justify-between font-bold mt-6">
            <Typography>Order Total</Typography>
            <Typography>₹{total.toFixed(2)}</Typography>
          </div>
        </div>

        <Button fullWidth className="mt-6" onClick={handleProceedToPayment}>
          Proceed to Payment
        </Button>
      </Card>
    </div>
  );
};

export default CheckoutForm;
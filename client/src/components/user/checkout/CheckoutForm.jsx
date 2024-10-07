import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useCheckoutStore from '../../../store/useCheckOutStore';
import {
  Card, Input, Button, Typography, Radio, Select, Option,
} from "@material-tailwind/react";
import { ArrowUturnLeftIcon, PlusIcon, ShieldCheckIcon, TicketIcon, TruckIcon } from '@heroicons/react/24/solid';
import axiosInstance from '../../../config/axios';
import toast from 'react-hot-toast';
import 'https://checkout.razorpay.com/v1/checkout.js';

const indianStates = ["Andhra Pradesh", "Assam", "Bihar", "Goa", "Gujarat", "Karnataka", "Kerala", "Maharashtra", "Punjab", "Tamil Nadu", "Uttar Pradesh", "West Bengal", "Delhi"];

const CheckoutForm = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const checkoutItems = useCheckoutStore((state) => state.checkoutItems);

  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/addresses');
      setAddresses(response.data.addresses || []);
      if (response.data.addresses.length > 0) {
        setSelectedAddressId(response.data.addresses[0]._id);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setError(error.message);
      toast.error('Failed to fetch addresses');
    } finally {
      setLoading(false);
    }
  };

  const saveAddress = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/addresses', data);
      const newAddress = response.data;
      setAddresses(prevAddresses => [...prevAddresses, newAddress]);
      setSelectedAddressId(newAddress._id);  // Select the newly added address
      reset();  // Reset the form fields
      toast.success('Address saved and selected successfully');
    } catch (error) {
      setError(error.message);
      toast.error('Failed to add address');
    } finally {
      setLoading(false);
    }
  };

  const applyCoupon = async () => {
    try {
      const response = await axiosInstance.get(`/coupons/apply-coupon/${couponCode}`);
      const couponData = response.data;

      if (new Date(couponData.expiryDate) < new Date()) {
        setCouponError('Coupon has expired');
        return;
      }

      if (subtotal < couponData.minimumOrderAmount) {
        setCouponError(`Minimum order amount of ₹${couponData.minimumOrderAmount} not met`);
        return;
      }

      setAppliedCoupon(couponData);
      setCouponError('');
    } catch (error) {
      setCouponError('Invalid coupon');
    }
  };

  const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const discount = appliedCoupon ? (appliedCoupon.discountType === 'percentage' ? (subtotal * appliedCoupon.discountValue) / 100 : appliedCoupon.discountValue) : 0;
  const total = subtotal + shipping - discount;

  const handleProceedToPayment = async () => {
    if (!selectedAddressId) {
      toast.error('Please select an address or add a new one before proceeding.');
      return;
    }

    try {
      // Create order
      const orderResponse = await axiosInstance.post('/orders/create-order', {
        amount: total,
      });

      // Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: 'Your Company Name',
        description: 'Payment for your order',
        order_id: orderResponse.data.id,
        handler: async (response) => {
          try {
            const paymentVerification = await axiosInstance.post('/orders/verify-payment', response);

            if (paymentVerification.data.success) {
              toast.success('Payment successful!');
            } else {
              toast.error('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Error during payment verification:', error);
            toast.error('An error occurred during payment verification.');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error during payment process:', error);
      toast.error('An error occurred during the payment process.');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="red">{error}</Typography>;

  return (
    <div className="container mx-auto flex flex-col-reverse md:flex-row gap-8 p-4 pt-20">
      {/* Address Section */}
      <div className="md:w-2/3">
        <Card className="p-6 border border-gray-300 rounded-xl">
          <Typography variant="h5" color="blue-gray" className="mt-8 mb-6">
            Shipping Address
          </Typography>
          {addresses.map((address) => (
            <div key={address._id} className="mb-4">
              <Radio
                name="address"
                value={address._id}
                onChange={() => setSelectedAddressId(address._id)}
                checked={selectedAddressId === address._id}
                label={`${address.address}, ${address.city}, ${address.state}, ${address.pincode}`}
              />
            </div>
          ))}

          <Typography color="blue-gray" className="font-medium mb-4">
            Add a new address
          </Typography>

          <form onSubmit={handleSubmit(saveAddress)}>
            <div className="mb-4">
              <Controller
                name="address"
                control={control}
                rules={{ required: 'Address is required' }}
                render={({ field }) => <Input {...field} label="Address" error={!!errors.address} />}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Controller name="city" control={control} rules={{ required: 'City is required' }} render={({ field }) => <Input {...field} label="City" error={!!errors.city} />} />
              <Controller name="pincode" control={control} rules={{ required: 'Pincode is required' }} render={({ field }) => <Input {...field} label="Pincode" error={!!errors.pincode} />} />
            </div>
            <Controller
              name="state"
              control={control}
              rules={{ required: 'State is required' }}
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
          </form>
        </Card>
      </div>

      {/* Order Summary */}
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

          {appliedCoupon && (
            <div className="flex justify-between text-green-500">
              <Typography>Discount</Typography>
              <Typography>-₹{discount.toFixed(2)}</Typography>
            </div>
          )}
        </div>

        {/* Coupon Section */}
        <div className="my-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-900 px-2 text-sm text-gray-500">Apply Coupon</span>
            </div>
          </div>

          <div className="mt-4 relative">
            <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
              <TicketIcon className="h-8 w-8 text-blue-500" />
              <Input
                variant="standard"
                color="white"
                label="Coupon Code"
                placeholder="Enter code"
                className="border-none focus:border-none"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button size="sm" color="blue" className="rounded-full px-4" onClick={applyCoupon}>
                Apply
              </Button>
            </div>
            <div className='absolute'>
              {couponError && <Typography color="red" className="mt-2">{couponError}</Typography>}
              {appliedCoupon && <Typography color="green" className="mt-2">Coupon applied successfully!</Typography>}
            </div>
          </div>
        </div>

        {/* Order Total */}
        <div className="flex justify-between font-bold mt-6">
          <Typography>Order Total</Typography>
          <Typography>₹{total.toFixed(2)}</Typography>
        </div>

        <Button color='white' fullWidth className="my-auto" onClick={handleProceedToPayment}>
          Proceed to Payment
        </Button>
      </Card>
    </div>
  );
};

export default CheckoutForm;
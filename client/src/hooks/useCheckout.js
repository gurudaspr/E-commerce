import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../config/axios';
import toast from 'react-hot-toast';

const addressSchema = yup.object({
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  pincode: yup.string().required('Pincode is required'),
  state: yup.string().required('State is required'),
});

const useCheckout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [useNewAddress, setUseNewAddress] = useState(false);

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(addressSchema),
    });

    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/addresses');
            setAddresses(response.data.addresses || []);
        } catch (error) {
            console.error('Error fetching addresses:', error);
            setError(error.message);
            toast.error('Failed to fetch addresses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const saveAddress = async (newAddress) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post('/addresses', newAddress);
            setAddresses(prevAddresses => [...prevAddresses, response.data]);
            setUseNewAddress(false);
            toast.success('Address saved successfully');
            return response.data;
        } catch (error) {
            setError(error.message);
            toast.error('Failed to add address');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleProceedToPayment = () => {
        if (selectedAddressId || useNewAddress) {
            console.log('Proceeding to payment with address ID:', selectedAddressId);
            
        } else {
            toast.error('Please select an address or add a new one before proceeding.');
        }
    };

    return {
        addresses,
        loading,
        error,
        selectedAddressId,
        setSelectedAddressId,
        useNewAddress,
        setUseNewAddress,
        fetchAddresses,
        saveAddress,
        handleProceedToPayment,
        control,
        handleSubmit,
        errors,
        reset,
    };
};

export default useCheckout;
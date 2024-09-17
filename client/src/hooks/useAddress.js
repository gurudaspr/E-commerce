import { useState } from 'react';
import axiosInstance from '../config/axios';
import toast from 'react-hot-toast';
import { set } from 'react-hook-form';

const useAddress = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addresses, setAddresses] = useState([]);

    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/addresses');
            setAddresses(response.data.addresses || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching addresses:', error);
            setError(error.message);
            toast.error('Failed to fetch addresses');
        } finally {
            setLoading(false);
        }
    };

    const saveAddress = async (newAddress) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post('/addresses', newAddress);
            setAddresses(prevAddresses => [...prevAddresses, response.data]);
            toast.success('Address added successfully');
            setLoading(false);
            return response.data;
        } catch (error) {
            setError(error.message);
            toast.error('Failed to add address');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // const updateAddress = async (addressId, updatedAddress) => {
    //     try {
    //         setLoading(true);
    //         const response = await axiosInstance.put(`/addresses/${addressId}`, updatedAddress);
    //         setAddresses(prevAddresses => 
    //             prevAddresses.map(address => 
    //                 address._id === addressId ? response.data : address
    //             )
    //         );
    //         toast.success('Address updated successfully');
    //         return response.data;
    //     } catch (error) {
    //         setError(error.message);
    //         toast.error('Failed to update address');
    //         throw error;
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const deleteAddress = async (addressId) => {
    //     try {
    //         setLoading(true);
    //         await axiosInstance.delete(`/addresses/${addressId}`);
    //         setAddresses(prevAddresses => prevAddresses.filter(address => address._id !== addressId));
    //         toast.success('Address removed successfully');
    //     } catch (error) {
    //         setError(error.message);
    //         toast.error('Failed to remove address');
    //         throw error;
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return {
        addresses,
        loading,
        error,
        fetchAddresses,
        saveAddress,
        // updateAddress,
        // deleteAddress,
    };
};

export default useAddress;
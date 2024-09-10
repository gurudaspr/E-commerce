import { useState } from 'react';
import axiosInstance from '../config/axios';
import toast from 'react-hot-toast';

const useAddToCart = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const addToCart = async (productId) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(`/cart/${productId}`);
            console.log(response.data);
            toast.success(response.data.message);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    return { addToCart, isLoading, error };
};
export default useAddToCart;
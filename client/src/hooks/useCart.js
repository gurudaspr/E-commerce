import { useState } from 'react';
import axiosInstance from '../config/axios';
import toast from 'react-hot-toast';

const useCart = () => {
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = async () => {
        try {
            setIsInitialLoading(true);
            const response = await axiosInstance.get('/cart');
            setCartItems(response.data.cartItems || []);
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setError(error.message);
            toast.error('Failed to fetch cart items');
        } finally {
            setIsInitialLoading(false);
        }
    };

    const addToCart = async (productId) => {
        try {
            setIsUpdating(true);
            const response = await axiosInstance.post(`/cart/${productId}`);
            setCartItems(response.data.cartItems);
            toast.success('Item added to cart successfully');
        } catch (error) {
            setError(error.message);
            toast.error('Failed to add item to cart');
        } finally {
            setIsUpdating(false);
        }
    };

    const updateCartItem = async (itemId, status) => {
        try {
            setIsUpdating(true);
            await axiosInstance.patch(`/cart?productId=${itemId}&status=${status}`);
            
            setCartItems(prevItems => 
                prevItems.map(item => 
                    item._id === itemId
                        ? { ...item, quantity: status === 'inc' ? item.quantity + 1 : item.quantity - 1 }
                        : item
                ).filter(item => item.quantity > 0)
            );
            
            toast.success('Cart item updated successfully');
        } catch (error) {
            setError(error.message);
            toast.error('Failed to update cart item');
        } finally {
            setIsUpdating(false);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            setIsUpdating(true);
            await axiosInstance.delete(`/cart/${itemId}`);
            
            setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
            
            toast.success('Item removed from cart successfully');
        } catch (error) {
            setError(error.message);
            toast.error('Failed to remove item from cart');
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        cartItems,
        isInitialLoading,
        isUpdating,
        error,
        fetchCartItems,
        addToCart,
        updateCartItem,
        removeFromCart,
    };
};

export default useCart;
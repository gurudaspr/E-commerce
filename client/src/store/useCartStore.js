import { create } from 'zustand';
import axiosInstance from '../config/axios';
import toast from 'react-hot-toast';

const useCartStore = create((set) => ({
  cartItems: [],
  isInitialLoading: true,
  isUpdating: false,
  error: null,

  setIsInitialLoading: (isLoading) => set({ isInitialLoading: isLoading }),
  setIsUpdating: (isUpdating) => set({ isUpdating: isUpdating }),
  setError: (error) => set({ error: error }),
  setCartItems: (items) => set({ cartItems: items }),
}));

export default useCartStore;
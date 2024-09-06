import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,
  
  // Actions to update the state
  setProducts: (products) => set({ products }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

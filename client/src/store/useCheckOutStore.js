import { create } from "zustand";

const useCheckOutStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products: products }),

}));

export default useCheckOutStore;
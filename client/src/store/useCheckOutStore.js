import { create } from 'zustand';

const useCheckoutStore = create((set) => ({
  checkoutItems: [],
  setCheckoutItems: (items) => set({ checkoutItems: items }),
  clearCheckoutItems: () => set({ checkoutItems: [] }),
  addCheckoutItem: (item) => set((state) => ({
    checkoutItems: [...state.checkoutItems, item]
  })),
  removeCheckoutItem: (itemId) => set((state) => ({
    checkoutItems: state.checkoutItems.filter(item => item._id !== itemId)
  })),
  updateCheckoutItemQuantity: (itemId, quantity) => set((state) => ({
    checkoutItems: state.checkoutItems.map(item => 
      item._id === itemId ? { ...item, quantity } : item
    )
  })),
}));

export default useCheckoutStore;
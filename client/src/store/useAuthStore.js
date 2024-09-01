import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      role: null,

      // Set token and update authentication status
      setToken: (token, role) => set(() => ({
        token,
        isAuthenticated: !!token,  // Set isAuthenticated to true if token exists
        role
      })),


      // Logout function to clear token and reset authentication status
      logout: () => set(() => ({
        token: null,
        isAuthenticated: false,
      })),
    }),
    {
      name: 'auth-storage',  // Name of the storage item in localStorage
      storage: createJSONStorage(() => localStorage),  // Use localStorage for persistence
    }
  )
);
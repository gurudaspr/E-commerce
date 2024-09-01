import {create} from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
      (set) => ({
        token: null,
        isAuthenticated: false,
  
        // Set token and update authentication status
        setToken: (token) => set(() => ({
          token,
          isAuthenticated: !!token,  // Set isAuthenticated to true if token exists
        })),
  
        // Logout function to clear token and reset authentication status
        logout: () => set(() => ({
          token: null,
          isAuthenticated: false,
        })),
      }),
      {
        name: 'auth-storage',  // Name of the storage item in localStorage
        storage: localStorage, // Optionally use sessionStorage or another storage
      }
    )
  );
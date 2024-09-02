import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      isAuthenticated: false,
      role: null,

      // Initialize the store with persisted state from localStorage
      init: () => {
        const persistedState = get().getState();
        if (persistedState.token) {
          set(() => ({
            token: persistedState.token,
            isAuthenticated: true,
            role: persistedState.role,
          }));
        }
      },

      // Set token and update authentication status
      setToken: (token, role) =>
        set(() => ({
          token,
          isAuthenticated: !!token,
          role,
        })),

      // Logout function to clear token and reset authentication status
      logout: () =>
        set(() => ({
          token: null,
          isAuthenticated: false,
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
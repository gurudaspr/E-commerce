import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set,get) => ({
      name: null,
      email: null,

      init: () => {
        const persistedState = get().getState();
        if (persistedState.user) {
          set(() => ({
            name: persistedState.name,
            email: persistedState.email,
          }));
        }
      },

      // Set name and email
     setUser : (name, email) =>
        set(() => ({
          name,
          email,
        })),
        
     // Clear user data
     clearUser: () =>
     set(() => ({
       name: null,
       email: null,
     })),
 }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

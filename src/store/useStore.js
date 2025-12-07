import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '@/services/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,

      login: async (email, password) => {
        try {
          set({ loading: true });
          const response = await authAPI.login({ email, password });
          const { user, token } = response.data;
          localStorage.setItem('authToken', token);
          set({ user, token, isAuthenticated: true, loading: false });
          return { success: true, user };
        } catch (error) {
          set({ loading: false });
          return {
            success: false,
            error: error.response?.data?.error || 'Login failed. Please try again.'
          };
        }
      },

      register: async (username, email, password) => {
        try {
          set({ loading: true });
          const response = await authAPI.register({ username, email, password });
          const { user, token } = response.data;
          localStorage.setItem('authToken', token);
          set({ user, token, isAuthenticated: true, loading: false });
          return { success: true, user };
        } catch (error) {
          set({ loading: false });
          return {
            success: false,
            error: error.response?.data?.error || 'Registration failed. Please try again.'
          };
        }
      },

      logout: () => {
        localStorage.removeItem('authToken');
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateUser: (user) => set({ user }),

      // Try to restore session from token
      restoreSession: async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        try {
          const response = await authAPI.getMe();
          set({
            user: response.data.user,
            token,
            isAuthenticated: true
          });
        } catch (error) {
          // Token invalid, clear it
          localStorage.removeItem('authToken');
          set({ user: null, token: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const useWatchlistStore = create(
  persist(
    (set) => ({
      watchlist: [],

      addToWatchlist: (movie) =>
        set((state) => ({
          watchlist: [...state.watchlist, movie],
        })),

      removeFromWatchlist: (movieId) =>
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== movieId),
        })),

      isInWatchlist: (movieId) => (state) =>
        state.watchlist.some((m) => m.id === movieId),
    }),
    {
      name: 'watchlist-storage',
    }
  )
);

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'theme-storage',
    }
  )
);

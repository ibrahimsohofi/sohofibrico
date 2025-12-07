import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  register: (data) =>
    apiClient.post('/auth/register', data),

  login: (data) =>
    apiClient.post('/auth/login', data),

  getMe: () =>
    apiClient.get('/auth/me'),

  updateProfile: (data) =>
    apiClient.put('/auth/profile', data),
};

// Watchlist API
export const watchlistAPI = {
  getWatchlist: () =>
    apiClient.get('/watchlist'),

  addToWatchlist: (movieData) =>
    apiClient.post('/watchlist', { movieData }),

  removeFromWatchlist: (tmdbId) =>
    apiClient.delete(`/watchlist/${tmdbId}`),

  checkWatchlist: (tmdbId) =>
    apiClient.get(`/watchlist/check/${tmdbId}`),
};

// Reviews API
export const reviewsAPI = {
  getMovieReviews: (tmdbId) =>
    apiClient.get(`/reviews/movie/${tmdbId}`),

  addReview: (tmdbId, data) =>
    apiClient.post(`/reviews/movie/${tmdbId}`, data),

  getUserReview: (tmdbId) =>
    apiClient.get(`/reviews/movie/${tmdbId}/user`),

  getMovieRating: (tmdbId) =>
    apiClient.get(`/reviews/movie/${tmdbId}/rating`),

  deleteReview: (reviewId) =>
    apiClient.delete(`/reviews/${reviewId}`),
};

// Comments API
export const commentsAPI = {
  getMovieComments: (tmdbId) =>
    apiClient.get(`/comments/movie/${tmdbId}`),

  addComment: (tmdbId, data) =>
    apiClient.post(`/comments/movie/${tmdbId}`, data),

  updateComment: (commentId, data) =>
    apiClient.put(`/comments/${commentId}`, data),

  deleteComment: (commentId) =>
    apiClient.delete(`/comments/${commentId}`),
};

export default apiClient;

import axios from 'axios';
import { toast } from 'sonner';

const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
tmdbClient.interceptors.request.use(
  (config) => {
    // You can add request logging here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
tmdbClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle network errors
    if (!error.response) {
      toast.error('Network error. Please check your internet connection.');
      return Promise.reject(error);
    }

    // Handle specific status codes
    switch (error.response.status) {
      case 401:
        toast.error('API key is invalid. Please check your configuration.');
        break;
      case 404:
        // Don't show toast for 404s, let components handle it
        break;
      case 429:
        toast.error('Too many requests. Please try again later.');
        break;
      case 500:
      case 502:
      case 503:
        // Retry logic for server errors
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
            return tmdbClient(originalRequest);
          } catch (retryError) {
            toast.error('Server error. Please try again later.');
            return Promise.reject(retryError);
          }
        }
        toast.error('Server error. Please try again later.');
        break;
      default:
        toast.error('An unexpected error occurred. Please try again.');
    }

    return Promise.reject(error);
  }
);

// Helper function to get image URL with fallback
export const getImageUrl = (path, size = 'original') => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

// Wrapper function for API calls with error handling
const apiCall = async (apiFunction, errorMessage = 'Failed to fetch data') => {
  try {
    const response = await apiFunction();
    return response.data;
  } catch (error) {
    console.error(errorMessage, error);
    // Error already handled by interceptor
    throw error;
  }
};

// Movie endpoints
export const tmdbAPI = {
  // Get trending movies
  getTrending: (timeWindow = 'week') =>
    apiCall(() => tmdbClient.get(`/trending/movie/${timeWindow}`), 'Failed to fetch trending movies'),

  // Get popular movies
  getPopular: (page = 1) =>
    apiCall(() => tmdbClient.get('/movie/popular', { params: { page } }), 'Failed to fetch popular movies'),

  // Get top rated movies
  getTopRated: (page = 1) =>
    apiCall(() => tmdbClient.get('/movie/top_rated', { params: { page } }), 'Failed to fetch top rated movies'),

  // Get now playing movies
  getNowPlaying: (page = 1) =>
    apiCall(() => tmdbClient.get('/movie/now_playing', { params: { page } }), 'Failed to fetch now playing movies'),

  // Get upcoming movies
  getUpcoming: (page = 1) =>
    apiCall(() => tmdbClient.get('/movie/upcoming', { params: { page } }), 'Failed to fetch upcoming movies'),

  // Get movie details
  getMovieDetails: (movieId) =>
    apiCall(() => tmdbClient.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos,images,similar,recommendations',
      },
    }), 'Failed to fetch movie details'),

  // Search movies
  searchMovies: (query, page = 1) =>
    apiCall(() => tmdbClient.get('/search/movie', { params: { query, page } }), 'Failed to search movies'),

  // Discover movies with filters
  discoverMovies: (filters = {}) =>
    apiCall(() => tmdbClient.get('/discover/movie', { params: filters }), 'Failed to discover movies'),

  // Get genres
  getGenres: () =>
    apiCall(() => tmdbClient.get('/genre/movie/list'), 'Failed to fetch genres'),

  // Get movies by genre
  getMoviesByGenre: (genreId, page = 1) =>
    apiCall(() => tmdbClient.get('/discover/movie', {
      params: { with_genres: genreId, page },
    }), 'Failed to fetch movies by genre'),
};

export default tmdbClient;

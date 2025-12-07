# Backend Integration Guide

This guide explains how to connect the Movies.to frontend to the backend API.

## Current Status

✅ **Backend is ready** - All API endpoints are implemented and tested
✅ **API service created** - Frontend API client (`src/services/api.js`) is ready
🔄 **Integration pending** - Need to replace localStorage with API calls

## Quick Start

### 1. Start the Backend Server

```bash
cd movies.to/backend
bun run dev
```

The backend will run on `http://localhost:5000`

### 2. Setup MySQL (Optional but Recommended)

If you want full backend features (user auth, reviews, comments):

1. Install MySQL (see `backend/README.md`)
2. Run database setup:
   ```bash
   cd backend
   bun run db:setup
   ```

### 3. Test the Backend

```bash
# Health check
curl http://localhost:5000/health

# Should return: {"status":"ok","message":"Movies.to API is running",...}
```

## Frontend Integration Options

### Option 1: Keep Using localStorage (Current Setup)

**Pros:**
- Works without backend/database
- No setup required
- Good for development/testing

**Cons:**
- Data only stored locally
- No user authentication
- No sharing between devices

**Status:** ✅ Already working

### Option 2: Hybrid Approach (Recommended)

Use backend for authentication and watchlist, keep TMDB for movie data.

**To implement:**

1. Update `src/store/useStore.js` to use API calls:

```javascript
import { authAPI, watchlistAPI } from '@/services/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const response = await authAPI.login({ email, password });
          const { user, token } = response.data;
          localStorage.setItem('authToken', token);
          set({ user, token, isAuthenticated: true });
          return { success: true };
        } catch (error) {
          return { success: false, error: error.response?.data?.error || 'Login failed' };
        }
      },

      logout: () => {
        localStorage.removeItem('authToken');
        set({ user: null, token: null, isAuthenticated: false });
      },

      // ... other methods
    }),
    { name: 'auth-storage' }
  )
);
```

2. Update watchlist to sync with backend:

```javascript
export const useWatchlistStore = create(
  persist(
    (set, get) => ({
      watchlist: [],
      loading: false,

      fetchWatchlist: async () => {
        try {
          set({ loading: true });
          const response = await watchlistAPI.getWatchlist();
          set({ watchlist: response.data.watchlist, loading: false });
        } catch (error) {
          set({ loading: false });
          console.error('Failed to fetch watchlist:', error);
        }
      },

      addToWatchlist: async (movie) => {
        try {
          await watchlistAPI.addToWatchlist(movie);
          set((state) => ({
            watchlist: [...state.watchlist, movie],
          }));
        } catch (error) {
          console.error('Failed to add to watchlist:', error);
        }
      },

      // ... other methods
    }),
    { name: 'watchlist-storage' }
  )
);
```

### Option 3: Full Backend Integration

Use backend for everything (auth, watchlist, reviews, comments).

**Requires:**
- MySQL database setup
- All API endpoints working
- Update all components to use API

## Using the API Service

The API service (`src/services/api.js`) is already set up. Here's how to use it:

### Authentication

```javascript
import { authAPI } from '@/services/api';

// Register
const handleRegister = async () => {
  try {
    const response = await authAPI.register({
      username: 'john',
      email: 'john@example.com',
      password: 'password123'
    });
    const { user, token } = response.data;
    localStorage.setItem('authToken', token);
    // Update store...
  } catch (error) {
    console.error('Registration failed:', error.response?.data);
  }
};

// Login
const handleLogin = async () => {
  try {
    const response = await authAPI.login({
      email: 'john@example.com',
      password: 'password123'
    });
    const { user, token } = response.data;
    localStorage.setItem('authToken', token);
    // Update store...
  } catch (error) {
    console.error('Login failed:', error.response?.data);
  }
};
```

### Watchlist

```javascript
import { watchlistAPI } from '@/services/api';

// Get watchlist
const fetchWatchlist = async () => {
  try {
    const response = await watchlistAPI.getWatchlist();
    console.log('Watchlist:', response.data.watchlist);
  } catch (error) {
    console.error('Failed to fetch watchlist:', error);
  }
};

// Add to watchlist
const addMovie = async (movie) => {
  try {
    await watchlistAPI.addToWatchlist(movie);
    console.log('Movie added to watchlist');
  } catch (error) {
    console.error('Failed to add movie:', error);
  }
};
```

### Reviews

```javascript
import { reviewsAPI } from '@/services/api';

// Get movie reviews
const fetchReviews = async (tmdbId) => {
  try {
    const response = await reviewsAPI.getMovieReviews(tmdbId);
    console.log('Reviews:', response.data.reviews);
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
  }
};

// Add review
const addReview = async (tmdbId, rating, text) => {
  try {
    await reviewsAPI.addReview(tmdbId, {
      rating: rating,
      review_text: text
    });
    console.log('Review added');
  } catch (error) {
    console.error('Failed to add review:', error);
  }
};
```

## Components to Update

Here are the main components that need updating for backend integration:

### 1. Login Page (`src/pages/Login.jsx`)

Replace form submission with API call:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await authAPI.login({ email, password });
    const { user, token } = response.data;
    localStorage.setItem('authToken', token);
    login(user, token); // Update store
    navigate('/');
  } catch (error) {
    setError(error.response?.data?.error || 'Login failed');
  }
};
```

### 2. Register Page (`src/pages/Register.jsx`)

Similar to login page.

### 3. Movie Detail Page (`src/pages/MovieDetail.jsx`)

Add reviews and comments sections:

```javascript
const [reviews, setReviews] = useState([]);
const [comments, setComments] = useState([]);

useEffect(() => {
  fetchReviews();
  fetchComments();
}, [movieId]);

const fetchReviews = async () => {
  try {
    const response = await reviewsAPI.getMovieReviews(movieId);
    setReviews(response.data.reviews);
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
  }
};
```

### 4. Watchlist Page (`src/pages/Watchlist.jsx`)

Fetch from backend instead of localStorage:

```javascript
useEffect(() => {
  fetchWatchlist();
}, []);

const fetchWatchlist = async () => {
  try {
    const response = await watchlistAPI.getWatchlist();
    setWatchlist(response.data.watchlist);
  } catch (error) {
    console.error('Failed to fetch watchlist:', error);
  }
};
```

## Testing the Integration

### 1. Test Authentication

1. Go to `/register`
2. Create a new account
3. Check browser console for success/error
4. Check if token is saved: `localStorage.getItem('authToken')`

### 2. Test Watchlist

1. Login first
2. Add a movie to watchlist
3. Check backend database or API response
4. Refresh page - watchlist should persist

### 3. Test Reviews

1. Go to a movie detail page
2. Add a review (requires auth)
3. See reviews from other users
4. Check database for stored reviews

## Environment Variables

Make sure these are set in your `.env` file:

```env
# Frontend (.env)
VITE_API_BASE_URL=http://localhost:5000/api
VITE_TMDB_API_KEY=your_tmdb_api_key

# Backend (backend/.env)
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=movies_to
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

## Troubleshooting

### CORS Errors

Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL.

### 401 Unauthorized

- Check if token is stored: `localStorage.getItem('authToken')`
- Token might be expired (default: 7 days)
- Try logging in again

### 500 Server Errors

- Check backend logs
- Verify MySQL is running
- Check database connection in backend

### Network Errors

- Make sure backend is running on port 5000
- Check `VITE_API_BASE_URL` in frontend `.env`

## Next Steps

1. **Start with authentication** - Update login/register pages
2. **Add watchlist sync** - Connect watchlist to backend
3. **Add reviews** - Implement review system on movie pages
4. **Add comments** - Add comment sections
5. **Add loading states** - Show loading spinners during API calls
6. **Add error handling** - Display user-friendly error messages

## Resources

- Backend API docs: `backend/README.md`
- Frontend API service: `src/services/api.js`
- Store setup: `src/store/useStore.js`
- TMDB API docs: `src/services/tmdb.js`

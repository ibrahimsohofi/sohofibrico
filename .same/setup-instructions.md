# 🎬 Movies.to Setup Instructions

## ⚠️ IMPORTANT: Add Your TMDB API Key

The app is ready to run, but you need to add your TMDB API key to make it work!

### Quick Setup (2 minutes)

1. **Get a free TMDB API key**:
   - Go to https://www.themoviedb.org/
   - Sign up (it's free!)
   - Go to Settings → API
   - Request an API key
   - Copy your API Key (v3 auth)

2. **Add the key to your project**:
   - Open the `.env` file in the `movies-to` folder
   - Replace `your_api_key_here` with your actual API key
   - Save the file

3. **Refresh the preview**:
   - The app will automatically reload
   - You should now see real movie data!

### Example `.env` file:
```env
VITE_TMDB_API_KEY=abc123your_actual_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
VITE_API_BASE_URL=http://localhost:5000/api
```

## Current Status

✅ Frontend fully built and working
✅ All pages created (Home, Browse, Movie Detail, Search, Watchlist, Auth)
✅ Responsive design
✅ Dark/Light mode
✅ Watchlist functionality (local storage)

❌ TMDB API key needed (add yours to `.env`)
⏳ Backend not built yet (Phase 2)

## What's Working Right Now

With your API key added, you can:
- Browse trending, popular, top-rated movies
- Search for any movie
- View detailed movie information
- Add movies to your watchlist
- Toggle dark/light mode
- Responsive design on all devices

## Next Steps (Optional)

After testing the frontend, we can build:
1. Node.js + Express backend
2. MySQL database setup
3. User authentication
4. Reviews and ratings system
5. Deploy to production!

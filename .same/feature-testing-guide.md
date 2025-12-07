# Movies.to Feature Testing Guide

## 🔍 1. Search Functionality

### How to Access:
- **Option A**: Click the "Search" icon in the navbar
- **Option B**: Use the search bar in the navbar (desktop only)
- **Option C**: Navigate to `/search`

### How to Test:
1. Type a movie name in the search bar (e.g., "Inception", "Avatar", "Avengers")
2. Press Enter or click the search button
3. Results will appear showing all matching movies
4. Each result shows: title, year, rating, and poster

### Expected Behavior:
- Shows "Searching..." while loading
- Displays count of results: "X results for 'query'"
- Empty state shown if no search query entered
- Clicking on any result navigates to movie detail page

---

## 🎬 2. Movie Detail Page

### How to Access:
- Click on ANY movie card from:
  - Home page (Trending, Popular, Top Rated)
  - Browse page
  - Search results
  - Genre page
  - Watchlist

### What to Expect:
- **Hero Section**: Large backdrop image with title and tagline
- **Movie Info**: Rating, release date, runtime, genres
- **Overview**: Full movie description
- **Cast & Crew**: Actor photos and character names
- **Similar Movies**: Recommendations based on the movie
- **Add to Watchlist**: Bookmark icon to save the movie

### URL Pattern:
`/movie/{movieId}` (e.g., `/movie/550` for Fight Club)

---

## ⭐ 3. Watchlist Feature

### How to Access:
- Click "Watchlist" in the navbar (if logged in)
- Click the bookmark icon in the navbar
- Navigate to `/watchlist`

### How to Test:

#### Adding Movies:
1. Go to any movie card
2. Click the bookmark icon (top-right corner of card)
3. Movie is added to watchlist (icon fills in)
4. Toast notification confirms: "Added to watchlist"

#### Removing Movies:
1. Click the filled bookmark icon again
2. Movie is removed from watchlist
3. Toast notification confirms: "Removed from watchlist"

#### Viewing Watchlist:
1. Navigate to `/watchlist`
2. See all saved movies in a grid
3. Counter shows: "X movies saved"
4. Empty state if no movies: "Your Watchlist is Empty"

### Storage:
- Uses browser localStorage (persists across sessions)
- No backend required
- Works without login (current version)

---

## 🎭 4. Genres Page

### How to Access:
- Click "Genres" in the navbar
- Navigate to `/genre/{genreId}`
- Click a genre in the footer (Action, Comedy, Drama, Horror)

### Available Genres:
- **28**: Action
- **35**: Comedy
- **18**: Drama
- **27**: Horror
- **878**: Science Fiction
- **53**: Thriller
- **10749**: Romance
- **16**: Animation
- **12**: Adventure
- **14**: Fantasy
- And more...

### How to Test:
1. Navigate to any genre (e.g., `/genre/28` for Action)
2. Page shows: "{Genre} Movies" title
3. Grid displays all movies in that genre
4. Pagination controls (Previous/Next) for browsing
5. Page counter shows current page / total pages

### Expected Behavior:
- Loading skeleton while fetching
- Smooth scroll to top on page change
- Up to 20 movies per page
- Click any movie to view details

---

## 🏠 5. Browse Page

### How to Access:
- Click "Browse" in the navbar
- Navigate to `/browse`

### Features:
- View all movies in paginated format
- Filter by category (Popular, Top Rated, Upcoming, Now Playing)
- Clean grid layout
- Pagination controls

---

## 📱 6. Responsive Design

### Test on Different Viewports:
- **Mobile**: Hamburger menu, vertical layout
- **Tablet**: Optimized spacing
- **Desktop**: Full navigation, search bar visible

---

## 🎨 7. Theme Toggle

### How to Test:
1. Click the theme icon in navbar (☀️ or 🌙)
2. Page switches between light/dark mode
3. Preference saved in localStorage
4. All components adapt to theme

---

## ✅ Testing Checklist

- [ ] Search for a movie and view results
- [ ] Click on a movie card to see details
- [ ] Add a movie to watchlist
- [ ] View watchlist page
- [ ] Remove movie from watchlist
- [ ] Browse movies by genre
- [ ] Use pagination on genre page
- [ ] Toggle between light/dark theme
- [ ] Test on mobile viewport
- [ ] Test search from navbar
- [ ] View browse page with filters

---

## 🐛 Known Issues

- Movie poster images may appear as black cards (TMDB image loading)
- Login/Register pages are UI-only (backend in development)
- Some features require authentication toggle (currently simulated)

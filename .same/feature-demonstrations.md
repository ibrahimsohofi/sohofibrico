# Movies.to Feature Demonstrations

## 🎯 Test Plan Overview

We'll test the following features in order:
1. **Search Functionality** - Find movies by name
2. **Movie Detail Page** - View comprehensive movie information
3. **Watchlist Feature** - Add/remove movies from watchlist
4. **Genres Page** - Browse movies by genre category

---

## 1️⃣ SEARCH FUNCTIONALITY

### Test Steps:

**Method 1: Using Navbar Search (Desktop)**
1. Look at the top navigation bar
2. Find the search input field (has magnifying glass icon)
3. Type a movie name: `inception`
4. Press Enter

**Method 2: Direct Navigation**
1. Navigate to: `/search`
2. Use the search bar on the page
3. Type: `avatar`
4. Click search or press Enter

**Method 3: Search from Navbar Icon**
1. Click the search icon in the navbar
2. Redirects to `/search` page
3. Enter query and search

### Expected Results:
- ✅ Search results appear in a grid
- ✅ Shows count: "X results for 'query'"
- ✅ Each movie card displays:
  - Movie poster (or placeholder)
  - Title
  - Release year
  - Rating (star + number)
  - Bookmark icon
- ✅ Empty state if no query entered
- ✅ "Searching..." loading state

### Test Queries to Try:
- `inception` - Should find "Inception" (2010)
- `avatar` - Should find multiple Avatar movies
- `avengers` - Should find Marvel movies
- `dark knight` - Should find Batman movies
- `xyz123nonsense` - Should show 0 results

---

## 2️⃣ MOVIE DETAIL PAGE

### Test Steps:

1. **From Home Page:**
   - Scroll to "Trending This Week" section
   - Click on any movie card (e.g., "TRON: Ares")
   - URL changes to `/movie/{id}`

2. **From Search Results:**
   - Search for "inception"
   - Click on the "Inception" result
   - Detail page loads

3. **From Genre Page:**
   - Go to Genres
   - Select "Action"
   - Click any action movie

### Expected Results:

**Hero Section:**
- ✅ Large backdrop image
- ✅ Movie title prominently displayed
- ✅ Tagline/slogan
- ✅ Release year
- ✅ Rating with star icon
- ✅ Runtime (e.g., "2h 28m")
- ✅ Genres as badges

**Movie Information:**
- ✅ Full overview/synopsis
- ✅ Director information
- ✅ Budget (if available)
- ✅ Revenue (if available)

**Cast & Crew Section:**
- ✅ Actor photos in horizontal scroll
- ✅ Character names
- ✅ Actor names

**Actions:**
- ✅ "Add to Watchlist" button
- ✅ Share/social buttons (if implemented)

**Similar Movies:**
- ✅ Recommendations grid
- ✅ Based on current movie

### Test Cases:
- Click movie from different sections
- Verify all data loads correctly
- Test "Add to Watchlist" button
- Click on similar movies

---

## 3️⃣ WATCHLIST FEATURE

### Test Steps:

**Adding Movies:**

1. **From Any Movie Card:**
   - Hover over any movie card
   - Click the bookmark icon (top-right corner)
   - Icon changes from outline to filled
   - Toast notification: "Added to watchlist"

2. **From Movie Detail Page:**
   - Navigate to a movie detail page
   - Click "Add to Watchlist" button
   - Button state changes
   - Confirmation shown

3. **Add Multiple Movies:**
   - Add 3-5 different movies from various sections
   - Each should show confirmation

**Viewing Watchlist:**

1. Click "Watchlist" in navbar
2. OR navigate to `/watchlist`
3. See all saved movies in grid format

**Expected on Watchlist Page:**
- ✅ Page title: "My Watchlist"
- ✅ Bookmark icon (red/pink)
- ✅ Counter: "X movies saved"
- ✅ Grid of all saved movies
- ✅ Each card has filled bookmark icon
- ✅ Empty state if no movies: "Your Watchlist is Empty"

**Removing Movies:**

1. **From Watchlist Page:**
   - Click the filled bookmark icon on any card
   - Movie removed instantly
   - Toast: "Removed from watchlist"
   - Counter updates

2. **From Home/Browse:**
   - Find a movie already in watchlist (filled bookmark)
   - Click the bookmark icon
   - Icon changes to outline
   - Removed from watchlist

### Storage Test:
1. Add several movies to watchlist
2. Refresh the page (F5)
3. Navigate back to `/watchlist`
4. ✅ All movies still there (localStorage persistence)
5. Close browser completely
6. Reopen and check watchlist
7. ✅ Movies still saved

### Edge Cases:
- Add same movie twice (should toggle, not duplicate)
- Remove all movies (shows empty state)
- Add movie, navigate away, come back (persists)

---

## 4️⃣ GENRES PAGE

### Test Steps:

**Accessing Genres Overview:**

1. **From Navbar:**
   - Click "Genres" link
   - Redirects to `/genres`

2. **From Footer:**
   - Scroll to footer
   - Click "Genres" in Quick Links
   - OR click specific genre (Action, Comedy, Drama, Horror)

3. **Direct Navigation:**
   - Go to `/genres`

**Expected on Genres Page:**
- ✅ Page title: "Browse by Genre"
- ✅ Film icon
- ✅ Description text
- ✅ Grid of genre cards (19 total)
- ✅ Each card shows:
  - Emoji icon
  - Genre name
  - Short description
- ✅ Hover effects (scale up, red border)
- ✅ Responsive grid (1-4 columns based on screen size)

**Available Genres:**
1. Action 💥
2. Adventure 🗺️
3. Animation 🎨
4. Comedy 😂
5. Crime 🕵️
6. Documentary 📹
7. Drama 🎭
8. Family 👨‍👩‍👧‍👦
9. Fantasy 🧙
10. History 📜
11. Horror 👻
12. Music 🎵
13. Mystery 🔍
14. Romance 💕
15. Science Fiction 🚀
16. TV Movie 📺
17. Thriller 😱
18. War ⚔️
19. Western 🤠

**Testing Individual Genre:**

1. From Genres page, click "Action"
2. URL: `/genre/28`
3. Page shows: "Action Movies"
4. Grid of action movies
5. Pagination controls (if >20 movies)

**Genre Page Features:**
- ✅ Genre name in title
- ✅ Description: "Discover the best {genre} movies"
- ✅ Movie grid (up to 20 per page)
- ✅ Pagination: "Previous" | "Next"
- ✅ Page counter: "Page X of Y"
- ✅ Smooth scroll to top on page change
- ✅ Loading skeleton while fetching

**Test Multiple Genres:**
1. Browse Action movies
2. Go back to Genres
3. Click Comedy
4. Verify different movies load
5. Test pagination
6. Try Horror, Sci-Fi, Drama

---

## 5️⃣ INTEGRATION TESTS

**Complete User Flow 1: Discovery to Watchlist**
1. Start on Home page
2. Search for "interstellar"
3. Click on "Interstellar" result
4. View movie details
5. Add to watchlist
6. Navigate to Watchlist
7. Verify movie is there
8. Remove from watchlist

**Complete User Flow 2: Genre Exploration**
1. Click "Genres" in navbar
2. Select "Science Fiction"
3. Browse Sci-Fi movies
4. Click on a movie
5. View details
6. Add to watchlist
7. Click "Similar Movies"
8. Add another movie to watchlist
9. Check watchlist has both

**Complete User Flow 3: Multi-Source Watchlist**
1. Add movie from Home (Trending)
2. Search and add a movie
3. Browse genre and add a movie
4. Go to Browse page and add a movie
5. Check Watchlist shows all 4 movies
6. Remove 2 movies
7. Verify only 2 remain

---

## 📊 Testing Checklist

### Search
- [ ] Search from navbar works
- [ ] Search page shows results
- [ ] Empty state displays correctly
- [ ] Result count is accurate
- [ ] Can click on search results

### Movie Details
- [ ] Hero section displays properly
- [ ] Movie info is complete
- [ ] Cast section shows actors
- [ ] Similar movies appear
- [ ] Add to watchlist works

### Watchlist
- [ ] Can add movies from cards
- [ ] Can add from detail page
- [ ] Watchlist page shows saved movies
- [ ] Counter is accurate
- [ ] Can remove movies
- [ ] LocalStorage persists data
- [ ] Empty state works

### Genres
- [ ] Genres overview page displays all genres
- [ ] Genre cards are clickable
- [ ] Individual genre pages load movies
- [ ] Pagination works
- [ ] Can navigate between genres
- [ ] Footer genre links work

### General
- [ ] Navigation between pages works
- [ ] Theme toggle works
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Images load (or show placeholders)

---

## 🐛 Known Issues to Watch For

1. **Image Loading**: Movie posters may show as black cards if TMDB images are slow to load
2. **Navbar Genres Link**: Now properly routes to `/genres` overview
3. **Footer Genre Links**: Now use correct numeric IDs
4. **LocalStorage**: Watchlist persists but is browser-specific

---

## ✅ Success Criteria

All features should:
- Load without errors
- Display data correctly
- Respond to user interactions
- Persist data where expected
- Show loading states
- Handle errors gracefully
- Work on mobile and desktop

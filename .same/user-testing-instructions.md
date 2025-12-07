# 🎬 Movies.to - Feature Testing Instructions

Welcome! Here's how to test all the features of your Movies.to application.

---

## 🔍 TEST 1: Search Functionality

### **Option A: Search from Navbar (Recommended)**

1. Look at the top navigation bar
2. Find the search input field (it says "Search movies...")
3. Click in the field and type: **inception**
4. Press **Enter** on your keyboard
5. You should see search results appear!

### **Option B: Search Page**

1. Click the **Search icon** (🔍) in the navbar
2. Or manually navigate to the URL: `/search`
3. Type a movie name in the search box
4. Click search or press Enter

### ✅ What You Should See:

- A list of movies matching your search
- Each movie card shows: Title, Year, Rating, Bookmark icon
- At the top: "X results for 'inception'"
- You can click any movie to see more details

### 🧪 Test These Searches:

- `inception` - Sci-fi thriller
- `avatar` - Multiple Avatar movies
- `dark knight` - Batman movies
- `avengers` - Marvel movies
- `xyz123` - Should show 0 results

---

## 🎬 TEST 2: Movie Detail Page

### **How to Get to a Movie Detail Page:**

1. From the home page, scroll down
2. Find any movie in "Trending This Week" section
3. Click on a movie card (e.g., "TRON: Ares")
4. The detail page will open!

### ✅ What You Should See:

**At the Top:**
- Big backdrop image
- Movie title in large text
- Star rating (e.g., ⭐ 6.5)
- Release year (e.g., 2025)
- Movie description/overview

**Below:**
- Runtime (e.g., "2h 28m")
- Genres as colored badges
- Cast photos (actors in the movie)
- Similar movies you might like
- "Add to Watchlist" button

### 🧪 Try This:

1. Click on "TRON: Ares" from the home page
2. Read the movie overview
3. Scroll down to see the cast
4. Find the "Similar Movies" section
5. Click on one of the similar movies
6. Notice the page updates with the new movie!

---

## ⭐ TEST 3: Watchlist Feature

### **Adding Movies to Watchlist:**

1. **From Home Page:**
   - Hover over any movie card
   - See the **bookmark icon** (📑) in the top-right corner of the card
   - Click the bookmark icon
   - It should fill in (become solid)
   - You'll see a notification: "Added to watchlist"

2. **Add Several Movies:**
   - Add "TRON: Ares" to watchlist
   - Add "The Shawshank Redemption" to watchlist
   - Add "The Godfather" to watchlist
   - Add any 2 more movies you like

### **Viewing Your Watchlist:**

1. Click **"Watchlist"** in the top navigation bar
   - OR click the **bookmark icon** in the top-right
   - OR navigate to URL: `/watchlist`

2. You should see:
   - Title: "My Watchlist" with a bookmark icon
   - Counter showing: "5 movies saved" (or however many you added)
   - Grid of all your saved movies

### **Removing Movies from Watchlist:**

1. On the Watchlist page, find a movie
2. Click the **filled bookmark icon** on the card
3. The movie disappears from your watchlist
4. Counter updates (e.g., "4 movies saved")
5. Notification: "Removed from watchlist"

### **Test Persistence:**

1. Add 3 movies to your watchlist
2. Refresh the page (press F5)
3. Go back to `/watchlist`
4. ✅ Your movies are still there! (Saved in browser storage)

### ✅ Empty State Test:

1. Remove all movies from your watchlist
2. You should see:
   - Empty bookmark icon
   - Message: "Your Watchlist is Empty"
   - Button: "Browse Movies"
   - Click "Browse Movies" to discover more!

---

## 🎭 TEST 4: Genres Page

### **Accessing the Genres Overview:**

1. **From Navbar:**
   - Click **"Genres"** in the top navigation
   - Or navigate to: `/genres`

2. **From Footer:**
   - Scroll to bottom of any page
   - Under "Categories" section, click any genre
   - OR under "Quick Links", click "Genres"

### ✅ What You Should See:

**Genres Overview Page:**
- Title: "Browse by Genre"
- Film icon at the top
- Grid of 19 genre cards, including:
  - 💥 Action - "High-octane thrills and explosive adventures"
  - 😂 Comedy - "Laugh-out-loud funny moments"
  - 🎭 Drama - "Compelling emotional narratives"
  - 👻 Horror - "Spine-chilling scares and suspense"
  - 🚀 Science Fiction - "Futuristic worlds and technology"
  - ...and 14 more!

**Hover Effects:**
- When you hover over a card:
  - Card scales up slightly
  - Border turns red
  - Emoji grows bigger

### **Browsing a Specific Genre:**

1. From the Genres page, click **"Action"** (💥)
2. You're taken to `/genre/28`
3. Page shows: "Action Movies"
4. Grid displays all action movies from TMDB
5. Pagination controls at the bottom

### ✅ What You Should See on Genre Page:

- Title: "{Genre} Movies" (e.g., "Action Movies")
- Subtitle: "Discover the best action movies"
- Grid of 20 movies per page
- **Pagination:**
  - "Previous" button (disabled on page 1)
  - "Next" button
  - Page counter: "Page 1 of 500" (example)

### 🧪 Test These Genres:

1. **Action** (💥) - `/genre/28`
   - Should show: Fast & Furious, Mission Impossible, etc.

2. **Comedy** (😂) - `/genre/35`
   - Should show: Funny movies

3. **Horror** (👻) - `/genre/27`
   - Should show: Scary movies

4. **Science Fiction** (🚀) - `/genre/878`
   - Should show: Star Wars, Star Trek, etc.

5. **Romance** (💕) - `/genre/10749`
   - Should show: Love stories

### **Test Pagination:**

1. Go to any genre (e.g., Action)
2. Scroll to bottom
3. Click **"Next"** button
4. Page smoothly scrolls to top
5. New set of 20 movies loads
6. Page counter updates: "Page 2 of 500"
7. Click **"Previous"** to go back

---

## 🔄 COMPLETE USER FLOWS

### **Flow 1: Discovery → Details → Watchlist**

1. Start on Home page (`/`)
2. Use search to find "interstellar"
3. Click on the "Interstellar" result
4. Read the movie details
5. Click "Add to Watchlist"
6. Navigate to Watchlist
7. Verify "Interstellar" is saved
8. Remove it from watchlist

### **Flow 2: Genre Exploration**

1. Click "Genres" in navbar
2. Select "Science Fiction" (🚀)
3. Browse the sci-fi movies
4. Click on "Inception" (or another movie)
5. View the movie details
6. Add to watchlist
7. Check "Similar Movies" section
8. Click on a similar movie
9. Add that one to watchlist too
10. Navigate to Watchlist
11. Both movies should be there!

### **Flow 3: Multi-Source Watchlist**

1. From Home page → Add "TRON: Ares" to watchlist
2. Click "Browse" → Add a movie from Browse page
3. Search for "avatar" → Add "Avatar" to watchlist
4. Click "Genres" → Go to "Horror" → Add a horror movie
5. Navigate to Watchlist
6. All 4 movies from different sources should be there!

---

## 📱 RESPONSIVE DESIGN TEST

### **Desktop View** (Current default)
- Full navigation bar visible
- Search bar in navbar
- All links visible
- Multi-column grids

### **Mobile View** (Try resizing your browser)
1. Make browser window narrow
2. Navigation should show:
   - Hamburger menu icon (☰)
   - Compact layout
   - Vertical movie grid
3. Click hamburger menu
4. Mobile menu opens with all links

---

## 🎨 THEME TOGGLE TEST

1. Look in the top-right corner of navbar
2. Find the **theme icon** (☀️ or 🌙)
3. Click it
4. Page switches between Light and Dark mode
5. Click again to switch back
6. Your preference is saved!

**Dark Mode:** Black background, white text
**Light Mode:** White background, dark text

---

## ✅ FEATURE CHECKLIST

Copy this checklist and check off as you test:

### Search
- [ ] Search from navbar works
- [ ] Search page loads at `/search`
- [ ] Results appear for valid query
- [ ] 0 results shown for invalid query
- [ ] Can click search results

### Movie Details
- [ ] Can open detail page from home
- [ ] Can open detail page from search
- [ ] Hero section displays
- [ ] Movie info is complete
- [ ] Cast section shows
- [ ] Similar movies appear
- [ ] Can add to watchlist from detail page

### Watchlist
- [ ] Can add movie from card
- [ ] Bookmark icon fills when added
- [ ] Toast notification appears
- [ ] Can view watchlist page
- [ ] Counter shows correct number
- [ ] Can remove movies
- [ ] Empty state displays when empty
- [ ] Watchlist persists after refresh

### Genres
- [ ] Genres overview page displays
- [ ] All 19 genres show
- [ ] Hover effects work
- [ ] Can click on a genre
- [ ] Genre page shows movies
- [ ] Pagination works
- [ ] Can browse multiple genres
- [ ] Footer genre links work

### General
- [ ] Navigation between pages works
- [ ] Theme toggle works
- [ ] No console errors (check browser DevTools)
- [ ] Page loads quickly
- [ ] Responsive on mobile

---

## 🎯 QUICK TEST URLS

Navigate directly to these URLs to test specific features:

- **Home:** `/`
- **Browse:** `/browse`
- **Search:** `/search`
- **Search with query:** `/search?q=inception`
- **Genres Overview:** `/genres`
- **Action Genre:** `/genre/28`
- **Comedy Genre:** `/genre/35`
- **Horror Genre:** `/genre/27`
- **Sci-Fi Genre:** `/genre/878`
- **Watchlist:** `/watchlist`
- **Movie Detail (Inception):** `/movie/27205`
- **Movie Detail (Dark Knight):** `/movie/155`

---

## 🐛 KNOWN ISSUES

1. **Movie Posters:** May appear as black/gray cards instead of images
   - This is a TMDB image loading issue
   - Movie data (title, rating, year) still loads correctly

2. **Login/Register:** Pages exist but are UI-only
   - Backend authentication is in development
   - You can still use Watchlist (uses localStorage)

---

## 🎉 YOU'RE READY!

Now you have everything you need to test all the features of Movies.to!

**Enjoy discovering amazing movies!** 🍿🎬

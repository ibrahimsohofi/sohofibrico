import pool from '../config/database.js';

// Get reviews for a movie
export const getMovieReviews = async (req, res) => {
  try {
    const { tmdb_id } = req.params;

    const [reviews] = await pool.query(
      `SELECT r.*, u.username, u.avatar_url
       FROM reviews r
       JOIN movies m ON r.movie_id = m.id
       JOIN users u ON r.user_id = u.id
       WHERE m.tmdb_id = ?
       ORDER BY r.created_at DESC`,
      [tmdb_id]
    );

    res.json({ reviews });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Failed to get reviews' });
  }
};

// Add or update review
export const addReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tmdb_id } = req.params;
    const { rating, review_text } = req.body;

    if (!rating || rating < 1 || rating > 10) {
      return res.status(400).json({ error: 'Rating must be between 1 and 10' });
    }

    // Get or create movie
    let [movies] = await pool.query(
      'SELECT id FROM movies WHERE tmdb_id = ?',
      [tmdb_id]
    );

    let movieId;
    if (movies.length === 0) {
      // Movie doesn't exist - this shouldn't happen normally
      return res.status(404).json({ error: 'Movie not found. Add to watchlist first.' });
    } else {
      movieId = movies[0].id;
    }

    // Check if review exists
    const [existing] = await pool.query(
      'SELECT id FROM reviews WHERE user_id = ? AND movie_id = ?',
      [userId, movieId]
    );

    if (existing.length > 0) {
      // Update existing review
      await pool.query(
        'UPDATE reviews SET rating = ?, review_text = ? WHERE id = ?',
        [rating, review_text, existing[0].id]
      );

      res.json({ message: 'Review updated successfully' });
    } else {
      // Create new review
      await pool.query(
        'INSERT INTO reviews (user_id, movie_id, rating, review_text) VALUES (?, ?, ?, ?)',
        [userId, movieId, rating, review_text]
      );

      res.status(201).json({ message: 'Review added successfully' });
    }
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ error: 'Failed to add review' });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { reviewId } = req.params;

    const [result] = await pool.query(
      'DELETE FROM reviews WHERE id = ? AND user_id = ?',
      [reviewId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Review not found or unauthorized' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};

// Get user's review for a movie
export const getUserReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tmdb_id } = req.params;

    const [reviews] = await pool.query(
      `SELECT r.*
       FROM reviews r
       JOIN movies m ON r.movie_id = m.id
       WHERE r.user_id = ? AND m.tmdb_id = ?`,
      [userId, tmdb_id]
    );

    if (reviews.length === 0) {
      return res.json({ review: null });
    }

    res.json({ review: reviews[0] });
  } catch (error) {
    console.error('Get user review error:', error);
    res.status(500).json({ error: 'Failed to get review' });
  }
};

// Get movie average rating
export const getMovieRating = async (req, res) => {
  try {
    const { tmdb_id } = req.params;

    const [result] = await pool.query(
      `SELECT
         AVG(r.rating) as average_rating,
         COUNT(r.id) as review_count
       FROM reviews r
       JOIN movies m ON r.movie_id = m.id
       WHERE m.tmdb_id = ?`,
      [tmdb_id]
    );

    res.json({
      averageRating: result[0].average_rating ? parseFloat(result[0].average_rating).toFixed(1) : null,
      reviewCount: result[0].review_count
    });
  } catch (error) {
    console.error('Get movie rating error:', error);
    res.status(500).json({ error: 'Failed to get rating' });
  }
};

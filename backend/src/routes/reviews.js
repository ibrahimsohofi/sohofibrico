import express from 'express';
import {
  getMovieReviews,
  addReview,
  deleteReview,
  getUserReview,
  getMovieRating
} from '../controllers/reviewController.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/movie/:tmdb_id', optionalAuth, getMovieReviews);
router.get('/movie/:tmdb_id/rating', getMovieRating);

// Protected routes
router.get('/movie/:tmdb_id/user', authenticateToken, getUserReview);
router.post('/movie/:tmdb_id', authenticateToken, addReview);
router.delete('/:reviewId', authenticateToken, deleteReview);

export default router;

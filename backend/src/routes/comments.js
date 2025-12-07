import express from 'express';
import {
  getMovieComments,
  addComment,
  updateComment,
  deleteComment
} from '../controllers/commentController.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/movie/:tmdb_id', optionalAuth, getMovieComments);

// Protected routes
router.post('/movie/:tmdb_id', authenticateToken, addComment);
router.put('/:commentId', authenticateToken, updateComment);
router.delete('/:commentId', authenticateToken, deleteComment);

export default router;

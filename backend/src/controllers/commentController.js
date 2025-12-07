import pool from '../config/database.js';

// Get comments for a movie
export const getMovieComments = async (req, res) => {
  try {
    const { tmdb_id } = req.params;

    const [comments] = await pool.query(
      `SELECT c.*, u.username, u.avatar_url
       FROM comments c
       JOIN movies m ON c.movie_id = m.id
       JOIN users u ON c.user_id = u.id
       WHERE m.tmdb_id = ? AND c.parent_id IS NULL
       ORDER BY c.created_at DESC`,
      [tmdb_id]
    );

    // Get replies for each comment
    for (let comment of comments) {
      const [replies] = await pool.query(
        `SELECT c.*, u.username, u.avatar_url
         FROM comments c
         JOIN users u ON c.user_id = u.id
         WHERE c.parent_id = ?
         ORDER BY c.created_at ASC`,
        [comment.id]
      );
      comment.replies = replies;
    }

    res.json({ comments });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ error: 'Failed to get comments' });
  }
};

// Add comment
export const addComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tmdb_id } = req.params;
    const { comment_text, parent_id } = req.body;

    if (!comment_text || comment_text.trim().length === 0) {
      return res.status(400).json({ error: 'Comment text is required' });
    }

    // Get movie
    let [movies] = await pool.query(
      'SELECT id FROM movies WHERE tmdb_id = ?',
      [tmdb_id]
    );

    if (movies.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const movieId = movies[0].id;

    // Add comment
    const [result] = await pool.query(
      'INSERT INTO comments (user_id, movie_id, parent_id, comment_text) VALUES (?, ?, ?, ?)',
      [userId, movieId, parent_id || null, comment_text]
    );

    // Get created comment with user info
    const [newComment] = await pool.query(
      `SELECT c.*, u.username, u.avatar_url
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      message: 'Comment added successfully',
      comment: newComment[0]
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// Update comment
export const updateComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { commentId } = req.params;
    const { comment_text } = req.body;

    if (!comment_text || comment_text.trim().length === 0) {
      return res.status(400).json({ error: 'Comment text is required' });
    }

    const [result] = await pool.query(
      'UPDATE comments SET comment_text = ? WHERE id = ? AND user_id = ?',
      [comment_text, commentId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Comment not found or unauthorized' });
    }

    res.json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ error: 'Failed to update comment' });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { commentId } = req.params;

    const [result] = await pool.query(
      'DELETE FROM comments WHERE id = ? AND user_id = ?',
      [commentId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Comment not found or unauthorized' });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

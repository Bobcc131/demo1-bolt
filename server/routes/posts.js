import express from 'express';
import { db } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await db.execute(`
      SELECT 
        p.*,
        u.username as author_name,
        u.avatar as author_avatar,
        COUNT(DISTINCT l.id) as likes_count,
        COUNT(DISTINCT c.id) as comments_count,
        GROUP_CONCAT(t.name) as tags
      FROM posts p
      JOIN users u ON p.author_id = u.id
      LEFT JOIN likes l ON p.id = l.post_id
      LEFT JOIN comments c ON p.id = c.post_id
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      GROUP BY p.id
      ORDER BY p.published_at DESC
    `);

    res.json(posts.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await db.execute({
      sql: `
        SELECT 
          p.*,
          u.username as author_name,
          u.avatar as author_avatar,
          COUNT(DISTINCT l.id) as likes_count,
          GROUP_CONCAT(t.name) as tags
        FROM posts p
        JOIN users u ON p.author_id = u.id
        LEFT JOIN likes l ON p.id = l.post_id
        LEFT JOIN post_tags pt ON p.id = pt.post_id
        LEFT JOIN tags t ON pt.tag_id = t.id
        WHERE p.id = ?
        GROUP BY p.id
      `,
      args: [req.params.id]
    });

    if (!post.rows[0]) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comments = await db.execute({
      sql: `
        SELECT 
          c.*,
          u.username as author_name,
          u.avatar as author_avatar,
          COUNT(l.id) as likes_count
        FROM comments c
        JOIN users u ON c.author_id = u.id
        LEFT JOIN likes l ON c.id = l.comment_id
        WHERE c.post_id = ?
        GROUP BY c.id
        ORDER BY c.created_at DESC
      `,
      args: [req.params.id]
    });

    res.json({ ...post.rows[0], comments: comments.rows });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { title, excerpt, content, coverImage, tags } = req.body;

  try {
    const post = await db.execute({
      sql: `
        INSERT INTO posts (title, excerpt, content, cover_image, author_id)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [title, excerpt, content, coverImage, req.user.id]
    });

    if (tags && tags.length > 0) {
      for (const tag of tags) {
        await db.execute({
          sql: 'INSERT OR IGNORE INTO tags (name) VALUES (?)',
          args: [tag]
        });
        
        const tagResult = await db.execute({
          sql: 'SELECT id FROM tags WHERE name = ?',
          args: [tag]
        });
        
        await db.execute({
          sql: 'INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)',
          args: [post.lastInsertRowid, tagResult.rows[0].id]
        });
      }
    }

    res.json({ id: post.lastInsertRowid });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.post('/:id/comments', authenticateToken, async (req, res) => {
  const { content } = req.body;
  try {
    const result = await db.execute({
      sql: `
        INSERT INTO comments (post_id, author_id, content)
        VALUES (?, ?, ?)
      `,
      args: [req.params.id, req.user.id, content]
    });

    res.json({ id: result.lastInsertRowid });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const existing = await db.execute({
      sql: `
        SELECT id FROM likes 
        WHERE post_id = ? AND user_id = ?
      `,
      args: [req.params.id, req.user.id]
    });

    if (existing.rows[0]) {
      await db.execute({
        sql: 'DELETE FROM likes WHERE id = ?',
        args: [existing.rows[0].id]
      });
      res.json({ liked: false });
    } else {
      await db.execute({
        sql: `
          INSERT INTO likes (post_id, user_id)
          VALUES (?, ?)
        `,
        args: [req.params.id, req.user.id]
      });
      res.json({ liked: true });
    }
  } catch (error) {
    console.error('Error handling like:', error);
    res.status(500).json({ error: 'Failed to handle like' });
  }
});

export default router;
import bcrypt from 'bcryptjs';
import { db, initializeDatabase } from './config/database.js';

async function seed() {
  try {
    // Initialize database first
    await initializeDatabase();

    // Create admin user with known credentials
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = db.prepare(
      'INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)'
    ).run(
      'Admin User',
      'admin@example.com',
      hashedPassword,
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
    );

    // Create demo posts
    const posts = [
      {
        title: 'Getting Started with React and TypeScript',
        excerpt: 'Learn how to set up a new React project with TypeScript and best practices for type safety.',
        content: `# Getting Started with React and TypeScript\n\nTypeScript has become the standard for writing type-safe JavaScript applications...`,
        cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80',
        tags: ['React', 'TypeScript', 'Web Development']
      },
      {
        title: 'Modern CSS Techniques You Should Know',
        excerpt: 'Explore the latest CSS features and techniques that are transforming web design in 2024.',
        content: `# Modern CSS Techniques You Should Know\n\nModern CSS has evolved significantly...`,
        cover_image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=1600&q=80',
        tags: ['CSS', 'Web Design', 'Frontend']
      }
    ];

    for (const post of posts) {
      const postStmt = db.prepare(`
        INSERT INTO posts (title, excerpt, content, cover_image, author_id)
        VALUES (?, ?, ?, ?, ?)
      `);
      
      const postResult = postStmt.run(
        post.title,
        post.excerpt,
        post.content,
        post.cover_image,
        adminUser.lastInsertRowid
      );

      for (const tagName of post.tags) {
        // Insert tag if it doesn't exist
        const tagStmt = db.prepare('INSERT OR IGNORE INTO tags (name) VALUES (?)');
        tagStmt.run(tagName);
        
        // Get tag ID
        const tagResult = db.prepare('SELECT id FROM tags WHERE name = ?').get(tagName);
        
        // Link post with tag
        const postTagStmt = db.prepare('INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)');
        postTagStmt.run(postResult.lastInsertRowid, tagResult.id);
      }
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
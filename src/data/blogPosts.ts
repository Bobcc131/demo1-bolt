import { BlogPost } from '../types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development: What to Expect in 2024',
    excerpt: 'Explore the latest trends and technologies shaping the future of web development...',
    content: `
      # The Future of Web Development

      As we move further into 2024, the web development landscape continues to evolve at an unprecedented pace. From AI-powered development tools to revolutionary frameworks, let's explore what's shaping the future of web development.

      ## 1. AI-Powered Development
      Artificial Intelligence is revolutionizing how we write and debug code...

      ## 2. WebAssembly Evolution
      WebAssembly continues to bridge the gap between web and native performance...

      ## 3. Edge Computing
      The rise of edge computing is changing how we think about deployment and scaling...
    `,
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80',
    publishedAt: '2024-03-15T09:00:00Z',
    readTime: 5,
    likes: 127,
    comments: [
      {
        id: 'c1',
        author: {
          name: 'Alex Thompson',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
        },
        content: 'Great insights! The AI revolution in development is fascinating.',
        createdAt: '2024-03-15T10:30:00Z',
        likes: 12
      }
    ],
    tags: ['Web Development', 'AI', 'Technology Trends']
  },
  {
    id: '2',
    title: 'Mastering Modern CSS Techniques',
    excerpt: 'Learn about the latest CSS features and how to use them effectively...',
    content: `
      # Mastering Modern CSS Techniques

      Modern CSS has evolved significantly, offering powerful features that make complex layouts and animations easier than ever. Let's dive into some advanced techniques.

      ## Container Queries
      Container queries represent a paradigm shift in responsive design...

      ## CSS Grid Mastery
      Advanced grid techniques for complex layouts...

      ## Modern CSS Properties
      New properties that are changing how we style web applications...
    `,
    author: {
      name: 'Marcus Wright',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=1600&q=80',
    publishedAt: '2024-03-14T15:00:00Z',
    readTime: 7,
    likes: 84,
    comments: [],
    tags: ['CSS', 'Web Design', 'Frontend']
  }
];
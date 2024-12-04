import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MessageCircle, Clock, Share2 } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';
import { format } from 'date-fns';
import CommentSection from './CommentSection';

export default function BlogPost() {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  
  const post = blogPosts.find(post => post.id === id);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Post not found</p>
      </div>
    );
  }

  return (
    <article className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center justify-between text-gray-500 mb-8">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : ''}`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{post.likes + (isLiked ? 1 : 0)}</span>
              </button>
              <span className="flex items-center space-x-1">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments.length}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-5 h-5" />
                <span>{post.readTime} min read</span>
              </span>
            </div>
            <button className="flex items-center space-x-1 hover:text-blue-600">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>

          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-96 object-cover rounded-2xl mb-8"
          />
        </header>

        <div className="prose prose-lg max-w-none mb-12">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <CommentSection comments={post.comments} />
      </div>
    </article>
  );
}
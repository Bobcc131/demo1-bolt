import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Comment } from '../../types/blog';
import { format } from 'date-fns';

interface CommentSectionProps {
  comments: Comment[];
}

export default function CommentSection({ comments }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the comment to your backend
    setNewComment('');
  };

  return (
    <section className="border-t pt-12">
      <h2 className="text-2xl font-bold mb-8">Comments ({comments.length})</h2>

      <form onSubmit={handleSubmit} className="mb-12">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
          rows={4}
        />
        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{comment.author.name}</h3>
                  <span className="text-sm text-gray-500">
                    {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <button className="flex items-center space-x-1 hover:text-blue-600">
                  <Heart className="w-4 h-4" />
                  <span>{comment.likes}</span>
                </button>
                <button className="hover:text-blue-600">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
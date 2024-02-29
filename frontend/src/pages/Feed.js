// components/Feed.js

import React from 'react';

function Feed() {
  // Dummy data for posts
  const posts = [
    {
      id: 1,
      username: 'JohnDoe',
      content: 'This is a sample post.',
      imageUrl: 'https://via.placeholder.com/150',
      likes: 10,
      comments: 5
    },
    {
      id: 2,
      username: 'JaneDoe',
      content: 'Another sample post.',
      imageUrl: 'https://via.placeholder.com/150',
      likes: 15,
      comments: 7
    }
  ];

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <div key={post.id} className="bg-white p-4 shadow rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">{post.username}</span>
            <span className="text-gray-500 text-sm">Likes: {post.likes} | Comments: {post.comments}</span>
          </div>
          <p>{post.content}</p>
          <img src={post.imageUrl} alt="Post" className="mt-4" />
          <div className="flex justify-between mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Like
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;

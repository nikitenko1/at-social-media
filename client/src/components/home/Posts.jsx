import React from 'react';
import PostCard from '../PostCard';

const Posts = ({ homePosts }) => {
  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;

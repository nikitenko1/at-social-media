import React from 'react';
import CardHeader from './post/CardHeader';
import CardBody from './post/CardBody';
import CardFooter from './post/CardFooter';

const Posts = ({ homePosts }) => {
  return (
    <div className="posts">
      {homePosts.posts.map((p) => (
        <div key={p._id} className="card my-3">
          <CardHeader post={p} />
          <CardBody post={p} />
          <CardFooter post={p} />
        </div>
      ))}
    </div>
  );
};

export default Posts;

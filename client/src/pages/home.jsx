import React from 'react';
import { useSelector } from 'react-redux';
import Posts from '../components/home/Posts';
import RightSideBar from '../components/home/RightSideBar';
import Status from '../components/home/Status';
import LoadIcon from '../images/loading.gif';

const Home = () => {
  const { homePosts } = useSelector((state) => state);
  return (
    <div className="home mx-0 row">
      <div className="col-md-8">
        <Status />
        {homePosts.loading ? (
          <img src={LoadIcon} alt="LoadIcon" className="d-block mx-auto" />
        ) : homePosts.result === 0 && homePosts.posts.length ? (
          <h2 className="text-center text-warning">No Posts</h2>
        ) : (
          <Posts homePosts={homePosts} />
        )}
      </div>
      <div className="col-md-4">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import Posts from '../components/home/Posts';
import Status from '../components/home/Status';

const Home = () => {
  return (
    <div className="home mx-0 row">
      <div className="col-md-8">
        <Status />
        <Posts />
      </div>
      <div className="col-md-4"></div>`
    </div>
  );
};

export default Home;

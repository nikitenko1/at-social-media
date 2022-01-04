import React from 'react';
import UserCard from '../UserCard';
import FollowBtn from '../FollowBtn';
import { useSelector, useDispatch } from 'react-redux';
import LoadIcon from '../../images/loading.gif';
import { getSuggestions } from '../../redux/actions/suggestionAction';
//
const RightSideBar = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="my-4">
      <UserCard user={auth.user} />
      <div className="d-flex justify-content-between align-items-center my-2">
        <h5 className="text-danger">Suggestions for you</h5>
        {!suggestions.loading && (
          <i
            className="fas fa-redo"
            style={{ cursor: 'pointer' }}
            onClick={() => dispatch(getSuggestions(auth.token))}
          />
        )}
      </div>
      {suggestions.loading ? (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
      ) : (
        <div className="suggestions">
          {suggestions.users.map((user) => (
            <UserCard user={user} key={user._id}>
              <FollowBtn user={user} />
            </UserCard>
          ))}
        </div>
      )}
      <div className="bg-light my-2" style={{ opacity: '0.5' }}>
        <a
          href="https://www.youtube.com/channel/UCLYbi6uKLK2rhSfvfUXRzgg"
          target="_blank"
          rel="noreferrer"
        >
          English in Context
        </a>
        <small className="d-block">
          We choose the most useful and fun from movies and TV shows in English
        </small>
        <small> &copy; 2022</small>
      </div>
    </div>
  );
};

export default RightSideBar;

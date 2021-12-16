import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../Avatar';
import classNames from 'classnames';
import { getProfileUsers } from '../../redux/actions/profileAction';
const Info = () => {
  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);

  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      dispatch(getProfileUsers({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container" key={user._id}>
          <Avatar src={user.avatar} size="super-avatar" className="mr-5" />
          <div className="info_content">
            <div className="info_content_title">
              <h2>{user.username}</h2>
              <button className="btn btn-outline-info">Edit Profile</button>
            </div>
            <div className="follow_btn">
              <span
                className={classNames('mr-3', {
                  'text-danger': user.followers.length === 0,
                })}
              >
                {user.followers.length} Followers
              </span>
              <span
                className={classNames('mx-3', {
                  'text-danger': user.following.length === 0,
                })}
              >
                {user.following.length} Following
              </span>
            </div>
            <h6 className="text-lead">{user.fullname}</h6>
            {user.mobile ? (
              <p>{user.mobile}</p>
            ) : (
              <p className="text-muted">No mobile</p>
            )}
            {user.address ? (
              <p>{user.address}</p>
            ) : (
              <p className="text-muted">No address</p>
            )}
            <h6>{user.email}</h6>
            {user.website ? (
              <a href={user.website} target="_blank" rel="noreferrer">
                {user.website}
              </a>
            ) : (
              <p className="text-muted">No website</p>
            )}
            <p>{user.story}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Info;

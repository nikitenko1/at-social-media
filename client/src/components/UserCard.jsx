import React from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg,
}) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };
  const { theme } = useSelector((state) => state);
  return (
    <div
      className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}
    >
      <div>
        <Link
          to={`/profile/${user._id}`}
          onClick={handleCloseAll}
          className="d-flex align-items-center justify-content-between"
        >
          <div style={{ marginRight: '1rem' }}>
            <Avatar src={user.avatar} size="big-avatar" />
          </div>

          <div style={{ transform: 'translateY(-2px)' }}>
            <span className="d-block">{user.username}</span>

            <small style={{ opacity: 0.7 }}>
              {msg ? (
                <>
                  <div style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}>
                    {user.text}
                  </div>
                  {user.media.length > 0 && (
                    <div>
                      {user.media.length} <i className="fas fa-image" />
                    </div>
                  )}
                </>
              ) : (
                user.fullname
              )}
            </small>
          </div>
        </Link>
      </div>

      {children}
    </div>
  );
};

export default UserCard;

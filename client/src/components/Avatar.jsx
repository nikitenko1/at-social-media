import React from 'react';

const Avatar = ({ auth, theme, src }) => {
  return (
    <img
      src={src}
      alt="avatar"
      className="avatar"
      style={{ filter: `${theme ? 'invert(1)' : 'invert(0)'}` }}
    />
  );
};

export default Avatar;

import React from 'react';
import Avatar from '../Avatar';

const MsgDisplay = ({ user }) => {
  return (
    <>
      <div className="chat_title">
        <Avatar src={user.avatar} size="small-avatar" />
        <span>{user.username}</span>
      </div>
      <div className="chat_text">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate a
        cumque possimus, tenetur quaerat est numquam itaque, assumenda, soluta
        reprehenderit eveniet. Explicabo quidem ipsam molestias eaque cumque
        fugiat corporis adipisci!
      </div>
      <div className="chat_time">January 2022</div>
    </>
  );
};

export default MsgDisplay;

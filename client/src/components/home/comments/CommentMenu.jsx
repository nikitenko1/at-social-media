import React from 'react';

const CommentMenu = ({ post, comment, auth }) => {
  const MenuItem = () => {
    return (
      <>
        <div className="dropdown-item">
          <span className="material-icons me-2">create</span> Edit
        </div>
        <div className="dropdown-item">
          <span className="material-icons me-2">delete_outline</span> Remove
        </div>
      </>
    );
  };
  return (
    <div className="menu">
      {(post.user._id === auth.user._id ||
        comment.user._id === auth.user._id) && (
        <div className="nav-item dropdown">
          <span
            className="material-icons"
            id="more_vert"
            data-bs-toggle="dropdown"
          >
            more_vert
          </span>
          <div
            className="dropdown-menu dropdown-menu-lg-end"
            aria-labelledby="more_vert"
          >
            {post.user._id === auth.user._id ? (
              comment.user._id === auth.user._id ? (
                MenuItem()
              ) : (
                <div className="dropdown-item">
                  <span className="material-icons">delete_outline</span> Remove
                </div>
              )
            ) : (
              comment.user._id === auth.user._id && MenuItem()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentMenu;

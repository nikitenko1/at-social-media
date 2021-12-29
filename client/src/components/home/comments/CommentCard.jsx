import Avatar from '../../Avatar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import moment from 'moment';
import LikeButton from '../../LikeButton';
import CommentMenu from './CommentMenu';
//
const CommentCard = ({ comment, post }) => {
  const { auth } = useSelector((state) => state);
  const [content, setContent] = useState('');
  const [readMore, setReadMore] = useState(false);

  const [isLike, setIsLike] = useState(false);

  const handleLike = () => {};

  const handleUnLike = () => {};

  useEffect(() => {
    setContent(comment.content);
  }, [comment]);

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? 'inherit' : 'none',
  };
  return (
    <div className="comment_card mt-2" style={styleCard}>
      <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <h6 className="mx-1">{comment.user.username}</h6>
      </Link>
      <div className="comment_content">
        <div className="flex-fill">
          <div>
            <span>
              {content.length < 100
                ? content
                : readMore
                ? content + ' '
                : content.slice(0, 100) + '....'}
            </span>
            {content.length > 100 && (
              <span
                className="readMore ms-3"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? 'Hide content' : 'Read more'}
              </span>
            )}
          </div>
          <div style={{ cursor: 'pointer' }}>
            <small className="text-muted me-3">
              {moment(comment.createdAt).fromNow()}
            </small>
            <small className="fw-bold me-3">{comment.likes.length} likes</small>
            <small className="fw-bold me-3">reply</small>
          </div>
        </div>
        <div
          className="d-flex align-items-center me-2"
          style={{ cursor: 'pointer' }}
        >
          <CommentMenu post={post} comment={comment} auth={auth} />
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentCard;

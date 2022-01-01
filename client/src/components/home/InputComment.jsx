import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../redux/actions/commentAction';

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState('');
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    const newComment = {
      user: auth.user,
      content,
      likes: [],
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    dispatch(createComment({ post, newComment, auth }));
    if (setOnReply) return setOnReply(false);
  };
  return (
    <form onSubmit={handleSubmit} className="card-footer comment_input">
      {children}
      <input
        type="text"
        placeholder="Add your comment ..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="postBtn">
        Post
      </button>
    </form>
  );
};

export default InputComment;

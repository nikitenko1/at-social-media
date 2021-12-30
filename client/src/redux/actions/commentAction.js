import { TYPES, EditData, DeleteData } from './_types';
import { patchDataAPI, postDataAPI } from '../../utils/fetchData';
import { POST_TYPES } from './postAction';

export const createComment =
  ({ post, newComment, auth }) =>
  async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] };
    dispatch({ type: POST_TYPES.UPDATED_POST, payload: newPost });

    try {
      const data = { ...newComment, postId: post._id };
      const res = await postDataAPI('comment', data, auth.token);
      const newData = { ...res.data.newComment, user: auth.user };
      const newPost = { ...post, comments: [...post.comments, newData] };
      dispatch({ type: POST_TYPES.UPDATED_POST, payload: newPost });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const updateComment =
  ({ post, comment, content, auth }) =>
  async (dispatch) => {
    const newComments = EditData(post.comments, comment._id, {
      ...comment,
      content,
    });
    const newPost = { ...post, comments: newComments };
    dispatch({ type: POST_TYPES.UPDATED_POST, payload: newPost });

    try {
      await patchDataAPI(`comment/${comment._id}`, { content }, auth.token);
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const likeComment =
  ({ post, comment, auth }) =>
  async (dispatch) => {
    const newComment = { ...comment, likes: [...comment.likes, auth.user] };
    const newComments = EditData(post.comments, comment._id, newComment);
    const newPost = { ...post, comments: newComments };
    dispatch({ type: POST_TYPES.UPDATED_POST, payload: newPost });

    try {
      await patchDataAPI(`/comment/${comment._id}/like`, null, auth.token);
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unLikeComment =
  ({ post, comment, auth }) =>
  async (dispatch) => {
    const newComment = {
      ...comment,
      likes: DeleteData(comment.likes, auth.user._id),
    };
    const newComments = EditData(post.comments, comment._id, newComment);
    const newPost = { ...post, comments: newComments };
    dispatch({ type: POST_TYPES.UPDATED_POST, payload: newPost });

    try {
      await patchDataAPI(`/comment/${comment._id}/unlike`, null, auth.token);
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

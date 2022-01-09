import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { POST_TYPES } from './redux/actions/postAction';
import { NOTIFY_TYPES } from './redux/actions/notifyAction';
import { TYPES } from './redux/actions/_types';

const SocketClient = () => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  // joinUser
  useEffect(() => {
    socket.emit('joinUser', auth.user._id);
  }, [socket, auth.user._id]);

  // likes
  useEffect(() => {
    socket.on('likeToClient', (newPost) => {
      dispatch({ type: POST_TYPES.UPDATED_POST, payload: newPost });
    });

    return () => socket.off('likeToClient');
  }, [socket, dispatch]);
  // unLikes
  useEffect(() => {
    socket.on('unLikeToClient', (newPost) => {
      dispatch({ type: POST_TYPES.UPDATED_POST, payload: newPost });
    });

    return () => socket.off('unLikeToClient');
  }, [socket, dispatch]);

  // comments
  useEffect(() => {
    socket.on('createCommentToClient', (newPost) => {
      dispatch({ type: POST_TYPES.UPDATED_POST, payload: newPost });
    });

    return () => socket.off('createCommentToClient');
  }, [socket, dispatch]);

  // comments
  useEffect(() => {
    socket.on('deleteCommentToClient', (newPost) => {
      dispatch({ type: POST_TYPES.UPDATED_POST, payload: newPost });
    });

    return () => socket.off('deleteCommentToClient');
  }, [socket, dispatch]);

  // follow
  useEffect(() => {
    socket.on('followToClient', (newUser) => {
      dispatch({ type: TYPES.AUTH, payload: { ...auth, user: newUser } });
    });

    return () => socket.off('followToClient');
  }, [socket, dispatch, auth]);

  // unFollow
  useEffect(() => {
    socket.on('unFollowToClient', (newUser) => {
      dispatch({ type: TYPES.AUTH, payload: { ...auth, user: newUser } });
    });

    return () => socket.off('unFollowToClient');
  }, [socket, dispatch, auth]);

  // notify create
  useEffect(() => {
    socket.on('createNotifyToClient', (msg) => {
      dispatch({
        type: NOTIFY_TYPES.CREATE_NOTIFY,
        payload: msg,
      });
    });

    return () => socket.off('createNotifyToClient');
  }, [socket, dispatch]);

  // notify remove
  useEffect(() => {
    socket.on('removeNotifyToClient', (msg) => {
      dispatch({
        type: NOTIFY_TYPES.REMOVE_NOTIFY,
        payload: msg,
      });
    });

    return () => socket.off('removeNotifyToClient');
  }, [socket, dispatch]);

  return <> </>;
};

export default SocketClient;

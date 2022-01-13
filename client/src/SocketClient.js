import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { POST_TYPES } from './redux/actions/postAction';
import { NOTIFY_TYPES } from './redux/actions/notifyAction';
import { MESSAGE_TYPES } from './redux/actions/messageAction';
import { TYPES } from './redux/actions/_types';
import audiobell from './audio/notification.mp3';

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body,
    icon,
  };
  let n = new Notification(title, options);
  n.onclick = (e) => {
    e.preventDefault();
    window.open(url, '_blank');
  };
};
const SocketClient = () => {
  const audioRef = useRef();

  const { auth, socket, notify, online } = useSelector((state) => state);
  const dispatch = useDispatch();

  // joinUser
  useEffect(() => {
    socket.emit('joinUser', auth.user);
  }, [socket, auth.user]);

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
      //
      if (notify.sound) audioRef.current.play();
      //
      spawnNotification(
        msg.user.username + ' ' + msg.text,
        msg.user.avatar,
        msg.url,
        'Social Media'
      );
    });

    return () => socket.off('createNotifyToClient');
  }, [socket, dispatch, notify.sound]);

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

  // Message
  useEffect(() => {
    socket.on('addMessageToClient', (msg) => {
      dispatch({
        type: MESSAGE_TYPES.ADD_MESSAGE,
        payload: msg,
      });
      dispatch({
        type: MESSAGE_TYPES.ADD_USER,
        payload: { ...msg.user, text: msg.text, media: msg.media },
      });
    });

    return () => socket.off('addMessageToClient');
  }, [socket, dispatch]);

  // Check user Online/Offline
  useEffect(() => {
    socket.emit('checkUserOnline', auth.user);

    return () => socket.off('checkUserOnline');
  }, [socket, auth.user]);

  // Check User Online / Offline
  useEffect(() => {
    socket.emit('checkUserOnline', auth.user);
  }, [socket, auth.user]);

  useEffect(() => {
    socket.on('checkUserOnlineToMe', (data) => {
      data.forEach((item) => {
        if (!online.includes(item.id)) {
          dispatch({ type: TYPES.ONLINE, payload: item.id });
        }
      });
    });

    return () => socket.off('checkUserOnlineToMe');
  }, [socket, dispatch, online]);

  useEffect(() => {
    socket.on('checkUserOnlineToClient', (id) => {
      if (!online.includes(id)) {
        dispatch({ type: TYPES.ONLINE, payload: id });
      }
    });

    return () => socket.off('checkUserOnlineToClient');
  }, [socket, dispatch, online]);

  // Check Offline
  useEffect(() => {
    socket.on('CheckUserOffline', (id) => {
      dispatch({ type: TYPES.OFFLINE, payload: id });
    });

    return () => socket.off('CheckUserOffline');
  }, [socket, dispatch]);
  //
  return (
    <>
      {/* style={{ display: 'none'  }} */}
      <audio controls ref={audioRef} style={{ display: 'none' }}>
        <source src={audiobell} type="audio/mp3" />
      </audio>
    </>
  );
};

export default SocketClient;

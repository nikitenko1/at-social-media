import { Route } from 'react-router-dom';
import './styles/global.css';
import PageRender from './customRouter/PageRender';
import PrivateRouter from './customRouter/PrivateRouter';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Alert from './components/alert/Alert';
import Header from './components/header/Header';
import StatusModal from './components/StatusModal';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshToken } from './redux/actions/authAction';
import { getPosts } from './redux/actions/postAction';
import { getSuggestions } from './redux/actions/suggestionAction';
import { io } from 'socket.io-client';
import { TYPES } from './redux/actions/_types';
import SocketClient from './SocketClient';
import { getNotifies } from './redux/actions/notifyAction';
import CallModal from './components/message/CallModal';
import Peer from 'peerjs';
//
const App = () => {
  const { auth, status, modal, call } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    //
    const socket = io();
    dispatch({ type: TYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    }
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
    }
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
        }
      });
    }
  }, []);

  useEffect(() => {
    // const peer = new Peer([id], [options]);
    const newPeer = new Peer(undefined, {
      path: '/',
      secure: true  ,
    });
    dispatch({ type: TYPES.PEER, payload: newPeer });
  }, [dispatch]);

  return (
    <>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />

          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </>
  );
};

export default App;

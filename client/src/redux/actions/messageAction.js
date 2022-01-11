import { TYPES } from './_types';
import { postDataAPI } from '../../utils/fetchData';

export const MESSAGE_TYPES = {
  ADD_USER: 'ADD_USER',
  ADD_MESSAGE: 'ADD_MESSAGE',
};

export const addUser =
  ({ user, message }) =>
  async (dispatch) => {
    if (message.users.every((item) => item._id !== user._id)) {
      dispatch({ type: MESSAGE_TYPES.ADD_USER, payload: user });
    }
    try {
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const addMessage =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    console.log(msg);
    dispatch({ type: MESSAGE_TYPES.ADD_MESSAGE, payload: msg });
    try {
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

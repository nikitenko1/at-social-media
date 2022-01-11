import { TYPES } from './_types';
import {
  getDataAPI,
  postDataAPI,
  // patchDataAPI,
  // deleteDataAPI,
} from '../../utils/fetchData';

export const MESSAGE_TYPES = {
  ADD_USER: 'ADD_USER',
  ADD_MESSAGE: 'ADD_MESSAGE',
  GET_CONVERSATIONS: 'GET_CONVERSATIONS',
  GET_MESSAGES: 'GET_MESSAGES',
};

export const addMessage =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: MESSAGE_TYPES.ADD_MESSAGE, payload: msg });
    try {
      await postDataAPI('message', msg, auth.token);
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getConversations =
  ({ auth }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI('conversations', auth.token);

      let newArr = [];
      res.data.conversations.forEach((item) => {
        item.recipients.forEach((cv) => {
          if (cv._id !== auth.user._id) {
            newArr.push({
              ...cv,
              text: item.text,
              media: item.media,
            });
          }
        });
      });

      dispatch({
        type: MESSAGE_TYPES.GET_CONVERSATIONS,
        payload: { newArr, result: res.data.result },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
export const getMessages =
  ({ auth, id }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(`message/${id}`, auth.token);
      dispatch({
        type: MESSAGE_TYPES.GET_MESSAGES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

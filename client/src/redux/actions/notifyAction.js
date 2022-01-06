import { TYPES } from './_types';
import { postDataAPI, deleteDataAPI } from '../../utils/fetchData';

export const createNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      const res = await postDataAPI('notify', msg, auth.token);
      console.log(res.data);
      // Socket
      //   socket.emit('createPost', msg);
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const removeNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token);
      // Socket
      //   socket.emit('createPost', msg);
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

import { postDataAPI } from '../../utils/fetchData';
import { TYPES } from './_types';

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.NOTIFY, payload: { loading: true } });
    const res = await postDataAPI('login', data);
    dispatch({
      type: TYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });
    localStorage.setItem('firstLogin', true);

    dispatch({ type: TYPES.NOTIFY, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({ type: TYPES.NOTIFY, payload: { error: err.response.data.msg } });
  }
};

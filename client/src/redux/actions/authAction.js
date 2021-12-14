import { postDataAPI } from '../../utils/fetchData';
import { TYPES } from './_types';

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI('login', data);
    dispatch({
      type: TYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });
    localStorage.setItem('firstLogin', true);

    dispatch({ type: TYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({ type: TYPES.ALERT, payload: { error: err.response.data.msg } });
  }
};

export const refreshtoken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem('firstLogin');
  console.log(firstLogin);
  if (firstLogin) {
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
  }
  try {
    const res = await postDataAPI('refresh_token');
    dispatch({
      type: TYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });
    dispatch({ type: TYPES.ALERT, payload: {} });
  } catch (err) {
    dispatch({ type: TYPES.ALERT, payload: { error: err.response.data.msg } });
  }
};

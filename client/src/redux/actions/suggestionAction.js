import { TYPES } from '../actions/_types';
import { getDataAPI } from '../../utils/fetchData';

export const SUGGEST_TYPES = {
  LOADING: 'LOADING_SUGGEST',
  GET_USERS: 'GET_USERS_SUGGEST',
};

export const getSuggestions = (token) => async (dispatch) => {
  try {
    dispatch({ type: SUGGEST_TYPES.LOADING, payload: true });

    const res = await getDataAPI('suggestionsUser', token);
    dispatch({ type: SUGGEST_TYPES.GET_USERS, payload: res.data });
    console.log(res.data);
    dispatch({ type: SUGGEST_TYPES.LOADING, payload: false });
  } catch (err) {
    dispatch({
      type: TYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

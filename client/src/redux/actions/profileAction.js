import { getDataAPI, patchDataAPI } from '../../utils/fetchData';
import { imageUpload } from '../../utils/imageUpload';
import { TYPES } from './_types';

export const PROFILE_TYPES = {
  LOADING: 'LOADING',
  GET_USER: 'GET_USER',
};

export const getProfileUsers =
  ({ users, id, auth }) =>
  async (dispatch) => {
    if (users.every((user) => user._id !== id)) {
      try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
        const res = await getDataAPI(`/user/${id}`, auth.token);
        dispatch({ type: PROFILE_TYPES.GET_USER, payload: res.data });
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
      } catch (err) {
        dispatch({
          type: TYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };

export const updateProfileUser =
  ({ userData, avatar, auth  }) =>
  async (dispatch) => {
    if (!userData.fullname)
      return dispatch({
        type: TYPES.ALERT,
        payload: { error: 'Please add your full name' },
      });
    if (userData.fullname.length > 25)
      return dispatch({
        type: TYPES.ALERT,
        payload: { error: 'Fullname name exceed 25 characters long' },
      });
    if (userData.story.length > 200)
      return dispatch({
        type: TYPES.ALERT,
        payload: { error: 'Story exceed 200 characters long' },
      });

    try {
      let media;
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });

      if (avatar) media = await imageUpload([avatar]);

      const res = await patchDataAPI(
        'user',
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
        auth.token
      );

      dispatch({
        type: TYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar,
          },
        },
      });

      dispatch({ type: TYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

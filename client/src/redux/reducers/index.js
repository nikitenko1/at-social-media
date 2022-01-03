import { combineReducers } from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import theme from './themeReducer';
import profile from './profileReducer';
import status from './statusReducer';
import homePosts from './postReducer';
import modal from './modalReducer';
import detailPost from './detailPostReducer';
import discover from './discoverReducer';

export default combineReducers({
  auth,
  alert,
  theme,
  profile,
  status,
  homePosts,
  detailPost,
  modal,
  discover,
});

import { DISCOVER_TYPES } from '../actions/discoverAction';
import { EditData } from '../actions/_types';

const initialState = {
  loading: false,
  result: 9,
  posts: [],
  page: 2,
  firstLoad: false,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISCOVER_TYPES.LOADING:
      return { ...state, loading: action.payload };
    case DISCOVER_TYPES.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        firstLoad: true,
      };
    case DISCOVER_TYPES.UPDATE_POST:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        page: state.page + 1,
      };
    default:
      return state;
  }
};

export default themeReducer;

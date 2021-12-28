import { POST_TYPES } from '../actions/postAction';
import { EditData } from '../actions/_types';

const initialState = { loading: false, result: 0, page: 2, posts: [] };

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.CREATE_POST:
      return { ...state, posts: [action.payload, ...state.posts] };

    case POST_TYPES.LOADING_POST:
      return { ...state, loading: action.payload };
    case POST_TYPES.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
      };
    case POST_TYPES.UPDATED_POST:
      return {
        ...state,
        posts: EditData(state.posts, action.payload._id, action.payload),
      };

    default:
      return state; 
  }
};

export default postReducer;
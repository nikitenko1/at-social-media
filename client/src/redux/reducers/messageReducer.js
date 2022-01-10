import { MESSAGE_TYPES } from '../actions/messageAction';

const initialState = {
  users: [],
  resultUsers: 0,
  data: [],
  resultData: [],
  firstLoad: false,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_TYPES.ADD_USER:
      return { ...state, users: [action.payload, ...state.users] };
    default:
      return state;
  }
};

export default messageReducer;

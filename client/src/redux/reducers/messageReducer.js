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
    case MESSAGE_TYPES.ADD_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload],
        users: state.users.map((user) =>
          user._id === action.payload.recipient ||
          user._id === action.payload.sender
            ? {
                ...user,
                text: action.payload.text,
                media: action.payload.media,
                call: action.payload.call,
              }
            : user
        ),
      };
    default:
      return state;
  }
};

export default messageReducer;

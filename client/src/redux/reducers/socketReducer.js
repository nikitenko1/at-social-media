import { TYPES } from '../actions/_types';

const socketReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.SOCKET:
      return action.payload;
    default:
      return state;
  }
};

export default socketReducer;

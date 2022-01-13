import { TYPES } from '../actions/_types';

const peerReducer = (state = null, action) => {
  switch (action.type) {
    case TYPES.PEER:
      return action.payload;
    default:
      return state;
  }
};

export default peerReducer;

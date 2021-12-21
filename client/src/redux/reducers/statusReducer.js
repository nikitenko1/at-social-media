import { TYPES } from '../actions/_types';

const statusReducer = (state = false, action) => {
  switch (action.type) {
    case TYPES.STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default statusReducer;

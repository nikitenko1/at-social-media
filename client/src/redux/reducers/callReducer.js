import { TYPES } from '../actions/_types';

const callReducer = (state = null, action) => {
  switch (action.type) {
    case TYPES.CALL:
      return action.payload;
    default:
      return state;
  }
};

export default callReducer;

import { TYPES } from '../actions/_types';

const initialState = {};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ALERT:
      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;

import { TYPES } from '../actions/_types';

const initialState = false;

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.MODAL:
      return action.payload;
    default:
      return state;
  }
};

export default modalReducer;

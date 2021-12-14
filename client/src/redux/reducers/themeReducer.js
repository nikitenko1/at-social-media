import { TYPES } from '../actions/_types';

const initialState = false;

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.THEME:
      return action.payload;
    default:
      return state;
  }
};

export default themeReducer;

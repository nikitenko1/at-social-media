import { TYPES } from '../actions/_types';

const onlineReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.ONLINE:
      return [...state, action.payload];
    case TYPES.OFFLINE:
      return state.filter((item) => item !== action.payload);
    default:
      return state;
  }
};

export default onlineReducer;

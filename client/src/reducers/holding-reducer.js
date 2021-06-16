import { RETRIEVE_HOLDINGS } from '../actions/types';

const INITIAL_STATE = {
  holdings: [],
};

const holdingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RETRIEVE_HOLDINGS:
      if (action.payload.msg) {
        return { ...state, ...action.payload };
      } else {
        return { ...state, holdings: action.payload };
      }
    default:
      return state;
  }
};

export default holdingReducer;

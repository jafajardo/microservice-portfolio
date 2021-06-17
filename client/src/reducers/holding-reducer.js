import { RETRIEVE_HOLDINGS, CLEAR_HOLDINGS } from '../actions/types';

const INITIAL_STATE = {
  holdings: [],
};

const holdingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RETRIEVE_HOLDINGS:
      if (action.payload.msg) {
        return { ...state, holdings: [], ...action.payload };
      } else {
        return { ...state, holdings: action.payload };
      }
    case CLEAR_HOLDINGS:
      return { holdings: [] };
    default:
      return state;
  }
};

export default holdingReducer;

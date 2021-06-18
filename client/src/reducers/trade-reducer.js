import { CREATE_TRADE, CLEAR_TRADE, RETRIEVE_TRADES } from '../actions/types';

const INITIAL_STATE = {};

const tradeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_TRADE:
      const key = Object.keys(action.payload)[0];
      const value = Object.values(action.payload)[0];
      const data = state[key];
      if (!data) {
        return { ...state, [key]: [value] };
      } else {
        return { ...state, [key]: [...state[key], value] };
      }
    case RETRIEVE_TRADES:
    case CLEAR_TRADE:
      return {};
    default:
      return state;
  }
};

export default tradeReducer;

import { CREATE_TRADE } from '../actions/types';

const INITIAL_STATE = {};

const tradeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_TRADE:
      console.log(action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default tradeReducer;

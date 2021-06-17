import { CREATE_TRADE, CLEAR_TRADE } from '../actions/types';

const INITIAL_STATE = {};

const tradeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_TRADE:
      const key = Object.keys(action.payload)[0];
      const value = Object.values(action.payload)[0];
      console.log(action.payload);
      console.log('Key', key);

      const data = state[key];
      console.log(data);
      if (!data) {
        console.log({ ...state, [key]: [value] });
        return { ...state, [key]: [value] };
      } else {
        return { ...state, [key]: [...state[key], value] };
      }
    case CLEAR_TRADE:
      return {};
    default:
      return state;
  }
};

export default tradeReducer;

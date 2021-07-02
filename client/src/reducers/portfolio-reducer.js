import {
  RETRIEVE_PORTFOLIOS,
  RETRIEVE_SPECIFIC_PORTFOLIO,
} from '../actions/types';

const INITIAL_STATE = {};

const portfolioReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RETRIEVE_PORTFOLIOS:
      return action.payload.reduce((prev, cur) => {
        return { ...prev, [cur.id]: cur };
      }, {});
    case RETRIEVE_SPECIFIC_PORTFOLIO:
      return { [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default portfolioReducer;

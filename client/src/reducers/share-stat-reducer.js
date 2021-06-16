import { RETRIEVE_SHARE_STAT } from '../actions/types';

const INITIAL_STATE = {};

const shareStatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RETRIEVE_SHARE_STAT:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default shareStatReducer;

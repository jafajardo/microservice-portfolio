import { SIGNUP, SIGNIN, ERROR, CURRENT_USER, SIGNOUT } from '../actions/types';

const INITIAL_STATE = {
  authenticated: false,
  error: false,
  msg: null,
  currentUser: null,
  currentPortfolio: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, authenticated: true, error: false, ...action.payload };
    case SIGNIN:
      return { ...state, authenticated: true, error: false, ...action.payload };
    case ERROR:
      return { ...state, authenticated: false, error: true, ...action.payload };
    case CURRENT_USER:
      return {
        ...state,
        authenticated: action.payload.currentUser !== null ? true : false,
        error: false,
        ...action.payload,
      };
    case SIGNOUT:
      return {
        ...state,
        authenticated: false,
        error: false,
        currentUser: null,
        msg: null,
      };
    default:
      return state;
  }
};

export default authReducer;

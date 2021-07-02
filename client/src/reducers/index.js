import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import holdingReducer from './holding-reducer';
import shareStatReducer from './share-stat-reducer';
import tradeReducer from './trade-reducer';
import portfolioReducer from './portfolio-reducer';

const reducers = combineReducers({
  auth: authReducer,
  holding: holdingReducer,
  shareStat: shareStatReducer,
  trade: tradeReducer,
  portfolio: portfolioReducer,
});

export default reducers;

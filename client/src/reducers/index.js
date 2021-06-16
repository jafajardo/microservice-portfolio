import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import holdingReducer from './holding-reducer';
import shareStatReducer from './share-stat-reducer';

const reducers = combineReducers({
  auth: authReducer,
  holding: holdingReducer,
  shareStat: shareStatReducer,
});

export default reducers;

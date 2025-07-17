import { combineReducers } from 'redux';
import appReducer from './app/appReducer';
import cacheReducer from './cache/cacheReducer';

const rootReducer: any = combineReducers({
  appState: appReducer,
  cacheState: cacheReducer,
});

export default rootReducer;

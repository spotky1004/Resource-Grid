import { combineReducers } from 'redux';
import resources from './resources.js';
import aside from './aside.js';

const rootReducer = combineReducers({
  resources,
  aside
});

export default rootReducer;
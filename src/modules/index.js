import { combineReducers } from 'redux';
import resources from './resources.js';
import aside from './aside.js';
import prestige from './prestige.js';

const rootReducer = combineReducers({
  resources,
  aside,
  prestige
});

export default rootReducer;

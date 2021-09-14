import { createStore } from 'redux';
import rootReducer from './modules';

const store = createStore(rootReducer);

export default store;

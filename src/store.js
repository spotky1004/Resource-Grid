import { createStore } from "redux";
import rootReducer from "./modules";
import dataManager from "./modules/dataManager";

const store = createStore(dataManager(rootReducer));

export default store;

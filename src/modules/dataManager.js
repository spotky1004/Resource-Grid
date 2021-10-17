import { save } from "../saveload";

const IMPORT = "dataManager/IMPORT";

export const importSave = (data) => ({
  type: IMPORT,
  data,
});

function reducer(reducers) {
  return function (state = {}, action) {
    switch (action.type) {
      case IMPORT:
        save(action.data);
        return action.data;
      default:
        return reducers(state, action);
    }
  };
}

export default reducer;

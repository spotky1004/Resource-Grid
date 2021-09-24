import { savefile } from '../saveload';

const UNLOCK_TAB = 'aside/UNLOCK_TAB';

export const unlockTab = (toUnlock) => ({
  type: UNLOCK_TAB,
  toUnlock
})

function reducer(state = savefile.aside, action) {
  switch (action.type) {
    case UNLOCK_TAB:
      state.unlockStatus = {
        ...state.unlockStatus,
        [action.toUnlock]: true
      }
      return state;
    default:
      return state;
  }
}

export default reducer;

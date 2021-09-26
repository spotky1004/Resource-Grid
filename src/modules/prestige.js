import { savefile } from '../saveload';

const DO_PRESTIGE = 'prestige/DO_PRESTIGE';
const END_PRESTIGE = 'prestige/END_PRESTIGE';

export const doPrestige = (prestigeResourceQuantity) => ({
  type: DO_PRESTIGE,
  prestigeResourceQuantity
});
export const endPrestige = () => ({
  type: END_PRESTIGE
});

function reducer(state = savefile.prestige, action) {
  switch (action.type) {
    case DO_PRESTIGE:
      savefile.prestige.doingPrestige = true;
      savefile.prestige.lastPrestigeResourceQuantity = action.prestigeResourceQuantity;
      savefile.prestige.totalPrestigeResourceQuantity += action.prestigeResourceQuantity;
      return state;
    case END_PRESTIGE:
      savefile.prestige.doingPrestige = false;
      return state;
    default:
      return state;
  }
}

export default reducer;

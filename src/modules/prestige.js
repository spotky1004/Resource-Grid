import { load } from "../saveload";

const DO_PRESTIGE = "prestige/DO_PRESTIGE";
const END_PRESTIGE = "prestige/END_PRESTIGE";
const DO_RESPEC = "prestige/RESPEC_EMPOWERER";
const END_RESPEC = "prestige/END_RESPEC";

export const doPrestige = (prestigeResourceQuantity) => ({
  type: DO_PRESTIGE,
  prestigeResourceQuantity,
});
export const endPrestige = () => ({
  type: END_PRESTIGE,
});
export const doRespec = () => ({
  type: DO_RESPEC,
});
export const endRespec = () => ({
  type: END_RESPEC,
});

const EMPOWERER_RESPEC_TIME = 10 * 60 * 1000; // 10 minutes

function reducer(state = load().prestige, action) {
  const Time = new Date().getTime();

  switch (action.type) {
    case DO_PRESTIGE:
      state.doingPrestige = true;
      state.tmpPrestigeResourceQuantity = action.prestigeResourceQuantity;
      state.lastPrestigeResourceQuantity = action.prestigeResourceQuantity;
      state.totalPrestigeResourceQuantity += action.prestigeResourceQuantity;
      return state;
    case END_PRESTIGE:
      state.prestige.doingPrestige = false;
      state.prestige.tmpPrestigeResourceQuantity = 0;
      return state;
    case DO_RESPEC:
      if (Time - state.empowererRespecTime >= EMPOWERER_RESPEC_TIME) {
        state.doingRespec = true;
        state.empowererRespecTime = Time;
      }
      return state;
    case END_RESPEC:
      state.doingRespec = false;
      return state;
    default:
      return state;
  }
}

export default reducer;

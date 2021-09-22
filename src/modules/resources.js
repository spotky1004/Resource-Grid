// import produce from 'immer';
import { savefile } from '../saveload';
import { Resources, ResourceArr } from '../data/resources';

const CRAFT_START = 'resource/CRAFT_START';
const CRAFT_UPDATE = 'resource/CRAFT_UPDATE';
const RESOURCE_UNLOCK = 'resource/RESOURCE_UNLOCK';
const TOGGLE_AUTO = 'resource/TOGGLE_AUTO';

export const craftStart = (order, isAuto) => ({
  type: CRAFT_START,
  order,
  isAuto
});
export const craftUpdate = ({
  order,
  isAuto,
  Time,
  progressIncrement,
}) => ({
  type: CRAFT_UPDATE,
  order,
  isAuto,
  Time,
  progressIncrement
});
export const resourceUnlock = order => ({
  type: RESOURCE_UNLOCK,
  order
});
export const toggleAuto = order => ({
  type: TOGGLE_AUTO,
  order
});

function buyResource(state, cost, bulkMax=0) {
  let bulk = bulkMax;

  // Check can buy & Bulk count
  for (const resourceName in cost) {
    const _cost = cost[resourceName];
    const _order = Resources[resourceName].order;
    bulk = Math.min(bulk, state[_order].have/_cost);
  }
  bulk = Math.floor(bulk);
  if (bulk <= 0) return false;

  // Subtract resource
  for (const resourceName in cost) {
    const _cost = cost[resourceName];
    const _order = Resources[resourceName].order;
    state[_order] = {
      ...state[_order],
      have: state[_order].have - _cost*bulk
    };
  }
  return bulk;
}

function reducer(state = savefile.resources, action) {
  const Resource = ResourceArr[action.order];
  if (!Resource) return state;
  const order = action.order;
  const have = state[order].have;
  const isAuto = !state[order].automationDisabled && action.isAuto;
  const cost = Resource.cost(have, isAuto);

  switch (action.type) {
    case CRAFT_START:
      state = [...state];
      if (state[order].lastTime !== null) return state;
      const canBuy = buyResource(state, cost, 1);
      if (!canBuy) {
        // If crafting progress is greater then 0, set it to 0
        if (state[order].progress !== 0) {
          state[order] = {
            ...state[order],
            progress: 0
          }
        }
        return state;
      }

      state[order] = {
        ...state[order],
        lastTime: new Date().getTime(),
        progress: 0,
      };
      
      return state;
    case CRAFT_UPDATE:
      state = [...state];
      
      state[order] = {
        ...state[order],
        lastTime: action.Time,
        progress: state[order].progress + action.progressIncrement,
      };

      if (state[order].progress >= 1) {
        state[order].lastTime = null;
        let bulk = 1;
        if (isAuto) {
          bulk += buyResource(state, cost, Math.floor(state[order].progress)-1);
          state[order].have += bulk*Resource.craftMultiply;
          state[order].progress %= 1;
        } else {
          state[order].have += Resource.craftMultiply;
          state[order].progress = 0;
        }

        const EffectMultiply = Resource.effectMultiply(state);
        // randomGrantOnCraft
        for (let i = 0; i < Resource.randomGrantOnCraft.length; i++) {
          const [chance, toGrant] = Resource.randomGrantOnCraft[i];
          const realChance = chance*EffectMultiply;
          const grantChance = 1-((1-Math.min(1, realChance))**bulk);
          const grantCount = bulk*grantChance > 5 || grantChance >= 0.99 ? Math.round(bulk*grantChance) : +(Math.random() < grantChance);
          if (grantCount >= 1) {
            state[Resources[toGrant].order] = {
              ...state[Resources[toGrant].order],
              have: state[Resources[toGrant].order].have + grantCount
            }
          }
        }
      }
      return state;
    case RESOURCE_UNLOCK:
      state = [...state];
      state[order] = {
        ...state[order],
        unlocked: true
      };
      return state;
    case TOGGLE_AUTO:
      state = [...state];
      state[order] = {
        ...state[order],
        automationDisabled: !state[order].automationDisabled
      };
      return state;
    default:
      return state;
  }
}

export default reducer;

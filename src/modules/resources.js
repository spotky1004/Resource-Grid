// import produce from 'immer';
import { savefile } from '../saveload';
import { Resources, ResourceArr } from '../data/resources';

const CRAFT_START = 'resource/CRAFT_START';
const CRAFT_UPDATE = 'resource/CRAFT_UPDATE';
const RESOURCE_UNLOCK = 'resource/RESOURCE_UNLOCK';
const TOGGLE_AUTO = 'resource/TOGGLE_AUTO';
const RESOURCE_EMPOWER = 'resource/EMPOWER';
const REMOVE_EMPOWERER  = 'resource/REMOVE_EMPOWERER';
const RESET_RESOURCE_DATA = 'resource/RESET_RESOURCE_DATA';

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
  dontUpdate
}) => ({
  type: CRAFT_UPDATE,
  order,
  isAuto,
  Time,
  progressIncrement,
  dontUpdate
});
export const resourceUnlock = order => ({
  type: RESOURCE_UNLOCK,
  order
});
export const toggleAuto = order => ({
  type: TOGGLE_AUTO,
  order
});
export const resourceEmpower = order => ({
  type: RESOURCE_EMPOWER,
  order
});
export const removeEmpowerer = order => ({
  type: REMOVE_EMPOWERER,
  order
})
export const resetResourceData = order => ({
  type: RESET_RESOURCE_DATA,
  order
});


function canBuyResource(state, cost) {
  for (const resourceName in cost) {
    const _cost = cost[resourceName];
    const _order = Resources[resourceName].order;
    if (state[_order].have < _cost) return false;
  }

  return true;
}
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
    const _Resource = Resources[resourceName];
    if (_Resource.noConsume) continue;
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

  let cost = Resource.cost(have, isAuto);

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
      if (action.dontUpdate) return state;
      state = [...state];
      
      state[order] = {
        ...state[order],
        lastTime: action.Time,
        progress: (state[order].progress || 0) + (action.progressIncrement || 0),
      };

      if (state[order].progress >= 1) {
        let bulk = 1;
        const maxBulk = Math.floor(state[order].progress)-1;
        if (isAuto) {
          if (Resource.canBulkBuy) {
            bulk += buyResource(state, cost, maxBulk);
          } else if (maxBulk >= 10) {
            bulk += buyResource(state, cost, Math.floor(maxBulk/10));
          }
          state[order].have += bulk*Resource.craftMultiply;
          if (!canBuyResource(state, cost)) {
            state[order].lastTime = null;
            state[order].progress = 0;
          } else {
            cost = Resource.cost(have, isAuto);
            buyResource(state, cost, 1);
            state[order].progress %= 1;
          }
        } else {
          state[order].have += Resource.craftMultiply;
          state[order].progress = 0;
          state[order].lastTime = null;
        }

        const EffectMultiply = Resource.effectMultiply(state);
        // randomGrantOnCraft
        for (let i = 0; i < Resource.randomGrantOnCraft.length; i++) {
          const [chance, toGrant] = Resource.randomGrantOnCraft[i];
          const realChance = chance*EffectMultiply;
          const grantChance = 1-((1-Math.min(1, realChance))**bulk);
          const grantCount = bulk*realChance > 5 || grantChance >= 0.99 ? Math.round(bulk*realChance) : +(Math.random() < grantChance);
          if (grantCount >= 1) {
            state[Resources[toGrant].order] = {
              ...state[Resources[toGrant].order],
              have: state[Resources[toGrant].order].have + grantCount
            };
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
    case RESOURCE_EMPOWER:
      if (!Resource.canEmpower || state[order].empower >= 5+state[Resources.EmpowerCap.order].have) return state;
      state = [...state];
      state[order] = {
        ...state[order],
        empower: state[order].empower+1
      }
      return state;
    case REMOVE_EMPOWERER:
      state = [...state];
      state[order] = {
        ...state[order],
        empower: 0
      };
      return state;
    case RESET_RESOURCE_DATA:
      state = [...state];
      if (!Resource.keepOnPrestige) {
        state[order] = {
          ...state[order],
          have: Resource.defaultQuantity,
          lastTime: null,
          progress: 0,
          unlocked: false
        };
      }
      return state;
    default:
      return state;
  }
}

export default reducer;

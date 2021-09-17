// import produce from 'immer';
import { savefile } from '../saveload';
import { Resources, ResourceArr } from '../data/resources';

const CRAFT_START = 'resource/CRAFT_START';
const CRAFT_UPDATE = 'resource/CRAFT_UPDATE';

export const craftStart = order => ({
  type: CRAFT_START,
  order
});
export const craftUpdate = ({
  order,
  canBulk,
  progressIncrement,
}) => ({
  type: CRAFT_UPDATE,
  order,
  canBulk,
  progressIncrement
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
  const cost = Resource.cost(have);

  switch (action.type) {
    case CRAFT_START:
      state = [...state];
      if (state[order].lastTime !== null) return state;
      const canBuy = buyResource(state, cost, 1);
      if (!canBuy) return state;

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
        lastTime: new Date().getTime(),
        progress: state[order].progress + action.progressIncrement,
      };

      if (state[order].progress >= 1) {
        state[order].lastTime = null;
        let bulk = 1;
        if (action.canBulk) {
          bulk += buyResource(state, cost, Math.floor(state[order].progress)-1);
          state[order].have += bulk*Resource.craftMultiply;
          state[order].progress %= 1;
        } else {
          state[order].have += Resource.craftMultiply;
          state[order].progress = 0;
        }

        const EffectMultiply = Resource.effectMultiply(state);
        console.log(Resource.name, EffectMultiply);
        // randomGrantOnCraft
        for (let i = 0; i < Resource.randomGrantOnCraft.length; i++) {
          const [chance, toGrant] = Resource.randomGrantOnCraft[i];
          const realChance = chance*EffectMultiply;
          const grantChance = 1-((1-realChance)**bulk); // TODO: Change to better formula
          if (Math.random() < grantChance) {
            state[Resources[toGrant].order] = {
              ...state[Resources[toGrant].order],
              have: state[Resources[toGrant].order].have + 1
            }
          }
        }
      }
      return state;
    default:
      return state;
  }
}

export default reducer;

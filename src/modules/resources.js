// import produce from 'immer';
import { savefile } from '../saveload';
import { ResourceArr } from '../data/resources';

const CRAFT_START = 'resource/CRAFT_START';
const CRAFT_END = 'resource/CRAFT_END';
const CRAFT_UPDATE = 'resource/CRAFT_UPDATE';

export const craftStart = order => ({
  type: CRAFT_START,
  order
});
export const craftEnd = order => ({
  type: CRAFT_END,
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

/**
 * @typedef {object} ResourceAction
 * @property {string} type
 * @property {string} order
 * @property {boolean} [canBulk]
 * @property {number} [progressIncrement]
 */

/**
 * @param {savefile} state 
 * @param {ResourceAction} action 
 */
function reducer(state = savefile.resources, action) {
  const Resource = ResourceArr[action.order];
  const order = action.order;
  const have = state[order]?.have;

  switch (action.type) {
    case CRAFT_START:
      const cost = Resource.cost(have);

      state = [...state];
      for (const resourceName in cost) {
        const _cost = cost[resourceName];
        const _order = ResourceArr[action.order];
        state[_order] = {
          ...state[_order],
          have: state[_order].have - _cost
        };
      }
      state[order] = {
        ...state[order],
        lastTime: new Date().getTime()
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
        if (action.canBulk) {
          state[order].have += Math.floor(state[order].progress);
          state[order].progress %= 1;
        } else {
          state[order].have++;
          state[order].lastTime = null;
          state[order].progress = 0;
        }
      }
      return state;
    default:
      return state;
  }
}

export default reducer;

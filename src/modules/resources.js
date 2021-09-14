// import produce from 'immer';
import { savefile } from '../saveload';
import { ResourceArr } from '../data/resources';

const CRAFT_START = 'resource/CRAFT_START';
const CRAFT_END = 'resource/CRAFT_END';

export const craftStart = order => ({
  type: CRAFT_START,
  order
});
export const craftEnd = order => ({
  type: CRAFT_END,
  order
});

/**
 * @typedef {object} ResourceAction
 * @property {string} type
 * @property {string} order
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
      const bulk = 1;
      
      if (!bulk) return false;
    
      for (const resourceName in cost) {
        const _cost = bulk * cost[resourceName];
        const _order = ResourceArr[action.order];
        state[_order].have -= _cost;
      }

      state = [...state];
      state[order] = {
        ...state[order],
        startTime: new Date().getTime()
      };
    
      return state;
    case CRAFT_END:
      state = [...state];
      state[order] = {
        ...state[order],
        startTime: null,
        have: state[order].have + 1
      }

      return state;
    default:
      return state;
  }
}

export default reducer;

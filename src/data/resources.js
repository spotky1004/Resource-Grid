// eslint-disable-next-line
import { DefaultSave } from "../saveload";
import Resource from "../class/Resource.js"; 

export const Resources = {
  TreeSeed: new Resource({
    name: "TreeSeed",
    description: "Generate tree",
    automates: ["Tree"],
    position: [0, 0]
  }),
  Tree: new Resource({
    name: "Tree",
    craftTime: 20,
    position: [0, 1]
  }),
  Log: new Resource({
    name: "Log",
    cost: {
      "Tree": 1
    },
    craftTime: 20,
    craftMultiply: 2,
    randomGrantOnCraft: [
      [0.0008, "TreeSeed", 0]
    ],
    position: [0, 2]
  }),
  Plank: new Resource({
    name: "Plank",
    cost: {
      "Log": 1
    },
    craftTime: 15,
    craftMultiply: 3,
    position: [0, 3]
  }),
  Charcoal: new Resource({
    name: "Charcoal",
    cost: {
      "Log": 3
    },
    craftTime: 3,
    craftMultiply: 4,
    position: [0, 4]
  }),
  Vine: new Resource({
    name: "Vine",
    position: [0, 5]
  }),
  Mushroom: new Resource({
    name: "Mushroom",
    position: [0, 6]
  }),

  Stone: new Resource({
    name: "Stone",
    craftTime: 40,
    randomGrantOnCraft: [
      [0.03, "CopperOre"],
      [0.008, "IronOre"],
      [0.003, "GoldOre"],
      [0.001, "EmeraldStone"],
    ],
    description: "Chance to grant some ore on craft.\nChance is based on Pickaxe",
    effectMultiply: (savefile) => savefile[Resources.Pickaxe.order].have**1.3,
    position: [2, 0]
  }),
  CopperOre: new Resource({
    name: "CopperOre",
    position: [2, 1]
  }),
  IronOre: new Resource({
    name: "IronOre",
    position: [2, 2]
  }),
  GoldOre: new Resource({
    name: "GoldOre",
    position: [2, 3]
  }),
  EmeraldStone: new Resource({
    name: "EmeraldStone",
    position: [2, 5]
  }),
  AmethystStone: new Resource({
    name: "AmethystStone",
    position: [2, 6]
  }),
  RubyStone: new Resource({
    name: "RubyStone",
    position: [2, 7]
  }),
  SapphireStone: new Resource({
    name: "SapphireStone",
    position: [2, 8]
  }),

  Copper: new Resource({
    name: "Copper",
    cost: {
      "CopperOre": 3,
      "Charcoal": 1
    },
    craftTime: 10,
    position: [3, 1]
  }),
  Iron: new Resource({
    name: "Iron",
    cost: {
      "IronOre": 4,
      "Charcoal": 3
    },
    craftTime: 15,
    position: [3, 2]
  }),
  Gold: new Resource({
    name: "Gold",
    cost: {
      "GoldOre": 5,
      "Charcoal": 2,
    },
    position: [3, 3]
  }),
  Emerald: new Resource({
    name: "Emerald",
    cost: {
      "EmeraldStone": 10,
      "Lava": 1
    },
    craftTime: 100,
    position: [3, 5]
  }),
  Amethyst: new Resource({
    name: "Amethyst",
    cost: {
      "AmethystStone": 10,
      "Lava": 2
    },
    craftTime: 150,
    position: [3, 6]
  }),
  Ruby: new Resource({
    name: "Ruby",
    cost: {
      "RubyStone": 10,
      "Lava": 4
    },
    craftTime: 200,
    position: [3, 7]
  }),
  Sapphire: new Resource({
    name: "Sapphire",
    cost: {
      "SapphireStone": 10,
      "Lava": 8
    },
    craftTime: 250,
    position: [3, 8]
  }),

  Water: new Resource({
    name: "Water",
    craftTime: 100,
    position: [5, 0]
  }),
  Lava: new Resource({
    name: "Lava",
    cost: {
      "Stone": 250,
      "Charcoal": 50
    },
    craftTime: 500,
    position: [5, 1]
  }),
  Steam: new Resource({
    name: "Steam",
    cost: {
      "Water": 100,
      "Lava": 8
    },
    craftTime: 300,
    craftMultiply: 100,
    position: [5, 2]
  }),

  Axe: new Resource({
    name: "Axe",
    description: "Cut tree",
    cost: (have) => ({
      "Log": (have+1)**2,
      "Plank": 3 * (have+1)**2
    }),
    craftTime: 5,
    automates: ["Log"],
    position: [6, 0]
  }),
  Pickaxe: new Resource({
    name: "Pickaxe",
    description: "Automatically mines stone",
    cost: (have) => ({
      "Plank": 10 * (have + 1)*(have / 5 + 1),
      "Stone": 6 * have**1.4,
      "Copper": 3 * Math.max(0, have-4)**2,
      "Iron": 5 * Math.max(0, have-9)**2,
      "Gold": 7 * Math.max(0, have-14)**2,
    }),
    craftTime: 30,
    automates: ["Stone"],
    position: [6, 1]
  }),
  GemstomePickaxe: new Resource({
    name: "GemstonePickaxe",
    craftTime: 120,
    position: [6, 2],
  }),
  Pump: new Resource({
    name: "Pump",
    description: "Generates Water",
    cost: (have) => ({
      "Copper": 30*(have+1)**1.2,
      "Iron": 10*(have+1)**1.2,
      "Gold": 10*(have+1)**1.2,
    }),
    craftTime: 80,
    automates: ["Water"],
    position: [6, 3]
  }),
  Volcano: new Resource({
    name: "Volcano",
    description: "Automates Lava",
    cost: (have) => ({
      "Stone": 500,
      "Lava": 1*have**2,
    }),
    craftTime: 50,
    automates: ["Lava"],
    position: [6, 4]
  }),
  MetalworkFactory: new Resource({
    name: "MetalworkFactory",
    description: "Automates Copper, Iron and Gold",
    cost: (have) => ({
      "Iron": 300*((have+1)**1.15),
      "Gold": 300*((have+1)**1.15),
      "Pump": (have+1)*2,
      "Volcano": (have+1),
    }),
    craftTime: 500,
    automates: ["Iron", "Gold", "Copper"],
    position: [6, 5]
  }),

  Loot: new Resource({
    name: "Loot",
    position: [8, 0]
  })
};



/** @type {Resource[]} */
export const ResourceArr = new Array(81).fill(null);
for (const id in Resources) {
  /** @type {Resource} */
  const Resource = Resources[id];
  const position = 9*Resource.position.y + Resource.position.x;
  ResourceArr[position] = Resource;
}

export const AutoConnected = Array.from({ length: 81 }, (_, i) => {
  if (!ResourceArr[i]) return null;
  return ResourceArr.findIndex(e => e && e.automates ? e.automates.includes(ResourceArr[i].name) : false);
});



/**
 * @param {string} name 
 * @returns {Resource}
 */
export function getResourceByName(name) {
  return Resources[name];
}



/**
 * @param {string} name 
 * @param {DefaultSave} savefile 
 * @returns 
 */
export function canBuy(name, savefile) {
  const Resource = getResourceByName(name);
  if (savefile.resources[Resource.order].startTime !== null) return;

  const cost = Resource.cost(savefile.resources[Resource.order].have);
  
  let bulk = Infinity;
  if (cost === null) return bulk;

  for (const resourceName in cost) {
    const _cost = cost[resourceName];
    const _have = savefile.resources[getResourceByName(resourceName).order].have;
    if (_cost > _have) return false;
    bulk = Math.min(bulk, _have/_cost);
  }
  return Math.floor(bulk);
}
/**
 * @param {string} name 
 * @param {boolean} doBulk
 * @param {DefaultSave} savefile 
 * @returns 
 */
export function buy(name, savefile, doBulk=false) {
  const Resource = getResourceByName(name);

  const cost = Resource.cost(savefile);
  const bulk = doBulk ? canBuy(savefile) : 1;
  
  if (!bulk) return false;

  for (const resourceName in cost) {
    const _cost = bulk * cost[resourceName];
    const _order = getResourceByName(resourceName).order;
    savefile.resources[_order].have -= _cost;
  }

  savefile.resources[Resource.order].startTime = new Date().getTime();

  return bulk;
}
export function getCooldown(name, savefile) {
  const Resource = Resources[name];
  const order = Resource.order;

  let craftTime = Resource.craftTime*1000;
  if (AutoConnected[order] !== -1) {
    craftTime /= Math.max(1, savefile.resources[AutoConnected[order]].have);
    craftTime /= ResourceArr[AutoConnected[order]].effectMultiply(savefile.resources);
  }

  return craftTime;
}

// eslint-disable-next-line
import { DefaultSave } from "../saveload";
import Resource from "../class/Resource.js"; 

export const Resources = {
  TreeSeed: new Resource({
    name: "TreeSeed",
    description: "Generate tree",
    automates: ["Tree"],
    unlockAt: {},
    position: [0, 0]
  }),
  Tree: new Resource({
    name: "Tree",
    craftTime: 20,
    unlockAt: {},
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
      [0.0008, "TreeSeed", 0],
      [0.05, "Fruit"]
    ],
    unlockAt: {
      "Tree": 1,
    },
    position: [0, 2]
  }),
  Plank: new Resource({
    name: "Plank",
    cost: {
      "Log": 1
    },
    craftTime: 15,
    craftMultiply: 3,
    unlockAt: {
      "Log": 1
    },
    position: [0, 3]
  }),
  Charcoal: new Resource({
    name: "Charcoal",
    cost: {
      "Plank": 3
    },
    craftTime: 3,
    craftMultiply: 4,
    unlockAt: {
      "CopperOre": 1,
    },
    noCostIfAutomate: true,
    position: [0, 4]
  }),
  Vine: new Resource({
    name: "Vine",
    unlockAt: {
      "Vine": 1
    },
    position: [0, 5]
  }),
  Mushroom: new Resource({
    name: "Mushroom",
    unlockAt: {
      "Mushroom": 1
    },
    position: [0, 6]
  }),
  Fruit: new Resource({
    name: "Fruit",
    craftTime: 30,
    unlockAt: {
      "Fruit": 1,
    },
    position: [0, 7]
  }),
  Explorer: new Resource({
    name: "Explorer",
    cost: (have) => ({
      "Loot": 10*(have+1)**1.2,
      "TreasureMap": 15*(have+1)**1.1,
      "Citizen": 150*(have/2+1)**1.1,
      "Animal": 15*(have+1)**1.1,
      "Fruit": 1000*(have+1)**1.3,
      "Energy": 10**(6.2+Math.sqrt(have/2))
    }),
    automates: ["Trap", "Animal", "TreasureMap", "Loot"],
    craftTime: 300,
    unlockAt: {
      "Loot": 1,
    },
    position: [0, 8]
  }),

  Orchard: new Resource({
    name: "Orchard",
    cost: (have) => ({
      "Citizen": 3+(have*2)**1.2,
      "Fruit": 1,
      "Sand": 1000*(have+1),
      "Water": 35*(have+1)**1.1
    }),
    automates: ["Fruit"],
    craftTime: 150,
    unlockAt: {
      "Citizen": 1
    },
    position: [1, 0]
  }),
  Trap: new Resource({
    name: "Trap",
    cost: {
      "Iron": 150,
      "Energy": 50,
      "Glass": 100,
      "Fruit": 1,
    },
    craftTime: 30,
    unlockAt: {
      "Orchard": 1
    },
    position: [1, 1]
  }),
  Animal: new Resource({
    name: "Animal",
    cost: {
      "Trap": 1,
    },
    randomGrantOnCraft: [
      [0.5, "Animal"]
    ],
    craftTime: 30,
    unlockAt: {
      "Trap": 1
    },
    position: [1, 2]
  }),
  TreasureMap: new Resource({
    name: "TreasureMap",
    cost: {
      "ShinyStone": 250,
      "Plank": 1000,
      "Water": 50
    },
    randomGrantOnCraft: [
      [0.75, "TreasureMap"]
    ],
    craftTime: 30,
    unlockAt: {
      "Animal": 1
    },
    position: [1, 3]
  }),
  Loot: new Resource({
    name: "Loot",
    cost: {
      "Citizen": 1,
      "Animal": 1,
      "TreasureMap": 1,
      "Energy": 200,
    },
    randomGrantOnCraft: [
      [0.5, "TreeSeed"],
      [0.7, "Vine"],
      [0.35, "Mushroom"],
      [0.08, "UpgradePotion"]
    ],
    craftTime: 30,
    unlockAt: {
      "TreasureMap": 1,
    },
    position: [1, 4]
  }),
  Wall: new Resource({
    name: "Wall",
    cost: {
      "Brick": 3,
    },
    craftTime: 15,
    unlockAt: {
      "Brick": 1,
    },
    position: [1, 5]
  }),
  House: new Resource({
    name: "House",
    cost: {
      "Wall": 4,
      "Glass": 2,
    },
    craftTime: 50,
    unlockAt: {
      "Wall": 1,
    },
    position: [1, 6]
  }),
  Citizen: new Resource({
    name: "Citizen",
    cost: {
      "House": 1,
      "Fruit": 5,
    },
    craftTime: 30,
    unlockAt: {
      "House": 1,
    },
    position: [1, 7]
  }),
  CityBuilder: new Resource({
    name: "CityBuilder",
    cost: (have) => ({
      "Citizen": 3*(have+1)**2,
      "Energy": 100*(have+1)**1.6,
      "Iron": 300*(have+1)**1.2,
      "Gold": 500*(have+1)**1.2
    }),
    craftTime: 200,
    automates: ["Brick", "Wall", "House", "Glass", "Citizen"],
    unlockAt: {
      "Energy": 1,
    },
    position: [1, 8]
  }),

  Stone: new Resource({
    name: "Stone",
    craftTime: 20,
    randomGrantOnCraft: [
      [0.07, "Sand"],
      [0.07, "CopperOre"],
      [0.03, "IronOre"],
      [0.015, "GoldOre"],
      [0.001, "EmeraldStone"],
    ],
    description: "Chance to grant some ore on craft.\nChance is based on Pickaxe",
    effectMultiply: (savefile) => savefile[Resources.Pickaxe.order].have**1.3,
    unlockAt: {
      "Pickaxe": 1,
    },
    position: [2, 0]
  }),
  CopperOre: new Resource({
    name: "CopperOre",
    unlockAt: {
      "CopperOre": 1,
    },
    position: [2, 1]
  }),
  IronOre: new Resource({
    name: "IronOre",
    unlockAt: {
      "IronOre": 1,
    },
    position: [2, 2]
  }),
  GoldOre: new Resource({
    name: "GoldOre",
    unlockAt: {
      "GoldOre": 1,
    },
    position: [2, 3]
  }),
  ShinyStone: new Resource({
    name: "ShinyStone",
    craftTime: 45,
    randomGrantOnCraft: [
      [0.03, "EmeraldStone"],
      [0.015, "AmethystStone"],
      [0.007, "RubyStone"],
      [0.003, "SapphireStone"],
    ],
    description: "Chance to grant some gem on craft.\nChance is based on Gemstone Pickaxe",
    effectMultiply: (savefile) => {
      let mult = 1;
      mult *= savefile[Resources.GemstonePickaxe.order].have;
      mult *= 1+savefile[Resources.GemBoost.order].have/3;
      return mult;
    },
    unlockAt: {
      "GemstonePickaxe": 1,
    },
    position: [2, 4]
  }),
  EmeraldStone: new Resource({
    name: "EmeraldStone",
    unlockAt: {
      "EmeraldStone": 1,
    },
    position: [2, 5]
  }),
  AmethystStone: new Resource({
    name: "AmethystStone",
    unlockAt: {
      "AmethystStone": 1,
    },
    position: [2, 6]
  }),
  RubyStone: new Resource({
    name: "RubyStone",
    unlockAt: {
      "RubyStone": 1,
    },
    position: [2, 7]
  }),
  SapphireStone: new Resource({
    name: "SapphireStone",
    unlockAt: {
      "SapphireStone": 1,
    },
    position: [2, 8]
  }),

  Brick: new Resource({
    name: "Brick",
    cost: {
      "Stone": 5,
      "Charcoal": 1,
    },
    craftTime: 3,
    unlockAt: {
      "Stone": 1,
      "Charcoal": 1,
    },
    position: [3, 0],
  }),
  Copper: new Resource({
    name: "Copper",
    cost: {
      "CopperOre": 1,
      "Charcoal": 1
    },
    craftTime: 10,
    unlockAt: {
      "CopperOre": 1,
    },
    position: [3, 1]
  }),
  Iron: new Resource({
    name: "Iron",
    cost: {
      "IronOre": 1,
      "Charcoal": 2
    },
    craftTime: 15,
    unlockAt: {
      "IronOre": 1,
    },
    position: [3, 2]
  }),
  Gold: new Resource({
    name: "Gold",
    cost: {
      "GoldOre": 1,
      "Charcoal": 1,
    },
    craftTime: 10,
    unlockAt: {
      "GoldOre": 1,
    },
    position: [3, 3]
  }),
  Emerald: new Resource({
    name: "Emerald",
    cost: {
      "EmeraldStone": 10,
      "Lava": 1
    },
    randomGrantOnCraft: [
      [0.2, "Steam"]
    ],
    unlockAt: {
      "EmeraldStone": 1,
    },
    craftTime: 30,
    position: [3, 5]
  }),
  Amethyst: new Resource({
    name: "Amethyst",
    cost: {
      "AmethystStone": 10,
      "Lava": 2
    },
    randomGrantOnCraft: [
      [0.4, "Steam"]
    ],
    craftTime: 40,
    unlockAt: {
      "AmethystStone": 1,
    },
    position: [3, 6]
  }),
  Ruby: new Resource({
    name: "Ruby",
    cost: {
      "RubyStone": 10,
      "Lava": 3
    },
    randomGrantOnCraft: [
      [0.6, "Steam"]
    ],
    craftTime: 50,
    unlockAt: {
      "RubyStone": 1,
    },
    position: [3, 7]
  }),
  Sapphire: new Resource({
    name: "Sapphire",
    cost: {
      "SapphireStone": 10,
      "Lava": 4
    },
    randomGrantOnCraft: [
      [0.8, "Steam"]
    ],
    craftTime: 60,
    unlockAt: {
      "SapphireStone": 1,
    },
    position: [3, 8]
  }),

  Energy: new Resource({
    name: "Energy",
    craftTime: 50,
    randomGrantOnCraft: [
      [0.01, "Replicanti"]
    ],
    unlockAt: {
      "Citizen": 1
    },
    position: [4, 0]
  }),
  PickaxeUpgrade: new Resource({
    name: "PickaxeUpgrade",
    cost: (have) => ({
      "Energy": 7*1.2**(have+1),
      "Emerald": 3*(have-2),
    }),
    craftTime: 30,
    unlockAt: {
      "Energy": 1,
      "Pickaxe": 1,
    },
    position: [4, 1]
  }),
  GemBoost: new Resource({
    name: "GemBoost",
    cost: (have) => ({
      "Energy": (100+have*10)*1.5**(have+1),
      "Amethyst": 3*(have+1)**1.1
    }),
    craftTime: 45,
    unlockAt: {
      "Energy": 1,
      "ShinyStone": 1,
    },
    position: [4, 2]
  }),
  MetalworkBoost: new Resource({
    name: "MetalworkBoost",
    cost: (have) => ({
      "Energy": 3000*2**(have+1),
      "UpgradePotion": 1+(have**1.4)/2,
      "Iron": 300*(have/3+1)**1.2
    }),
    craftTime: 60,
    unlockAt: {
      "UpgradePotion": 1
    },
    position: [4, 3]
  }),
  LiquidBoost: new Resource({
    name: "LiquidBoost",
    cost: (have) => ({
      "Energy": 10**(6+have**1.1),
      "UpgradePotion": 15*(have+1),
      "Ruby": 15*(have+1),
      "Water": 1000*(have+1)**1.2,
      "Lava": 250*(have+1),
    }),
    craftTime: 75,
    unlockAt: {
      "MetalworkBoost": 1
    },
    position: [4, 4]
  }),
  Generator: new Resource({
    name: "Generator",
    cost: (have) => ({
      "Iron": 30*(have+1),
      "Lava": 1+have,
      "Steam": have*3,
      "Citizen": 1+have,
    }),
    craftTime: 100,
    effectMultiply: (savefile) => 4**savefile[Resources.GeneratorBoost.order].have,
    automates: ["Energy"],
    unlockAt: {
      "Citizen": 1
    },
    position: [4, 7]
  }),
  GeneratorBoost: new Resource({
    name: "GeneratorBoost",
    cost: (have) => ({
      "Steam": 50*(have/2+1),
      "Replicanti": 100**(have+2),
    }),
    craftTime: 60,
    unlockAt: {
      "ReplicantiBoost": 1
    },
    position: [4, 8]
  }),

  Water: new Resource({
    name: "Water",
    craftTime: 100,
    unlockAt: {
      "Copper": 1,
    },
    position: [5, 0]
  }),
  Lava: new Resource({
    name: "Lava",
    cost: (have) => ({
      "Stone": 100-96*(1-1/(have/14+1)),
      "Charcoal": 50-48*(1-1/(have/7+1))
    }),
    unlockAt: {
      "Stone": 1,
      "Charcoal": 1,
    },
    craftTime: 150,
    position: [5, 1]
  }),
  Steam: new Resource({
    name: "Steam",
    cost: {
      "Water": 10,
      "Lava": 5
    },
    craftTime: 60,
    craftMultiply: 15,
    unlockAt: {
      "Water": 1,
      "Lava": 1,
    },
    position: [5, 2]
  }),
  UpgradePotion: new Resource({
    name: "UpgradePotion",
    cost: {
      "Vine": 2,
      "Mushroom": 1,
      "Emerald": 10
    },
    craftTime: 10,
    unlockAt: {
      "Vine": 1,
      "Mushroom": 1,
    },
    position: [5, 5]
  }),
  Sand: new Resource({
    name: "Sand",
    unlockAt: {
      "Sand": 1,
    },
    position: [5, 7]
  }),
  Glass: new Resource({
    name: "Glass",
    cost: {
      "Sand": 1,
      "Charcoal": 1
    },
    craftTime: 6,
    unlockAt: {
      "Sand": 1,
    },
    position: [5, 8]
  }),

  Axe: new Resource({
    name: "Axe",
    description: "Cuts tree",
    cost: (have) => ({
      "Plank": 3 * (have+1)**2
    }),
    craftTime: 5,
    automates: ["Log"],
    unlockAt: {
      "Plank": 1,
    },
    position: [6, 0]
  }),
  Saw: new Resource({
    name: "Saw",
    description: "Automates Plank",
    cost: (have) => ({
      "Plank": 10 * (have+1)**2,
      "Iron": 3 * (have+1)**1.2
    }),
    craftTime: 60,
    automates: ["Plank"],
    unlockAt: {
      "Iron": 1,
    },
    position: [6, 1]
  }),
  Pickaxe: new Resource({
    name: "Pickaxe",
    description: "Automatically mines stone",
    cost: (have) => ({
      "Plank": 10 * (have + 1)**(have / 100 + 1),
      "Stone": 6 * have**1.4,
      "Copper": 3 * Math.max(0, have-4)**2,
      "Iron": 5 * Math.max(0, have-9)**2,
      "Gold": 7 * Math.max(0, have-14)**2,
    }),
    craftTime: 30,
    automates: ["Stone"],
    effectMultiply: (savefile) => {
      let mult = 1;
      mult *= savefile[Resources.GemstonePickaxe.order].have + 1;
      mult *= savefile[Resources.PickaxeUpgrade.order].have/3 + 1;
      return mult;
    },
    unlockAt: {
      "Plank": 1
    },
    position: [6, 2]
  }),
  GemstonePickaxe: new Resource({
    name: "GemstonePickaxe",
    description: "Automatically mines Shiny stone & Boost Pickaxe",
    cost: (have) => ({
      "Iron": 100 * (have+1),
      "Emerald": 2 * (have+1),
      "Amethyst": 2 * (have-2),
      "Ruby": 2 * (have-5),
      "Sapphire": 2 * (have-8),
    }),
    craftTime: 120,
    automates: ["ShinyStone"],
    effectMultiply: (savefile) => {
      let mult = 1;
      mult *= savefile[Resources.PickaxeUpgrade.order].have/3 + 1;
      return mult;
    },
    unlockAt: {
      "Emerald": 1,
    },
    position: [6, 3],
  }),
  Pump: new Resource({
    name: "Pump",
    description: "Generates Water",
    cost: (have) => ({
      "Copper": 5*(have+1)**1.2,
      "Iron": 3*(have+1)**1.2,
      "Gold": 3*(have+1)**1.2,
    }),
    craftTime: 30,
    automates: ["Water"],
    effectMultiply: (savefile) => savefile[Resources.LiquidBoost.order].have/3+1,
    unlockAt: {
      "Copper": 1,
    },
    position: [6, 4]
  }),
  Volcano: new Resource({
    name: "Volcano",
    description: "Automates Lava",
    cost: (have) => ({
      "Stone": 200,
      "Lava": 1*(have+1)*(have/15+1),
    }),
    craftTime: 35,
    automates: ["Lava"],
    effectMultiply: (savefile) => savefile[Resources.LiquidBoost.order].have/3+1,
    unlockAt: {
      "Lava": 1,
    },
    position: [6, 5]
  }),
  MetalworkFactory: new Resource({
    name: "MetalworkFactory",
    description: "Automates Copper, Iron and Gold",
    cost: (have) => ({
      "Copper": 10*((have+1)**1.15),
      "Iron": 10*((have+1)**1.15),
      "Gold": 10*((have+1)**1.15),
      "Pump": 2,
      "Volcano": 1,
    }),
    craftTime: 150,
    automates: ["Iron", "Gold", "Copper"],
    effectMultiply: (savefile) => savefile[Resources.MetalworkBoost.order].have/3+1,
    unlockAt: {
      "Pump": 1,
      "Volcano": 1,
    },
    position: [6, 6]
  }),
  CharcoalMiner: new Resource({
    name: "CharcoalMiner",
    description: "Mines Charcoal without any cost",
    cost: (have) => ({
      "Steam": 15*(have+1)**1.2,
      "Pump": 2,
      "Iron": 50*(have+1)*(1+have/20),
      "Citizen": 1+have,
    }),
    craftTime: 300,
    automates: ["Charcoal"],
    unlockAt: {
      "MetalworkFactory": 1,
    },
    position: [6, 7]
  }),
  GemCutter: new Resource({
    name: "GemCutter",
    cost: (have) => ({
      "Energy": 200*(have+1)**1.2,
      "Iron": 1000*(have+1)**1.1,
      "Water": 300*(have+1)**1.1,
      "Lava": 100*(have+1)**1.1
    }),
    automates: ["Emerald", "Amethyst", "Ruby", "Sapphire"],
    craftTime: 300,
    unlockAt: {
      "CharcoalMiner": 1,
      "Emerald": 1,
    },
    position: [6, 8]
  }),

  Forest: new Resource({
    name: "Forest",
    position: [7, 0]
  }),
  Underground: new Resource({
    name: "Underground",
    position: [7, 1]
  }),
  Ocean: new Resource({
    name: "Ocean",
    position: [7, 2]
  }),
  City: new Resource({
    name: "City",
    position: [7, 3]
  }),
  EarthEssence: new Resource({
    name: "EarthEssence",
    unlockAt: {
      "Forest": 1,
      "Underground": 1,
      "Ocean": 1,
      "City": 1,
    },
    position: [7, 4]
  }),

  DivinePowder: new Resource({
    name: "DivinePowder",
    cost: (have) => ({
      "Replicanti": 10**((have/5)**0.9+6),
      "Energy": 100+have**2,
      "Sapphire": 1+(have/10)**0.2
    }),
    craftTime: 3,
    unlockAt: {
      "Replicanti": 1,
      "Energy": 1,
    },
    position: [8, 0]
  }),
  DivineShard: new Resource({
    name: "DivineShard",
    unlockAt: {
      "DivinePowder": 1,
    },
    position: [8, 1]
  }),
  ReplicantiBoost: new Resource({
    name: "ReplicantiBoost",
    cost: (have) => ({
      "Replicanti": 10**(have+2),
      "Energy": 10**(1.6+have**0.7)
    }),
    craftTime: 100,
    unlockAt: {
      "Replicanti": 1,
    },
    position: [8, 7]
  }),
  Replicanti: new Resource({
    name: "Replicanti",
    cost: {
      "Replicanti": 1
    },
    craftMultiply: 2,
    effectMultiply: (savefile) => {
      const replicanti = savefile[Resources.Replicanti.order].have;
      const replicantiBoost = savefile[Resources.ReplicantiBoost.order].have;
      const replicantiPow = 0.6 + 0.35*(1-1/(replicantiBoost/30+1));
      return 1.5**(replicantiBoost+1)*(replicanti+1)**replicantiPow/(replicanti+1);
    },
    unlockAt: {
      "Replicanti": 1,
    },
    automates: ["Replicanti"],
    craftTime: 30,
    position: [8, 8]
  }),
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
  if (!ResourceArr[i]) return -1;
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
export function isUnlocked(name, savefile) {
  const Resource = Resources[name];

  if (!Resource || !Resource.unlockAt) return false;
  for (const name in Resource.unlockAt) {
    if (savefile[Resources[name].order].have < Resource.unlockAt[name]) return false;
  }
  return true;
}

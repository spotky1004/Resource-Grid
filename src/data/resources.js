// eslint-disable-next-line
import { DefaultSave } from "../saveload";
import Resource from "../class/Resource.js"; 

export const Resources = {
  TreeSeed: new Resource({
    name: "TreeSeed",
    description: "Generate tree",
    automates: ["Tree"],
    unlockAt: {},
    defaultQuantity: 1,
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
      "Glass": 30,
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
      "Plank": 500,
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
      [0.000_000_001, "Core"]
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
  Core: new Resource({
    name: "Core",
    unlockAt: {
      "Core": 1,
    },
    position: [3, 4]
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
    canEmpower: false,
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
    canEmpower: false,
    position: [4, 2]
  }),
  MetalworkUpgrade: new Resource({
    name: "MetalworkUpgrade",
    cost: (have) => ({
      "Energy": 3000*2**(have+1),
      "UpgradePotion": 1+(have**1.4)/2,
      "Iron": 300*(have/3+1)**1.2
    }),
    craftTime: 60,
    unlockAt: {
      "UpgradePotion": 1
    },
    canEmpower: false,
    position: [4, 3]
  }),
  LiquidUpgrade: new Resource({
    name: "LiquidUpgrade",
    cost: (have) => ({
      "Energy": 10**(6+have**1.1),
      "UpgradePotion": 15*(have+1),
      "Ruby": 15*(have+1),
      "Water": 1000*(have+1)**1.2,
      "Lava": 250*(have+1),
    }),
    craftTime: 75,
    unlockAt: {
      "MetalworkUpgrade": 1
    },
    canEmpower: false,
    position: [4, 4]
  }),
  ReplicantiBoostII: new Resource({
    name: "ReplicantiBoostII",
    cost: (have) => ({
      "Energy": 10**(12+have*2),
      "Replicanti": 10**(33+have*6),
      "UpgradePotionII": 1+Math.floor(have**1.2),
      "Sapphire": 1000*((have+1)**1.3),
    }),
    craftTime: 90,
    unlockAt: {
      "UpgradePotionII": 1,
    },
    canEmpower: false,
    position: [4, 5]
  }),
  Generator: new Resource({
    name: "Generator",
    cost: (have) => ({
      "Iron": 30*(have+1)**0.6,
      "Lava": 1+have,
      "Steam": 3*have**0.6,
      "Citizen": 1+have**0.6,
    }),
    craftTime: 100,
    effectMultiply: (savefile) => 4**savefile[Resources.GeneratorUpgrade.order].have,
    automates: ["Energy"],
    unlockAt: {
      "Citizen": 1
    },
    position: [4, 7]
  }),
  GeneratorUpgrade: new Resource({
    name: "GeneratorUpgrade",
    cost: (have) => ({
      "Steam": Math.min(200_000, 2**(5.2+have**0.75)) + Math.max(0, have-30)*5_000,
      "Replicanti": 100**(have+2+Math.max(0, have-10)**0.7+Math.max(0, have-25)),
    }),
    craftTime: 60,
    unlockAt: {
      "ReplicantiBoost": 1
    },
    canEmpower: false,
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
    canBulkBuy: true,
    position: [5, 1]
  }),
  Steam: new Resource({
    name: "Steam",
    cost: {
      "Water": 2,
      "Lava": 1
    },
    craftTime: 10,
    craftMultiply: 3,
    unlockAt: {
      "Water": 1,
      "Lava": 1,
    },
    position: [5, 2]
  }),
  StramProducer: new Resource({
    name: "StramProducer",
    cost: (have) => ({
      "Copper": 10_000*(have+1)**1.3,
      "Water": 4000*(have+1)**1.1,
      "Lava": 2000*(have+1)**1.1,
      "Energy": 10**(6.6+Math.sqrt(have/10))
    }),
    automates: ["Steam"],
    craftTime: 600,
    unlockAt: {
      "Steam": 15,
      "Energy": 1,
    },
    position: [5, 3]
  }),
  Crucible: new Resource({
    name: "Crucible",
    cost: (have) => ({
      "UpgradePotionII": 1,
      "Gold": 20_000*(have+1),
      "Copper": 30_000*(have+1),
      "Water": 10_000*(have+1),
      "Volcano": 10+have*2,
    }),
    automates: ["UpgradePotion", "UpgradePotionII"],
    craftTime: 800,
    unlockAt: {
      "UpgradePotionII": 1,
    },
    position: [5, 4]
  }),
  UpgradePotion: new Resource({
    name: "UpgradePotion",
    cost: {
      "Vine": 2,
      "Mushroom": 1,
      "Water": 5,
      "Emerald": 10
    },
    craftTime: 10,
    unlockAt: {
      "Vine": 1,
      "Mushroom": 1,
    },
    position: [5, 5]
  }),
  UpgradePotionII: new Resource({
    name: "UpgradePotionII",
    cost: {
      "UpgradePotion": 100,
      "Core": 1,
      "Fruit": 5_000,
      "Sand": 25_000_000,
      "Lava": 5_000,
      "Sapphire": 1_000,
    },
    craftTime: 1000,
    unlockAt: {
      "UpgradePotion": 1,
      "DivineShard": 1,
      "Core": 1
    },
    position: [5, 6]
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
      "Copper": 2.5 * (have+1)**1.2,
      "Iron": 3 * (have+1)**1.2
    }),
    craftTime: 60,
    automates: ["Plank"],
    unlockAt: {
      "Copper": 1,
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
      mult *= savefile[Resources.GemstonePickaxe.order].have/3 + 1;
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
    effectMultiply: (savefile) => savefile[Resources.LiquidUpgrade.order].have/3+1,
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
    effectMultiply: (savefile) => savefile[Resources.LiquidUpgrade.order].have/3+1,
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
    effectMultiply: (savefile) => savefile[Resources.MetalworkUpgrade.order].have/3+1,
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
      "Energy": 10**(3+(have*2)**0.85),
      "Iron": 1000*(have+1)**1.1,
      "Water": 300*(have+1)**1.1,
      "Lava": 100*(have+1)**1.1
    }),
    automates: ["Emerald", "Amethyst", "Ruby", "Sapphire"],
    craftTime: 300,
    unlockAt: {
      "CharcoalMiner": 1,
      "Energy": 1,
      "Emerald": 1,
    },
    position: [6, 8]
  }),

  Overworld: new Resource({
    name: "Overworld",
    cost: (have) => ({
      "DivineShard": 75*(have+1),
      "Tree": 2_500_000*(have+1),
      "Vine": 1_000*(have+1),
      "Mushroom": 500*(have+1),
    }),
    automates: [
      "Explorer",
      "Axe",
      "Saw",
      "CharcoalMiner",
      "GemBoost",
    ],
    craftTime: 1500,
    unlockAt: {
      "FastForward": 3
    },
    keepOnPrestige: true,
    position: [7, 0]
  }),
  Underground: new Resource({
    name: "Underground",
    cost: (have) => ({
      "DivineShard": 150*(have+1),
      "Stone": 15e6*(have+1),
      "Core": 3*(have+1),
      "Volcano": 100*(have+1),
      "Sapphire": 5_000*(have+1)
    }),
    craftTime: 3000,
    automates: [
      "Pickaxe",
      "GemstonePickaxe",
      "Volcano",
      "PickaxeUpgrade"
    ],
    unlockAt: {
      "Overworld": 1,
      "Core": 1
    },
    keepOnPrestige: true,
    position: [7, 1]
  }),
  Ocean: new Resource({
    name: "Ocean",
    cost: (have) => ({
      "DivineShard": 450*(have+1),
      "Water": 1e6*(have+1),
      "Sand": 1e9*(have+1),
      "Steam": 50_000*(have+1),
      "UpgradePotionII": 8*(have+1),
    }),
    craftTime: 9000,
    automates: [
      "Orchard",
      "Pump",
      "StramProducer",
      "Crucible",
      "LiquidUpgrade"
    ],
    unlockAt: {
      "Underground": 1
    },
    keepOnPrestige: true,
    position: [7, 2]
  }),
  City: new Resource({
    name: "City",
    cost: (have) => ({
      "DivineShard": 1800*(have+1),
      "Brick": 1e6*(have+1),
      "Citizen": 15_000*(have+1),
      "House": 5_000*(have+1),
      "Generator": 150*(have+1),
    }),
    craftTime: 12000,
    automates: [
      "CityBuilder",
      "Generator",
      "MetalworkFactory",
      "GemCutter",
      "MetalworkUpgrade"
    ],
    unlockAt: {
      "Ocean": 1
    },
    keepOnPrestige: true,
    position: [7, 3]
  }),
  PlanetEssence: new Resource({
    name: "PlanetEssence",
    // unlockAt: {
    //   "City": 1,
    // },
    automates: [
      "ReplicantiBoost",
      "ReplicantiBoostII"
    ],
    keepOnPrestige: true,
    position: [7, 4]
  }),

  DivinePowder: new Resource({
    name: "DivinePowder",
    cost: (have) => ({
      "Replicanti": 10**((have/8)**0.87+6) > 1e50 ? 1e50*have**(2+Math.log(have/100)*3) : 10**((have/8)**0.87+6),
      "Energy": 10**(2+Math.log(have/3+1)**(1.3+have/10000)),
      "Sapphire": 1+have**0.3,
      "UpgradePotion": Math.floor(have/100)**0.7,
      "UpgradePotionII": (have%1000 === 0 && have !== 0) * Math.floor(have/1000)**0.7
    }),
    craftTime: 3,
    unlockAt: {
      "Replicanti": 1,
      "Energy": 1,
    },
    canEmpower: false,
    position: [8, 0]
  }),
  DivineShard: new Resource({
    name: "DivineShard",
    unlockAt: {
      "DivinePowder": 1,
    },
    keepOnPrestige: true,
    position: [8, 1]
  }),
  Empowerer: new Resource({
    name: "Empowerer",
    cost: (have) => ({
      "DivineShard": 1+Math.floor(have**1.2)
    }),
    craftTime: 60,
    unlockAt: {
      "DivineShard": 1
    },
    keepOnPrestige: true,
    canEmpower: false,
    position: [8, 2]
  }),
  FastForward: new Resource({
    name: "FastForward",
    cost: (have) => ({
      "DivineShard": 10*(1+have**1.5/3)*(1 + Math.max(0, have-10)/2),
      "Cluster": 1+have
    }),
    craftTime: 600,
    unlockAt: {
      "Empowerer": 1
    },
    effectMultiply: (savefile) => {
      let FastForward = savefile[Resources.FastForward.order].have
      return 1+(FastForward)*(FastForward+1)/10;
    },
    canEmpower: false,
    keepOnPrestige: true,
    position: [8, 3]
  }),
  EmpowerCap: new Resource({
    name: "EmpowerCap",
    cost: (have) => ({
      "DivineShard": 3**(Math.sqrt(have)+4.5) - 41,
      "Cluster": 10*(have+1),
      "UpgradePotionII": (have+1)**(2+have/20),
    }),
    craftTime: 5000,
    unlockAt: {
      "FastForward": 1,
      "UpgradePotionII": 1
    },
    canEmpower: false,
    keepOnPrestige: true,
    position: [8, 4]
  }),
  DivineFactory: new Resource({
    name: "DivineFactory",
    cost: (have) => ({
      "DivineShard": 100*((have+1)**2),
      "Cluster": 37+3*have,
      "MetalworkFactory": 25*(have+1),
    }),
    automates: ["DivinePowder"],
    craftTime: 6000,
    unlockAt: {
      "FastForward": 3
    },
    keepOnPrestige: true,
    canEmpower: false,
    position: [8, 5]
  }),
  Cluster: new Resource({
    name: "Cluster",
    cost: (have) => ({
      "Replicanti": Math.floor(10**(have-2 + Math.max(0, have-30)**0.6)),
      [ResourceArr[(have+1)%63] ? ResourceArr[(have+1)%63].name : "DivineShard"]: 1+have,
    }),
    craftTime: 10,
    unlockAt: {
      "Empowerer": 1
    },
    keepOnPrestige: true,
    noConsume: true,
    canEmpower: false,
    position: [8, 6]
  }),
  ReplicantiBoost: new Resource({
    name: "ReplicantiBoost",
    cost: (have) => ({
      "Replicanti": 10**(have+2),
      "Energy": 10**(1.6+have**0.7+Math.max(0, have-80)/4)
    }),
    craftTime: 100,
    unlockAt: {
      "Replicanti": 1,
    },
    canEmpower: false,
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
      const replicantiBoostII = savefile[Resources.ReplicantiBoostII.order].have;
      const replicantiMult = (3**replicantiBoostII) * (1.5**(Math.min(17, replicantiBoost+1) + Math.max(0, replicantiBoost-17)**0.85));
      const replicantiPow = 0.6 + 0.30*(1-1/(replicantiBoost/25+1));
      return replicantiMult*(replicanti+1)**replicantiPow/(replicanti+1);
    },
    unlockAt: {
      "Replicanti": 1,
    },
    automates: ["Replicanti"],
    craftTime: 20,
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
  craftTime /= Resources.FastForward.effectMultiply(savefile.resources);
  craftTime /= 1 + savefile.resources[order].empower/2;

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

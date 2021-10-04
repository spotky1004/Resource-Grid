export default class Resource {
  /**
   * @typedef ResourceConstructor
   * @property {string} name - Name of the resource
   * @property {string} description - Description of the resource
   * @property {Object.<stringe, number>} unlockAt - Check resource is unlocked
   * @property {Object.<string, number> | function(number): RescourceEnum.<string, number> } [cost] - {[id]: quantity} | Cost of the resource
   * @property {number} [craftTime] - Crafting/Generating time (in second)
   * @property {number} [craftMultiply] - Craft multiply (default: 1)
   * @property {[number, number]} position - Position on Rescource Grid
   * @property {[number, string][]} [randomGrantOnCraft] - [chance, id] | Randomely grants resource on craft
   * @property {function(object): number} [effectMultiply] - Multiply random chance and Automate speed
   * @property {boolean} [noCostIfAutomate] - yes
   * @property {number} [defaultQuantity] - default
   * @property {boolean} [keepOnPrestige] - Keep this resource on prestige
   * @property {string[]} [automates] - Automatically craft/generate resource
   * @property {boolean} [noConsume] - If true, won't consume this resource on buy
   * @property {boolean} [canBulkBuy] - Override canBulkBuy
   * @property {boolean} [canEmpower] - Override canEmpower
   */
  /** @param {ResourceConstructor} data */
  constructor(data) {
    this.name = data.name;
    this.description = data.description;
    this.unlockAt = data.unlockAt;
    this._cost = data.cost;
    this.craftTime = data.craftTime;
    this.craftMultiply = data.craftMultiply || 1;
    this._position = data.position;
    this.randomGrantOnCraft = data.randomGrantOnCraft ?? [];
    this._effectMultiply = data.effectMultiply;
    this.noCostIfAutomate = data.noCostIfAutomate || false;
    this.defaultQuantity = data.defaultQuantity || 0;
    this.keepOnPrestige = data.keepOnPrestige || false;
    this.automates = data.automates;
    this.noConsume = data.noConsume || false;
    
    this.order = 9*this._position[0] + this._position[1];
    this.canBulkBuy = data.canBulkBuy ?? typeof this._cost !== 'function';
    this.canEmpower = data.canEmpower ?? (this.craftTime !== undefined || this.automates !== undefined);
  }

  get position() {
    return {
      x: this._position[1],
      y: this._position[0]
    }
  }

  effectMultiply(savefile) {
    let effMult = 1;
    if (typeof this._effectMultiply === 'function') {
      effMult *= this._effectMultiply(savefile);
    }

    effMult *= 1 + savefile[this.order].empower/2;

    return effMult;
  }

  cost(have, isAuto) {
    let cost;
    if (typeof this._cost === 'undefined' || (isAuto && this.noCostIfAutomate)) {
      return null;
    } else if (typeof this._cost === 'function') {
      cost = this._cost(have);
    } else {
      cost = this._cost;
    }

    for (const resource in cost) {
      cost[resource] = Math.ceil(cost[resource]);
      if (cost[resource] <= 0) delete cost[resource];
    }
    return cost;
  }
}


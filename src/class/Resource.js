export default class Resource {
  /**
   * @typedef ResourceConstructor
   * @property {string} name - Name of the resource
   * @property {string} description - Description of the resource
   * @property {Object.<string, number> | function(number): RescourceEnum.<string, number> } [cost] - {[id]: quantity} | Cost of the resource
   * @property {number} [craftTime] - Crafting/Generating time (in second)
   * @property {number} [craftMultiply] - Craft multiply (default: 1)
   * @property {[number, number]} position - Position on Rescource Grid
   * @property {[number, string][]} [randomGrantOnCraft] - [chance, id] | Randomely grants resource on craft
   * @property {function(object): number} [effectMultiply] - Multiply random chance and 
   * @property {string[]} [automates] - Automatically craft/generate resource
   */
  /** @param {ResourceConstructor} data */
  constructor(data) {
    this.name = data.name;
    this.description = data.description;
    this._cost = data.cost;
    this.craftTime = data.craftTime;
    this.craftMultiply = data.craftMultiply || 1;
    this._position = data.position;
    this.order = 9*this._position[0] + this._position[1];
    this.randomGrantOnCraft = data.randomGrantOnCraft ?? [];
    this._effectMultiply = data.effectMultiply;
    this.automates = data.automates;
  }

  get position() {
    return {
      x: this._position[1],
      y: this._position[0]
    }
  }

  effectMultiply(savefile) {
    if (typeof this._effectMultiply === 'function') {
      return this._effectMultiply(savefile);
    } else {
      return 1;
    }
  }

  cost(have) {
    let cost;
    if (typeof this._cost === 'undefined') {
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


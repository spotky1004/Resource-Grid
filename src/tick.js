import store from "./store.js";
// eslint-disable-next-line
import { DefaultSave } from "./saveload.js";
import { Resources, ResourceArr, getCooldown, canBuy, AutoConnected } from "./data/resources.js";
import { craftStart, craftUpdate } from "./modules/resources.js";

function Tick() {
  /**
   * @type {DefaultSave}
   */
  const savefile = store.getState();
  const Time = new Date().getTime();

  for (let i = 0; i < ResourceArr.length; i++) {
    const Resource = ResourceArr[i];
    if (Resource === null) continue;
    const order = i;
    const save = savefile.resources[order];

    // Check Unlocked
    

    // Start Automate
    if (Resource.automates && save.have >= 1) {
      for (let j = 0; j < Resource.automates.length; j++) {
        const _Resource = Resources[Resource.automates[j]];
        const _order = _Resource.order;
        if (
          savefile.resources[_order].lastTime !== null ||
          canBuy(_Resource.name, savefile) === 0
        ) continue;
        store.dispatch(craftStart(_order));
      }
    }

    // Check craft end
    const lastTime = savefile.resources[order].lastTime;
    if (lastTime !== null) {
      let craftTime = getCooldown(Resource.name, savefile);
      let progressIncrement = (Time - lastTime)/craftTime;
      store.dispatch(craftUpdate({
        order: i,
        canBulk: 1 <= savefile.resources[AutoConnected[order]]?.have,
        progressIncrement
      }));
    }
  }
}

export default Tick;

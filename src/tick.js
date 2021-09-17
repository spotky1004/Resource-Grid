import store from "./store.js";
// eslint-disable-next-line
import { DefaultSave } from "./saveload.js";
import { Resources, ResourceArr, getCooldown, canBuy, AutoConnected, isUnlocked } from "./data/resources.js";
import { craftStart, craftUpdate, resourceUnlock } from "./modules/resources.js";
import { save } from "./saveload.js";

let lastSave = new Date().getTime();

function Tick() {
  /**
   * @type {DefaultSave}
   */
  const savefile = store.getState();
  const Time = new Date().getTime();

  if (Time - lastSave > 5000) save(savefile);

  for (let i = 0; i < ResourceArr.length; i++) {
    const Resource = ResourceArr[i];
    if (Resource === null) continue;
    const order = i;
    const save = savefile.resources[order];
    const isAuto = 1 <= savefile.resources[AutoConnected[order]]?.have;

    // Check Unlocked
    if (!save.unlocked && isUnlocked(Resource.name, savefile.resources)) {
      store.dispatch(resourceUnlock(order));
    }

    // Start Automate
    if (Resource.automates && save.have >= 1) {
      for (let j = 0; j < Resource.automates.length; j++) {
        const _Resource = Resources[Resource.automates[j]];
        const _order = _Resource.order;
        if (
          savefile.resources[_order].lastTime !== null ||
          canBuy(_Resource.name, savefile) === 0
        ) continue;
        store.dispatch(craftStart(_order, true));
      }
    }

    // Check craft end
    const lastTime = save.lastTime;
    if (lastTime !== null) {
      let craftTime = getCooldown(Resource.name, savefile);
      let progressIncrement = (Time - lastTime)/craftTime;
      store.dispatch(craftUpdate({
        order: i,
        isAuto,
        progressIncrement
      }));
    }
  }
}

export default Tick;

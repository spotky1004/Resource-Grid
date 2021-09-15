import stroe from "./store.js";
// eslint-disable-next-line
import { DefaultSave } from "./saveload.js";
import { Resources, ResourceArr, AutoConnected, canBuy } from "./data/resources.js";
import { craftStart, craftEnd } from "./modules/resources.js";

function Tick() {
  /**
   * @type {DefaultSave}
   */
  const savefile = stroe.getState();
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
          savefile.resources[_order].startTime !== null ||
          canBuy(_Resource.name, savefile) === 0
        ) continue;
        // console.log(savefile.resources[_order].startTime);
        stroe.dispatch(craftStart(j));
      }
    }

    // Check craft end
    if (savefile.resources[order].startTime !== null) {
      let craftTime = Resource.craftTime*1000;
      if (AutoConnected[order] !== -1) {
        craftTime /= savefile.resources[AutoConnected[order]].have;
      }
      if (Time >= savefile.resources[order].startTime + craftTime) {
        stroe.dispatch(craftEnd(i));
      }
    }
  }
}

export default Tick;

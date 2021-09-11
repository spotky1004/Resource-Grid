// eslint-disable-next-line
import { DefaultSave } from "./saveload.js";
import { ResourceArr, buy, canBuy, AutoConnected } from "./data/resources.js";

/**
 * @param {DefaultSave} savefile 
 */
export default function Tick(savefile) {
  const Time = new Date().getTime();

  for (let i = 0; i < ResourceArr.length; i++) {
    const Resource = ResourceArr[i];
    if (Resource === null) continue;
    const order = Resource.order;

    // Check Unlocked
    

    // Start Automate
    if (Resource.automates) {
      for (let j = 0; j < Resource.automates.length; j++) {
        const ResourceName = Resource.automates[j];
        if (canBuy(ResourceName, savefile)) {
          buy(ResourceName, savefile);
        }
      }
    }

    // Check craft end
    if (savefile.resources[order].startTime !== null) {
      let craftTime = Resource.craftTime*1000;
      if (AutoConnected[order]) {
        craftTime /= savefile.resources[AutoConnected[order]].have;
      }
      if (Time >= savefile.resources[order].startTime + craftTime) {
        savefile.resources[order].startTime = null;
        savefile.resources[order].have++;
      }
    }
  }
}
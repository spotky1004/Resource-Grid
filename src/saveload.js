export const saveKey = "resource_grid";
export const recoverSaveKeys = {
  past1H: saveKey + "_1h",
  past6H: saveKey + "_6h",
  past1D: saveKey + "_1d",
  lastPrestige: saveKey + "_lastPrestige",
  lastRecover: saveKey + "_lastRecover",
}

export const DefaultSave = {
  resources: Array.from({ length: 81 }, _ => ({
    have: 0,
    lastTime: null,
    progress: 0,
    unlocked: false,
    empower: 0,
    automationDisabled: false,
  })),
  aside: {
    unlockStatus: {
      Prestige: false,
      NewGame: false,
      Booster: false,
    }
  },
  stats: {
    startTime: new Date().getTime(),
  },
  prestige: {
    doingPrestige: false,
    doingRespec: false,
    empowererRespecTime: 0,
    totalPrestigeResourceQuantity: 0,
    lastPrestigeResourceQuantity: 0,
    tmpPrestigeResourceQuantity: 0
  }
};
DefaultSave.resources[0].have = 1;

export function save(savefile, key=saveKey) {
  localStorage.setItem(key, JSON.stringify(savefile));
}

/** @returns {DefaultSave} */
export function load(key=saveKey) {
  return mergeObject(JSON.parse(localStorage.getItem(key)) ?? {}, DefaultSave);
}
export const savefile = load();

export function exportSave() {
  return window.btoa(JSON.stringify(savefile));
}
export function importSave(encryptedSavefile) {
  try {
    const toSave = JSON.parse(window.atob(encryptedSavefile));
    save(toSave, saveKey);
    window.location.reload();
  } catch (e) {}
}

function mergeObject(target, source) {
  target = target ?? {};
  for (const i in source) {
    if (Array.isArray(source[i])) {
      target[i] = target[i] ?? [];
      mergeArray(target[i], source[i]);
    } else if (source[i] === null) {
      target[i] = target[i] ?? source[i];
    } else if (typeof source[i] === "object") {
      target[i] = mergeObject(target[i], source[i]);
    } else {
      target[i] = source[i].constructor(target[i] ?? source[i]);
    }
  }
  return target;
}
function mergeArray(target, source) {
  for (let i = 0, l = source.length; i < l; i++) {
    if (Array.isArray(source[i])) {
      mergeArray(target[i], source[i]);
    } else if (source[i] === null) {
      target[i] = target[i] ?? source[i];
    } else if (typeof source[i] === "object") {
      target[i] = mergeObject(target[i], source[i]);
    } else {
      target[i] = source[i].constructor(target[i] ?? source[i]);
    }
  }
  return target;
}

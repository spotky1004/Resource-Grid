const saveKey = "resource_grid";

export const DefaultSave = {
  resources: new Array(81).fill(0),
  startTimes: new Array(81).fill(null),
  unlocked: new Array(81).fill(false),
};
DefaultSave.resources[0] = 1;

export function save() {
  localStorage.setItem(saveKey, savefile);
}

/** @returns {DefaultSave} */
export function load() {
  return localStorage.getItem(saveKey) ?? mergeObject({}, DefaultSave);
}
export const savefile = load();

function mergeObject(target, source) {
  target = target ?? {};
  for (const i in source) {
    if (Array.isArray(source[i])) {
      target[i] = target[i] ?? [];
      mergeArray(target[i], source[i]);
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
    } else if (typeof source[i] === "object") {
      target[i] = mergeObject(target[i], source[i]);
    } else {
      target[i] = source[i].constructor(target[i] ?? source[i]);
    }
  }
  return target;
}

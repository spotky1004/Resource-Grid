const saveKey = "resource_grid";

export const DefaultSave = {
  resources: Array.from({ length: 81 }, _ => ({
    have: 0,
    lastTime: null,
    progress: 0,
    unlocked: false
  }))
};
DefaultSave.resources[0].have = 1;

export function save(savefile) {
  localStorage.setItem(saveKey, JSON.stringify(savefile));
}

/** @returns {DefaultSave} */
export function load() {
  return JSON.parse(localStorage.getItem(saveKey)) ?? mergeObject({}, DefaultSave);
}
export const savefile = load();

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

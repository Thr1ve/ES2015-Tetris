import arrayEquals from './arrayEquals.js';

export default function objectEquals(left, right) {
  let i, keys;
  if (typeof left !== 'object' || typeof right !== 'object') {
    return false;
  }
  i = 0;
  keys = Object.keys(left);
  for (i; i < keys.length; i++) {
    if (Array.isArray(left[keys[i]])) {
      if (!arrayEquals(left[keys[i]], right[keys[i]])) {
        return false;
      }
    } else if (left[keys[i]] && typeof left[keys[i]] === 'object') {
      if (!objectEquals(left[keys[i]], right[keys[i]])) {
        return false;
      }
    } else if (left[keys[i]] !== right[keys[i]]) {
      return false;
    }
  }
  return true;
}

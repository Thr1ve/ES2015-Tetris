export default function compare(obj1, obj2) {
  let keys = Object.keys(obj1);
  for (let i = 0; i < keys.length; i++) {
    if (obj1[keys[i]] !== obj2[keys[i]]) {
      return false;
    }
  }
  return true;
}

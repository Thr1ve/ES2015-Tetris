export default function random(obj) {
  let keys = Object.keys(obj);
  let num = Math.round(Math.random() * (keys.length - 1));
  return obj[keys[num]];
}

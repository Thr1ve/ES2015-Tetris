export default function flatten(arr) {
  return arr.reduce(function(prev, cur) {
    return prev.concat(cur);
  });
}

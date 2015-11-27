export default function(arr) {
  return arr.reduce(function(prev, cur) {
    return prev.concat(cur);
  });
}

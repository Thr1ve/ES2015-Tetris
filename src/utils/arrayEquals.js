export default function arrayEquals(left, right) {
  let i = 0;
  if (left.length !== right.length) {
    return false;
  }
  for (i; i < left.length; i++) {
    if (Array.isArray(left[i]) && Array.isArray(right[i])) {
      if (!arrayEquals(left[i], right[i])) {
        return false;
      }
    } else if (left[i] !== right[i]) {
      return false;
    }
  }
  return true;
}

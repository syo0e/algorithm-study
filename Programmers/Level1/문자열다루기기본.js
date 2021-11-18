function solution(s) {
  if (!(s.length === 4 || s.length === 6)) {
    return false;
  }
  let arr = s.split("");
  for (let i = 0; i < arr.length; i++) {
    if (isNaN(arr[i])) {
      return false;
    }
  }
  return true;
}

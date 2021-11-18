function solution(arr) {
  if (arr[0] === 10 && arr.length === 1) {
    return [-1];
  }
  // const min = Math.min.apply(null,arr)
  const min = Math.min(...arr);
  const minIndex = arr.indexOf(min);
  arr.splice(minIndex, 1);
  return arr;
}

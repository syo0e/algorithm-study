function solution(a, b) {
  let result = 0;
  let max = Math.max(a, b);
  let min = Math.min(a, b);

  for (min; min <= max; min++) {
    result = result + min;
  }
  return result;
}

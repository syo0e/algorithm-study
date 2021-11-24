function solution(s) {
  let arr = [];
  let sorted = s.split(" ").sort((a, b) => a - b);
  let min = sorted[0];
  let max = sorted[sorted.length - 1];

  arr.push(min);
  arr.push(max);

  return arr.join(" ");
}

function solution(x, n) {
  let answer = x;
  let arr = [];

  for (let i = 1; i <= n; i++) {
    arr.push(answer);
    answer = answer + x;
  }
  return arr;
}

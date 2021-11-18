function solution(n) {
  let arr = n.toString().split("");
  let answer = arr.map(Number);
  return answer.reverse();
}

function solution(n) {
  let answer = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 1) {
      answer.push(i);
    }
  }
  return answer[0];
}

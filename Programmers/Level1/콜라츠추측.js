function solution(num) {
  var answer = 0;
  for (answer; num === 1; answer++) {
    if (answer > 500) {
      return -1;
    } else {
      if (num % 2 === 0) {
        num = num / 2;
      }
      num = num * 3 + 1;
      answer++;
    }
  }
  return answer;
}

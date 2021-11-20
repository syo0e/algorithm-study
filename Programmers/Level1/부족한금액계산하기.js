function solution(price, money, count) {
  let answer = 0;
  let spend = 0;

  for (let i = 1; i <= count; i++) {
    spend = spend + price * i;
  }
  answer = money - spend;

  return answer < 0 ? -answer : 0;
}

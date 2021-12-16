function solution(x) {
  let quotient = String(x)
    .split("")
    .map((el) => Number(el))
    .reduce((a, c) => a + c);

  if (x % quotient === 0) {
    return true;
  } else {
    return false;
  }
}

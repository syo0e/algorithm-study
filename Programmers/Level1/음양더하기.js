function solution(absolutes, signs) {
  for (let i = 0; i < signs.length; i++) {
    if (signs[i] === false) {
      absolutes[i] = -absolutes[i];
    }
  }
  return absolutes.reduce((a, c) => a + c);
}

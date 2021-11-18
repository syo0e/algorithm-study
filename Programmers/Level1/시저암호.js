function solution(s, n) {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < s.length; i++) {
    const str = s[i];
    if (str === " ") {
      result += " ";
      continue;
    }
    const upperOrLower = upper.includes(str) ? upper : lower;
    let index = upperOrLower.indexOf(str) + n;
    if (index >= upperOrLower.length) {
      index -= upperOrLower.length;
    }
    result += upperOrLower[index];
  }
  return result;
}

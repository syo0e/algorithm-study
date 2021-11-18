function solution(s) {
  let index = s.length / 2;
  let floor = Math.floor(index);

  return s.length % 2 === 0 ? s[index - 1] + s[index] : s[floor];
}

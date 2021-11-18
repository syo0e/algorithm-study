function solution(s) {
  let str = s.toLowerCase();
  let count = 0;
  let count2 = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "p") {
      count++;
    } else if (str[i] === "y") {
      count2++;
    } else if (str.indexOf("p") === -1 && str.indexOf("y") === -1) {
      return true;
    }
  }
  if (count === count2) {
    return true;
  }
  return false;
}

function solution(n) {
  let str = n.toString();
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(str[i]);
  }
  arr.sort().reverse();
  let answerStr = arr.join("");
  let answer = parseInt(answerStr);

  return answer;
}

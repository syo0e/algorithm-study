function solution(numbers) {
  // 문자열로 변경
  let arr = [];
  let split = numbers.map((el) => String(el).split("").join(""));

  //각 요소끼리 순서를 바꿔서 합쳤을 때 작은 값이 뒤로 정렬

  split.sort((a, b) => b + a - (a + b));

  var answer = split.join("");
  return answer[0] === "0" ? "0" : answer;
}

function solution(n) {
  let result = "";
  for (let i = 1; i <= n; i++) {
    // 인덱스가 짝수 일때 '박'
    if (i % 2 === 0) {
      result = result + "박";
    }
    //인덱스가 홀수 일때 '수'
    if (i % 2 !== 0) {
      result = result + "수";
    }
  }
  return result;
}

const largestProductOfThree = function (arr) {
  // TODO: 여기에 코드를 작성합니다.
  let result1 = 1; // 곱할 변수 선언
  let result2 = 1;
  arr.sort((a, b) => a - b); // 배열의 숫자 오름차순으로 정렬
  const pickNumbers1 = arr.slice(arr.length - 3, arr.length + 1); // 곱할 숫자만 가지고 있는 배열 반환
  const pickNumbers2 = [arr[0], arr[1], arr[arr.length - 1]];
  for (let i of pickNumbers1) {
    result1 = result1 * i;
  }
  for (let i of pickNumbers2) {
    result2 = result2 * i;
  }
  return Math.max(result1, result2);
};

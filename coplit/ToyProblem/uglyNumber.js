// 문제
// 아래와 같이 정의된 ugly numbers 중 n번째 수를 리턴해야 합니다.

// ugly number는 2, 3, 5로만 나누어 떨어지는 수이다.
// 1은 1번째 ugly number 이다.
// 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, ...
// 입력
// 인자 1 : n
// number 타입의 자연수 (n >= 1)
// 출력
// number 타입을 리턴해야 합니다.
// 주의사항
// ugly numbers를 배열에 저장했을 때, n번째 ugly number의 위치는 인덱스 n-1 입니다.
// 입출력 예시
// let result = uglyNumbers(1);
// console.log(result); // --> 1

// result = uglyNumbers(3);
// console.log(result); // --> 3
// Advanced
// 단순히 처음부터 끝까지 모든 수에 대해서 나눗셈 연산을 하는 대신 다른 방법(O(N))을 탐구해 보세요.

// 힌트
// 나눗셈 연산을 매번 다시 할 필요가 없습니다. ugly number에 2, 3 또는 5를 곱한 수 역시 ugly number 입니다.

// naive solution
// const uglyNumbers = function (n) {
//   const isUgly = (num) => {
//     num = decompose(num, 2);
//     num = decompose(num, 3);
//     num = decompose(num, 5);
//     return num === 1;
//   };

//   const decompose = (num, factor) => {
//     while (num % factor === 0) num = num / factor;
//     return num;
//   };

//   let num = 0;
//   let cnt = 0;
//   while (n > cnt) {
//     num++;
//     if (isUgly(num)) cnt++;
//   }
//   return num;
// };

// O(N)
const uglyNumbers = function (n) {
  // 매번 나눗셈 연산을 하는 것이 비효율적이므로
  // 이미 구한 수에서부터 구한다.

  const uglyNumbers = [1];
  let idx2 = 0,
    idx3 = 0,
    idx5 = 0;

  for (let i = 0; i < n; i++) {
    // 1. 가장 작은 수인 1에 2, 3, 5를 곱한 수 중에 가장 작은 수를 구한다.
    // 2. 2가 선택됨.
    // 3. 2는 가장 작은 수 1에 곱해졌으므로
    //   3.1 이제 2는 그 다음 작은 수인 2에 곱해지고
    //   3.2 3, 5는 여전히 가장 작은 수에 곱해진다.
    // 4. 3에서 가장 작은 수는 3. 3은 이제 다음으로 작은 수인 2에 곱혀진다.
    // 5. 반복
    const nextMultipleOf2 = uglyNumbers[idx2] * 2;
    const nextMultipleOf3 = uglyNumbers[idx3] * 3;
    const nextMultipleOf5 = uglyNumbers[idx5] * 5;
    const nextUglyNum = Math.min(
      nextMultipleOf2,
      nextMultipleOf3,
      nextMultipleOf5
    );
    uglyNumbers.push(nextUglyNum);

    // 같은 수를 중복해서 저장할 수 있으므로,
    // 각각 별도의 조건문으로 작성해야 한다.
    //  2 * 3 = 6
    //  3 * 2 = 6
    if (nextUglyNum === nextMultipleOf2) idx2++;
    if (nextUglyNum === nextMultipleOf3) idx3++;
    if (nextUglyNum === nextMultipleOf5) idx5++;
  }
  return uglyNumbers[n - 1];
};

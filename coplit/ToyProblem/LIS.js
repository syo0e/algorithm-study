// 문제
// 정수를 요소로 갖는 문자열을 입력받아 다음의 조건을 만족하는 LIS*의 길이를 리턴해야 합니다.

// LIS: 배열의 연속되지 않는 부분 배열 중 모든 요소가 엄격하게 오름차순으로 정렬된 가장 긴 부분 배열(Longest Increasing Subsequence)
// 배열 [1, 2, 3]의 subseqeunce는 [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3] 입니다.
// 엄격한 오름차순: 배열이 동일한 값을 가진 요소없이 오름차순으로 정렬되어 있는 경우를 말합니다.
// 입력
// 인자 1 : arr
// number 타입을 요소로 갖는 배열
// arr.length는 60,000 이하
// arr[i]는 100,000 이하의 양의 정수
// 출력
// number 타입을 리턴해야 합니다.
// 주의사항
// LIS의 길이를 리턴해야 합니다.
// LIS가 존재하지 않는 경우는 없습니다.
// 입출력 예시
// let output = LIS([3, 2]);
// console.log(output); // --> 1 (3 or 2)

// output = LIS([3, 10, 2, 1, 20]);
// console.log(output); // --> 3 (3, 10, 20)
// Advanced
// LIS를 계산하는 효율적인 알고리즘(O(N^2))이 존재합니다. 쉽지 않기 때문에 바로 레퍼런스 코드를 보고 이해하는 데 집중하시기 바랍니다.
// subsequence는 문자열 또는 배열같이 순서가 있는 데이터에서 순서의 대소 관계가 유지되는 모든 부분 문자열 또는 부분 배열을 의미합니다. sequence가 순서 또는 서열을 의미하기 때문에 subsequence는 부분 서열이라고 부르기도 합니다. 반면 substring 또는 subarray는 연속된 형태의 부분 문자열 또는 부분 배열을 의미합니다. 문자열 'abcd'의 subsequence와 substring은 각각 아래와 같습니다.
// substring: 'a', 'b', 'c', 'd', 'ab', 'bc', 'cd', 'abc', 'bcd', 'abcd'
// subsequence: 'a', 'b', 'c', 'd', 'ab', 'ac', 'ad', 'bc', 'bd', 'cd', 'abc', 'abd', 'acd', 'bcd', 'abcd'
// LIS의 길이 대신 LIS 자체를 리턴하는 함수를 구현해 보시기 바랍니다.

// naive solution: O(2^N)
// 배열의 각 요소에 대해서 선택, 무시의 2가지 선택이 가능
// const LIS = function (arr) {
//   // 현재 검토할 차례인 배열의 '인덱스'와
//   // 이전에 선택된 요소의 '값'을 인자로 전달한다.
//   const pickOrNot = (idx, before) => {
//     // base case
//     // 가장 짧은 LIS의 길이는 1이다. 모든 요소는 그 자체로 길이 1인 부분 서열이다.
//     if (idx === arr.length) return 1;

//     // recursive case
//     // (초기값인 Number.MAX_SAFE_INTEGER를 포함해) 이전에 선택된 요소와 비교를 한다.
//     const adder = arr[idx] > before ? 1 : 0;
//     return Math.max(
//       // 1) 현재 요소를 선택한다.
//       //  1-1) adder === 1: 현재 요소를 이전에 선택된 요소 뒤에 이어지는 요소로 생각해 LIS의 길이에 1을 더한다.
//       //  1-2) adder === 0: 현재 요소를 이어지는 요소로 생각할 수 없는 경우. 이전 요소를 건너뛰고 LIS의 처음 또는 중간 요소로 현재 요소를 선택한다.
//       adder + pickOrNot(idx + 1, arr[idx]), // concat or restart
//       // 2) 현재 요소를 무시한다.
//       pickOrNot(idx + 1, before) // ignore
//     );
//   };
//   // 첫 번째 요소의 이전 요소는 없기 때문에 매우 큰 값을 이전 값으로 설정한다.
//   // 첫 번째 요소부터 시작하는 LIS를 검사하는 효과를 갖는다.
//   return pickOrNot(0, Number.MAX_SAFE_INTEGER);
// };

// dynamic programming with memoization: O(N^2)
// const LIS = function (arr) {
//   // memo[i]는 i부터 시작하는 LIS의 길이를 저장
//   const memo = Array(arr.length).fill(-1);
//   // 마지막 요소부터 시작하는 LIS는 1이 유일하다.
//   memo[memo.length - 1] = 1;
//   const calculateLIS = (idx) => {
//     if (memo[idx] !== -1) return memo[idx];

//     let max = 1;
//     for (let i = idx + 1; i < arr.length; i++) {
//       const len = calculateLIS(i);
//       // idx와 i가 연결되지 않을 수도 있다.
//       if (arr[idx] < arr[i]) {
//         // i부터 시작하는 LIS를 연결할 수 있는 경우
//         max = Math.max(max, len + 1);
//       }
//       // i부터 시작하는 LIS가 더 길 수도 있다.
//       // idx부터 시작하는 LIS를 구해야 하므로, 무시한다.
//     }
//     memo[idx] = max;
//     return memo[idx];
//   };
//   calculateLIS(0);
//   // 가장 긴 길이를 구한다.
//   return Math.max(...memo);
// };

// dynamic programming with tabulation: O(N^2)
const LIS = function (arr) {
  const N = arr.length;
  // lis[i]는 i에서 끝나는 LIS의 길이를 저장
  // 최소한 각 요소 하나로 LIS를 만들 수 있으므로 1로 초기화한다.
  const lis = Array(N).fill(1);
  for (let i = 1; i < N; i++) {
    // i에서 끝나는 LIS의 길이
    for (let j = 0; j < i; j++) {
      // i 이전의 인덱스만 검사하면 된다.
      // i는 1부터 시작하므로, 짧은 길이부터 검사한다. (bottom-up 방식)
      if (arr[i] > arr[j] && lis[i] < lis[j] + 1) {
        lis[i] = lis[j] + 1;
      }
    }
  }
  return Math.max(...lis);
};

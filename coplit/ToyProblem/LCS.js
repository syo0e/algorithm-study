// 문제
// 두 문자열을 입력받아 다음의 조건을 만족하는 LCS*의 길이를 리턴해야 합니다.

// LCS: 두 문자열에 공통으로 존재하는 연속되지 않는 부분 문자열(Longest Common Subsequence)
// 문자열 'abc'의 subseqeunce는 'a', 'b', 'c', 'ab', 'ac', 'bc', 'abc' 입니다.
// 입력
// 인자 1 : str1
// string 타입의 알파벳 소문자와 숫자로 이루어진 문자열
// str1.length는 50 이하
// 인자 2 : str2
// string 타입의 알파벳 소문자와 숫자로 이루어진 문자열
// str2.length는 50 이하
// 출력
// number 타입을 리턴해야 합니다.
// 주의사항
// LCS의 길이를 리턴해야 합니다.
// LCS가 존재하지 않는 경우, 0을 리턴해야 합니다.
// 입출력 예시
// let output = LCS('abcd', 'aceb');
// console.log(output); // --> 2 ('ab' or 'ac')

// output = LCS('acaykp', 'capcak');
// console.log(output); // --> 4 ('acak')
// Advanced
// LCS를 계산하는 효율적인 알고리즘(O(M * N))이 존재합니다(두 문자열의 길이가 각각 M, N일 경우). 쉽지 않기 때문에 바로 레퍼런스 코드를 보고 이해하는 데 집중하시기 바랍니다.
// LCS의 길이 대신 LCS 자체를 리턴하는 함수를 구현해 보시기 바랍니다.
// LIS와 LCS를 변형하여 두 문자열 또는 배열을 입력받아 LCIS(Longest Common Increasing Subsequence)의 길이 또는 그 자체를 리턴하는 함수를 구현해 보시기 바랍니다.

// naive solution: O(2^N)
// 두 문자열의 길이(m, n)가 같다고 가정할 경우에 한함
// 최악의 경우는 일치하는 문자가 전혀 없을 경우이고 이때는 한쪽 문자열의 끝까지 비교해야 하므로 2^n 만큼의 시간이 걸린다.
// const LCS = function (str1, str2) {
//   // str1.slice 또는 str1.substring은 O(N)만큼의 오버헤드가 추가된다.
//   // 비교는 인덱스만 알아도 충분하다.
//   // left: str1의 인덱스, right: str2의 인덱스, len: 현재까지 만든 LCS의 길이
//   const compareOneByOne = (left, right) => {
//     // base case
//     // 더 이상 비교가 불가능한 경우
//     if (left === str1.length || right === str2.length) return 0;

//     // 일치하는 문자가 있는 경우
//     // 인덱스를 공통으로 이동하고, 길이를 1개 추가한다.
//     if (str1[left] === str2[right]) {
//       return 1 + compareOneByOne(left + 1, right + 1);
//     }

//     // 일치하는 문자가 없는 경우
//     // 길이는 그대로고, str1과 str2 중에서 어느 쪽의 문자를 포기할지 정해야한다.
//     // 양쪽다 가능성이 있으므로 양쪽을 모두 탐색하고 그 중 큰 값을 선택한다.
//     return Math.max(
//       compareOneByOne(left + 1, right), //
//       compareOneByOne(left, right + 1)
//     );
//   };

//   return compareOneByOne(0, 0);
// };

// dynamic programming: O(M * N)
// memoization을 활용해 중복 계산되는 문제를 제거한다.
// LCS('ABCD', 'ACEB')의 경우 재귀 호출을 적어보면 아래와 같다.
// => 1) LCS('BCD', 'CEB')
//  => 1-1) LCS('CD', 'CEB'), 1-2) LCS('BCD', 'EB')
//    => 1-1-1) LCS('D', 'CEB'), 1-1-2) LCS('CD', 'EB')
//    => 1-2-1) LCS('CD', 'EB'), 1-2-2) LCS('BCD', 'B')
// 더 볼 필요 없이 1-1-2)와 1-2-1)은 같은 문제임을 알 수 있다.
const LCS = function (str1, str2) {
  const M = str1.length;
  const N = str2.length;
  const memo = [];
  // 중복 계산을 방지하기 위해 left, right
  for (let i = 0; i < M + 1; i++) memo.push(Array(N + 1).fill(-1));

  const compareOneByOne = (left, right, len) => {
    if (memo[left][right] !== -1) return memo[left][right];

    if (left === str1.length || right === str2.length) return 0;

    if (str1[left] === str2[right]) {
      memo[left][right] = 1 + compareOneByOne(left + 1, right + 1, len + 1);
      return memo[left][right];
    }

    memo[left][right] = Math.max(
      compareOneByOne(left + 1, right, len), //
      compareOneByOne(left, right + 1, len)
    );
    return memo[left][right];
  };

  return compareOneByOne(0, 0, 0);
};

// dynamic programming: O(M * N)
// tabulation(테이블에 정리)을 활용해 bottom-up 방식으로 해결
// const LCS = function (str1, str2) {
//   const M = str1.length;
//   const N = str2.length;
//   // table[i][j]는 str1.slice(0, i)와 str2.slice(0, j)의 LCS를 저장
//   // str1.slice(0, i)는 0부터 i 바로 직전까지를 의미함 (i까지가 아님에 주의)
//   const table = [];
//   for (let i = 0; i < M + 1; i++) table.push(Array(N + 1).fill(-1));

//   for (let i = 0; i <= M; i++) {
//     for (let j = 0; j <= N; j++) {
//       if (i === 0 || j === 0) {
//         // i 또는 j가 0인 경우, 한쪽 문자열이 길이가 0이라는 의미이다.
//         // LCS가 존재할 수 없으므로, 0을 저장한다.
//         table[i][j] = 0;
//       } else if (str1[i - 1] === str2[j - 1]) {
//         // 두 문자가 같은 경우
//         // 양쪽 문자열의 인덱스가 한 개씩 이전인 상태에서 만들 수 있는 LCS의 길이보다 1만큼 더 길다.
//         table[i][j] = 1 + table[i - 1][j - 1];
//       } else {
//         // 두 문자가 같지 않은 경우
//         // 둘 중 한쪽을 포기하는 경우에 만들 수 있는 LCS의 길이를 따른다.
//         table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
//       }
//     }
//   }
//   return table[M][N];
// };

// 문제
// 두 개의 문자열 strA, strB를 입력받아 아래에 정의된 작업들을 통해 두 문자열을 동일하게 만들 수 있는지 확인해야 합니다.

// 작업1: strA의 소문자 한개를 대문자로 변경
// 작업2: strA의 소문자 한개를 제거
// 입력
// 인자 1: strA
// string 타입의 알파벳 문자열
// strA.length는 100 이하
// 인자 2: strB
// string 타입의 알파벳 대문자 문자열
// strB.length는 100 이하
// 출력
// boolean 타입을 리턴해야 합니다.
// 주의사항
// 작업의 수와 순서는 상관없습니다.
// greedy 알고리즘(매칭이 된다고 바로 매칭으로 간주)이 해결하지 못하는 입력이 있을 수 있습니다.
// 입출력 예시
// let output = findAbbreviation('AbcDE', 'ABDE');
// console.log(output); // --> true ('b'를 대문자로 변경, 'c'를 제거)

// output = findAbbreviation('AbcDE', 'AFDE');
// console.log(output); // --> false
// Advanced
// strA의 각 소문자에 대해서 대문자로 변경하거나 제거하는 선택이 있기 때문에 최악의 경우(strA가 모두 유망한 소문자로 이루어진 경우), O(2^N)의 시간 복잡도를 가지게 됩니다. 중복을 제거하여 훨신 효율적인 알고리즘의 작성이 가능합니다. 이를 위해서는 어디에서 중복이 발생하는지 파악하는 게 우선입니다. 반드시 직접 경우의 수를 나열하고 관찰하여 중복을 찾아내시기 바랍니다.

// naive solution
// function findAbbreviation(strA, strB) {
//   const isLower = (chr) => chr.toUpperCase() !== chr;

//   const aux = (leftIdx, rightIdx) => {
//     // base case 1
//     // strA로 strB를 만들 수 있고
//     // strA의 문자가 남아있지 않거나, 남은 문자가 전부 소문자인 경우 (전부 제거 가능)
//     if (rightIdx === strB.length)
//       return strA.substring(leftIdx).split('').every(isLower);

//     // base case 2
//     // strA의 모든 문자를 검토했으나
//     // strB의 문자가 남아있는 경우
//     if (leftIdx === strA.length) return false;

//     // recursive case
//     if (isLower(strA[leftIdx])) {
//       // 1) 현재 검토 중인 strA의 문자가 소문자인 경우
//       // 대문자로 변경하거나 제거가 가능한다.
//       // 매칭이 되지 않은 경우 제거한다.
//       if (strA[leftIdx].toUpperCase() !== strB[rightIdx])
//         return aux(leftIdx + 1, rightIdx);
//       // 매칭이 된 경우, 문자로 변경하거나 제거한다.
//       // 매칭이 되었는데도 제거를 하는 경우의 예시 (입력으로 'eE', 'E'를 받은 경우)
//       return aux(leftIdx + 1, rightIdx + 1) || aux(leftIdx + 1, rightIdx);
//     } else {
//       // 2) 현재 검토 중인 strA의 문자가 대문자인 경우
//       // 대문자는 제거가 불가능하고 그대로 사용할 수 밖에 없다.
//       // 따라서 매칭 여부가 중요하다.
//       // 매칭되지 않은 경우 탐색을 중단한다.
//       if (strA[leftIdx] !== strB[rightIdx]) return false;
//       // 매칭이 된 경우 다음 문자를 검토한다.
//       return aux(leftIdx + 1, rightIdx + 1);
//     }
//   };

//   return aux(0, 0);
// }

// memoization
function findAbbreviation(strA, strB) {
  const N = 100;
  // 중복 계산을 제거하기 위한 memo 배열
  // 계산되지 않은 상태를 -1로 초기화한다.
  const memo = [];
  for (let i = 0; i < N; i++) memo.push(Array(N).fill(-1));

  const isLower = (chr) => chr.toUpperCase() !== chr;

  const aux = (leftIdx, rightIdx) => {
    // 이미 계산한 적이 있는 경우, 저장된 값을 사용한다.
    if (memo[leftIdx][rightIdx] !== -1) return memo[leftIdx][rightIdx];

    // base case
    if (rightIdx === strB.length)
      return strA.substring(leftIdx).split("").every(isLower);
    else if (leftIdx === strA.length) return false;

    // recursive case
    if (isLower(strA[leftIdx])) {
      if (strA[leftIdx].toUpperCase() !== strB[rightIdx]) {
        // 중복 계산을 피하기 위해 계산의 결과를 저장한다.
        memo[leftIdx + 1][rightIdx] = aux(leftIdx + 1, rightIdx);
        return memo[leftIdx + 1][rightIdx];
      }
      memo[leftIdx + 1][rightIdx + 1] = aux(leftIdx + 1, rightIdx + 1);
      memo[leftIdx + 1][rightIdx] = aux(leftIdx + 1, rightIdx);
      return memo[leftIdx + 1][rightIdx + 1] || memo[leftIdx + 1][rightIdx];
    } else {
      if (strA[leftIdx] !== strB[rightIdx]) return false;
      memo[leftIdx + 1][rightIdx + 1] = aux(leftIdx + 1, rightIdx + 1);
      return memo[leftIdx + 1][rightIdx + 1];
    }
  };

  return aux(0, 0);
}

// memoization with higher order function
// function findAbbreviation(strA, strB) {
//   const isLower = (chr) => chr.toUpperCase() !== chr;

//   let aux = (leftIdx, rightIdx) => {
//     // base case
//     if (rightIdx === strB.length)
//       return strA.substring(leftIdx).split('').every(isLower);
//     else if (leftIdx === strA.length) return false;

//     // recursive case
//     if (isLower(strA[leftIdx])) {
//       if (strA[leftIdx].toUpperCase() !== strB[rightIdx])
//         return aux(leftIdx + 1, rightIdx);
//       return aux(leftIdx + 1, rightIdx + 1) || aux(leftIdx + 1, rightIdx);
//     } else {
//       if (strA[leftIdx] !== strB[rightIdx]) return false;
//       return aux(leftIdx + 1, rightIdx + 1);
//     }
//   };

//   const memoize = (func) => {
//     const memo = {};
//     // 매개변수를 통해 계산(함수 호출)을 구분한다.
//     return (...args) => {
//       const problem = args.join('-');
//       if (problem in memo) return memo[problem];
//       // 할당과 리턴을 동시에 할 수 있음
//       else return (memo[problem] = func(...args));
//     };
//   };

//   // 첫 호출의 함수와 재귀 호출이 함수가 달라질 수 있으므로 재할당이 필요하다.
//   aux = memoize(aux);
//   return aux(0, 0);
// }

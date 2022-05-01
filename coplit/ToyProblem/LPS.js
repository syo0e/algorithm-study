// naive solution
const LPS3 = function (str) {
  if (str.length < 2) return 0;

  // 문자열을 두 부분으로 나누고
  // 부분 문자열을 쉽게 구하기 위해
  // 왼쪽 부분의 마지막 인덱스와 오른쪽 부분의 첫 인덱스를 저장

  let halfSize = Math.floor(str.length / 2);
  // 문자열의 길이가 홀수일 수 있으므로, 올림한다.
  let rightStart = Math.ceil(str.length / 2);

  // 가장 긴 LPS 후보부터 차례대로 검사한다
  for (let offset = 0; offset < halfSize; offset++) {
    let matched = true;
    for (let i = 0; i < halfSize - offset; i++) {
      if (str[i] !== str[rightStart + offset + i]) {
        matched = false;
        break;
      }
    }
    if (matched) return halfSize - offset;
  }

  // LPS가 없는 경우
  return 0;
};

// naive solution2
const LPS = function (str) {
  if (str.length < 2) return 0;

  // 문자열을 두 부분으로 나누고
  // 각 부분의 첫 인덱스를 저장
  let leftIdx = 0;
  // 문자열의 길이가 홀수일 수 있으므로, 올림한다.
  let rightIdx = Math.ceil(str.length / 2);

  while (rightIdx < str.length) {
    if (str[leftIdx] == str[rightIdx]) {
      // LPS 검사를 시작한 위치부터 지금까지 계속 같은 경우
      // 다음 문자도 같은지 확인하기 위해 인덱스를 이동한다.
      leftIdx++;
      rightIdx++;
    } else {
      // leftIdx가 0인 경우, 단순히 rightIdx를 1 증가 (suffix의 시작점을 뒤로 한 칸 이동)
      // prefix, suffix가 계속 일치하다가 중간에서 일치하지 않는 경우에도,
      // 현재 suffix의 시작점을 뒤로 한 칸 이동한다.
      rightIdx = rightIdx - leftIdx + 1;
      leftIdx = 0;
    }
  }

  // LPS가 없는 경우
  return leftIdx;
};

// // dynamic solution: O(N)
// // non-overlapping 조건을 제거하고 lps를 구한다.
// // lps는 주어진 문자열에서 아래 조건을 만족하는 가장 긴 접두어(prefix)의 길이를 의미한다.
// //  - 해당 접두어는 주어진 문자열의 접미어(suffix)이기도 하다.
// // 이때, 문자열 자기 자신은 그 자체로 prefix이자 suffix인데, 이는 고려 대상에서 제외한다.
// const LPS = function (str) {
//   // lps[i]는 0부터 i까지의 부분 문자열, 즉 str.slice(0, i + 1)에서 lps의 길이를 저장한다.
//   const lps = Array(str.length);
//   // lps[0]은 길이가 1인 문자열의 lps의 길이이므로 항상 0이다. (자기 자신 포함 금지)
//   lps[0] = 0;
//   let leftIdx = 0;
//   let rightIdx = 1;
//   // lps[i]를 1부터, 즉 문자열의 길이가 2일때부터 차례대로 구한다.
//   while (rightIdx < str.length) {
//     if (str[leftIdx] === str[rightIdx] && rightIdx >= str.length / 2) {
//       // 가장 단순한 경우를 생각해보면, 쉽게 이해할 수 있다.
//       // 1) 길이가 2 경우
//       // 2) 길이가 3 이상인데 전부 같은 문자인 경우
//       // 0부터 leftIdx까지 매칭이 되었으므로 매칭된 길이는 leftIdx + 1이다.
//       leftIdx++;
//       lps[rightIdx] = leftIdx;
//       rightIdx++;
//     } else {
//       // 중간에 매칭이 되지 않은 경우, leftIdx를 조정한다.
//       // 현재 lps[0]부터 lps[rightIdx - 1]까지 계산이 완료된 상태이다.
//       // 처음부터 다시 prefix, suffix 매칭을 하는 것이 원칙이지만
//       // 앞서 계산한 결과인 lps 배열을 통해 처음으로 되돌아갈 필요는 없다.

//       // 예. aaabaaaa
//       // 현재 leftIdx는 2, rigthIdx는 3, lps는 [0, 1, 2]인 상태라고 가정해보자.
//       // leftIdx가 1일 때까지, 즉 현재 leftIdx 직전(leftIdx - 1)까지는 매칭이 되었다.
//       if (leftIdx !== 0) {
//         leftIdx = lps[leftIdx - 1];
//         // Also, note that we do
//         // not increment i here
//       } else {
//         // rightIdx가 1인 경우, 즉 첫 iteration일 경우
//         // lps[rightIdx]가 0인 것은 명백하다. (예. ab)
//         // leftIdx가 0이라는 것은 처음부터 prefix, suffix 매칭을 하는 경우이다.
//         //
//         // lps가 존재하지 않는 경우이다.
//         lps[rightIdx] = 0;
//         rightIdx++;
//       }
//     }
//   }
//   const res = lps[lps.length - 1];
//   return res > str.length / 2 ? Math.floor(str.length / 2) : res;
// };

// LPS
// 문제
// 문자열을 입력받아 다음의 조건을 만족하는 LPS*를 찾아 그 길이를 리턴해야 합니다.

// LPS: 주어진 문자열의 가장 긴 접두어이자 접미어(Longest Prefix which is also Suffix)
// non-overlapping: 접두어와 접미어는 서로 겹치는 부분이 없어야 합니다. 다시 말해, prefix와 suffix는 문자열의 동일한 인덱스에 위치한 문자를 요소로 가지면 안 됩니다.
// 입력
// 인자 1 : str
// string 타입의 임의의 알파벳 소문자 문자열 (
// str.length는 60,000 이하
// 출력
// number 타입을 리턴해야 합니다.
// 주의사항
// prefix(접두어)는 문자열의 첫 인덱스부터 시작하는 모든 부분 문자열을 의미합니다.
// suffix(접미어)는 문자열의 마지막 인덱스부터 시작하는 모든 부분 문자열을 의미합니다.
// 입출력 예시
// let output = LPS('abbbcc');
// console.log(output); // --> 0

// output = LPS('aaaa');
// console.log(output); // --> 2
// // prefix: str.slice(0, 2)
// // suffix: str.slice(2)
// // non-overlapping 조건이 없는 경우 정답은 4 입니다.

// output = LPS('aaaaa');
// console.log(output); // --> 2
// // prefix: str.slice(0, 2)
// // suffix: str.slice(3)
// // non-overlapping 조건이 없는 경우 정답은 5 입니다.
// Advanced
// LPS를 계산하는 효율적인 알고리즘(O(N))이 존재합니다. 쉽지 않기 때문에 바로 레퍼런스 코드를 보고 이해하는 데 집중하시기 바랍니다.
// 정규식(regular expression)을 활용하면 아래처럼 간단하게 구현할 수 있습니다. 정규식에 대해서 학습하시기 바랍니다. (참고사이트)
// const LPS = (str) => {
//   const result = str.match(/^(\w*).*\1$/);
//   return result[1].length;
// };

// 문제
// 문자열을 입력받아 부분 문자열 중 가장 긴 (palindrome)*의 길이를 리턴해야 합니다.

// palindrome: 데이터를 앞에서 뒤로 또는 뒤에서 앞으로 조회한 결과가 동일한 경우
// 입력
// 인자 1 : str
// string 타입의 공백이 있는 알파벳 소문자 문자열
// 출력
// number 타입을 리턴해야 합니다.
// 주의사항
// 문자열 str의 부분 문자열은 자기 자신을 포함합니다.
// 공백도 회문에 포함될 수 있습니다.
// 입출력 예시
// let str = 'My dad is a racecar athlete';
// let result = longestPalindrome(str);
// console.log(result); // --> 11 ('a racecar a')

// str = ' dad ';
// result = longestPalindrome(str);
// console.log(result); // --> 5 (' dad ')
// Advanced
// 부분 문자열 중 가장 긴 회문을 계산하는 효율적인 알고리즘(O(N^2))이 존재합니다. 쉽지 않기 때문에 바로 레퍼런스 코드를 보고 이해하는 데 집중하시기 바랍니다.

// naive solution: O(N^3)
// function longestPalindrome(str) {
//   if (str.length <= 1) return str.length;

//   const checkPalindrome = function (str) {
//     const half = parseInt(str.length / 2);
//     for (let i = 0; i < half; i++) {
//       if (str[i] !== str[str.length - 1 - i]) return false;
//     }
//     return true;
//   };

//   // 길이가 긴 순서대로 부분 문자열을 만들어 검사한다.
//   for (let len = str.length; len >= 1; len--) {
//     // 길이 len인 부분 문자열들의 시작 인덱스를 구한다.
//     // 예. 전체 길이가 100이고, 부분 문자열의 길이가 10인 경우,
//     // 부분 문자열 (시작인덱스 ~ 마지막 인덱스)
//     //  90 ~ 99, 89 ~ 98, 88 ~ 97, ..., 1 ~ 10, 0 ~ 9
//     for (let startIdx = str.length - len; startIdx >= 0; startIdx--) {
//       // slice의 특성을 고려한 마지막 인덱스 + 1 을 저장
//       const endIdx = startIdx + len;
//       const subStr = str.substring(startIdx, endIdx);
//       const result = checkPalindrome(subStr);
//       if (result === true) return len;
//     }
//   }
// }

function longestPalindrome(str) {
  if (str.length < 2) return str.length;

  const LENGTH = str.length;
  const isPalindrome = Array(LENGTH)
    .fill(false)
    .map((_) => Array(LENGTH).fill(false));
  // 언더바는 잘못된 코드가 아닙니다.
  // 언더바는 어떤 매개변수는 전달되어도 무시하겠다는 의미로 사용됩니다.

  let maxLen = 1;
  // 길이가 1인 회문
  for (let i = 0; i < LENGTH; i++) isPalindrome[i][i] = true;

  // 길이가 2인 회문
  for (let i = 0; i < LENGTH - 1; i++) {
    if (str[i] === str[i + 1]) {
      isPalindrome[i][i + 1] = true;
      maxLen = 2;
    }
  }

  // 길이가 3 이상인 회문
  for (let len = 3; len <= LENGTH; len++) {
    for (let startIdx = 0; startIdx <= LENGTH - len; startIdx++) {
      const endIdx = startIdx + len - 1;
      if (
        isPalindrome[startIdx + 1][endIdx - 1] === true &&
        str[startIdx] === str[endIdx]
      ) {
        isPalindrome[startIdx][endIdx] = true;
        maxLen = len;
      }
    }
  }

  return maxLen;
}

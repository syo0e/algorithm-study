// 문제
// 문자열을 입력받아 문자열 내의 모든 괄호의 짝이 맞는지 여부를 리턴해야 합니다.

// 다음 단계에 맞춰 함수를 작성해 보세요
// 괄호의 종류를 단 한가지로 한정합니다.
// 괄호의 종류를 늘려 모든 종류의 괄호에도 작동하도록 합니다.
// 괄호를 제외한 문자열이 포함된 경우에도 작동하도록 합니다.
// 입력
// 인자 1 : str
// string 타입의 괄호가 포함된 문자열
// 출력
// boolean 타입을 리턴해야 합니다.
// 주의사항
// 괄호의 종류는 (, )만 고려합니다.
// 괄호는 먼저 열리고((), 열린만큼만 닫혀야()) 합니다.
// 빈 문자열을 입력받은 경우, true를 리턴해야 합니다.
// 입출력 예시
// let output = balancedBrackets('(');
// console.log(output); // // -> false

// output = balancedBrackets('()');
// console.log(output); // --> true
// Advanced
// 모든 종류의 괄호((, ), {, }, [, ])가 포함된 문자열을 입력빋아 모든 괄호의 짝이 맞는지 여부를 리턴해 보세요.
// let output = balancedBrackets('[](){}');
// console.log(output); // --> true

// output = balancedBrackets('[({})]');
// console.log(output); // --> true

// let output3 = balancedBrackets('[(]{)}');
console.log(output); // --> false

// naive solution
// const balancedBrackets = function (str) {
//   const stack = [];
//   const opener = '(';
//   const closer = ')';

//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === opener) {
//       stack.push(str[i]);
//     } else if (str[i] === closer) {
//       const top = stack.pop();
//       if (top !== opener) {
//         return false;
//       }
//     }
//   }

//   return stack.length === 0;
// };

const balancedBrackets = function (str) {
  const stack = [];
  const opener = {
    "{": "}",
    "[": "]",
    "(": ")",
  };
  const closer = "}])";

  for (let i = 0; i < str.length; i++) {
    if (str[i] in opener) {
      stack.push(str[i]);
    } else if (closer.includes(str[i])) {
      const top = stack.pop();
      const pair = opener[top];
      if (pair !== str[i]) {
        return false;
      }
    }
  }

  return stack.length === 0;
};

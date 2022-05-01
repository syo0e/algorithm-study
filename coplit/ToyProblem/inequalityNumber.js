const inequalityNumber = function (signs) {
  const aux = (idx, signs, nums, digits, isVisited) => {
    if (idx === signs.length) {
      // 부등호 수를 만든 경우
      return parseInt(nums.join(""));
    }

    const sign = signs[idx];
    for (let i = 0; i < digits.length; i++) {
      // 숫자를 차례대로 검토한다.
      // max를 구할 때는 9부터, min을 구할 때는 0부터
      const right = digits[i];
      // 이전 단계에서 사용한 숫자인 경우 스킵
      if (isVisited[right]) continue;

      // 첫번째 숫자가 아닌 경우에는 조건이 중요하다.
      if (idx >= 0) {
        // 항상 바로 직전의 숫자와 비교하면 된다.
        const left = nums[nums.length - 1];
        if (sign === "<" && left >= right) continue;
        if (sign === ">" && left <= right) continue;
      }

      // 조건을 만족하거나 첫번째 숫자인 경우
      isVisited[right] = true;
      const target = aux(idx + 1, signs, nums.concat(right), digits, isVisited);
      if (target !== undefined) {
        // 부등호 수를 이미 찾은 경우 탐색을 더 할 필요가 없다.
        return target;
      }
      // 탐색에 실패한 경우, 시도한 숫자의 상태(사용중)를 원래대로(사용안함) 바꿔놔야 한다.
      isVisited[right] = false;
    }

    return undefined;
  };

  signs = signs.split(" ");
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // arr.reverse()는 in-place 함수(데이터 직접 변경)이므로 min과 max의 순서는 중요하다.
  const min = aux(-1, signs, [], digits, Array(10).fill(false));
  const max = aux(-1, signs, [], digits.reverse(), Array(10).fill(false));
  return max - min;
};

// inequalityNumber
// 문제
// 아래와 같은 과정을 거쳐 부등호 수(inequalityNumber)를 만들 수 있습니다.

// 최대 9개의 부등호(<, >)가 주어집니다.
// 부등호의 좌우에는 0부터 9사이의 숫자가 한 번씩만 들어가야 합니다.
// 부등호를 만족하는 숫자의 조합을 차례대로 이어 붙여 만든 정수를 부등호 수라고 한다.
// 부등호 기호들을 입력받아 부등호를 만족하는 최대 부등호 수와 최소 부등호 수의 차이를 리턴해야 합니다.

// 입력
// 인자 1 : signs
// string 타입의 공백을 사이에 둔 부등호 기호들
// signs.length는 17 이하 (최대 9개의 부등호 기호)
// 출력
// number 타입을 리턴해야 합니다.
// 주의사항
// 첫 자리가 0인 경우도 부등호 수에 포함되어야 합니다.
// 모든 입력에 답은 항상 존재합니다.
// 입출력 예시
// let output = inequalityNumber('<');
// console.log(output); // --> 88 (89 - 01)

// output = inequalityNumber('< >');
// console.log(output); // --> 876 (897 - 021)

// output = inequalityNumber('> < >');
// console.log(output); // --> 8,754 (9,786 - 1,032)

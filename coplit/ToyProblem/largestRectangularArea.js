// 문제
// 히스토그램(histogram)은 표(도수 분포표, 빈도표)로 되어 있는 도수 분포(frequency distribution)를 정보 그림으로 나타낸 것입니다. 예를 들어, 대학교의 한 학과에서 신입생들의 현재 거주 지역을 조사한 결과가 다음과 같다고 가정해 봅시다.

// 서울 2명, 경기 1명, 대전 4명, 부산 5명, 대구 1명, 광주 3명, 제주도 3명...
// 이 자료를 히스트그램으로 나타내면 각각 높이 2, 1, 4, 5, 1, 3, 3인 직사각형이 왼쪽부터 그려지게 됩니다. 편의상 직사각형의 너비는 1이라고 가정합니다. 이를 그림으로 나타내면 아래와 같습니다.

// 6 |
// 5 |       x
// 4 |     x x
// 3 |     x x   x x
// 2 | x   x x   x x
// 1 | x x x x x x x
// ------------------
// 이 히스토그램 내에서 만들 수 있는 가장 큰 직사각형의 면적은 8입니다 (O로 표시한 부분).

// 6 |
// 5 |       x
// 4 |     O O
// 3 |     O O   x x
// 2 | x   O O   x x
// 1 | x x O O x x x
// ------------------
// 이처럼 임의의 히스토그램 내에서 가장 큰 직사각형의 면적을 리턴해야 합니다.

// 입력
// 인자 1 : histogram
// number 타입을 요소로 갖는 배열
// histogram[i]는 100,000 이하의 양의 정수
// histogram.length는 100,000 이하
// 출력
// number 타입을 리턴해야 합니다.
// 입출력 예시
// let histogram = [2, 1, 4, 5, 1, 3, 3];
// let output = largestRectangularArea(histogram);
// console.log(output); // --> 8

// let histogram = [6, 2, 5, 4, 5, 1, 6];
// let output = largestRectangularArea(histogram);
// console.log(output); // --> 12
// /*
// 6 | x           x
// 5 | x   x   x   x
// 4 | x   O O O   x
// 3 | x   O O O   x
// 2 | x x O O O   x
// 1 | x x O O O x x
// ------------------
// */
// Advanced
// 임의의 히스토그램에서 가장 큰 직사각형의 넓이를 계산하는 효율적인 알고리즘(O(N * logN))이 존재합니다. 쉽지 않기 때문에 바로 레퍼런스 코드를 보고 이해하는 데 집중하시기 바랍니다.
// 힌트
// 문제를 어렵게 만드는 것은 높이를 포기하고 너비를 선택할지, 너비를 포기하고 높이를 선택할지 따져봐야 한다는 것입니다.
// 문제를 직접 풀어보고 유심히 관찰하는 것은 문제 해결의 첫 걸음입니다.
// 길이 n인 histogram에서 가장 큰 직사각형이 histogram[i]부터 막대 histogram[j]까지라고 가정해봅시다. i와 j는 0 ~ n-1 사이에 놓여 있습니다. (0 <= i <= j <= n-1)
// 이 사각형의 높이는 이 구간의 막대 중 가장 낮은 높이를 가진 막대(histogram[k])의 높이와 같습니다.
// 이 사각형은 전체 구간(0 ~ n-1) 중 가장 낮은 막대를 포함하고 있거나 그렇지 않은 경우로 나뉩니다.
// 전자는 i === 0이고 j === n-1인 경우 뿐입니다.
// 후자는 이 직사각형이 차지하는 구간 바깥에 존재합니다. (k < i이거나 j < k)
// 이 이후부터는 스스로 생각해보시기 바랍니다.
// 구간 트리(segment tree)를 약간 변형하여 해결합니다.

// naive solution: O(N^2)
// const largestRectangularArea = function (histogram) {
//   let largest = 0;
//   // 모든 연속된 부분 히스토그램을 고려한다.
//   // 밑변의 길이를 부분 히스토그램의 길이로 고정하면, 높이는 가장 낮은 막대의 높이가 된다.
//   for (let left = 0; left < histogram.length; left++) {
//     // 길이가 1인 막대로 만들 수 있는 직사각형의 넓이는 막대의 높이와 같다.
//     let min = histogram[left];
//     for (let right = left; right < histogram.length; right++) {
//       // left부터 right까지의 히스토그램의 막대 중 가장 낮은 막대의 높이를 구한다.
//       if (histogram[right] < min) min = histogram[right];
//       // 해당 구간(left ~ right)의 막대를 전부 포함해서 만들 수 있는 직사각형의 넓이를 구한다.
//       let area = min * (right - left + 1);
//       // 매번 구한 면적을 기존의 면적과 비교해 갱신한다.
//       if (area > largest) largest = area;
//     }
//   }
//   return largest;
// };

// divide and conquer: O(N * logN)
const largestRectangularArea = function (histogram) {
  const createMinIdxTree = (arr, ts, te) => {
    // 가장 작은 값의 '인덱스'를 구하기 위한 구간 트리
    if (ts === te) return { idx: ts, val: arr[ts] };

    const mid = parseInt((ts + te) / 2);
    const left = createMinIdxTree(arr, ts, mid);
    const right = createMinIdxTree(arr, mid + 1, te);

    return {
      val: Math.min(left.val, right.val),
      idx: left.val < right.val ? left.idx : right.idx,
      left,
      right,
    };
  };
  const tree = createMinIdxTree(histogram, 0, histogram.length - 1);

  const getMinIdx = (ts, te, rs, re, tree) => {
    if (rs <= ts && te <= re) return tree.idx;
    if (te < rs || re < ts) return rs;

    const mid = parseInt((ts + te) / 2);
    const left = getMinIdx(ts, mid, rs, re, tree.left);
    const right = getMinIdx(mid + 1, te, rs, re, tree.right);
    return histogram[left] < histogram[right] ? left : right;
  };

  const getRangeArea = (start, end) => {
    if (start > end) return 0;
    // 현재 구간에서 가장 작은 막대를 찾는다.
    // 가장 작은 막대이므로 구간의 길이 * 높이만큼의 직사각형을 만들 수 있다. (첫번째 후보)
    const minIdx = getMinIdx(0, histogram.length - 1, start, end, tree);

    // 가장 작은 막대를 기준으로 왼쪽, 오른쪽 부분에 존재하는 모든 막대의 높이가 더 크다.
    // 재귀적으로 왼쪽 부분과 오른쪽 부분,
    // 즉 해당 구간에서 가장 작은 막대를 제외해서 만들 수 있는 가장 큰 직사각형의 넓이를 구한다.
    return Math.max(
      (end - start + 1) * histogram[minIdx], // 첫번째 후보
      getRangeArea(start, minIdx - 1),
      getRangeArea(minIdx + 1, end)
    );
  };

  return getRangeArea(0, histogram.length - 1);
};

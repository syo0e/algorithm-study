// 좌표평면 위에 존재하는 수많은 직사각형에 대한 정보가 2차원 배열로 주어집니다. 이 직사각형들은 서로 겹쳐 있을(overlapping) 수 있습니다. 이 직사각형들이 이루는 면적을 리턴해야 합니다.

// 문제를 다르게 표현하면 아래와 같습니다.

// - 밑이 투명한 좌표평면 위에 직사각형 모양의 종이를 여러 개 올려놓고 위에서 빛을 비출 때 생기는 그림자의 넓이를 구해야 합니다.
// 입력
// 인자 1 : papers
// 배열을 요소로 갖는 배열
// papers.length는 30 이하
// papers[i]는 number 타입을 요소로 갖는 배열
// papers[i]는 차례대로 직사각형의 좌측 하단 모서리의 x좌표, y좌표, 너비(width), 높이(height)
// papers[i][j]는 10,000 이하의 양의 정수
// 출력
// number 타입을 리턴해야 합니다.
// 입출력 예시
// let result = shadowOfPapers([[0, 1, 4, 4]]);
// console.log(result); // --> 16

// /*
// 4 | x x x x
// 3 | x x x x
// 2 | x x x x
// 1 | x x x x
// 0 |
// --------------
//     0 1 2 3 4
// */

// result = shadowOfPapers([
//   [0, 0, 4, 4],
//   [2, 1, 2, 6],
//   [1, 5, 5, 3],
//   [2, 2, 3, 3],
// ]);
// console.log(result); // --> 36
// /*
// 7 |   x x x x x
// 6 |   x x x x x
// 5 |   x x x x x
// 4 |     x x x
// 3 | x x x x x
// 2 | x x x x x
// 1 | x x x x
// 0 | x x x x
// ------------------
//     0 1 2 3 4 5 6 7
// */
// 힌트
// 인접 행렬로 좌표 평면을 생성하면 10,000 x 10,000의 2차원 행렬, 즉 1억개의 데이터를 생성해야 합니다. 대부분의 코딩 테스트에서 이는 공간 복잡도 요구 조건을 만족하지 못 합니다. 보통 코딩 테스트에서 메모리 사용량을 128MB ~ 512MB로 제한합니다. 64비트 정수(자바스크립트 number 타입)는 8바이트이므로, 전체 크기가 1천만개인 데이터들의 크기는 약 80MB 입니다. 메모리 사용량이 128MB라면 데이터가 2천만개만 넘어가도 테스트를 통과하지 못 합니다. 따라서 이 문제는 단순히 인접 행렬로 푸는 문제가 아니라는 것을 문제의 크기를 통해 추측할 수 있어야 합니다.
// 코딩 테스트의 입력 크기에 따른 시간 복잡도와 공간 복잡도 요구 사항에 대해서 학습하시기 바랍니다.
// 스위핑(sweeping) 알고리즘에 대해서 학습하시기 바랍니다.

const merge = function (left, right, comparator = (item) => item) {
  let merged = [];
  let leftIdx = 0,
    rightIdx = 0;
  const size = left.length + right.length;

  for (let i = 0; i < size; i++) {
    if (leftIdx >= left.length) {
      merged.push(right[rightIdx]);
      rightIdx++;
    } else if (
      rightIdx >= right.length ||
      comparator(left[leftIdx]) <= comparator(right[rightIdx])
    ) {
      merged.push(left[leftIdx]);
      leftIdx++;
    } else {
      merged.push(right[rightIdx]);
      rightIdx++;
    }
  }

  return merged;
};

const mergeSort = function (arr, comparator) {
  const aux = (start, end) => {
    if (start >= end) return [arr[start]];
    const mid = Math.floor((start + end) / 2);
    const right = aux(start, mid);
    const left = aux(mid + 1, end);
    return merge(left, right, comparator);
  };
  return aux(0, arr.length - 1);
};

/*
  모든 좌표가 아닌 높이가 변하는 부분만 계산한다.
  색종이에 대한 정보가 아래와 같이 주어졌을 때, 전체 면적을 구하는 알고리즘
  const papers = [
    [0, 0, 4, 4],
    [2, 1, 2, 6],
    [1, 5, 5, 3],
    [2, 2, 3, 3],
  ];
  
  각 사각형의 시작과 끝을 범위(range) 표기로 각각 s(start), e(end)로 표시한다.
  e는 사각형이 끝나느 x좌표의 다음 좌표에 표기한다.
  7 |   x x x x x
  6 |   x x x x x
  5 |   s x x x x e
  4 |     x x x
  3 | x x x x x
  2 | x x s x x e
  1 | x x s x e
  0 | s x x x e
  ------------------
      0 1 2 3 4 5 6 7
  
  새로운 변화(시작 또는 끝)가 있을 때마다 면적을 계산하여 더한다.
  
  1) 4를 더한다. (면적은 4)
  7 |   
  6 |   
  5 |   
  4 |   
  3 | x 
  2 | x 
  1 | x 
  0 | s 
  ------------------
      0 1 2 3 4 5 6 7
  
  2) 7을 더한다. (면적은 11)
  7 |   x 
  6 |   x 
  5 |   s 
  4 |     
  3 |   x 
  2 |   x 
  1 |   x 
  0 |   x 
  ------------------
      0 1 2 3 4 5 6 7
  
  3) 16을 더한다. (면적은 27)
  7 |     x x 
  6 |     x x 
  5 |     x x 
  4 |     x x 
  3 |     x x 
  2 |     s x 
  1 |     s x 
  0 |     x x 
  ------------------
      0 1 2 3 4 5 6 7
  
  4) 6을 더한다. (면적은 33)
  7 |         x 
  6 |         x 
  5 |         x 
  4 |         x
  3 |         x
  2 |         x 
  1 |         
  0 |         
  ------------------
      0 1 2 3 4 5 6 7
  
  4) 3을 더한다. (면적은 36)
  7 |            x
  6 |            x
  5 |            x 
  4 |         
  3 |         
  2 |         
  1 |         
  0 |         
  ------------------
      0 1 2 3 4 5 6 7
  */
function shadowOfPapers(papers) {
  // 주어진 사각형의 정보를 각 좌표의 시작과 끝을 나타내는 좌표로 변경하여 저장한다.
  const coordinates = [];
  papers.forEach((p) => {
    const [x, y, width, height] = p;
    // 사각형의 시작점의 x좌표, 하단 y좌표, 상단 y좌표, 사각형의 시작을 알리는 flag
    coordinates.push([x, y, y + height - 1, 1]);
    // 사각형의 마지막점의 x좌표, 하단 y좌표, 상단 y좌표, 사각형의 마지막을 알리는 flag
    // x좌표는 너비 계산에 누락을 방지하기 위해 범위로 저장한다.
    coordinates.push([x + width, y, y + height - 1, -1]);
  });

  // x축을 기준으로 정렬한다.
  const sorted = mergeSort(coordinates, (c) => c[0]);
  // 좌표 평면을 좌측에서 우측으로 순회하면서 매좌표까지 사각형이 차지하는 y좌표를 저장한다.
  const height = Array(10000 + 1).fill(0);
  for (let y = sorted[0][1]; y <= sorted[0][2]; y++) height[y] = 1;
  let sum = 0;
  for (let i = 1; i < sorted.length; i++) {
    // 겹치는 부분을 제외하고 순수하게 높이만 구한다.
    const h = height.reduce((acc, cur) => acc + (cur === 0 ? 0 : 1), 0);
    const x2 = sorted[i][0];
    const x1 = sorted[i - 1][0];
    sum = sum + (x2 - x1) * h;

    const y1 = sorted[i][1];
    const y2 = sorted[i][2];
    // 사각형은 서로 겹칠 수 있으므로, 누적값을 저장해야 한다.
    for (let y = y1; y <= y2; y++) height[y] += sorted[i][3];
  }
  return sum;
}

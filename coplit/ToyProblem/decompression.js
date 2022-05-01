// decompression
// 문제
// 한 변의 길이가 2의 제곱수인 정사각형의 흑백 이미지가 2차원 배열로 주어집니다. 각 좌표에는 0(백) 또는 1(흑)이 저장되어 있습니다. 이미지에 포함된 데이터가 모두 1이면 '1', 모두 0이면 '0' 한 글자로 압축할 수 있습니다. 그렇지 않은 경우, 이를 대문자 X로 표시하고 전체를 4등분하여 재귀적으로 압축합니다. 4등분한 영역의 순서는 좌측 상단, 우측 상단, 좌측 하단, 우측 하단입니다.

// 입력
// 인자 1 : image
// 배열을 요소로 갖는 배열
// image.length, image[i].length는 1,024 이하
// image[i]는 number 타입을 요소로 갖는 배열
// image[i][j]는 세로로 i, 가로로 j인 지점의 정보를 의미
// image[i][j]는 0 또는 1
// 출력
// string 타입을 리턴해야 합니다.
// 주의사항
// 두 배열의 길이의 합은 1,000,000 이하입니다.
// 어떤 배열 arr의 k번째 요소는 arr[k-1]을 의미합니다.
// 입출력 예시
// let image = [
//   [1, 0, 1, 1],
//   [0, 1, 1, 1],
//   [0, 0, 1, 1],
//   [0, 0, 0, 0],
// ];
// let result = decompression(image);
// console.log(result); // --> 'XX100110X1100​'

// image = [
//   [0, 0, 0, 0, 1, 1, 0, 0],
//   [0, 0, 0, 0, 1, 1, 0, 0],
//   [0, 0, 0, 0, 1, 1, 1, 0],
//   [0, 0, 0, 0, 1, 1, 1, 0],
//   [1, 1, 1, 1, 0, 0, 0, 0],
//   [1, 1, 1, 1, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 0, 1, 1],
//   [1, 1, 1, 1, 0, 1, 1, 1],
// ];
// result = decompression(image);
// console.log(result); // --> 'X0X101X10101X00X10011'
// Advanced
// decompression과 반대로 정사각형으로 표현된 데이터를 압축한 문자열을 입력받아 원래의 사각형을 리턴하는 함수 compression을 작성해 보세요. 레퍼런스 코드는 따로 제공하지 않습니다.

/*
const image = [
  [1, 0, 1, 1],
  [0, 1, 1, 1],
  [0, 0, 1, 1],
  [0, 0, 0, 0],
];

1. 전체 사각형(길이 4)에 0과 1이 섞여 있으므로 X가 첫 압축 정보가 됩니다. 
2. 그 뒤에는 차례대로 좌측 상단, 우측 상단, 좌측 하단, 우측 하단의 사각형이 압축된 정보가 나와야 합니다.
    => X[좌상][우상][좌하][우하]
3. 좌측 상단 사각형(길이 2)은 0과 1이 섞여 있으므로 X가 첫 압축 정보가 됩니다. 
   그리고 나머지 좌상, 우상, 좌하, 우하 사각형은 최소단위 이므로 차례대로 1, 0, 0, 1 을 그대로 적습니다.
    => X1001
   좌측 상단 사각형의 정보를 반영하면 전체 데이터의 압축 정보는 아래와 같습니다.
    => XX1001[우상][좌하][우하]
4. 우측 상단 사각형(길이 2)은 전부 1이므로 1이 곧 압축 정보입니다. 
    => XX10011[좌하][우하]
5. 좌측 히단 사각형(길이 2)은 전부 0이므로 0이 곧 압축 정보입니다. 
    => XX100110[우하]
6. 우측 하단 사각형(길이 2)은 0과 1이 섞여 있으므로 X가 첫 압축 정보가 됩니다. 
   그리고 나머지 좌상, 우상, 좌하, 우하 사각형은 최소단위 이므로 차례대로 1, 1, 0, 0 을 그대로 적습니다.
    => XX100110X1100
*/
const decompression = function (image) {
  // 재귀를 위한 보조 함수
  // 파라미터는 차례대로 y좌표의 시작(Row Start), y좌표의 끝(Row End), x좌표의 시작(Col Start), x좌표의 끝(Col End)
  const aux = (rs, re, cs, ce, image) => {
    // base case
    // 각 좌표에는 number 타입이 저장되어 있다.
    if (rs === re) return String(image[rs][cs]);

    // 좌상, 우상, 좌하, 우하로 구분한다.
    const midRow = Math.floor((rs + re) / 2);
    const midCol = Math.floor((cs + ce) / 2);
    const leftUpper = aux(rs, midRow, cs, midCol, image);
    const rightUpper = aux(rs, midRow, midCol + 1, ce, image);
    const leftDown = aux(midRow + 1, re, cs, midCol, image);
    const rightDown = aux(midRow + 1, re, midCol + 1, ce, image);

    // 주어진 사각형 전체를 순회하고 나서 재귀를 하거나
    // 4등분한 각 사각형을 각각 순회하고 나서 재귀를 하는 방식은 데이터를 중복 조회하게 된다.
    // 재귀적으로 각 결과를 합치면서 계산하면 모든 좌표를 한 번씩만 검토하면 된다.
    const result = leftUpper + rightUpper + leftDown + rightDown;
    if (result === "1111") return "1";
    else if (result === "0000") return "0";
    else return "X" + result;
  };

  return aux(0, image.length - 1, 0, image.length - 1, image);
};

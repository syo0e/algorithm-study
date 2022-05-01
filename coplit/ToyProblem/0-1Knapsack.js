// 문제
// 배낭 채우기 문제 (knapsack problem)는 유명한 조합 최적화 문제로 아래와 같이 정의됩니다.

// 한쪽에 배낭 하나와 이 배낭에 담을 수 있는 무게의 최댓값이 정해져 있습니다. 다른 한쪽에는 일정한 가치와 무게를 가진 짐들이 있습니다. 이때 배낭에 담을 수 있는 여러 짐들의 조합들 중 가치의 합이 최대가 되는 조합을 찾아야 합니다.
// 배낭의 무게(weight)와 물건에 대한 정보들을 요소로 갖는 배열(items)을 받아 배낭에 담을 수 있는 최대 가치를 리턴해야 합니다.

// 입력
// 인자 1: weight
// number 타입의 자연수 (number <= 100,000)
// 인자 2: items
// 배열을 요소로 갖는 배열
// items[i]는 number 타입을 요소로 갖는 배열
// items[i].length는 2
// items[i]의 요소는 차례대로 물건의 무게, 가치
// 출력
// number 타입을 리턴해야 합니다.
// 주의사항
// 배낭에 아무것도 담을 수 없는 경우, 0을 리턴해야 합니다.
// 입출력 예시
// let weight = 50;
// let items = [
//   [10, 60],
//   [20, 100],
//   [30, 120],
// ];
// let output = knapsack(weight, items);
// console.log(output); // --> 220 (items[1], items[2])

// weight = 10;
// items = [
//   [5, 10],
//   [4, 40],
//   [6, 30],
//   [3, 50],
// ];
// output = knapsack(weight, items);
// console.log(output); // --> 90 (items[1], items[3])

// weight = 40;
// items = [
//   [40, 10],
//   [50, 100],
//   [10, 30],
// ];

// output = knapsack(weight, items);
// console.log(output); // --> 30 (items[2])

// naive solution: O(2^N)
// const knapsack = function (weight, items) {
//   const LENGTH = items.length;
//   function pickOrNot(idxToCheck, value, left) {
//     if (idxToCheck === LENGTH) return value;

//     const [wt, v] = items[idxToCheck];

//     if (wt > left) return pickOrNot(idxToCheck + 1, value, left);

//     return Math.max(
//       pickOrNot(idxToCheck + 1, value + v, left - wt),
//       pickOrNot(idxToCheck + 1, value, left)
//     );
//   }

//   return pickOrNot(0, 0, weight);
// };

// dynamic: O(weight * N)
const knapsack = function (weight, items) {
  let cached = Array(weight + 1).fill(0);
  items = items.filter((item) => item[0] <= weight);
  items.forEach(([wt, v]) => {
    const possible = Array(weight + 1).fill(0);
    for (let i = 1; i <= weight; i++) {
      possible[i] = cached[i];
      if (i - wt >= 0 && cached[i - wt] + v > cached[i])
        possible[i] = cached[i - wt] + v;
      if (cached[i - 1] > cached[i]) possible[i] = cached[i - 1];
    }
    cached = possible;
  });
  return cached[weight];
};

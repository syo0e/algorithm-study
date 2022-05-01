// subsetSum
// 문제
// 자연수의 집합(set)과 자연수(bound)를 입력받아 아래의 조건을 만족하는 가장 큰 수를 리턴해야 합니다.

// - 집합의 요소를 최대 한번씩만 더해서 만들어야 한다.
// - `bound`를 넘지 않아야 한다.
// 입력
// 인자 1: set
// 자연수를 요소로 갖는 배열
// 인자 2: bound
// number 타입의 자연수 (bound <= 300)
// 출력
// number 타입을 리턴해야 합니다.
// 주의사항
// 조건을 만족하는 조합이 없는 경우, 0을 리턴해야 합니다.
// 입출력 예시
// let output = subsetSum([1, 8, 3, 15], 10);
// console.log(output); // --> 9 (= 1 + 8)

// output = subsetSum([20, 80, 99, 27, 35], 100);
// console.log(output); // --> 100 (= 20 + 80)

// output = subsetSum([10, 20, 15, 25, 30], 5);
// console.log(output); // --> 0

// naive solution: O(2^N)
// const subsetSum = function (set, bound) {
//   const LENGTH = set.length;
//   function pickOrNot(idxToCheck, left) {
//     if (idxToCheck === LENGTH) return bound - left;

//     if (set[idxToCheck] > left) return pickOrNot(idxToCheck + 1, left);
//     if (set[idxToCheck] === left) return bound;

//     return Math.max(
//       pickOrNot(idxToCheck + 1, left - set[idxToCheck]),
//       pickOrNot(idxToCheck + 1, left)
//     );
//   }

//   return pickOrNot(0, bound);
// };

// dynamic: O(bound * N)
const subsetSum = function (set, bound) {
  let max = 0;
  // 집합의 원소들로 만들 수 있는 합의 조합을 관리하는 배열
  // bound는 최대 300이므로, 배열의 크기를 301로 설정한다.
  // 300 + 1 로 적는 이유는 가독성과 배열 인덱스를 직관적으로 관리하기 위함
  // 원소들을 통해 sum을 만들 수 있는 경우, bound[sum]을 true로 설정한다.
  const cached = Array(300 + 1).fill(false);
  set.forEach((member) => {
    // 집합의 원소를 차례대로 검사
    // 이전 단계까지 검사한 원소들로 만들 수 있는 합의 조합은 cached에 저장되어 있다.
    // cached의 요소에 각각 member를 더한 값을 만들 수 있다.
    const reachables = [];
    // 이 중에서 bound를 넘어가는 값은 고려하지 않는다.
    // reachables로 따로 관리하는 이유는 중복 계산을 피하기 위함
    for (let wanted = 1; wanted <= bound - member; wanted++) {
      if (cached[wanted] === true) {
        const reached = wanted + member;
        reachables.push(reached);
        if (reached > max) max = reached;
      }
    }

    // bound 이하로 만들 수 있는 합의 조합을 cached에 추가한다.
    reachables.forEach((r) => (cached[r] = true));

    // 집합의 원소를 마지막에 cached에 추가하는 이유는 중복 계산을 방지하기 위함
    if (member <= bound) {
      cached[member] = true;
      if (member > max) max = member;
    }
  });
  return max;
};

// 객체를 활용한 방법
// const subsetSum = function (set, bound) {
//   let max = 0;
//   const reachables = {};
//   set.forEach((member) => {
//     Object.keys(reachables).forEach((r) => {
//       // 객체의 키는 string 타입
//       const reached = Number(r) + member;
//       if (reached <= bound) {
//         reachables[reached] = true;
//         if (reached > max) max = reached;
//       }
//     });
//     if (member <= bound) {
//       reachables[member] = true;
//       if (member > max) max = member;
//     }
//   });
//   return max;
// };

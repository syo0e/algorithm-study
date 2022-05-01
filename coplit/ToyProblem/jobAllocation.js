// 총 5개의 작업을 3명이서 작업한다고 가정한다.
// 첫번째 작업자는 최대 3개의 작업을 할 수 있다.
// (jobs, workersNum)으로 표기하면, (jobs는 작업량이 아닌 작업의 인덱스만 표기한다고 한다)
// 처음은 ([0, 1, 2, 3, 4], 3)인 상태이다.
//  1) 첫번째 작업자가 1개의 작업을 하고 나머지 작업을 2명이 작업
//    => ([1, 2, 3, 4], 2)
//  2) 첫번째 작업자가 2개의 작업을 하고 나머지 작업을 2명이 작업
//    => ([2, 3, 4], 2)
//  3) 첫번째 작업자가 3개의 작업을 하고 나머지 작업을 2명이 작업
//    => ([3, 4], 2)
// 아래 두 가지 경우를 통해, 문제가 중복되어 계산된다는 것을 알 수 있다.
//  1-1) 첫번째 작업자가 1개의 작업을 하고, 그 다음 작업자가 2개의 작업을 한 경우
//    => ([3, 4], 1)
//  2-1) 첫번째 작업자가 2개의 작업을 하고, 그 다음 작업자가 1개의 작업을 한 경우
//    => ([3, 4], 1)
// 메모이제이션을 통해 중복 계산을 피한다.
const jobAllocation = function (jobs, workersNum) {
  // memo[i][j]는 i번째 worker가 j번째 job부터 작업한다고 할 때,
  // 최대 작업량이 최소가 되는 분배에서의 최대 작업량을 저장한다.
  // i, j 모두 인덱스이므로 0부터 시작
  const memo = [];
  for (let i = 0; i < workersNum; i++) memo.push(Array(jobs.length).fill(-1));
  // 마지막 작업자는 남아있는 모든 작업을 다 해야하므로 쉽게 계산이 가능하다.
  // 마지막 작업자는 최대 나머지 작업자의 수만큼을 제외한 일만 할 수 있다.
  let workload = 0;
  for (let i = jobs.length - 1; i >= workersNum - 1; i--) {
    workload = workload + jobs[i];
    memo[workersNum - 1][i] = workload;
  }

  const aux = (workerIdx, jobIdx, jobs, left) => {
    // 이미 계산한 적이 있는 경우, 다시 풀지 않는다
    // 마지막 작업자의 작업량을 전부 계산했으므로, 탈출 조건을 굳이 작성하지 않아도 된다.
    if (memo[workerIdx][jobIdx] !== -1) return memo[workerIdx][jobIdx];

    let workload = 0;
    let min = Number.MAX_SAFE_INTEGER;
    for (let i = jobIdx; i < jobs.length - left; i++) {
      workload = workload + jobs[i];
      // 가장 많이 일하는 사람의 작업량을 구한다.
      const hardest = Math.max(
        workload,
        aux(workerIdx + 1, i + 1, jobs, left - 1)
      );
      // 그 작업량이 최소화되는 분배에서 최대 작업량을 구한다.
      min = Math.min(min, hardest);
    }
    memo[workerIdx][jobIdx] = min;
    return min;
  };

  return aux(0, 0, jobs, workersNum - 1);
};

// 문제
// 공장의 조립 기계가 고장이 나 수리를 위해 여러 명의 수리공들이 왔습니다. 조립 기계는 일자 형태로 길게 배치되어 있기 때문에 수리공들 또한 나란히 위치해서 수리를 진행해야 합니다. 기계의 각 부품은 한 명의 수리공만 수리할 수 있고, 이동을 최소화하기 위해 각 수리공들은 서로 연속해서 있는 부품만 수리해야 합니다. 각 부품을 수리하는 데 걸리는 작업량은 제각각이고, 수리 시간은 작업량에 비례합니다. 작업량과 수리공들의 수가 주어질 때, 전체 수리가 가장 빠르게 끝나는 시간을 리턴해야 합니다.

// 문제를 다르게 표현하면 아래와 같습니다.

// - 자연수 배열을 n개의 연속 구간으로 나눌 때, 합이 가장 큰 구간의 합을 sum이라고 합시다. sum이 가장 작아지는 분배에서의 sum을 구해야 합니다.
// 입력
// 인자 1 : jobs
// number 타입을 요소로 갖는 배열
// jobs[i]는 1,000 이하의 양의 정수
// jobs.length는 1,000 이하
// 인자 2 : workersNum
// number 타입의 1,000 이하의 자연수
// 출력
// number 타입을 리턴해야 합니다.
// 입출력 예시
// let jobs = [1, 2, 3, 4, 5, 6, 7];
// let workersNum = 3;
// let output = jobAllocation(jobs, workersNum);
// console.log(output); // --> 11 (1, 2, 3, 4 / 5, 6 / 7)

// jobs = [10, 2, 3, 4, 16, 10, 10];
// workersNum = 4;
// output = jobAllocation(jobs, workersNum);
// console.log(output); // --> 19 (10, 2, 3, 4 / 16 / 10 / 10

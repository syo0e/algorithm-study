// 문제
// 세로와 가로의 길이가 모두 N인 마을의 지도가 배열로 주어졌습니다. '0'은 주민이 살지 않는 빈 땅을 의미하고, '1'은 평범한 주민이 살고 있는 집을 의미하며, '2'는 유사시 비상 연락 요원으로 선정 가능한 주민이 살고 있는 집을 의미합니다. 이 마을의 비상연락망 시스템을 구축하기 위해 비상 연락 요원으로 선정 가능한 주민 중 일부를 비상 연락 요원으로 임명하려고 합니다. 각 담당자들은 한 시간 후, 정보를 상하좌우 한 칸 바로 옆에 있는 집으로 전달하기 시작합니다. 정보를 전달받은 주민 역시 한 시간 후, 상하좌우 한 칸 바로 옆에 있는 집으로 해당 정보를 전달합니다. 단, 비상 연락 요원으로 선정받지 못한 주민('2')은 이에 불만을 품고 정보를 전달하지 않습니다. 비상 연락 요원으로 지정할 수 있는 최대수(num)가 주어질 때, 마을 전체로 정보가 전달되는 데 가장 빠른 시간을 리턴해야 합니다.

// 입력
// 인자 1 : village
// string 타입을 요소로 갖는 배열
// village.length와 village[i].length는 50 이하
// village[i]는 string 타입
// village[i][j]는 세로로 i, 가로로 j인 지점의 정보를 의미
// village[i][j]는 '0', '1' 또는 '2'
// 인자 2: num
// number 타입의 10 이하의 양의 정수
// 비상 연락 요원으로 지정가능한 최대 수
// 출력
// number 타입을 리턴해야 합니다.
// 주의사항
// 모든 집이 전부 연결되어 있는 것은 아닙니다.
// 비상 연락 요원으로 선택되지 않은 주민(‘2’)은 정보를 전달하지 않습니다.
// 비상 연락 요원으로 선정 가능한 주민('2')의 수는 10 이하입니다.
// village를 그래프로 구현하는 함수가 주어집니다.
// 입출력 예시
// let village = [
//   '0022', // 첫 번째 줄
//   '0020',
//   '0020',
//   '0220',
// ];
// let num = 1;
// let output = gossipProtocol2(village, num);
// console.log(output); // --> 0 (이미 모든 주민이 정보를 알고 있는 상태)

// village = [
//   '1001212',
//   '1201011',
//   '1102001',
//   '2111102',
//   '0012111',
//   '1111101',
//   '2121102',
// ];
// num = 5;
// output = gossipProtocol2(village, num);
// console.log(output); // --> 3

const createMatrix = (village) => {
  const matrix = [];
  village.forEach((line) => {
    const row = [];
    for (let i = 0; i < line.length; i++) row.push(line[i]);
    matrix.push(row);
  });
  return matrix;
};

const getAgents = (village) => {
  const agents = [];
  for (let row = 0; row < village.length; row++) {
    for (let col = 0; col < village.length; col++) {
      if (village[row][col] === "2") agents.push([row, col]);
    }
  }
  return agents;
};

const gossipProtocol2 = function (village, num) {
  // bfs 구현을 위해 큐를 선언한다.
  const N = village.length;
  const MOVES = [
    [-1, 0], // UP
    [1, 0], // DOWN
    [0, 1], // RIGHT
    [0, -1], // LEFT
  ];
  const MAX_SIZE = N * N;
  const isValid = (row, col) => row >= 0 && row < N && col >= 0 && col < N;
  let front, rear;
  const isEmpty = (queue) => front === rear;
  const enQueue = (queue, pos) => {
    // 실행 중에 큐가 가득차지는 않기 때문에 별도의 조건문을 작성할 필요가 없다.
    queue[rear++] = pos;
  };
  const deQueue = (queue) => {
    const pos = queue[front++];
    return pos;
  };

  // num개의 시작점이 주어졌을 때, bfs 탐색을 하는 함수
  const bfs = (sources) => {
    const matrix = createMatrix(village);
    const queue = Array(MAX_SIZE);
    front = 0;
    rear = 0;

    sources.forEach((src) => {
      const [row, col] = src;
      matrix[row][col] = 0;
      enQueue(queue, src);
    });

    let cnt = 0;
    while (isEmpty(queue) === false) {
      const [row, col] = deQueue(queue);
      cnt = matrix[row][col];

      MOVES.forEach((move) => {
        const [rDiff, cDiff] = move;
        const nextRow = row + rDiff;
        const nextCol = col + cDiff;
        if (isValid(nextRow, nextCol) && matrix[nextRow][nextCol] === "1") {
          enQueue(queue, [nextRow, nextCol]);
          matrix[nextRow][nextCol] = matrix[row][col] + 1;
        }
      });
    }

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix.length; col++) {
        // 정보가 다 전달되지 않을 수 있다.
        if (matrix[row][col] === "1") return Number.MAX_SAFE_INTEGER;
      }
    }
    return cnt;
  };

  // 정보를 알고 있는 주민들을 따로 저장한다.
  const agents = getAgents(village);
  // 최대 num명의 요원을 선정하고, 각각에 대해서 bfs를 수행한다.
  // 가장 작은 값을 리턴한다.

  // size개 중에서 num개를 선택하는 모든 조합을 리턴하는 함수
  // 인덱스를 리턴한다.
  const getCombinations = (idx, size, num, result) => {
    // base case1: 선택해야 개수가 남아있는 개수 이상일 경우
    // => 남아있는 모든 걸 선택한다.
    if (size - idx <= num) {
      for (let i = idx; i < size; i++) result.push(i);
      return [result];
    }

    // base case2: 선택이 완료되었을 경우
    if (num === 0) {
      return [result];
    }

    // 현재 idx부터 num개를 뽑는 방법은
    // 1) 현재 요소를 선택하고 num-1개를 뽑는 방법
    const picked = getCombinations(idx + 1, size, num - 1, result.concat(idx));
    // 2) 현재 요소를 선택하지 않고 num개를 뽑는 방법
    const notPicked = getCombinations(idx + 1, size, num, result);
    return picked.concat(notPicked);
  };

  const combs = getCombinations(0, agents.length, num, []);
  let min = Number.MAX_SAFE_INTEGER;
  combs.forEach((c) => {
    const sources = c.map((idx) => agents[idx]);
    const result = bfs(sources);
    min = Math.min(min, result);
  });
  return min;
};

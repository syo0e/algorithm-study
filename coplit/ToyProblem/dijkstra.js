// 문제
// 무방향 그래프의 한 정점(vertex)에서 다른 정점까지의 최단 거리를 리턴해야 합니다.

// 입력
// 인자 1: num
// number 타입의 자연수
// 그래프에 존재하는 정점의 개수
// 정점은 1부터 num까지 존재
// 인자 2: edges
// 배열(간선에 대한 정보)을 요소로 갖는 배열
// edges[i]는 number 타입을 요소로 갖는 배열
// edges[i].length는 3
// edges[i]의 요소는 차례대로 정점, 정점, 거리
// edges[i][2]은 100 이하의 양의 정수
// [1, 2, 3]은 1번 정점과 2번 정점 사이의 거리가 양방향 모두 3임을 의미함
// 인자 3: start
// number 타입의 출발 정점
// 인자 4: end
// number 타입의 도착 정점
// 출력
// number 타입을 리턴해야 합니다.
// 주의사항
// 최단 경로의 길이를 리턴해야 합니다.
// 다익스트라 알고리즘을 구현해야 합니다.
// 다익스트라 알고리즘을 직접 생각해내긴 어렵기 때문에 바로 학습하시기 바랍니다.
// 정점들은 서로 양뱡향으로 연결되어 있습니다(무방향 그래프).
// 입출력 예시
// let num = 4;
// let edges = [
//   [1, 2, 6],
//   [1, 3, 2],
//   [2, 3, 3],
//   [2, 4, 1],
//   [3, 4, 5],
// ];
// let start = 1;
// let end = 4;
// let output = Dijkstra(num, edges, start, end);
// console.log(output); // --> 6 (1 - 3 - 2 - 4)

// num = 7;
// edges = [
//   [1, 3, 100],
//   [1, 2, 3],
//   [1, 4, 4],
//   [4, 3, 3],
//   [4, 5, 8],
//   [5, 6, 10],
//   [2, 7, 9],
//   [5, 7, 50],
// ];
// start = 1;
// end = 7;
// output = Dijkstra(num, edges, start, end);
// console.log(output); // --> 12 (1 - 2 - 7)
// Advanced
// 최단 경로의 길이 대신 최단 경로를 리턴하도록 구현해 보세요. 테스트 코드는 따로 제공하지 않습니다.
// 정점의 수에 비해 간선의 수가 작은 경우, 그래프를 연결 리스트로 구현하고 우선순위 큐(priority queue)를 이용해 보다 효율적인 알고리즘 구현이 가능합니다. 우선순위 큐는 이진 힙(heap)을 통해 구현할 수 있습니다. 레퍼런스 코드는 따로 제공하지 않습니다.

function createGraphByList(num, edges) {
  const _edges = {};
  for (let i = 1; i <= num; i++) _edges[i] = [];
  edges.forEach(([src, dst, weight]) => {
    _edges[src].push({ node: dst, weight: weight });
    _edges[dst].push({ node: src, weight: weight });
  });
  return _edges;
}

function createGraphByMatrix(num, edges) {
  const matrix = [];
  const INF = 101;
  for (let i = 0; i <= num; i++) {
    matrix.push(Array(num + 1).fill(INF));
    matrix[i][i] = 0;
  }
  edges.forEach(([src, dst, weight]) => {
    matrix[src][dst] = matrix[dst][src] = weight;
  });
  return matrix;
}

// 인접 행렬을 통한 구현: O(V^2)
// V는 정점의 개수
function Dijkstra(num, edges, start, end) {
  // 그래프를 생성한다.
  const matrix = createGraphByMatrix(num, edges);
  // dist는 출발 정점으로부터 모든 정점까지의 최단 거리를 저장하는 배열
  // 처음에는 주어진 간선의 정보로 초기화
  const dist = matrix[start].slice();
  // 최단 거리 계산이 완료된 정점을 표시하는 배열
  const visited = Array(num + 1).fill(false);
  // 출발 정점까지의 거리는 0으로 이미 계산된 상태로 볼 수 있다.
  visited[start] = true;

  // 최단 경로를 저장하기 위한 배열
  // 각 정점별로 해당 정점에 도달하기 위한 최단 경로 중 바로 직전의 정점을 저장
  // 계산이 완료된 후에 역으로 추적해서 경로 생성 가능
  // 최단 경로가 계산되기 이전의 상태를 표시하기 위해 -1로 초기화
  const before = Array(num + 1).fill(-1);

  // 출발 정점에서 바로 가는 경로가 존재하는 정점은
  // 출발 정점이 최단 경로 상의 직전 정점이라고 가정한다.
  edges.forEach(([src, dst]) => {
    if (src === start) before[dst] = src;
    if (dst === start) before[src] = dst;
  });

  // 아직 최단 거리 계산이 안 된 정점들 중에서
  // 출발 정점과의 거리가 가장 짧은 정점을 리턴한다.
  const getNextNearestIdx = (dist) => {
    let min = Number.MAX_SAFE_INTEGER;
    for (i = 1; i <= num; i++) {
      if (dist[i] < min && visited[i] === false) {
        min = dist[i];
        target = i;
      }
    }
    return target;
  };

  // 출발 정점은 이미 계산된 상태이므로 1개를 제외하고
  // 매 루프를 통해서 (다음으로) 출발 정점과의 거리가 가장 짧은 정점이 계산되므로
  // 총 루프의 회수는 num - 2 이다.
  for (let round = 0; round < num - 2; round++) {
    // 현재 시점에서 출발 정점까지의 거리가 가장 짧은 정점(v1)은
    // 이미 계산이 완료되었다고 볼 수 있다.
    // 다른 정점(v2)은 출발 정점과의 거리가 v1에 비해 길고 (v1이 가장 짧은 거리를 가졌으므로)
    // 따라서 다른 정점을 통해 v1으로 가는 경로가 더 길 수 밖에 없다.
    const nearest = getNextNearestIdx(dist);
    // 이미 계산이 된 정점을 중복해서 고려할 필요가 없기 때문에 표시를 한다
    visited[nearest] = true;
    visited.forEach((calculated, v) => {
      // 계산이 완료된 정점은 보지 않아도 된다.
      if (calculated === false) {
        // 현재 시점에서 출발 정점과 (이미 계산된 정점을 제외하고 다음으로)
        // 가장 가까운 정점(nearest)을 기준으로
        // nearest를 통해서 가는 방법이 기존의 방법보다 좋으면, 즉 더 짧으면
        // 더 짧은 거리로 갱신한다.
        // 알 수 있는 사실: 최단경로의 부분 경로 역시 최단경로이다.
        if (dist[nearest] + matrix[nearest][v] < dist[v]) {
          dist[v] = dist[nearest] + matrix[nearest][v];

          // 최단 경로가 갱신되므로, 정점 v에 도달하는 최단 경로 상에서
          // 바로 직전 정점은 nearest 이다.
          before[v] = nearest;
        }
      }
    });
  }

  // 최단 경로를 end 부터 역추적한다.
  function getPath(before, start, end) {
    let vertex = before[end];
    const path = [end, vertex];
    while (vertex !== start) {
      vertex = before[vertex];
      path.push(vertex);
    }
    return path.reverse();
  }
  const path = getPath(before, start, end);

  return dist[end];
}

// 문제
// 방향성 그래프의 임의의 두 정점(vertex)간 최단 거리를 리턴해야 합니다.

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
// [1, 2, 3]은 1번 정점에서 2번 정점으로 가는 방향의 거리가 3임을 의미함
// 출력
// 배열을 리턴해야 합니다.
// 주의사항
// 그래프의 임의의 두 정점간 최단 경로의 길이를 인접 행렬의 형태로 리턴해야 합니다.
// 플로이드-와샬 알고리즘을 구현해야 합니다.
// 플로이드-와샬 알고리즘을 직접 생각해내긴 어렵기 때문에 바로 학습하시기 바랍니다.
// 정점들은 서로 한방향 또는 양뱡향으로 연결되어 있습니다(방향성 그래프).
// 두 정점 간 경로가 존재하지 않는 경우, null로 표기합니다.
// 입출력 예시
// let num = 4;
// let edges = [
//   [1, 2, 6],
//   [1, 4, 9],
//   [2, 1, 8],
//   [2, 3, 10],
//   [3, 1, 3],
//   [3, 4, 5],
//   [4, 3, 4],
// ];
// let output = FloydWarshall(num, edges);
// console.log(output); // -->
// // [
// //   [0, 6, 13, 9],
// //   [8, 0, 10, 15],
// //   [3, 9, 0, 5],
// //   [7, 13, 4, 0],
// // ];

// num = 4;
// edges = [
//   [1, 2, 6],
//   [1, 3, 2],
//   [2, 3, 3],
//   [3, 2, 2],
//   [3, 4, 5],
//   [4, 2, 1],
//   [4, 3, 5],
// ];
// output = FloydWarshall(num, edges);
// console.log(output); // -->
// // [
// //   [0, 4, 2, 7],
// //   [null, 0, 3, 8],
// //   [null, 2, 0, 5],
// //   [null, 1, 4, 0],
// // ];

function createGraphByList(num, edges) {
  const _edges = {};
  for (let i = 1; i <= num; i++) _edges[i] = [];
  edges.forEach(([src, dst, weight]) => {
    _edges[src].push({ node: dst, weight: weight });
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
    matrix[src][dst] = weight;
  });
  return matrix;
}

// 인접 행렬을 통한 구현: O(V^3)
// V는 정점의 개수
function FloydWarshall(num, edges) {
  // 그래프를 생성한다.
  const matrix = createGraphByMatrix(num, edges);
  // dist는 두 정점간의 최단 거리를 저장하는 인접 행렬
  // dist[src][dst]는 정점 src로부터 정점 dst까지의 최단 거리
  // 처음에는 최초의 간선말고는 정보가 없으므로 그래프와 똑같이 초기화한다.
  const dist = createGraphByMatrix(num, edges);
  for (let stopover = 1; stopover <= num; stopover++) {
    for (let src = 1; src <= num; src++) {
      for (let dst = 1; dst <= num; dst++) {
        if (dist[src][stopover] + dist[stopover][dst] < dist[src][dst]) {
          dist[src][dst] = dist[src][stopover] + dist[stopover][dst];
        }
      }
    }
  }

  const INF = 101;
  const nulled = dist.map((row) =>
    row.map((col) => {
      if (col === INF) return null;
      else return col;
    })
  );
  return nulled.slice(1).map((row) => row.slice(1));
}

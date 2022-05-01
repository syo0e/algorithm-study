// 방향성 그래프의 한 정점(vertex)에서 다른 모든 정점까지의 최단 거리를 리턴해야 합니다.

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
// edges[i][2]은 100 이하의 정수
// [1, 2, 3]은 1번 정점에서 2번 정점으로 가는 방향의 거리가 3임을 의미함
// 인자 3: start
// number 타입의 출발 정점
// 출력
// 배열을 리턴해야 합니다.
// 주의사항
// 출발 정점으로부터 다른 모든 정점까지의 최단 경로의 길이를 요소로 갖는 배열을 리턴해야 합니다.
// 벨만-포드 알고리즘을 구현해야 합니다.
// 벨만-포드 알고리즘을 직접 생각해내긴 어렵기 때문에 바로 학습하시기 바랍니다.
// 정점들은 서로 한방향 또는 양뱡향으로 연결되어 있습니다(방향성 그래프).
// 음의 가중치를 가지고 있는 간선이 존재하는 경우, 해당 음수 가중치가 사이클(negative cycle)을 구성할 수 있습니다. 이 경우, 빈 배열을 리턴해야 합니다.
// 입출력 예시
// let num = 5;
// let edges = [
//   [1, 2, -1],
//   [1, 3, 4],
//   [2, 3, 3],
//   [2, 4, 2],
//   [2, 5, 2],
//   [4, 2, 1],
//   [5, 4, -3],
// ];
// let start = 1;
// let output = BellmanFord(num, edges, start);
// console.log(output); // --> [0, -1, 2, -2, 1]

// num = 5;
// edges = [
//   [1, 2, 2],
//   [2, 3, 3],
//   [2, 5, 1],
//   [3, 4, -4],
//   [4, 2, -1],
// ];
// start = 1;
// output = BellmanFord(num, edges, start);
// console.log(output); // --> []
// Advanced
// 벨만-포드 알고리즘은 다익스트라 알고리즘과 마찬가지로 '한 정점으로부터 각 정점 간 최단 거리(single-source shortest path)'를 구하는 알고리즘입니다.
// 각 알고리즘의 시간 복잡도는 O(V * LogV) (다익스트라, 힙 사용 시), O(V * E) (벨만-포드) 입니다. 따라서 다익스트라 알고리즘이 보다 효율적입니다. 하지만 다익스트라 알고리즘은 간선의 가중치가 음수인 경우에는 작동하지 않습니다.

// 그래프 구현이 필요없는 알고리즘: O(V * E)
// V는 정점의 개수, E는 간선의 개수
function BellmanFord(num, edges, start) {
  const INF = Number.MAX_SAFE_INTEGER;
  const dist = Array(num + 1).fill(INF);
  dist[start] = 0;

  for (let v = 1; v <= num - 1; v++) {
    edges.forEach((e) => {
      const [src, dst, weight] = e;
      // 최단경로의 부분 경로 역시 최단경로이다.
      // dist[dst], 즉 start에서 dst까지의 최단 경로는
      //  1) 중간에 거쳐서 갈 수 있는 경로가 존재하고 (dist[src] !== INF)
      //  2) 그 경로를 통해서 가는 방법이 보다 짧으면,
      //     즉 start에서 src까지 갔다가 (dist[src]), src에서 dst까지 가는 (weight) 방법이 더 짧으면,
      // 해당 방법으로 갱신(update)한다.
      if (dist[src] !== INF && dist[src] + weight < dist[dst]) {
        dist[dst] = dist[src] + weight;
      }
    });
  }

  // 음의 사이클이 존재하는지 확인하고
  // 존재하면 빈 배열을 리턴한다.
  const hasNegCycle = edges.some((e) => {
    const [src, dst, weight] = e;
    if (dist[src] !== INF && dist[src] + weight < dist[dst]) {
      return true;
    }
  });

  return hasNegCycle ? [] : dist.slice(1);
}

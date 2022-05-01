// 문제
// 세로와 가로의 길이가 각각 R, M인 2차원 R X M 배열 grid가 주어졌을 때, '1'은 땅을 의미하고 '0' 은 물을 의미합니다. 주어진 2차원 배열에 존재하는 섬의 개수를 리턴해야 합니다.

// 입력
// 인자 1 : grid
// 세로와 가로의 길이가 각각 R, M인 2차원 배열
// arr.length는 R
// arr[i].length는 M
// arr[i][j]는 0 또는 1
// 출력
// number 타입을 리턴해야 합니다.
// 주의사항
// 섬이란 물로 둘러싸여 있는 땅을 말합니다.
// 가로 혹은 세로로 땅이 연결되어 있는 경우 하나의 섬으로 간주합니다.
// 2차원 배열의 범위 밖은 물로 둘러싸여 있다고 가정합니다.
// 입출력 예시
// let grid = [
//   ['0', '1', '1', '1'],
//   ['0', '1', '1', '1'],
//   ['1', '1', '0', '0'],
// ];
// let result = countIslands(grid);
// console.log(result); // --> 1

// grid = [
//   ['0', '1', '1', '1', '0'],
//   ['0', '1', '0', '0', '0'],
//   ['0', '0', '0', '1', '0'],
//   ['1', '1', '0', '1', '0'],
//   ['1', '1', '0', '1', '0'],
// ];
// result = countIslands(grid);
// console.log(result); // --> 3

const countIslands = function (grid) {
  // dfs solution
  const HEIGHT = grid.length;
  const WIDTH = HEIGHT && grid[0].length;
  let count = 0;

  for (let row = 0; row < HEIGHT; row++) {
    for (let col = 0; col < WIDTH; col++) {
      if (grid[row][col] === "0") continue;
      count++;
      searchIsland(row, col);
    }
  }

  function searchIsland(row, col) {
    if (row < 0 || col < 0 || row >= HEIGHT || col >= WIDTH) return;
    if (grid[row][col] === "0") return;

    grid[row][col] = "0";
    searchIsland(row - 1, col);
    searchIsland(row + 1, col);
    searchIsland(row, col - 1);
    searchIsland(row, col + 1);
  }

  return count;
};

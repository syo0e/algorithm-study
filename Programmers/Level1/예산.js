function solution(d, budget) {
  d.sort((a, b) => a - b);

  let result = 0;

  for (let i = 0; result <= budget; i++) {
    if (result + d[i] <= budget) {
      result += d[i];
      continue;
    }

    return i;
  }
}

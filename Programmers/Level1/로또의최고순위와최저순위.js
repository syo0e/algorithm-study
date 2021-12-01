function solution(lottos, win_nums) {
  lottos.sort((a, b) => a - b);
  win_nums.sort((a, b) => a - b);

  var answer = [];

  const zeros = lottos.filter((lotto) => lotto === 0).length;
  const correct = lottos.filter((lotto) => win_nums.includes(lotto)).length;

  let min = 7 - correct >= 6 ? 6 : 7 - correct;
  let max = min - zeros < 1 ? 1 : min - zeros;

  answer = [max, min];
  return answer;
}

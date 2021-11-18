function solution(answers) {
  let answer = [];

  const oneRule = [1, 2, 3, 4, 5];
  const twoRule = [2, 1, 2, 3, 2, 4, 2, 5];
  const threeRule = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  //주어진 배열에서 수포자의 규칙으로 풀었을 때 맞은 답만 거르기(완전탐색)
  let oneAnswer = answers.filter((el, i) => el === oneRule[i % 5]).length;
  let twoAnswer = answers.filter((el, i) => el === twoRule[i % 8]).length;
  let threeAnswer = answers.filter((el, i) => el === threeRule[i % 10]).length;

  // 세 사람 점수 중 최대값 구하기
  let max = Math.max(oneAnswer, twoAnswer, threeAnswer);

  //최대값과 일치한 점수면 answer에 저장
  if (oneAnswer === max) answer.push(1);
  if (twoAnswer === max) answer.push(2);
  if (threeAnswer === max) answer.push(3);

  return answer;
}

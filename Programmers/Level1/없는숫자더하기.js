function solution(numbers) {
  let correct = 0;
  let miss = 0;

  for (let i = 0; i <= 9; i++) {
    correct = correct + i;
  }

  for (let j = 0; j < numbers.length; j++) {
    miss = miss + numbers[j];
  }

  return correct - miss;
}

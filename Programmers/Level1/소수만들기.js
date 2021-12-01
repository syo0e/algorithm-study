function solution(nums) {
  let answer = 0;

  //1. 3자리 숫자 만들기
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      for (let k = j + 1; k < len; k++) {
        const number = nums[i] + nums[j] + nums[k];
        if (isPrime(number)) answer++;
      }
    }
  }
  //2. 소수 판별
  function isPrime(number) {
    if (number < 2) return true;
    for (let i = 2; i < number; i++) {
      if (number % i == 0) return false;
    }
    return true;
  }
  return answer;
}

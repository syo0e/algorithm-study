function solution(nums) {
  let answer = 0;
  let able = nums.length / 2;

  let only = [...new Set(nums)].sort((a, b) => a - b);

  if (only.length > able) {
    return able;
  } else {
    return only.length;
  }
}

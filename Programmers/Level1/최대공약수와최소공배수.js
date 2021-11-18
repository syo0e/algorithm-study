//최대 공약수
function gcd(max, min) {
  if (max % min === 0) {
    return min;
  } else {
    return gcd(min, max % min);
  }
}
//최소 공배수
function lcm(max, min) {
  return (max * min) / gcd(max, min);
}
function solution(n, m) {
  const max = Math.max(m, n);
  const min = Math.min(m, n);
  return [gcd(max, min), lcm(max, min)];
}

function isOdd(num) {
  // TODO: 여기에 코드를 작성합니다.
  let abs = Math.abs(num);
  if (abs === 0) return false;
  if (abs === 1) return true;
  if (abs === 2) return false;

  return isOdd(abs - 2);
}

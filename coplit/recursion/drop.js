function drop(num, arr) {
  // TODO: 여기에 코드를 작성합니다.
  let min = Math.min(num, arr.length);
  const tail = arr.slice(1);

  if (arr.length === 0 || num === 0) return arr;
  return drop(min - 1, tail);
}

function take(num, arr) {
  // TODO: 여기에 코드를 작성합니다.
  const head = arr[0];
  const tail = arr.slice(1);

  if (num === 0 || arr.length === 0) return [];
  if (num === 1) return head;
  return [head].concat(take(num - 1, tail));
}

function and(arr) {
  // TODO: 여기에 코드를 작성합니다.
  if (arr.length === 0) return true;
  const head = arr[0];
  const tail = arr.slice(1);

  return head && and(tail);
}

function arrSum(arr) {
  // TODO: 여기에 코드를 작성합니다.
  const head = arr[0];
  const tail = arr.slice(1);

  if (arr.length === 0) return 0;
  return head + arrSum(tail);
}

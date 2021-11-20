function arrProduct(arr) {
  // TODO: 여기에 코드를 작성합니다.
  let head = arr[0];
  let tail = arr.slice(1);
  if (arr.length === 0) return 1;
  return head * arrProduct(tail);
}

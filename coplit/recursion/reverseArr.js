function reverseArr(arr) {
  // TODO: 여기에 코드를 작성합니다.
  const head = arr[arr.length - 1];
  const tail = arr.slice(0, arr.length - 1);
  if (arr.length === 0) return [];
  if (arr.length === 1) return head;

  return [head].concat(reverseArr(tail));
}

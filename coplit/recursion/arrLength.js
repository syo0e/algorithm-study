function arrLength(arr) {
  // TODO: 여기에 코드를 작성합니다.
  if (arr.isEmpty()) return 0;
  const tail = arr.slice(1);

  return 1 + arrLength(tail);
}

//   arr.isEmpty()를 통해 배열이 비어있는지 확인할 수 있습니다.
//   해당 메소드는 표준 자바스크립트 내장 메소드가 아니며, 문제를 위해 새롭게 정의된 커스텀 메소드입니다. 이 문제에서만 사용하시길 바랍니다.
//   [ ].isEmpty() === true
//   [1, 2].isEmpty() === false

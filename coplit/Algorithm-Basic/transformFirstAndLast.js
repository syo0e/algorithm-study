function transformFirstAndLast(arr) {
  // TODO: 여기에 코드를 작성합니다.
  let obj = {};
  if (arr.length === 0) {
    return {};
  }
  obj[arr[0]] = arr[arr.length - 1];

  return obj;
}

// 배열을 입력받아 차례대로 배열의 첫 요소와 마지막 요소를 키와 값으로 하는 객체를 리턴해야 합니다.

function convertListToObject(arr) {
  // TODO: 여기에 코드를 작성합니다.
  // 1. 객체 생성
  let obj = {};
  // 2. 이중 배열 분해 해서, 각 요소, 키와 값으로 지정 해주기

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > 0 && obj[arr[i][0]] === undefined) {
      obj[arr[i][0]] = arr[i][1];
    }
  }
  return obj;
}

// 2차원 배열(배열을 요소로 갖는 배열)을 입력받아 각 배열을 이용해 만든 객체를 리턴해야 합니다.

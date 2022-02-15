function powerOfTwo(num) {
  // TODO: 여기에 코드를 작성합니다.
  while (num > 1) {
    num = num / 2;
  }

  if (num === 1) {
    return true;
  } else {
    return false;
  }
}

// 수를 입력받아 2의 거듭제곱인지 여부를 리턴해야 합니다.

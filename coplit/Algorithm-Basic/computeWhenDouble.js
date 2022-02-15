function computeWhenDouble(interestRate) {
  // TODO: 여기에 코드를 작성합니다.
  let time = 0;
  let origin = 1;
  let rate = origin + interestRate / 100;

  while (origin < 2) {
    origin = origin * rate;
    time++;
  }

  return time;
}

// 연이율을 입력받아 원금이 2배 이상이 될 때까지 걸리는 시간(년)을 리턴해야 합니다.

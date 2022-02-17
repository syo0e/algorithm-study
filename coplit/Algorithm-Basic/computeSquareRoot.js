//초기 추측값의 함수
//num은 어떤수의 제곱수 사이에 존재한다.
function squareroot(num) {
  var lo = 0,
    hi = num;

  while (lo <= hi) {
    var mid = Math.floor((lo + hi) / 2);

    //제곱수 사이의 중간값을 num의 제곱근이라고 임의로 가정(hi)
    if (mid * mid > num) hi = mid - 1;
    else lo = mid + 1;
  }
  return hi;
}

//hi의 제곱이 num인지 확인

function computeSquareRoot(num) {
  let est = squareroot(num);

  if (Math.pow(est) === num) {
    return est;
  } else {
    while (est * est < num) {
      //아니라면 다시 재귀함수 돌기
      //이 재귀는 guess와 num의 오차가 플마 0.01보다 작을 때 끝내기

      est += 0.01;
    }
  }
  return Number(est.toFixed(2));
}

// 수를 입력받아 제곱근 값을 소수점 두 자리까지 리턴해야 합니다.

// function computeSquareRoot(num) {
//   const diffs = [1, 0.1, 0.01, 0.001];
//   let base = 1;
//   for (let i = 0; i < diffs.length; i++) {
//     while (base * base < num) {
//       base = base + diffs[i];
//     }

//     if (base * base === num) {
//       return base;
//     } else {
//       base = base - diffs[i];
//     }
//   }
//   return Number(base.toFixed(2));
// }

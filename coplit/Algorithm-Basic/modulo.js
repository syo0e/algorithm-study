function modulo(num1, num2) {
  // TODO: 여기에 코드를 작성합니다.
  if (num2 === 0) {
    return "Error: cannot divide by zero";
  }
  while (num1 >= num2) {
    num1 = num1 - num2;
  }
  return num1;
}

// 두 수(num1, num2)를 입력받아, num1를 num2로 나눈 나머지를 리턴해야 합니다.
// 나눗셈(/), 나머지(%) 연산자 사용은 금지됩니다.
// 0은 어떤 수로 나누어도 나머지가 0입니다.
// 어떤 수도 0으로 나눌 수 없습니다. 이 경우 'Error: cannot divide by zero'를 리턴해야 합니다.

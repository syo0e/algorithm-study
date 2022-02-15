function insertDash(str) {
  // TODO: 여기에 코드를 작성합니다.
  let numbers = str.split("");

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i - 1] % 2 !== 0 && numbers[i] % 2 !== 0) {
      numbers[i - 1] = numbers[i - 1] + "-";
    }
  }
  return numbers.join("");
}

function ABCheck(str) {
  if (str === "") {
    return false;
  }

  str = str.toLowerCase();

  for (let i = 0; i < str.length; i++) {
    if (
      (str[i] === "a" && str[i + 4] === "b") ||
      (str[i] === "b" && str[i + 4] === "a")
    ) {
      return true;
    }
  }
  return false;
}

// 문자열을 입력받아 문자열 내에 아래 중 하나가 존재하는지 여부를 리턴해야 합니다.

// 'a'로 시작해서 'b'로 끝나는 길이 5의 문자열
// 'b'로 시작해서 'a'로 끝나는 길이 5의 문자열

function convertDoubleSpaceToSingle(str) {
  // TODO: 여기에 코드를 작성합니다.
  let words = str.split(" ");
  let arr = [];

  for (let i = 0; i < words.length; i++) {
    if (words[i].length > 0) {
      arr.push(words[i]);
    }
  }

  return arr.join(" ");
}

// 문자열을 입력받아 해당 문자열에 등장하는 두 칸의 공백을 모두 한 칸의 공백으로 바꾼 문자열을 리턴해야 합니다.

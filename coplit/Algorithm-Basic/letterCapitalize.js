function letterCapitalize(str) {
  // TODO: 여기에 코드를 작성합니다.
  let words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    if (words[i].length > 0) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
  }

  str = words.join(" ");

  return str;
}

// 문자열을 입력받아 문자열을 구성하는 각 단어의 첫 글자가 대문자인 문자열을 리턴해야 합니다.

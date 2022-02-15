function isIsogram(str) {
  let newStr = str.toLowerCase();
  let result = true;

  if (str.length === 0) {
    return result;
  }

  for (let i = 0; i < newStr.length; i++) {
    for (let j = i + 1; j < newStr.length; j++) {
      if (newStr[i] === newStr[j]) {
        result = false;
      }
    }
  }
  return result;
}

// 문자열을 입력받아 아이소그램인지 여부를 리턴해야 합니다. 아이소그램(isogram)은 각 알파벳을 한번씩만 이용해서 만든 단어나 문구를 말합니다.

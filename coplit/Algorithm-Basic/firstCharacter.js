// 문자열을 입력받아 문자열을 구성하는 각 단어의 첫 글자로 이루어진 문자열을 리턴해야 합니다.

function firstCharacter(str) {
  // TODO: 여기에 코드를 작성합니다.
  let answer = "";
  if (str.length === 0) {
    return "";
  }

  let words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    answer = answer + words[i][0];
  }

  return answer;
}

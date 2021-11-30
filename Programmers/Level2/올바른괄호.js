function solution(s) {
  let answer = true;

  if (s.charAt(0) === ")" || s.charAt(s.length - 1) === "(") answer = false;

  const a = s.split("").filter((s) => s === "(").length;
  const b = s.split("").filter((s) => s === ")").length;

  if (a !== b) answer = false;

  let cntOpen = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") cntOpen++;
    else cntOpen--;

    if (cntOpen < 0) answer = false;
  }

  return answer;
}

function solution(s) {
  let arr = s.split(" ");
  return arr
    .map((el) => {
      let str = "";
      for (let i = 0; i < el.length; i++) {
        if (i % 2 === 0) {
          str = str + el[i].toUpperCase();
        } else {
          str = str + el[i].toLowerCase();
        }
      }
      return str;
    })
    .join(" ");
}

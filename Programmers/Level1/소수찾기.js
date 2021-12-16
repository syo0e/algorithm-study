const nArr = new Array(n).fill(1);
//console.log(nArr)
nArr[0] = 0;
for (let i = 2; i * i <= n; i++) {
  //제곱근까지 순회

  for (let j = i * i; j <= n; j += i) {
    nArr[j - 1] = 0;
  }
}

return nArr.filter((el) => el == 1).length;

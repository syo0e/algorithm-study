function solution(a, d, included) {
    return included.reduce((acc,cur,i) => {
        return cur ? acc + a + d * i : acc
    },0 )
}
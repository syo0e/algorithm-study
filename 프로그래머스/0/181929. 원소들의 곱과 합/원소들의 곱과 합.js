function solution(num_list) {
    return num_list.reduce((a,c) => a*c,1)  <  Math.pow(num_list.reduce((a,c) => a+c),2) ? 1 : 0;
}
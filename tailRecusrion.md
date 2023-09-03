꼬리 재귀 방식
그럼 이제 꼬리 재귀 방식을 사용해서 팩토리얼 연산을 한번 해보자. 앞서 꼬리 재귀는 '재귀 호출이 끝나면 아무 일도 하지 않고 결과만 바로 반환되도록 하는' 방법이라고 언급했다. 코드의 마지막 부분을 보면, 일반적인 재귀에서는 n * factorial(n-1) 를 반환했던 것과는 달리 곱하기 같은 연산 없이 factorial(n - 1, n * total)이라는 값만 반환하는 것을 볼 수 있다. 꼬리 재귀 방식에서는 total이라는 이미 곱셈 연산을 마친 값을 매개변수로 두었기 때문이다.
 
function factorial(n, total = 1){
    if(n === 1){
        return total;
    }
    return factorial(n - 1, n * total);
}
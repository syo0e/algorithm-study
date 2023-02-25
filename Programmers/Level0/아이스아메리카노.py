def solution(money):
    americano = money // 5500
    change = money % 5500
    return [americano, change]
def solution(n, k):    
    price_food = n * 12000		#1
    
    if n >= 10:					#2
        price_drink = (k - n // 10) * 2000	#3 
    else :
        price_drink = k * 2000		#4
    
    answer = price_food + price_drink	#5
    return answer
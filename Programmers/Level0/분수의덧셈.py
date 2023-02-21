import math

def solution(numer1, denom1, numer2, denom2):
    top = denom1*numer2 + denom2*numer1
    bottom = denom1*denom2
    n = math.gcd(top,bottom)
    
    if n == 1:
        return [top, bottom]
    else:
        return [top/n, bottom/n]

import math

def IsPrime(num):
    a = int(math.sqrt(num))
    if num == 1:
        return False
    else:
        for i in range(2, a+1):
            if num % i == 0: 
                return False
        return True

Num_list = list(range(2,246912))
Sort_list = []
for i in Num_list:
    if IsPrime(i):
         Sort_list.append(i)

while True:
    n = int(input())
    if n == 0:
        break
    cnt = 0
    for i in Sort_list:
        if n < i <= n*2:
            cnt += 1
    print(cnt)     
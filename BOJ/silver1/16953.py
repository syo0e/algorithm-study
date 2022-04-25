a,b = map(int, input().split())
r = 1
while(b!=a): 
    r+=1
    temp = b

    if b % 10 == 1:
        b // = 10
    
    elif b % 2 == 0:
        b  // = 2

    if temp == b:
        print(-1)
        break
else:
    print(r)
# 2를 최대한 덜 나누어야 한다.

 #만약 마지막 자리가 1일 경우 빼고 2로 나눈다.

 # 못만들경우 -1 리턴
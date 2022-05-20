n = int(input())
t = n
for i in range(1, n+1):
    print(''*(t-i)+'*'*i)
for k in range(1,t):
    print(''*k+'*'*(t-k))
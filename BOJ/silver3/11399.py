n = int(input())
s = list(map(int, input().split()))

s.sort()

for i in range(1, n):
    s[i] += s[i-1]
    
print(sum(s))
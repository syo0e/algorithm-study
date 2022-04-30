n = int(input())

arr = list(map(int,input().split()))
arr.sort()

count = 1

for i in arr:
    if count < i:
        break
    count += i

print(count)
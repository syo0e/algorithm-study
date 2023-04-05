import sys

input = sys.stdin.readline

n, m = map(int, input().split())

array = list(map(int, input().split()))
prefix_sum = [0] # init prefix_sum

temp = 0

for i in arr:
    temp += i
    prefix_sum.append(temp)


for i in range(m):
    start,end = map(int, input().split())
    print()
    print(prefix_sum[end] - prefix_sum[start-1])
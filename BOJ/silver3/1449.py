a, b = map(int,input().split())

arr = list(map(int,input().split()))
arr.sort()

tape = 1

start = arr[0]
end = start + b - 0.5

for i in arr:
    if end >= i:
        continue
    else:
        tape += 1
        end = i + b - 0.5

print(tape)


        
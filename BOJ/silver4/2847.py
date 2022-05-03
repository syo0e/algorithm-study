n = int(input())

score = []
count = 0

for i in range(n):
    score.append(int(input()))

for i in range(n-1, 0, -1):
    if score[i] <= score[i-1]:
        count += score[i-1] - score[i] + 1
        score[i-1] = score[i] - 1


print(count)

# 오늘 배운 것 :
# 파이썬 반복문은 뒤에서부터 간격을 설정해서 셀 수 있다
# 세번째 인자 = 간격
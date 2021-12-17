# 4673번 : 셀프 넘버
natural_num = set(range(1, 10001))
generated_num = set()

for i in range(1, 10001):       # i = 850
    for j in str(i):            # j = "8", "5", "0"
        i += int(j)             # 850 + 8 + 5 + 0, i = 863
    generated_num.add(i)        # 생성자가 있는 숫자들

self_num = sorted(natural_num - generated_num)
for i in self_num:
    print(i)

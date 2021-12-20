n = int(input())

nums_pileup = 1 #벌집의 개수, 1개부터 시작
cnt = 1

while n > nums_pileup : 
    nums_pileup += 6 * cnt
    cnt += 1
    
print(cnt)
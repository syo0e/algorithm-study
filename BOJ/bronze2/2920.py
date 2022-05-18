n = list(map(int,input().split()))

numbers = [1,2,3,4,5,6,7,8]

if n == numbers:
    print("ascending")
    
elif n == numbers[::-1]:
    print("descending")
    
else:
    print("mixed")

    # sorted와 sort의 차이
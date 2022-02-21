def solution(x):
    return x % sum([int(x) for x in str(x)]) == 0

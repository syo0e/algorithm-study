def solution(emergency):
    answer = []
    tmp = sorted(emergency, reverse = True)
    
    for i in emergency:
        answer.append(tmp.index(i)+1)
    return answer
def solution(phone_number):
    star = "*"*(len(phone_number)-4)
    last = phone_number[len(phone_number)-4:]
    return star + last

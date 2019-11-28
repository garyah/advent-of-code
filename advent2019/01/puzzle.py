def parse(lines):
    ans = []
    for line in lines:
        ans.append(int(line))
    return ans
def solve(data):
    total = 0
    for num in data:
        total = total + num
    return total
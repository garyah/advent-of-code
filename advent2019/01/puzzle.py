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
def solve_p2(data):
    s = set()
    freq = 0
    s.add(freq)
    while True:
        for change in data:
            freq += change
            if freq in s:
                return freq
            s.add(freq)
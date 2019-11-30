import unittest
import puzzle
class TestBasic(unittest.TestCase):
    def test_pass(self):
        data = puzzle.parse(file("advent2019/01/input.txt").readlines())
        answer = puzzle.solve(data)
        self.assertEqual(445, answer)
    def test_pass_p2(self):
        data = puzzle.parse(file("advent2019/01/input.txt").readlines())
        answer = puzzle.solve_p2(data)
        self.assertEqual(219, answer)
    def test_basic_parse(self):
        data = puzzle.parse('''+1
        +3
        +2'''.split())
        self.assertEqual([1, 3, 2], data)
    def test_basic_solve(self):
        data = [1, 1, -2]
        self.assertEqual(0, puzzle.solve(data))
    def test_basic_solve_p2a(self):
        data = [+1, -1]
        self.assertEqual(0, puzzle.solve_p2(data))
    def test_basic_solve_p2b(self):
        data = [+3, +3, +4, -2, -4]
        self.assertEqual(10, puzzle.solve_p2(data))
    def test_basic_solve_p2c(self):
        data = [-6, +3, +8, +5, -6]
        self.assertEqual(5, puzzle.solve_p2(data))
    def test_basic_solve_p2d(self):
        data = [+7, +7, -2, -7, -4]
        self.assertEqual(14, puzzle.solve_p2(data))
if __name__ == '__main__':
    unittest.main()
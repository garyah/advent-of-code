import unittest
import puzzle
class TestBasic(unittest.TestCase):
    def test_pass(self):
        data = puzzle.parse(file("advent2019/01/input.txt").readlines())
        answer = puzzle.solve(data)
        self.assertEqual(445, answer)
    def test_basic_parse(self):
        data = puzzle.parse('''+1
        +3
        +2'''.split())
        self.assertEqual([1, 3, 2], data)
    def test_basic_solve(self):
        data = [1, 1, -2]
        self.assertEqual(0, puzzle.solve(data))
if __name__ == '__main__':
    unittest.main()
describe("puzzle", function() {
  const Parser = require('../../common/parser');
  const Puzzle = require('./puzzle');
  const parser = new Parser();
  const puzzle = new Puzzle();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/01/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
  // xit("should be able to solve puzzle", () => {
  //   const data = [[+1, +1, +1], [1, 1, -2], [-1, -2, -3]];
  //   const actual = data.map((data) => puzzle.solve(data));
  //   const expected = [3, 0, -6];
  //   expect(actual).toEqual(expected);
  // });
  // xit("should be able to parse input", () => {
  //   const data = puzzle.parse('+1 +3 +2'.split(' '));
  //   expect(data).toEqual([1, 3, 2]);
  // });
  it("should be able solve puzzle with my input", () => {
    const data = puzzle.parse(lines);
    const answer = puzzle.solve(data);
    expect(answer).toEqual(3389778);
  });
  // xit("should be able to solve puzzle part 2", () => {
  //   const data = [[+1, -1], [+3, +3, +4, -2, -4], [-6, +3, +8, +5, -6], [+7, +7, -2, -7, -4]];
  //   const actual = data.map((data) => puzzle.solve_p2(data));
  //   const expected = [0, 10, 5, 14];
  //   expect(actual).toEqual(expected);
  // });
  // xit("should be able solve puzzle part 2 with my input", () => {
  //   const data = puzzle.parse(lines);
  //   expect(puzzle.solve_p2(data)).toEqual(0);
  // });
});

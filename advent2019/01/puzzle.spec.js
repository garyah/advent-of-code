describe("puzzle", function() {
  const Parser = require('../../common/parser');
  const Puzzle = require('./puzzle');
  const parser = new Parser();
  const puzzle = new Puzzle();
  it("should be able to solve puzzle", () => {
    const data = [[+1, +1, +1], [1, 1, -2], [-1, -2, -3]];
    const actual = data.map((data) => puzzle.solve(data));
    const expected = [3, 0, -6];
    expect(actual).toEqual(expected);
  });
  it("should be able to parse input", () => {
    const data = puzzle.parse('+1 +3 +2'.split(' '));
    expect(data).toEqual([1, 3, 2]);
  });
  xit("should be able solve with my input", (done) => {
    // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
    parser.readLines(undefined, (lines) => {
      const data = puzzle.parse(lines);
      expect(puzzle.solve(data)).toEqual(0);
      done();
    });
  })
});

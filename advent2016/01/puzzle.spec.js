describe("2016 day 1", function() {
  const Parser = require('../../common/parser');
  const Puzzle = require('./puzzle');
  const parser = new Parser();
  const puzzle = new Puzzle();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2016 day 1:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2016/01/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
  it("should be able to solve puzzle", () => {
    const data = [[], [], []];
    const actual = data.map((data) => puzzle.solve(data));
    const expected = [0, 0, 0];
    expect(actual).toEqual(expected);
  });
  // it("should be able to parse input", () => {
  //   const data = puzzle.parse('+1 +3 +2'.split(' '));
  //   expect(data).toEqual([1, 3, 2]);
  // });
  // it("should be able solve puzzle with my input", () => {
  //   const data = puzzle.parse(lines);
  //   const answer = puzzle.solve(data);
  //   console.log("part 1 answer is " + answer);
  //   expect(answer).toEqual(0);
  // });
  // it("should be able to solve puzzle part 2", () => {
  //   const data = [[], [], []];
  //   const actual = data.map((data) => puzzle.solve_p2(data));
  //   const expected = [0, 0, 0];
  //   expect(actual).toEqual(expected);
  // });
  // it("should be able solve puzzle part 2 with my input", () => {
  //   const data = puzzle.parse(lines);
  //   const answer = puzzle.solve_p2(data);
  //   console.log("part 2 answer is " + answer);
  //   expect(answer).toEqual(0);
  // });
});

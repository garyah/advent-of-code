describe("2019 day 4 part 2", function() {
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 4 part 2:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/04/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
  it("should be able to solve puzzle", () => {
    const data = [[112233, 112233], [123444, 123444], [111122, 111122]];
    // const data = [[123444, 123444]];
    const actual = data.map((data) => puzzle.solve(data));
    const expected = [1, 0, 1];
    // const expected = [0];
    expect(actual).toEqual(expected);
  });
  it("should be able to parse input", () => {
    const data = puzzle.parse(['130254', '678275']);
    expect(data).toEqual([130254, 678275]);
  });
  it("should be able solve puzzle with my input", () => {
    const data = puzzle.parse(lines);
    const answer = puzzle.solve(data);
    console.log("part 2 answer is " + answer);
    expect(answer).toEqual(1419);
  });
});

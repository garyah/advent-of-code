describe("2019 day 3", function() {
  const Parser = require('../../common/parser');
  const Puzzle = require('./puzzle');
  const parser = new Parser();
  const puzzle = new Puzzle();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 3:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/03/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
  it("should be able to parse input", () => {
    const data = puzzle.parse(["R1000,U573,L25,U468", "R1000,U573,L25,U468"]);
    expect(data).toEqual(data);
  });
  it("should be able to solve puzzle part 2", () => {
    const data = [["R8,U5,L5,D3", "U7,R6,D4,L4"]];
    const actual = data.map((data) => puzzle.solve_p2(data));
    const expected = [30];
    expect(actual).toEqual(expected);
  });
  it("should be able solve puzzle part 2 with my input", () => {
    const data = puzzle.parse(lines);
    const answer = puzzle.solve_p2(data);
    console.log("part 2 answer is " + answer);
    expect(answer).toEqual(3454);
  });
});

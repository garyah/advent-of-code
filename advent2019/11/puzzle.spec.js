describe("2019 day 11", function() {
  it("can paint remembering how many painted at least once (incomplete)", () => {
    puzzle.initState();
    puzzle.countPainted();
    expect(puzzle.getNumPainted()).toEqual(0);

    expect(puzzle.nextInput()).toEqual(0);
    puzzle.nextOutput(1);
    puzzle.nextOutput(0);
    expect(puzzle.nextInput()).toEqual(0);
    puzzle.nextOutput(0);
    puzzle.nextOutput(0);
    puzzle.nextOutput(1);
    puzzle.nextOutput(0);
    puzzle.nextOutput(1);
    puzzle.nextOutput(0);
    expect(puzzle.nextInput()).toEqual(1);
  });
  it("can parse input", () => {
    const data = puzzle.parse(
      ['+1,-3,+2']);
    expect(data).toEqual([1, -3, 2]);
  });
  it("can solve puzzle with my input", () => {
    const data = puzzle.parse(lines);
    const answer = puzzle.solve(data);
    console.log("part 1 answer is " + answer);
    expect(answer).toEqual(2160);
  });
  it("can show puzzle solution for part 2 with my input", () => {
    const data = puzzle.parse(lines);
    puzzle.solve_p2(data);
    console.log("part 2 answer is shown here:");
    puzzle.printPanels();
  });











  // boilerplate
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 6:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/11/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

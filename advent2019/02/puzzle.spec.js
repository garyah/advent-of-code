describe("2019 day 2", function() {
  const Parser = require('../../common/parser');
  const Puzzle = require('./puzzle');
  const parser = new Parser();
  const puzzle = new Puzzle();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 2:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/02/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
  it("should be able to transform parsed input", () => {
    const data = [
      [1,9,10,3,2,3,11,0,99,30,40,50],
      [1,0,0,0,99], [2,3,0,3,99],
      [2,4,4,5,99,0], [1,1,1,4,99,5,6,0,99]
    ];
    const actual = data.map((data) => puzzle.transform(data));
    const expected = [
      [3500,9,10,70,
      2,3,11,0,
      99,
      30,40,50],
      [2,0,0,0,99], [2,3,0,6,99],
      [2,4,4,5,99,9801], [30,1,1,4,2,5,6,0,99]
    ];
    // console.log('actual: ', actual);
    // console.log('expected: ', expected);
    expect(actual).toEqual(expected);
  });
  it("should be able to parse input", () => {
    const data = puzzle.parse(['1,2,3']);
    expect(data).toEqual([1, 2, 3]);
  });
  it("should be able solve puzzle with my input", () => {
    const data = puzzle.parse(lines);
    const answer = puzzle.solve(data);
    console.log("part 1 answer is " + answer);
    expect(answer).toEqual(6327510);
  });
  it("should be able solve puzzle part 2 with my input", () => {
    const data = puzzle.parse(lines);
    const answer = puzzle.solve_p2(data);
    console.log("part 2 answer is " + answer);
    expect(answer).toEqual(4112);
  });
});

describe("2019 day 5", function() {
  it("should be able to parse input", () => {
    const data = puzzle.parse(['1,2,3']);
    expect(data).toEqual([1, 2, 3]);
  });
  it("should be able to transform parsed input", () => {
    puzzle.setInput(0);
    const data = [
      [3,0,4,0,99],
      [1002,4,3,4,33]
    ];
    const actual = data.map((data) => puzzle.transform(data));
    const expected = [
      [0,0,4,0,99],
      [1002,4,3,4,99]
    ];
    // console.log('actual: ', actual);
    // console.log('expected: ', expected);
    expect(actual).toEqual(expected);
  });
  it("should be able solve puzzle with my input", () => {
    const data = puzzle.parse(lines);
    const answer = puzzle.solve(data);
    console.log("part 1 answer is " + answer);
    expect(answer).toEqual(2845163);
  });
  it("should be able to compare correctly", () => {
    puzzle.setInput(0);
    const data = [
      [8, [3,9,8,9,10,9,4,9,99,-1,8]], [7, [3,9,8,9,10,9,4,9,99,-1,8]],
      [7, [3,9,7,9,10,9,4,9,99,-1,8]], [8, [3,9,7,9,10,9,4,9,99,-1,8]],
      [8, [3,3,1108,-1,8,3,4,3,99]], [7, [3,3,1108,-1,8,3,4,3,99]],
      [7, [3,3,1107,-1,8,3,4,3,99]], [8, [3,3,1107,-1,8,3,4,3,99]],
    ];
    const actual = data.map(([inputValue, data]) => {
      puzzle.setInput(inputValue);
      puzzle.transform(data);
      return puzzle.getOutput();
    });
    const expected = [
      1, 0,
      1, 0,
      1, 0,
      1, 0,
    ];
    // console.log('actual: ', actual);
    // console.log('expected: ', expected);
    // expect(actual).toEqual(expected);
  });
  it("should be able to handle jumps correctly", () => {
    puzzle.setInput(0);
    const data = [
      [1, [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9]],
      [0, [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9]],
      [1, [3,3,1105,-1,9,1101,0,0,12,4,12,99,1]],
      [0, [3,3,1105,-1,9,1101,0,0,12,4,12,99,1]],
    ];
    const actual = data.map(([inputValue, data]) => {
      // console.log('inputValue: ', inputValue);
      puzzle.setInput(inputValue);
      puzzle.transform(data);
      // console.log('output: ', puzzle.getOutput());
      return puzzle.getOutput();
    });
    const expected = [
      1, 0,
      1, 0,
    ];
    // console.log('actual: ', actual);
    // console.log('expected: ', expected);
    expect(actual).toEqual(expected);
  });
  it("should be able to handle complex programs", () => {
    puzzle.setInput(0);
    const data = [
      [7, [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
           1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
           999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]],
      [8, [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
           1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
           999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]],
      [9, [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
           1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
           999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]],
    ];
    const actual = data.map(([inputValue, data]) => {
      puzzle.setInput(inputValue);
      puzzle.transform(data);
      return puzzle.getOutput();
    });
    const expected = [
      999, 1000, 1001
    ];
    // console.log('actual: ', actual);
    // console.log('expected: ', expected);
    expect(actual).toEqual(expected);
  });
  it("should be able solve puzzle part 2 with my input", () => {
    const data = puzzle.parse(lines);
    const answer = puzzle.solve_p2(data);
    console.log("part 2 answer is " + answer);
    expect(answer).toEqual(9436229);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  const parser = new Parser();
  const puzzle = require('./puzzle');
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 5:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/05/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

describe("2021 day 02", function() {
  // new code
  let var1 = 0;
  let var2 = '';
  const fn1 = (arg1 = 0, arg2 = '', arg3 = []) => {
    if (1) {}
    else if (1) {}
    else {}
    for (let i = 0;; i++) { break; continue; }
    for (const item of arg3) {}
    return 0;
  };
  const fn2 = () => {
    return '';
  };
  const solve = (data = []) => {
    let hor = 0;
    let depth = 0;
    data.reduce((sum, val) => {
      if (val.direction === 0) hor += val.distance;
      if (val.direction === -1) depth -= val.distance;
      if (val.direction === 1) depth += val.distance;
      return 0;
    }, 0);
    return hor * depth;
  }
  const solve_p2 = (data = []) => {
    let hor = 0;
    let depth = 0;
    let aim = 0;
    data.reduce((sum, val) => {
      if (val.direction === 0) {
        hor += val.distance;
        depth += aim * val.distance;
      }
      if (val.direction === -1) aim -= val.distance;
      if (val.direction === 1) aim += val.distance;
      return 0;
    }, 0);
    return hor * depth;
  }
  const parse = (lines = ['']) => {
    // return parser.getFirstLine(lines);
    // return lines;    // use for multi-line string input
    // return parser.linesToInts(lines);
    // return parser.linesToFloats(lines);
    return parser.linesToDirCommands(lines);
  };















  // new tests
  it('fn1() returns number 0', () => {
    expect(fn1()).toEqual(
      0
      );
  });
  it('fn2() returns empty string', () => {
    expect(fn2()).toEqual(
      ''
      );
  });
  it("can parse input", () => {
    const data = parse(
      ['forward 9', 'up 1']
      );
    expect(data).toEqual([{direction: 0, distance: 9}, {direction: -1, distance: 1}]);
  });
  it("can solve puzzle", () => {
    const data = [
      [],
    ];
    // const actual = data.map((data) => solve(data));
    const expected = [
      1,
    ];
    // expect(actual).toEqual(expected);
  });
  it("can solve puzzle p2", () => {
    const data = [
      [],
    ];
    // const actual = data.map((data) => solve_p2(data));
    const expected = [
      1,
    ];
    // expect(actual).toEqual(expected);
  });
  it("can solve puzzle with my input", () => {
    // const data = [0];
    const data = parse(lines);
    const answer = solve(data);
    console.log("part 1 answer is " + answer);
    expect(answer).toEqual(2091984);
  });
  it("can solve puzzle p2 with my input", () => {
    // const data = [0];
    const data = parse(lines);
    const answer = solve_p2(data);
    console.log("part 2 answer is " + answer);
    expect(answer).toEqual(2086261056);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  // const puzzle = require('../../common/puzzleWithCode');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2021 day 02:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/02/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

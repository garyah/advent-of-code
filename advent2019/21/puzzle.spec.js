describe("2019 day 21", function() {
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
  const solve = (data = [0]) => {
    fn1();
    return data.reduce((sum, num) => {
      return sum + num;
    }, 0);
  }
  const parse = (lines = ['']) => {
    // return lines[0]; // use for one line string input
    // return lines;    // use for multi-line string input
    return lines.map((line) => parseInt(line)).filter((num) => num === num);
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
  it("can solve puzzle", () => {
    const data = [
      [],
    ];
    const actual = data.map((data) => puzzle.solve(data));
    const expected = [
      1,
    ];
    // expect(actual).toEqual(expected);
  });
  it("can parse input", () => {
    // const data = parse(
    //   '+1 +3 +2'
    //   .split(
    //     ' '
    //     ));
    // expect(data).toEqual([1, 3, 2]);
  });
  it("can solve puzzle with my input", () => {
    // const data = [0];
    const data = puzzle.parse(lines);
    const answer = puzzle.solve(data);
    console.log("part 1 answer is " + answer);
    // expect(answer).toEqual(0);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 21:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/21/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

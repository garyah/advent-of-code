describe("2019 day ? part 1", function() {
  // code
  let var1 = 0;
  let var2 = '';
  const fn1 = (arg1 = 0, arg2 = '', arg3 = []) => {
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






  






  // tests
  it('fn1() returns number 0', () => {
    expect(fn1()).toEqual(0);
  });
  it('fn2() returns empty string', () => {
    expect(fn2()).toEqual('');
  });
  it("should be able to solve puzzle", () => {
    const data = [[], [], []];
    const actual = data.map((data) => puzzle.solve(data));
    const expected = [1, 1, 1];
    // expect(actual).toEqual(expected);
  });
  it("should be able to parse input", () => {
    const data = puzzle.parse('+1 +3 +2'.split(' '));
    expect(data).toEqual([1, 3, 2]);
  });
  it("should be able solve puzzle with my input", () => {
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
  const readInputFile = false; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day ? part 1:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("adventYYYY/DD/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

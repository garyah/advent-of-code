describe("2019 day 6", function() {
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
  it("can handle relative mode", () => {
    const data = [
      [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99],
      [1102,34915192,34915192,7,4,7,99,0],
      [104,1125899906842624,99],
    ];
    const actual = data.map((data) => puzzle.transform(data));
    const expected = [
      1,
      1,
      1,
    ];
    // expect(actual).toEqual(expected);
  });
  it("can parse input", () => {
    const data = parse(
      '+1 +3 +2'
      .split(
        ' '
        ));
    expect(data).toEqual([1, 3, 2]);
  });
  it("can solve puzzle with my input", () => {
    // const data = [0];
    const data = puzzle.parse(lines);
    puzzle.setInput(1);
    const answer = puzzle.transform(data);
    // console.log("part 1 answer is " + answer);
    // expect(answer).toEqual(0);
  });
  it("can solve puzzle part 2 with my input", () => {
    // const data = [0];
    const data = puzzle.parse(lines);
    puzzle.setInput(2);
    const answer = puzzle.transform(data);
    // console.log("part 1 answer is " + answer);
    // expect(answer).toEqual(0);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 9:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/09/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

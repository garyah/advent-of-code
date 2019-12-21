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
    const intCode = puzzle.parse(lines);
    const programs = [
      // jump right in front of hole, just like 1st example
      // always gets a 2-tile-wide hole, at the 6th position,
      // and a 1-tile-wide hole, at the 9th position, for my input,
      // and jumps into the 1-tile-wide hole
      // [
      //   'NOT A J\n',
      //   'WALK\n',
      // ],
      // jump a 3-tile-wide hole (with ground on other side), just like 2nd example
      // always gets a 1-tile-wide hole for my input, at the 6th position, and falls in
      // [
      //   'NOT A J\n',
      //   'NOT B T\n',
      //   'AND T J\n',
      //   'NOT C T\n',
      //   'AND T J\n',
      //   'AND D J\n',
      //   'WALK\n',
      // ],
      // jump 4 ahead of hole, which always jumps into the hole, just like 3rd example
      // always gets a 1-tile-wide hole for my input, at the 6th position, and jumps into it
      // [
      //   'NOT D J\n',
      //   'WALK\n',
      // ],
      // jump 2 ahead of hole, which could clear a 1-tile-wide or 2-tile-wide hole
      // always gets a 3-tile-wide hole for my input, at the 6th position, and jumps into hole end
      // [
      //   'NOT B J\n',
      //   'WALK\n',
      // ],
      // jump 3 ahead of hole, which could clear a 1-tile-wide hole
      // always gets a 3-tile-wide hole for my input, at the 6th position, and jumps into hole middle
      [
        'NOT C J\n',
        'WALK\n',
      ],
    ];
    const actual = programs.map((program) => puzzle.execute(intCode, program));
    // const expected = [
    //   1,
    // ];
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
    // const data = puzzle.parse(lines);
    // const answer = puzzle.solve(data);
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

describe("2021 day 01", function() {
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
    return data.reduce((count, num, curIdx, arr) => {
      // console.log(count, num, curIdx);
      if (curIdx > 0 && num > arr[curIdx - 1]) return count + 1;
      return count;
    }, 0);
  }
  const solve_p2 = (data = [0]) => {
    fn1();
    return data.reduce((count, num, curIdx, arr) => {
      // console.log(count, num, curIdx);
      if (curIdx > 0 && curIdx < arr.length - 2) {
        let sum3 = num + arr[curIdx + 1] + arr[curIdx + 2];
        let pr_sum3 = arr[curIdx - 1] + num + arr[curIdx + 1];
        if (sum3 > pr_sum3) return count + 1;
      }
      return count;
    }, 0);
  }
  const parse = (lines = ['']) => {
    // return lines[0]; // use for one line string input
    // return lines;    // use for multi-line string input
    return lines.map((line) => parseInt(line)).filter((num) => num === num);
  };















  // new tests
  it("can parse input", () => {
    const data = parse(
      '199 200 208'
      .split(
        ' '
        ));
    expect(data).toEqual([199, 200, 208]);
  });
  it("can solve puzzle with my input", () => {
    // const data = [0];
    const data = parse(lines);
    // console.log(data.length);
    const answer = solve(data);
    console.log("part 1 answer is " + answer);
    expect(answer).toEqual(1466);
  });
  it("can solve puzzle with my input", () => {
    // const data = [0];
    const data = parse(lines);
    // console.log(data.length);
    const answer = solve_p2(data);
    console.log("part 2 answer is " + answer);
    expect(answer).toEqual(1491);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2021 day xx:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/01/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

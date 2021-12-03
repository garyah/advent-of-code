describe("2021 day 03", function() {
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
    let bitCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let gamma = 0;
    let epsilon = 0;
    let size = data[0].length;
    console.log(size);
    data.reduce((sum, val) => {
      for (i = 0; i < size; i++) {
        if (val[i] === '0') { --bitCounts[i]; continue; }
        if (val[i] === '1') ++bitCounts[i];
      }
      return 0;
    }, 0);
    for (i = 0; i < size; i++) {
      if (bitCounts[i] <= 0) { continue; }
      if (bitCounts[i] > 0) gamma += 1 << size - i - 1;
    }
    epsilon = ~gamma & 0xfff;
    console.log(gamma);
    console.log(epsilon);
    return gamma * epsilon;
  }
  const find_rating = (data = [], idx = 0, isOxygen = true) => {
    let bitCount = 0;
    data.reduce((sum, val) => {
      if (isOxygen && val[idx] === '0' || !isOxygen && val[idx] === '1') --bitCount;
      if (isOxygen && val[idx] === '1' || !isOxygen && val[idx] === '0') ++bitCount;
      return 0;
    }, 0);
    data = data.filter((val) =>
      (bitCount < 0) && val[idx] === '0'
      || !isOxygen && (bitCount === 0) && val[idx] === '0'
      || isOxygen && (bitCount === 0) && val[idx] === '1'
      || (bitCount > 0) && val[idx] === '1'
    );
    return data;
  }
  const solve_p2 = (data = []) => {
    let bitCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // let gamma = 0;
    // let epsilon = 0;
    let size = data[0].length;
    console.log(size);
    let oxygenRating = '';
    let filtered = data;
    for (i = 0; i < size; i++) {
      filtered = find_rating(filtered, i, true);
      if (filtered.length === 1) { oxygenRating = filtered[0]; break; }
    }
    let carbonRating = '';
    filtered = data;
    for (i = 0; i < size; i++) {
      filtered = find_rating(filtered, i, false);
      if (filtered.length === 1) { carbonRating = filtered[0]; break; }
    }
    // console.log(oxygenRating);
    // console.log(carbonRating);
    let lifeSupportRating = parseInt(oxygenRating, 2) * parseInt(carbonRating, 2);
    // console.log(lifeSupportRating);
    return lifeSupportRating;
  }
  const parse = (lines = ['']) => {
    // return parser.getFirstLine(lines);
    return lines;    // use for multi-line string input
    // return parser.linesToInts(lines);
    // return parser.linesToFloats(lines);
    // return parser.linesToDirCommands(lines);
    //return parser.linesToBinaryInts(lines);
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
      ['101111101000', '110110011100']
      );
    //expect(data).toEqual([0b101111101000, 0b110110011100]);
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
    expect(answer).toEqual(1082324);
  });
  it("can solve puzzle p2 with my input", () => {
    // const data = [0];
    const data = parse(lines);
    const answer = solve_p2(data);
    console.log("part 2 answer is " + answer);
    expect(answer).toEqual(1353024);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  // const puzzle = require('../../common/puzzleWithCode');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2021 day 03:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/03/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

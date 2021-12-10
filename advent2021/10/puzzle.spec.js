describe("2021 day 10", function() {
  // code
  let var1 = 0;
  let var2 = '';
  let var3 = [];
  let var4 = {};
  const initVars = () => {
    data = [0];
    var1 = 0;
    var2 = '';
    var3 = [];
    var4 = {};
    answer = 0;
  };
  const fn1 = () => {
    // console.log(...);
    if (1) {}
    else if (1) {}
    else {}
    var2.split(' ').join(' ');
    for (let i = 0; i < var3.length; i++) { break; continue; }
    for (let j = 0;; j++) { break; continue; }
    for (const item of var3) { break; continue; }
    var3.map((num) => {
      return num;
    }).filter((num) => num === num);
    var3.reduce((sum, num) => {
      return sum + num;
    }, 0);
    return;
  };
  const fn2 = () => {
    // console.log(...);
    if (1) {}
    else if (1) {}
    else {}
    var2.split(' ').join(' ');
    for (let i = 0; i < var3.length; i++) { break; continue; }
    for (let j = 0;; j++) { break; continue; }
    for (const item of var3) { break; continue; }
    var3.map((num) => {
      return num;
    }).filter((num) => num === num);
    var3.reduce((sum, num) => {
      return sum + num;
    }, 0);
    return;
  };
  const fn3 = () => {
    // console.log(...);
    if (1) {}
    else if (1) {}
    else {}
    var2.split(' ').join(' ');
    for (let i = 0; i < var3.length; i++) { break; continue; }
    for (let j = 0;; j++) { break; continue; }
    for (const item of var3) { break; continue; }
    var3.map((num) => {
      return num;
    }).filter((num) => num === num);
    var3.reduce((sum, num) => {
      return sum + num;
    }, 0);
    return;
  };
  const fn4 = () => {
    // console.log(...);
    if (1) {}
    else if (1) {}
    else {}
    var2.split(' ').join(' ');
    for (let i = 0; i < var3.length; i++) { break; continue; }
    for (let j = 0;; j++) { break; continue; }
    for (const item of var3) { break; continue; }
    var3.map((num) => {
      return num;
    }).filter((num) => num === num);
    var3.reduce((sum, num) => {
      return sum + num;
    }, 0);
    return;
  };
  const fn5 = () => {
    // console.log(...);
    if (1) {}
    else if (1) {}
    else {}
    var2.split(' ').join(' ');
    for (let i = 0; i < var3.length; i++) { break; continue; }
    for (let j = 0;; j++) { break; continue; }
    for (const item of var3) { break; continue; }
    var3.map((num) => {
      return num;
    }).filter((num) => num === num);
    var3.reduce((sum, num) => {
      return sum + num;
    }, 0);
    return;
  };
  let answer = 0;
  const solve = () => {
    // console.log(...);
    fn1();
    answer = 1;
    // console.log(...);
  }
  const solve_p2 = () => {
    // console.log(...);
    fn1();
    answer = 2;
    // console.log(...);
  }
  let data = [0];
  const parse = () => {
    data = parser.lineToIntsComma(lines[0]);
    // data = parser.linesToInts(lines);
    // data = lines;    // use for multi-line string input
    // data = parser.getFirstLine(lines);
    // data = parser.linesToFloats(lines);
    // data = parser.linesToDirCommands(lines);
  };















  // tests
  it('fn1() ...', () => {
    fn1();
    expect(0).toEqual(
      0
      );
  });
  it('fn2() ...', () => {
    fn2();
    expect(0).toEqual(
      0
      );
  });
  it('fn3() ...', () => {
    fn3();
    expect(0).toEqual(
      0
      );
  });
  it('fn4() ...', () => {
    fn4();
    expect(0).toEqual(
      0
      );
  });
  it('fn5() ...', () => {
    fn5();
    expect(0).toEqual(
      0
      );
  });
  it("can parse input", () => {
    lines = '+1,+3,+2 1,2,3'
      .split(
        ' '
        );
    // parse();
    // expect(data).toEqual([1, 3, 2]);
  });
  it("can solve puzzle with my input", () => {
    parse();
    solve();
    console.log("\npart 1 answer is " + answer);
    // expect(answer).toEqual(1);
  });
  it("can solve puzzle p2 with my input", () => {
    parse();
    // solve_p2();
    console.log("\npart 2 answer is " + answer);
    // expect(answer).toEqual(2);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  // next line for testing puzzle.spec.js in common dir
  // const Parser = require('./parser');
  // const puzzle = require('../../common/puzzleWithCode');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  let linesSave = [];
  beforeAll((done) => {
    console.log("2021 day 10:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/10/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
  beforeEach((done) => {
    linesSave = lines;
    initVars();
    done();
  });
  afterEach((done) => {
    lines = linesSave;
    done();
  });
});

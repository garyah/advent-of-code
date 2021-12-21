describe("2021 day 15", function() {
  // code
  const intMax = 100000;
  let var1 = 0;
  let var2 = '';
  let var3 = [];
  let var4 = {};
  let rightFlags = [[false]];
  let downFlags = [[false]];
  let path = [{row: 0, col: 0, risk: 0}];
  const initVars = () => {
    riskMap = [''];
    var1 = 0;
    var2 = '';
    var3 = [];
    var4 = {};
    rightFlags = [[]];
    downFlags = [[]];
    path = [];
    minRisk = 0;
  };
  const walkMap = () => {
    // console.log('riskMap.length = ', riskMap.length);
    // console.log('riskMap[0].length = ', riskMap[0].length);
    const size = riskMap.length;
    const numSteps = (size - 1) * 2;
    // console.log('numSteps = ', numSteps);
    let r = 0, c = 0;
    for (r = 0; r < numSteps; r++) {
      downFlags[r] = [];
      rightFlags[r] = [];
      for (c = 0; c < numSteps; c++) {
        rightFlags[r][c] = false;
        downFlags[r][c] = false;
      }
    }
    path = [];
    minRisk = 0;
    // console.log('downFlags.length = ', downFlags.length, ', downFlags = ', downFlags);
    r = 0, c = 0;
    for (let n = 0; n < numSteps; n++) {
      // console.log('r = ', r, ', c = ', c, ', n = ', n, ', minRisk = ', minRisk);
      path.push({row: r, col: c, risk: minRisk});
      for (let m = 0; m < n; m++) {
        const pathCoord = path[m];
        walkAlternate(pathCoord.row, pathCoord.col, pathCoord.risk, r, c);
      }
      const riskRight = (c + 1 < size) ? parseInt(riskMap[r][c + 1]) : intMax;
      const riskDown = (r + 1 < size) ? parseInt(riskMap[r + 1][c]) : intMax;
      const riskRightRight = (c + 2 < size) ? parseInt(riskMap[r][c + 2]) : intMax;
      const riskRightDown = (r + 1 < size && c + 1 < size) ? parseInt(riskMap[r + 1][c + 1]) : intMax;
      const riskDownRight = riskRightDown;
      const riskDownDown = (r + 2 < size) ? parseInt(riskMap[r + 2][c]) : intMax;
      if (riskRight + Math.min(riskRightRight, riskRightDown) < riskDown + Math.min(riskDownRight, riskDownDown)) {
        minRisk += riskRight;
        c += 1;
        rightFlags[r][c] = true;
        continue;
      }
      if (riskRight + Math.min(riskRightRight, riskRightDown) > riskDown + Math.min(riskDownRight, riskDownDown)) {
        minRisk += riskDown;
        r += 1;
        downFlags[r][c] = true;
        continue;
      }
      // console.log('could not resolve tie, will move right anyway! r = ', r, ', c = ', c);
      minRisk += riskRight;
      c += 1;
      rightFlags[r][c] = true;
      // break; continue;
    }
    // console.log(path);
    // console.log('r = ', r, ', c = ', c, ', minRisk = ', minRisk);
    // console.log(' = ');
  };
  const walkAlternate = (row = 0, col = 0, risk = 0, tgtRow = 0, tgtCol = 0) => {
    // console.log(...);
    // const size = riskMap.length;
    let riskRight = intMax;
    if (col + 1 <= tgtCol && !rightFlags[row][col + 1]) {
      riskRight = walkAlternate(row, col + 1, risk + parseInt(riskMap[row][col + 1]));
    }
    let riskDown = intMax;
    if (row + 1 <= tgtRow && !downFlags[row + 1][col]) {
      riskDown = walkAlternate(row + 1, col, risk + parseInt(riskMap[row + 1][col]));
    }
    if (riskRight <= riskDown) return riskRight;
    return riskDown;
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
  let minRisk = 0;
  const solve = () => {
    // console.log(...);
    walkMap();
    // console.log(...);
  }
  const solve_p2 = () => {
    // console.log(...);
    walkMap();
    // console.log(...);
  }
  let riskMap = [''];
  const parse = () => {
    riskMap = lines;    // use for multi-line string input
  };















  // tests
  it('walkMap() finds min risk for various 2x2 paths: obvious down, right, and tie', () => {
    riskMap = [
      '19',
      '11'
    ];
    walkMap();
    expect(minRisk).toEqual(2);
    riskMap = [
      '11',
      '91'
    ];
    walkMap();
    expect(minRisk).toEqual(2);
    riskMap = [
      '11',
      '11'
    ];
    walkMap();
    expect(minRisk).toEqual(2);
  });
  it('walkMap() finds min risk for various 3x3 paths: obvious down, right, and tie', () => {
    riskMap = [
      '199',
      '199',
      '111'
    ];
    walkMap();
    expect(minRisk).toEqual(4);
    riskMap = [
      '111',
      '991',
      '991'
    ];
    walkMap();
    expect(minRisk).toEqual(4);
    riskMap = [
      '111',
      '111',
      '111'
    ];
    walkMap();
    expect(minRisk).toEqual(4);
  });
  it('walkMap() finds min risk for 3x3 path with diagonal path min risk', () => {
    riskMap = [
      '199',
      '919',
      '991'
    ];
    walkMap();
    expect(minRisk).toEqual(20);
  });
  it('walkMap() finds min risk for 3x3 path with tricky risks requiring look-ahead more than one move', () => {
    riskMap = [
      '199',
      '949',
      '341'
    ];
    walkMap();
    expect(minRisk).toEqual(17);
  });
  it('walkMap() finds min risk for various 4x4 paths: obvious down, right, and tie', () => {
    riskMap = [
      '1999',
      '1999',
      '1999',
      '1111'
    ];
    walkMap();
    expect(minRisk).toEqual(6);
    riskMap = [
      '1111',
      '9991',
      '9991',
      '9991'
    ];
    walkMap();
    expect(minRisk).toEqual(6);
    riskMap = [
      '1111',
      '1111',
      '1111',
      '1111'
    ];
    walkMap();
    expect(minRisk).toEqual(6);
  });
  it('walkMap() finds min risk for 4x4 path with diagonal path min risk', () => {
    riskMap = [
      '1999',
      '9199',
      '9919',
      '9991'
    ];
    walkMap();
    expect(minRisk).toEqual(30);
  });
  it('walkMap() finds min risk for 4x4 path with tricky risks requiring look-ahead more than two moves', () => {
    riskMap = [
      '1999',
      '9999',
      '9499',
      '3441'
    ];
    walkMap();
    expect(minRisk).toEqual(30);
  });
  it("can solve puzzle with my input", () => {
    // parse();
    // solve();
    // console.log("\npart 1 answer is " + minRisk);
    // expect(answer).toEqual(1);
  });
  it("can solve puzzle p2 with my input", () => {
    // parse();
    // solve_p2();
    // console.log("\npart 2 answer is " + minRisk);
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
    console.log("2021 day 15:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/15/sainput.txt", (linesRead) => {
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

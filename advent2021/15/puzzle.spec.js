describe("2021 day 15", function() {
  // code
  const intMax = 100000;
  let var1 = 0;
  let var2 = '';
  let var3 = [];
  let var4 = {};
  let path = [{row: 0, col: 0, risk: 0}];
  let minRisks = [[0]];
  const initVars = () => {
    riskMap = [''];
    var1 = 0;
    var2 = '';
    var3 = [];
    var4 = {};
    path = [];
    minRisks = [[]];
    minRisk = 0;
  };
  const walkMap = () => {
    // console.log('riskMap.length = ', riskMap.length);
    // console.log('riskMap[0].length = ', riskMap[0].length);
    const size = riskMap.length;
    const numSteps = (size - 1) * 2;
    // console.log('numSteps = ', numSteps);
    let r = 0, c = 0;
    path = [];
    minRisk = 0;
    // console.log('downFlags.length = ', downFlags.length, ', downFlags = ', downFlags);
    for (let n = 0; n < numSteps; n++) {
      // console.log('r = ', r, ', c = ', c, ', n = ', n, ', minRisk = ', minRisk);
      path.push({row: r, col: c, risk: minRisk});
      const riskRight = (c + 1 < size) ? parseInt(riskMap[r][c + 1]) : intMax;
      const riskDown = (r + 1 < size) ? parseInt(riskMap[r + 1][c]) : intMax;
      const riskRightRight = (c + 2 < size) ? parseInt(riskMap[r][c + 2]) : intMax;
      const riskRightDown = (r + 1 < size && c + 1 < size) ? parseInt(riskMap[r + 1][c + 1]) : intMax;
      const riskDownRight = riskRightDown;
      const riskDownDown = (r + 2 < size) ? parseInt(riskMap[r + 2][c]) : intMax;
      if (riskRight + Math.min(riskRightRight, riskRightDown) < riskDown + Math.min(riskDownRight, riskDownDown)) {
        minRisk += riskRight;
        c += 1;
        continue;
      }
      if (riskRight + Math.min(riskRightRight, riskRightDown) > riskDown + Math.min(riskDownRight, riskDownDown)) {
        minRisk += riskDown;
        r += 1;
        continue;
      }
      // console.log('could not resolve tie, will move right anyway! r = ', r, ', c = ', c);
      minRisk += riskRight;
      c += 1;
    }
    // console.log(path);
    // console.log('r = ', r, ', c = ', c, ', minRisk = ', minRisk);
    // console.log(' = ');
  };
  const calcMinRisks = () => {
    // console.log(...);
    // console.log('riskMap.length = ', riskMap.length);
    // console.log('riskMap[0].length = ', riskMap[0].length);
    const size = riskMap.length;

    // init
    for (let r = 0; r < size; r++) {
      minRisks[r] = [];
      for (let c = 0; c < size; c++) {
        minRisks[r][c] = parseInt(riskMap[r][c]);
      }
    }
    minRisks[0][0] = 0;

    // fan-out
    for (let s = 2; s < size; s++) {
      for (let r = s, c = 0; r >= 0 && c <= s; r--, c++) {
        if (r === 0) { minRisks[0][c] += minRisks[0][c - 1]; continue; }
        if (c === 0) { minRisks[r][0] += minRisks[r - 1][0]; continue; }
        minRisks[r][c] += Math.min(minRisks[r][c - 1], minRisks[r - 1][c]);
      }
    }

    // fan-in
    for (let s = 1; s < size - 1; s++) {
      for (let r = size - 1, c = s; r >= s && c <= size - 1; r--, c++) {
        minRisks[r][c] += Math.min(minRisks[r][c - 1], minRisks[r - 1][c]);
      }
    }

    // completion
    minRisks[size - 1][size - 1]
      += Math.min(minRisks[size - 1][size - 2], minRisks[size - 2][size - 1]);
    minRisk = minRisks[size - 1][size - 1];
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
    calcMinRisks();
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
  it('finds min risk for various 2x2 paths: obvious down, right, and tie', () => {
    riskMap = [
      '19',
      '11'
    ];
    walkMap();
    expect(minRisk).toEqual(2);
    calcMinRisks();
    expect(minRisk).toEqual(2);
    riskMap = [
      '11',
      '91'
    ];
    walkMap();
    expect(minRisk).toEqual(2);
    calcMinRisks();
    expect(minRisk).toEqual(2);
    riskMap = [
      '11',
      '11'
    ];
    walkMap();
    expect(minRisk).toEqual(2);
    calcMinRisks();
    expect(minRisk).toEqual(2);
  });
  it('finds min risk for various 3x3 paths: obvious down, right, and tie', () => {
    riskMap = [
      '199',
      '199',
      '111'
    ];
    walkMap();
    expect(minRisk).toEqual(4);
    calcMinRisks();
    expect(minRisk).toEqual(4);
    riskMap = [
      '111',
      '991',
      '991'
    ];
    walkMap();
    expect(minRisk).toEqual(4);
    calcMinRisks();
    expect(minRisk).toEqual(4);
    riskMap = [
      '111',
      '111',
      '111'
    ];
    walkMap();
    expect(minRisk).toEqual(4);
    calcMinRisks();
    expect(minRisk).toEqual(4);
  });
  it('finds min risk for 3x3 path with diagonal path min risk', () => {
    riskMap = [
      '199',
      '919',
      '991'
    ];
    walkMap();
    expect(minRisk).toEqual(20);
    calcMinRisks();
    expect(minRisk).toEqual(20);
  });
  it('finds min risk for 3x3 path with tricky risks requiring look-ahead more than one move', () => {
    riskMap = [
      '199',
      '949',
      '341'
    ];
    walkMap();
    expect(minRisk).toEqual(17);
    calcMinRisks();
    expect(minRisk).toEqual(17);
  });
  it('finds min risk for various 4x4 paths: obvious down, right, and tie', () => {
    riskMap = [
      '1999',
      '1999',
      '1999',
      '1111'
    ];
    walkMap();
    expect(minRisk).toEqual(6);
    calcMinRisks();
    expect(minRisk).toEqual(6);
    riskMap = [
      '1111',
      '9991',
      '9991',
      '9991'
    ];
    walkMap();
    expect(minRisk).toEqual(6);
    calcMinRisks();
    expect(minRisk).toEqual(6);
    riskMap = [
      '1111',
      '1111',
      '1111',
      '1111'
    ];
    walkMap();
    expect(minRisk).toEqual(6);
    calcMinRisks();
    expect(minRisk).toEqual(6);
  });
  it('finds min risk for 4x4 path with diagonal path min risk', () => {
    riskMap = [
      '1999',
      '9199',
      '9919',
      '9991'
    ];
    walkMap();
    expect(minRisk).toEqual(30);
    calcMinRisks();
    expect(minRisk).toEqual(30);
  });
  it('finds min risk for 4x4 path with tricky risks requiring look-ahead more than two moves', () => {
    riskMap = [
      '1999',
      '9999',
      '9499',
      '3441'
    ];
    walkMap();
    // expect(minRisk).toEqual(30);
    calcMinRisks();
    expect(minRisk).toEqual(30);
  });
  it("can solve puzzle with my input", () => {
    parse();
    solve();
    console.log("\npart 1 answer is " + minRisk);
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
      parser.readLines("advent2021/15/input.txt", (linesRead) => {
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

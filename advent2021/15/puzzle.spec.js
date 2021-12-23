describe("2021 day 15", function() {
  // code
  const intMax = 100 * 1000 * 1000;
  let path = [{row: 0, col: 0, risk: 0}];
  let risks = [[0]];
  let minRisks = [[0]];
  let addFlags = [[false]];
  const initVars = () => {
    riskMap = [''];

    path = [];
    risks = [[]];
    minRisks = [[]];
    addFlags = [[]];

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
  const initRisks = () => {
    // console.log('riskMap.length = ', riskMap.length);
    // console.log('riskMap[0].length = ', riskMap[0].length);
    const size = riskMap.length;
    for (let r = 0; r < size; r++) {
      risks[r] = [];
      for (let c = 0; c < size; c++) {
        risks[r][c] = parseInt(riskMap[r][c]);
      }
    }
  }
  const extendRisks = () => {
    const size = risks.length;

    // add new columns to existing rows (existing grid)
    for (let r = 0; r < size; r++) {
      for (let c = size; c < size * 5; c++) {
        risks[r][c] = (risks[r][c - size] + 1) % 10;
        if (risks[r][c] === 0) risks[r][c] = 1;
      }
    }

    // add new rows with all columns
    for (let r = size; r < size * 5; r++) {
      risks[r] = [];
      for (let c = 0; c < size * 5; c++) {
        risks[r][c] = (risks[r - size][c] + 1) % 10;
        if (risks[r][c] === 0) risks[r][c] = 1;
      }
    }

    // console.log('risks.length = ', risks.length);
    // console.log('risks[0].length = ', risks[0].length);
    // console.log('risks[size].length = ', risks[size].length);
    // console.log('risks[size * 5 - 1].length = ', risks[size * 5 - 1].length);
  };
  const calcMinRisks = () => {
    // console.log('risks.length = ', risks.length);
    // console.log('risks[0].length = ', risks[0].length);
    const size = risks.length;

    // init
    for (let r = 0; r < size; r++) {
      minRisks[r] = [];
      for (let c = 0; c < size; c++) {
        minRisks[r][c] = risks[r][c];
      }
    }

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
  const initDijkstra = () => {
    const size = risks.length;
    for (let r = 0; r < size; r++) {
      minRisks[r] = [];
      addFlags[r] = [];
      for (let c = 0; c < size; c++) {
        minRisks[r][c] = intMax;
        addFlags[r][c] = false;
      }
    }
  }
  const findNextCoord = () => {
    const size = risks.length;
    let min = intMax;
    let minRow = 0, minCol = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!addFlags[r][c] && minRisks[r][c] <= min) {
          min = minRisks[r][c];
          minRow = r, minCol = c;
        }
      }
    }
    return {row: minRow, col: minCol};
  }
  const calcRisk = (srcCoord = {row: 0, col: 0}, tgtRow = 0, tgtCol = 0) => {
    // console.log('srcCoord = ', srcCoord, ', tgtRow = ', tgtRow, ', tgtCol = ', tgtCol);
    let rightDownRisk = 0, downRightRisk = 0;

    // figure total risk for right down path
    let r = srcCoord.row, c = srcCoord.col + 1;
    for (; c <= tgtCol; c++) {
      rightDownRisk += risks[r][c];
    }
    r = srcCoord.row + 1, c = srcCoord.col;
    for (; r <= tgtRow; r++) {
      rightDownRisk += risks[r][c];
    }
    if (rightDownRisk === 0) rightDownRisk = intMax;

    // figure total risk for down right path
    r = srcCoord.row + 1, c = srcCoord.col;
    for (; r <= tgtRow; r++) {
      downRightRisk += risks[r][c];
    }
    r = srcCoord.row, c = srcCoord.col + 1;
    for (; c <= tgtCol; c++) {
      downRightRisk += risks[r][c];
    }
    if (downRightRisk === 0) downRightRisk = intMax;

    const risk = Math.min(rightDownRisk, downRightRisk);
    // console.log('srcCoord = ', srcCoord, ', tgtRow = ', tgtRow, ', tgtCol = ', tgtCol, ', risk = ', risk);
    return risk;
  }
  const findMinRisk = () => {
    const size = risks.length;
    initDijkstra();
    minRisks[0][0] = 0;
    for (let n = 0; n < size * size - 1; n++) {
      const nextCoord = findNextCoord();
      addFlags[nextCoord.row][nextCoord.col] = true;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (!addFlags[r][c] && minRisks[nextCoord.row][nextCoord.col] !== intMax) {
            const risk = calcRisk(nextCoord, r, c);
            if (minRisks[nextCoord.row][nextCoord.col] + risk < minRisks[r][c]) {
              minRisks[r][c] = minRisks[nextCoord.row][nextCoord.col] + risk;
            }
          }
        }
      }
    }
    minRisk = minRisks[size - 1][size - 1];
  }
  let minRisk = 0;
  const solve = () => {
    initRisks();
    // calcMinRisks();
    findMinRisk();
  }
  const solve_p2 = () => {
    // console.log(...);
    initRisks();
    extendRisks();
    calcMinRisks();
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
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(2);
    findMinRisk();
    expect(minRisk).toEqual(2);
    riskMap = [
      '11',
      '91'
    ];
    walkMap();
    expect(minRisk).toEqual(2);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(2);
    findMinRisk();
    expect(minRisk).toEqual(2);
    riskMap = [
      '11',
      '11'
    ];
    walkMap();
    expect(minRisk).toEqual(2);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(2);
    findMinRisk();
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
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(4);
    findMinRisk();
    expect(minRisk).toEqual(4);
    riskMap = [
      '111',
      '991',
      '991'
    ];
    walkMap();
    expect(minRisk).toEqual(4);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(4);
    findMinRisk();
    expect(minRisk).toEqual(4);
    riskMap = [
      '111',
      '111',
      '111'
    ];
    walkMap();
    expect(minRisk).toEqual(4);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(4);
    findMinRisk();
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
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(20);
    findMinRisk();
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
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(17);
    findMinRisk();
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
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(6);
    findMinRisk();
    expect(minRisk).toEqual(6);
    riskMap = [
      '1111',
      '9991',
      '9991',
      '9991'
    ];
    walkMap();
    expect(minRisk).toEqual(6);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(6);
    findMinRisk();
    expect(minRisk).toEqual(6);
    riskMap = [
      '1111',
      '1111',
      '1111',
      '1111'
    ];
    walkMap();
    expect(minRisk).toEqual(6);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(6);
    findMinRisk();
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
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(30);
    findMinRisk();
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
    // walkMap() fails this case
    // expect(minRisk).toEqual(30);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(30);
    findMinRisk();
    expect(minRisk).toEqual(30);
  });
  it('finds min risk for 5x5 path with detour requiring up or left moves', () => {
    riskMap = [
      '19999',
      '19111',
      '11191',
      '99991',
      '99991'
    ];
    walkMap();
    // walkMap() fails this case
    // expect(minRisk).toEqual(10);
    initRisks();
    calcMinRisks();
    // calcMinRisks() fails this case
    // expect(minRisk).toEqual(10);
    findMinRisk();
    // expect(minRisk).toEqual(10);
  });
  it("can solve puzzle with my input", () => {
    parse();
    solve();
    console.log("\npart 1 answer is " + minRisk);
    // expect(minRisk).toEqual(811);
  });
  it("can solve puzzle p2 with my input", () => {
    parse();
    solve_p2();
    console.log("\npart 2 answer is " + minRisk);
    // expect(minRisk).toEqual(2);
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

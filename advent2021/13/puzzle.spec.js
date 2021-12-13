describe("2021 day 13", function() {
  // code
  let xMax = -1;
  let yMax = -1;
  let grid = [[false]];
  const initVars = () => {
    coords = [{}];
    folds = [{}];
    xMax = -1;
    yMax = -1;
    grid = [[false]];
    for (let x = 0; x < 2000; x++) {
      grid.push([false]);
      for (let y = 0; y < 2000; y++) {
        grid[x].push(false);
      }
    }
    numVisible = 0;
  };
  const doXFold = (xVal = 0) => {
    const isEqual = (xMax - xVal) === xVal;
    const isGreater = (xMax - xVal) > xVal;
    const offset1 = isEqual ? 0 : (isGreater ? 0 : 1);
    const offset2 = isEqual ? 0 : (isGreater ? -1 : 0);
    console.log('xMax = ', xMax, ', xVal = ', xVal, ', isEqual = ', isEqual, ', offset1 = ', offset1, ', offset2 = ', offset2);
    for (let y = 0; y <= yMax; y++) {
      let x1 = 0 + offset1;
      for (let x2 = xMax + offset2; x2 > xVal && x1 < xVal; x2--, x1++) {
        if (grid[x2][y]) grid[x1][y] = true;
      }
    }
    xMax = xVal - 1;
    console.log('xMax = ', xMax);
  };
  const doYFold = (yVal = 0) => {
    const isEqual = (yMax - yVal) === yVal;
    const isGreater = (yMax - yVal) > yVal;
    const offset1 = isEqual ? 0 : (isGreater ? 0 : 1);
    const offset2 = isEqual ? 0 : (isGreater ? -1 : 0);
    console.log('yMax = ', yMax, ', yVal = ', yVal, ', isEqual = ', isEqual, ', offset1 = ', offset1, ', offset2 = ', offset2);
    for (let x = 0; x <= xMax; x++) {
      let y1 = 0 + offset1;
      for (let y2 = yMax + offset2; y2 > yVal && y1 < yVal; y2--, y1++) {
        if (grid[x][y2]) grid[x][y1] = true;
      }
    }
    yMax = yVal - 1;
    console.log('yMax = ', yMax);
  };
  const countVisible = () => {
    for (let y = 0; y <= yMax; y++) {
      for (let x = 0; x <= xMax; x++) {
        if (grid[x][y]) numVisible += 1;
      }
    }
  };
  const printGrid = () => {
    console.log('');
    for (let y = 0; y <= yMax; y++) {
      let line = '';
      for (let x = 0; x <= xMax; x++) {
        line = line + ((grid[x][y]) ? '#' : '.');
      }
      console.log(line);
    }
  };
  const processDots = () => {
    for (let i = 0; i < coords.length; i++) {
      if (coords[i] === undefined) break;
      // console.log(coords[i]);
      const x = coords[i].x;
      const y = coords[i].y;
      grid[x][y] = true;
      if (x > xMax) xMax = x;
      if (y > yMax) yMax = y;
      // break; continue;
    }
    console.log('grid.length = ', grid.length);
    console.log('xMax = ', xMax);
    console.log('yMax = ', yMax);
  };
  const processFolds = () => {
    let numFolds = 0;
    for (let i = 0; i < folds.length; i++) {
      if (folds[i] === undefined) continue;
      numFolds++;
      // console.log(folds[i]);
      const x = folds[i].x;
      const y = folds[i].y;
      if (x > -1) { doXFold(x); continue; }
      if (y > -1) doYFold(y);
    }
    console.log('numFolds = ', numFolds);
    console.log('xMax = ', xMax);
    console.log('yMax = ', yMax);
  };
  let numVisible = 0;
  const solve = () => {
    console.log('coords.length = ', coords.length);
    // console.log('coords = ', coords);
    // console.log('coords[length - 1] = ', coords[coords.length - 1]);
    processDots();
    doXFold(655);
    countVisible();
    console.log('numVisible = ', numVisible);
  }
  const solve_p2 = () => {
    processDots();
    processFolds();
    printGrid();
  }
  let coords = [{}];
  let folds = [{}];
  const parse = () => {
    coords = parser.linesToCoords(lines);
    folds = parser.linesToFolds(lines);
  };















  // tests
  it("can solve puzzle with my input", () => {
    parse();
    solve();
    console.log("\npart 1 answer is " + numVisible);
    expect(numVisible).toEqual(684);
  });
  it("can solve puzzle p2 with my input", () => {
    parse();
    solve_p2();
    // console.log("\npart 2 answer is " + numVisible);
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
    console.log("2021 day 13:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/13/input.txt", (linesRead) => {
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

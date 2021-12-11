describe("2021 day 11", function() {
  // code
  const initVars = () => {
    octoEnergy = [''];

    numFlashes = 0;
    numStepsToAllFlash = 0;
  };
  const doStep = (numSteps = 100) => {
    // console.log('octoEnergy.length = ', octoEnergy.length);
    rightIdx = octoEnergy[0].length - 1;
    bottomIdx = octoEnergy.length - 1;
    // console.log('rightIdx = ', rightIdx);
    // console.log('bottomIdx = ', bottomIdx);

    let r = 0;
    let c = 0;
    for (r = 0; r <= bottomIdx; r++) {
      let newEnergy = '';
      for (c = 0; c <= rightIdx; c++) {
        let newEnergyValue = new String(parseInt(octoEnergy[r][c]) + 1);
        if (newEnergyValue > 9) newEnergyValue = '*';
        newEnergy = newEnergy + newEnergyValue;
      }
      octoEnergy[r] = newEnergy;
      // console.log(octoEnergy[r]);
    }

    // console.log();

    for (r = 0; r <= bottomIdx; r++) {
      for (c = 0; c <= rightIdx; c++) {
        // everything else
        if (octoEnergy[r][c] === '*') {
              // console.log(r, c, octoEnergy[r][c]);
              walkFromFlasher(r, c);
        }
      }
    }

    let isAllFlashing = true;
    for (r = 0; r <= bottomIdx; r++) {
      let newEnergy = '';
      for (c = 0; c <= rightIdx; c++) {
        let newEnergyValue = (octoEnergy[r][c] === '*' || octoEnergy[r][c] === 'F') ? '0' : octoEnergy[r][c];
        if (newEnergyValue !== '0') isAllFlashing = false;
        newEnergy = newEnergy + newEnergyValue;
      }
      octoEnergy[r] = newEnergy;
      // console.log(octoEnergy[r]);
    }

    return isAllFlashing;
  };
  const walkFromFlasher = (startRow = 0, startCol = 0) => {
    numFlashes += 1;

    let rDown = startRow + 1;
    let rUp = startRow - 1;
    let cRight = startCol + 1;
    let cLeft = startCol - 1;

    if (isWalkTarget(rDown, startCol)) {
      let newEnergyValue = new String(parseInt(octoEnergy[rDown][startCol]) + 1);
      if (newEnergyValue > 9) newEnergyValue = 'F';
      octoEnergy[rDown] = octoEnergy[rDown].substr(0, startCol) + newEnergyValue + octoEnergy[rDown].substr(startCol + 1);
      if (newEnergyValue === 'F') walkFromFlasher(rDown, startCol);
    }
    if (isWalkTarget(rUp, startCol)) {
      let newEnergyValue = new String(parseInt(octoEnergy[rUp][startCol]) + 1);
      if (newEnergyValue > 9) newEnergyValue = 'F';
      octoEnergy[rUp] = octoEnergy[rUp].substr(0, startCol) + newEnergyValue + octoEnergy[rUp].substr(startCol + 1);
      if (newEnergyValue === 'F') walkFromFlasher(rUp, startCol);
    }
    if (isWalkTarget(startRow, cRight)) {
      let newEnergyValue = new String(parseInt(octoEnergy[startRow][cRight]) + 1);
      if (newEnergyValue > 9) newEnergyValue = 'F';
      octoEnergy[startRow] = octoEnergy[startRow].substr(0, cRight) + newEnergyValue + octoEnergy[startRow].substr(cRight + 1);
      if (newEnergyValue === 'F') walkFromFlasher(startRow, cRight);
    }
    if (isWalkTarget(startRow, cLeft)) {
      let newEnergyValue = new String(parseInt(octoEnergy[startRow][cLeft]) + 1);
      if (newEnergyValue > 9) newEnergyValue = 'F';
      octoEnergy[startRow] = octoEnergy[startRow].substr(0, cLeft) + newEnergyValue + octoEnergy[startRow].substr(cLeft + 1);
      if (newEnergyValue === 'F') walkFromFlasher(startRow, cLeft);
    }

    if (isWalkTarget(rDown, cRight)) {
      let newEnergyValue = new String(parseInt(octoEnergy[rDown][cRight]) + 1);
      if (newEnergyValue > 9) newEnergyValue = 'F';
      octoEnergy[rDown] = octoEnergy[rDown].substr(0, cRight) + newEnergyValue + octoEnergy[rDown].substr(cRight + 1);
      if (newEnergyValue === 'F') walkFromFlasher(rDown, cRight);
    }
    if (isWalkTarget(rDown, cLeft)) {
      let newEnergyValue = new String(parseInt(octoEnergy[rDown][cLeft]) + 1);
      if (newEnergyValue > 9) newEnergyValue = 'F';
      octoEnergy[rDown] = octoEnergy[rDown].substr(0, cLeft) + newEnergyValue + octoEnergy[rDown].substr(cLeft + 1);
      if (newEnergyValue === 'F') walkFromFlasher(rDown, cLeft);
    }
    if (isWalkTarget(rUp, cRight)) {
      let newEnergyValue = new String(parseInt(octoEnergy[rUp][cRight]) + 1);
      if (newEnergyValue > 9) newEnergyValue = 'F';
      octoEnergy[rUp] = octoEnergy[rUp].substr(0, cRight) + newEnergyValue + octoEnergy[rUp].substr(cRight + 1);
      if (newEnergyValue === 'F') walkFromFlasher(rUp, cRight);
    }
    if (isWalkTarget(rUp, cLeft)) {
      let newEnergyValue = new String(parseInt(octoEnergy[rUp][cLeft]) + 1);
      if (newEnergyValue > 9) newEnergyValue = 'F';
      octoEnergy[rUp] = octoEnergy[rUp].substr(0, cLeft) + newEnergyValue + octoEnergy[rUp].substr(cLeft + 1);
      if (newEnergyValue === 'F') walkFromFlasher(rUp, cLeft);
    }
  };
  const isWalkTarget = (row = 0, col = 0) => {
    return (isInBounds(row, col)
      && isNotFlashed(row, col)
      && isNotFlashing(row, col));
  };
  const isInBounds = (row = 0, col = 0) => {
    return (row >= 0 && row <= bottomIdx
      && col >= 0 && col <= rightIdx);
  };
  const isNotFlashed = (row = 0, col = 0) => {
    return (octoEnergy[row][col] !== 'F');
  };
  const isNotFlashing = (row = 0, col = 0) => {
    return (octoEnergy[row][col] !== '*');
  };
  let numFlashes = 0;
  const solve = () => {
    for (let n = 0; n < 100; n++) {
      doStep();
    }
    // console.log('numFlashes = ', numFlashes);
  }
  let numStepsToAllFlash = 0;
  const solve_p2 = () => {
    numStepsToAllFlash = 1;
    for (; !doStep(); numStepsToAllFlash++) {
    }
    // console.log('numStepsToAllFlash = ', numStepsToAllFlash);
  }
  let octoEnergy = [''];
  const parse = () => {
    octoEnergy = lines;    // use for multi-line string input
  };















  // tests
  it("can solve puzzle with my input", () => {
    parse();
    solve();
    console.log("\npart 1 answer is " + numFlashes);
    // expect(answer).toEqual(1);
  });
  it("can solve puzzle p2 with my input", () => {
    parse();
    solve_p2();
    console.log("\npart 2 answer is " + numStepsToAllFlash);
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
    console.log("2021 day 11:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/11/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
  beforeEach((done) => {
    linesSave = [];
    for (const line of lines) linesSave.push(line);
    initVars();
    done();
  });
  afterEach((done) => {
    lines = linesSave;
    done();
  });
});

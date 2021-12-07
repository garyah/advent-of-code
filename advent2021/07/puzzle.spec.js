describe("2021 day 07", function() {
  // code
  let posDist = [0];
  let bestPos = 0;
  let cost = 0;
  const initVars = () => {
    crabPos = [0];
    posDist = [0];
    bestPos = 0;
    cost = 0;
  };
  const areCrabsAligned = () => {
    let i = 1;
    for (; i < crabPos.length; i++) {
      if (crabPos[i - 1] !== crabPos[i]) { break; }
    }
    if (i < crabPos.length) return false;
    return true;
  };
  const findBestPos = (is_p2 = false) => {
    // console.log(crabPos.length);
    let maxPos = -1, minPos = 1000 * 1000;
    let i = 0;
    for (i = 0; i < crabPos.length; i++) {
      if (crabPos[i] > maxPos) { maxPos = crabPos[i]; }
      if (crabPos[i] < minPos) { minPos = crabPos[i]; }
      posDist[crabPos[i]] = posDist[crabPos[i]] ? posDist[crabPos[i]] + 1 : 1;
    }
    // console.log('maxPos = ', maxPos);
    // console.log('minPos = ', minPos);

    // position with most crabs initially, is not the ideal position, for parts 1 or 2
    // let max = -1;
    // let maxIdx = -1;
    // console.log(posDist.length);
    // console.log(posDist);
    // for (i = 0; i < posDist.length; i++) {
    //   if (posDist[i] > max) { max = posDist[i]; maxIdx = i; }
    // }
    // bestPos = maxIdx;
    // console.log(bestPos);

    let candPos = 0;
    let minCost = 1000 * 1000 * 100;
    for (candPos = minPos - 2; candPos < maxPos + 2; candPos++) {
      let fuelSpent = 0;
      for (i = 0; i < crabPos.length; i++) {
        if (is_p2) {
          const delta = Math.abs(crabPos[i] - candPos);
          const fuel = Math.round((delta * (delta + 1)) / 2);
          fuelSpent += fuel;
          // console.log(candPos, i, crabPos[i], delta, (delta * (delta + 1)) / 2, fuel, fuelSpent);
          continue;
        }
        fuelSpent += Math.abs(crabPos[i] - candPos);
      }
      if (fuelSpent < minCost) { minCost = fuelSpent; bestPos = candPos; }
    }
    cost = minCost;
    console.log(cost, bestPos);
  };
  const fn3 = () => {
    if (1) {}
    else if (1) {}
    else {}
    for (let i = 0;; i++) { break; continue; }
    // for (const item of arg3) {}
    return;
  };
  const fn4 = () => {
    if (1) {}
    else if (1) {}
    else {}
    for (let i = 0;; i++) { break; continue; }
    // for (const item of arg3) {}
    return;
  };
  const fn5 = () => {
    if (1) {}
    else if (1) {}
    else {}
    for (let i = 0;; i++) { break; continue; }
    // for (const item of arg3) {}
    return;
  };
  const solve = () => {
    // console.log(areCrabsAligned());
    findBestPos();
    // return data.reduce((sum, num) => {
    //   return sum + num;
    // }, 0);
  }
  const solve_p2 = () => {
    // console.log(areCrabsAligned());
    findBestPos(true);
    // return data.reduce((sum, num) => {
    //   return sum + num;
    // }, 0);
  }
  let crabPos = [0];
  const parse = () => {
    crabPos = parser.lineToIntsComma(lines[0]);
    // data = parser.getFirstLine(lines);
    // data = lines;    // use for multi-line string input
    // data = parser.linesToInts(lines);
    // data = parser.linesToFloats(lines);
    // data = parser.linesToDirCommands(lines);
  };















  // tests
  it("can solve puzzle with my input", () => {
    parse();
    solve();
    console.log("\npart 1 answer is " + cost);
    expect(cost).toEqual(336040);
  });
  it("can solve puzzle p2 with my input", () => {
    parse();
    solve_p2();
    console.log("\npart 2 answer is " + cost);
    expect(cost).toEqual(94813675);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  // const puzzle = require('../../common/puzzleWithCode');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  let linesSave = [];
  beforeAll((done) => {
    console.log("2021 day 07:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/07/input.txt", (linesRead) => {
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

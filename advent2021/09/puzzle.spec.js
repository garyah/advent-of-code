describe("2021 day 09", function() {
  // code
  const initVars = () => {
    heightmap = [0];

    rightIdx = 0;
    bottomIdx = 0;
    basinSize = 0;
    basinSizes = [];

    sumRisk = 0;
    basinProduct = 0;
  };
  let rightIdx = 0;
  let bottomIdx = 0;
  const findSumRisk = () => {
    console.log('heightmap.length = ', heightmap.length);
    rightIdx = heightmap[0].length - 1;
    bottomIdx = heightmap.length - 1;
    console.log('rightIdx = ', rightIdx);
    console.log('bottomIdx = ', bottomIdx);
    // 4 corners
    if (heightmap[0][0] < heightmap[1][0]
        && heightmap[0][0] < heightmap[0][1]) {
          // console.log('top left', heightmap[0][0]);
          sumRisk += (parseInt(heightmap[0][0]) + 1);
    }
    if (heightmap[0][rightIdx] < heightmap[0][rightIdx - 1]
        && heightmap[0][rightIdx] < heightmap[1][rightIdx]) {
          // console.log('top right', heightmap[0][rightIdx]);
          sumRisk += (parseInt(heightmap[0][rightIdx]) + 1);
    }
    if (heightmap[bottomIdx][0] < heightmap[bottomIdx - 1][0]
        && heightmap[bottomIdx][0] < heightmap[bottomIdx][1]) {
          // console.log('bottom left', heightmap[bottomIdx][0]);
          sumRisk += (parseInt(heightmap[bottomIdx][0]) + 1);
    }
    if (heightmap[bottomIdx][rightIdx] < heightmap[bottomIdx][rightIdx - 1]
        && heightmap[bottomIdx][rightIdx] < heightmap[bottomIdx - 1][rightIdx]) {
          // console.log('bottom right', heightmap[bottomIdx][rightIdx]);
          sumRisk += (parseInt(heightmap[bottomIdx][rightIdx]) + 1);
    }
    let r = 0;
    let c = 0;
    for (r = 1; r < bottomIdx; r++) {
      // edges (columns) left and right
      if (heightmap[r][0] < heightmap[r - 1][0]
          && heightmap[r][0] < heightmap[r + 1][0]
          && heightmap[r][0] < heightmap[r][1]) {
            // console.log('left edge', r, 0, heightmap[r][0]);
            sumRisk += (parseInt(heightmap[r][0]) + 1);
      }
      if (heightmap[r][rightIdx] < heightmap[r - 1][rightIdx]
          && heightmap[r][rightIdx] < heightmap[r + 1][rightIdx]
          && heightmap[r][rightIdx] < heightmap[r][rightIdx - 1]) {
            // console.log('right edge', r, rightIdx, heightmap[r][rightIdx]);
            sumRisk += (parseInt(heightmap[r][rightIdx]) + 1);
      }
    }
    for (c = 1; c < rightIdx; c++) {
      // edges (rows) top and bottom
      if (heightmap[0][c] < heightmap[0][c - 1]
          && heightmap[0][c] < heightmap[0][c + 1]
          && heightmap[0][c] < heightmap[1][c]) {
            // console.log('top edge', 0, c, heightmap[0][c]);
            sumRisk += (parseInt(heightmap[0][c]) + 1);
      }
      if (heightmap[bottomIdx][c] < heightmap[bottomIdx][c - 1]
          && heightmap[bottomIdx][c] < heightmap[bottomIdx][c + 1]
          && heightmap[bottomIdx][c] < heightmap[bottomIdx - 1][c]) {
            // console.log('bottom edge', bottomIdx, c, heightmap[bottomIdx][c]);
            sumRisk += (parseInt(heightmap[bottomIdx][c]) + 1);
      }
    }
    for (r = 1; r < bottomIdx; r++) {
      for (c = 1; c < rightIdx; c++) {
        // everything else
        if (heightmap[r][c] < heightmap[r - 1][c]
            && heightmap[r][c] < heightmap[r + 1][c]
            && heightmap[r][c] < heightmap[r][c - 1]
            && heightmap[r][c] < heightmap[r][c + 1]) {
              // console.log(r, c, heightmap[r][c]);
              sumRisk += (parseInt(heightmap[r][c]) + 1);
        }
      }
    }
  };
  let basinSizes = [0];
  let basinSize = 0;
  const findBasinSizes = () => {
    console.log('heightmap.length = ', heightmap.length);
    rightIdx = heightmap[0].length - 1;
    bottomIdx = heightmap.length - 1;
    console.log('rightIdx = ', rightIdx);
    console.log('bottomIdx = ', bottomIdx);
    // 4 corners
    if (heightmap[0][0] < heightmap[1][0]
        && heightmap[0][0] < heightmap[0][1]) {
          // console.log('top left', heightmap[0][0]);
          basinSize = 0;
          walkFromLowPoint(0, 0);
          basinSizes.push(basinSize);
    }
    if (heightmap[0][rightIdx] < heightmap[0][rightIdx - 1]
        && heightmap[0][rightIdx] < heightmap[1][rightIdx]) {
          // console.log('top right', heightmap[0][rightIdx]);
          basinSize = 0;
          walkFromLowPoint(0, rightIdx);
          basinSizes.push(basinSize);
    }
    if (heightmap[bottomIdx][0] < heightmap[bottomIdx - 1][0]
        && heightmap[bottomIdx][0] < heightmap[bottomIdx][1]) {
          // console.log('bottom left', heightmap[bottomIdx][0]);
          basinSize = 0;
          walkFromLowPoint(bottomIdx, 0);
          basinSizes.push(basinSize);
    }
    if (heightmap[bottomIdx][rightIdx] < heightmap[bottomIdx][rightIdx - 1]
        && heightmap[bottomIdx][rightIdx] < heightmap[bottomIdx - 1][rightIdx]) {
          // console.log('bottom right', heightmap[bottomIdx][rightIdx]);
          basinSize = 0;
          walkFromLowPoint(bottomIdx, rightIdx);
          basinSizes.push(basinSize);
    }
    let r = 0;
    let c = 0;
    for (r = 1; r < bottomIdx; r++) {
      // edges (columns) left and right
      if (heightmap[r][0] < heightmap[r - 1][0]
          && heightmap[r][0] < heightmap[r + 1][0]
          && heightmap[r][0] < heightmap[r][1]) {
            // console.log('left edge', r, 0, heightmap[r][0]);
            basinSize = 0;
            walkFromLowPoint(r, 0);
            basinSizes.push(basinSize);
      }
      if (heightmap[r][rightIdx] < heightmap[r - 1][rightIdx]
          && heightmap[r][rightIdx] < heightmap[r + 1][rightIdx]
          && heightmap[r][rightIdx] < heightmap[r][rightIdx - 1]) {
            // console.log('right edge', r, rightIdx, heightmap[r][rightIdx]);
            basinSize = 0;
            walkFromLowPoint(r, rightIdx);
            basinSizes.push(basinSize);
      }
    }
    for (c = 1; c < rightIdx; c++) {
      // edges (rows) top and bottom
      if (heightmap[0][c] < heightmap[0][c - 1]
          && heightmap[0][c] < heightmap[0][c + 1]
          && heightmap[0][c] < heightmap[1][c]) {
            // console.log('top edge', 0, c, heightmap[0][c]);
            basinSize = 0;
            walkFromLowPoint(0, c);
            basinSizes.push(basinSize);
      }
      if (heightmap[bottomIdx][c] < heightmap[bottomIdx][c - 1]
          && heightmap[bottomIdx][c] < heightmap[bottomIdx][c + 1]
          && heightmap[bottomIdx][c] < heightmap[bottomIdx - 1][c]) {
            // console.log('bottom edge', bottomIdx, c, heightmap[bottomIdx][c]);
            basinSize = 0;
            walkFromLowPoint(bottomIdx, c);
            basinSizes.push(basinSize);
      }
    }
    for (r = 1; r < bottomIdx; r++) {
      for (c = 1; c < rightIdx; c++) {
        // everything else
        if (heightmap[r][c] < heightmap[r - 1][c]
            && heightmap[r][c] < heightmap[r + 1][c]
            && heightmap[r][c] < heightmap[r][c - 1]
            && heightmap[r][c] < heightmap[r][c + 1]) {
              // console.log(r, c, heightmap[r][c]);
              basinSize = 0;
              walkFromLowPoint(r, c);
              basinSizes.push(basinSize);
        }
      }
    }
  };
  const walkFromLowPoint = (startRow = 0, startCol = 0) => {
    // console.log(...);
    let rDown = startRow + 1;
    let rUp = startRow - 1;
    let cRight = startCol + 1;
    let cLeft = startCol - 1;
    if (isWalkTarget(rDown, startCol)) {
      basinSize += 1;
      heightmap[rDown] = heightmap[rDown].substr(0, startCol) + '*' + heightmap[rDown].substr(startCol + 1);
      walkFromLowPoint(rDown, startCol);
    }
    if (isWalkTarget(rUp, startCol)) {
      basinSize += 1;
      heightmap[rUp] = heightmap[rUp].substr(0, startCol) + '*' + heightmap[rUp].substr(startCol + 1);
      walkFromLowPoint(rUp, startCol);
    }
    if (isWalkTarget(startRow, cRight)) {
      basinSize += 1;
      heightmap[startRow] = heightmap[startRow].substr(0, cRight) + '*' + heightmap[startRow].substr(cRight + 1);
      walkFromLowPoint(startRow, cRight);
    }
    if (isWalkTarget(startRow, cLeft)) {
      basinSize += 1;
      heightmap[startRow] = heightmap[startRow].substr(0, cLeft) + '*' + heightmap[startRow].substr(cLeft + 1);
      walkFromLowPoint(startRow, cLeft);
    }
  };
  const isWalkTarget = (row = 0, col = 0) => {
    return (isInBounds(row, col)
      && isNotBasinEdge(row, col)
      && isNotMarked(row, col));
  };
  const isInBounds = (row = 0, col = 0) => {
    return (row >= 0 && row <= bottomIdx
      && col >= 0 && col <= rightIdx);
  };
  const isNotBasinEdge = (row = 0, col = 0) => {
    return (heightmap[row][col] !== '9');
  };
  const isNotMarked = (row = 0, col = 0) => {
    return (heightmap[row][col] !== '*');
  };
  let sumRisk = 0;
  const solve = () => {
    findSumRisk();
  }
  let basinProduct = 0;
  const solve_p2 = () => {
    // console.log(...);
    findBasinSizes();
    console.log(basinSizes.length);
    let basinSizesSorted = basinSizes.sort((a, b) => b - a);
    console.log(basinSizesSorted);
    basinProduct = basinSizesSorted[0] * basinSizesSorted[1] * basinSizesSorted[2];
  }
  let heightmap = [''];
  const parse = () => {
    // heightmap = parser.lineToIntsComma(lines[0]);
    // data = parser.linesToInts(lines);
    heightmap = lines;    // use for multi-line string input
    // data = parser.getFirstLine(lines);
    // data = parser.linesToFloats(lines);
    // data = parser.linesToDirCommands(lines);
  };















  // tests
  it('walkFromLowPoint() ...', () => {
    heightmap = [
      '2199943210',
      '3987894921',
      '9856789892',
      '8767896789',
      '9899965678',
    ];
    rightIdx = 9;
    bottomIdx = 4;
    walkFromLowPoint(0, 1);
    expect(basinSize).toEqual(3);
    basinSize = 0;
    walkFromLowPoint(0, 9);
    expect(basinSize).toEqual(9);
    basinSize = 0;
    walkFromLowPoint(2, 2);
    expect(basinSize).toEqual(14);
    basinSize = 0;
    walkFromLowPoint(4, 6);
    expect(basinSize).toEqual(9);
  });
  it("can solve puzzle with my input", () => {
    parse();
    solve();
    console.log("\npart 1 answer is " + sumRisk);
    expect(sumRisk).toEqual(607);
  });
  it("can solve puzzle p2 with my input", () => {
    parse();
    solve_p2();
    console.log("\npart 2 answer is " + basinProduct);
    expect(basinProduct).toEqual(900864);
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
    console.log("2021 day 09:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/09/input.txt", (linesRead) => {
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

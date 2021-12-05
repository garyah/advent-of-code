describe("2021 day 05", function() {
  let lineList = [{}];
  let numLines = [[0]];
  let numOverlapPoints = 0;
  const processLineList = (lineListInput = [{}]) => {
    lineList = lineListInput;
    for (let x = 0; x < 1000; x++) {
      numLines[x] = [0];
      for (let y = 0; y < 1000; y++) {
        numLines[x][y] = 0;
      }
    }
    for (let i = 0; i < lineList.length; i++) {
      if (lineList[i].x1 === lineList[i].x2) {
        // vertical line
        let yStart = lineList[i].y1;
        let yEnd = lineList[i].y2;
        if (lineList[i].y1 > lineList[i].y2) { yEnd = lineList[i].y1; yStart = lineList[i].y2; }
        for (let y = yStart; y <= yEnd; y++) {
          numLines[lineList[i].x1][y] += 1;
        }
      }
      if (lineList[i].y1 === lineList[i].y2) {
        // horizontal line
        let xStart = lineList[i].x1;
        let xEnd = lineList[i].x2;
        if (lineList[i].x1 > lineList[i].x2) { xEnd = lineList[i].x1; xStart = lineList[i].x2; }
        for (let x = xStart; x <= xEnd; x++) {
          numLines[x][lineList[i].y1] += 1;
        }
      }
    }
    numOverlapPoints = 0;
    for (let x = 0; x < 1000; x++) {
      for (let y = 0; y < 1000; y++) {
        if (numLines[x][y] > 1) {
          numOverlapPoints++;
        }
      }
    }
  };
  const solve = (lineListInput = [{}]) => {
    processLineList(lineListInput);
  }
  const processLineListWithDiag = (lineListInput = [{}]) => {
    lineList = lineListInput;
    for (let x = 0; x < 1000; x++) {
      numLines[x] = [0];
      for (let y = 0; y < 1000; y++) {
        numLines[x][y] = 0;
      }
    }
    for (let i = 0; i < lineList.length; i++) {
      if (lineList[i].x1 === lineList[i].x2) {
        // vertical line
        let yStart = lineList[i].y1;
        let yEnd = lineList[i].y2;
        if (lineList[i].y1 > lineList[i].y2) { yEnd = lineList[i].y1; yStart = lineList[i].y2; }
        for (let y = yStart; y <= yEnd; y++) {
          numLines[lineList[i].x1][y] += 1;
        }
        continue;
      }
      if (lineList[i].y1 === lineList[i].y2) {
        // horizontal line
        let xStart = lineList[i].x1;
        let xEnd = lineList[i].x2;
        if (lineList[i].x1 > lineList[i].x2) { xEnd = lineList[i].x1; xStart = lineList[i].x2; }
        for (let x = xStart; x <= xEnd; x++) {
          numLines[x][lineList[i].y1] += 1;
        }
        continue;
      }
      {
        // assume diagonal 45-degree line
        let xStart = lineList[i].x1;
        let xEnd = lineList[i].x2;
        let xDelta = 1;
        if (lineList[i].x1 > lineList[i].x2) { xDelta = -1; }
        let yStart = lineList[i].y1;
        let yEnd = lineList[i].y2;
        let yDelta = 1;
        if (lineList[i].y1 > lineList[i].y2) { yDelta = -1; }
        let x = xStart, y = yStart;
        for (; ;) {
          numLines[x][y] += 1;
          if (x == xEnd || y == yEnd) break;
          x += xDelta;
          y += yDelta;
        }
      }
    }
    numOverlapPoints = 0;
    // console.log();
    for (let y = 0; y < 1000; y++) {
      // console.log(numLines[0][y], numLines[1][y],
      //   numLines[2][y], numLines[3][y], numLines[4][y],
      //   numLines[5][y], numLines[6][y], numLines[7][y],
      //   numLines[8][y], numLines[9][y]);
      for (let x = 0; x < 1000; x++) {
        if (numLines[x][y] > 1) {
          numOverlapPoints++;
        }
      }
    }
  };
  const solve_p2 = (lineListInput = [{}]) => {
    processLineListWithDiag(lineListInput);
  }
  const parse = (lines = ['']) => {
    return parser.linesToLineSegments(lines);
  };















  it("can solve puzzle with my input", () => {
    const data = parse(lines);
    // console.log(data.length);
    // console.log(data[0]);
    solve(data);
    console.log("\npart 1 answer is " + numOverlapPoints);
    expect(numOverlapPoints).toEqual(6461);
  });
  it("can solve puzzle p2 with my input", () => {
    const data = parse(lines);
    solve_p2(data);
    console.log("\npart 2 answer is " + numOverlapPoints);
    expect(numOverlapPoints).toEqual(18065);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  // const puzzle = require('../../common/puzzleWithCode');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2021 day 05:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/05/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

describe("2021 day 04", function() {
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
  const solve = (data = {}) => {
    let numsToCall = data.nums;
    let boards = data.matrices;
    let calledNum = 0, unmarkedSum = 0;
    let stopThis = false;
    let boardNum = 0;
    for (let i = 0; i < numsToCall.length; i++) {
      calledNum = numsToCall[i];
      for (boardNum = 0; boardNum < boards.length; boardNum++) {
        for (let x = 0; x < 5; x++) {
          for (let y = 0; y < 5; y++) {
            if (boards[boardNum][x][y] === calledNum) {
              boards[boardNum][x][y] = boards[boardNum][x][y] + 999000;
              let isWinning = true;
              for (let x2 = 0; x2 < 5; x2++) {
                if (boards[boardNum][x2][y] < 999000) { isWinning = false; break; }
              }
              if (isWinning) {
                console.log('row match, boardNum = ', boardNum);
                console.log('x,y = ', x, y);
                // console.log('lineNum = ', lineNum);
                x = 5;
                stopThis = true;
                break;
              }
              isWinning = true;
              for (let y2 = 0; y2 < 5; y2++) {
                if (boards[boardNum][x][y2] < 999000) { isWinning = false; break; }
              }
              if (isWinning) {
                console.log('column match, boardNum = ', boardNum);
                console.log('x,y = ', x, y);
                // console.log('lineNum = ', lineNum);
                x = 5;
                stopThis = true;
                break;
              }
            }
          }
        }
        if (stopThis) break;
      }
      if (stopThis) break;
    }

    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        if (boards[boardNum][x][y] < 999000) {
          unmarkedSum += boards[boardNum][x][y];
        }
      }
    }

    console.log('calledNum =', calledNum);
    console.log('unmarkedSum =', unmarkedSum);
    let score = calledNum * unmarkedSum;
    return score;
  }
  const solve_p2 = (data = {}) => {
    let numsToCall = data.nums;
    let boards = data.matrices;
    let calledNum = 0, unmarkedSum = 0;
    let stopThis = false;
    let boardNum = 0;
    let boardsLeft = boards.length;
    let boardWon = [];
    for (boardNum = 0; boardNum < boards.length; boardNum++) {
      boardWon[boardNum] = false;
    }
    boardNum = 0;
    for (let i = 0; i < numsToCall.length; i++) {
      calledNum = numsToCall[i];
      for (boardNum = 0; boardNum < boards.length; boardNum++) {
        if (boardWon[boardNum]) continue;
        for (let x = 0; x < 5; x++) {
          for (let y = 0; y < 5; y++) {
            if (boards[boardNum][x][y] === calledNum) {
              boards[boardNum][x][y] = boards[boardNum][x][y] + 999000;
              let isWinning = true;
              for (let x2 = 0; x2 < 5; x2++) {
                if (boards[boardNum][x2][y] < 999000) { isWinning = false; break; }
              }
              if (isWinning) {
                console.log('row match, boardNum = ', boardNum);
                // console.log('x,y = ', x, y);
                boardWon[boardNum] = true;
                --boardsLeft;
                x = 5;
                if (boardsLeft === 0) stopThis = true;
                break;
              }
              isWinning = true;
              for (let y2 = 0; y2 < 5; y2++) {
                if (boards[boardNum][x][y2] < 999000) { isWinning = false; break; }
              }
              if (isWinning) {
                console.log('column match, boardNum = ', boardNum);
                // console.log('x,y = ', x, y);
                boardWon[boardNum] = true;
                --boardsLeft;
                x = 5;
                if (boardsLeft === 0) stopThis = true;
                break;
              }
            }
          }
        }
        if (stopThis) break;
      }
      if (stopThis) break;
    }

    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        if (boards[boardNum][x][y] < 999000) {
          unmarkedSum += boards[boardNum][x][y];
        }
      }
    }

    console.log('calledNum =', calledNum);
    console.log('unmarkedSum =', unmarkedSum);
    let score = calledNum * unmarkedSum;
    return score;
  }
  const parse = (lines = ['']) => {
    // return parser.getFirstLine(lines);
    // return lines;    // use for multi-line string input
    let lineNum = 0;
    let nums = parser.lineToIntsComma(lines[lineNum++]);
    let matrices = [];
    let matIdx = 0;
    while (lineNum < lines.length - 1 - 4) {
      lineNum++;
      matrices[matIdx] = [];
      for (let i = 0; i < 5; i++) {
        matrices[matIdx][i] = [];
        matrices[matIdx][i] = parser.lineToIntsSpace(lines[lineNum++]);
      }
      matIdx++;
    }
    return {nums: nums, matrices: matrices};
    // return parser.linesToInts(lines);
    // return parser.linesToFloats(lines);
    // return parser.linesToDirCommands(lines);
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
    // const data = parse(
    //   '+1 +3 +2'
    //   .split(
    //     ' '
    //     ));
    // expect(data).toEqual([1, 3, 2]);
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
    // console.log(data);
    // console.log(data.nums);
    // console.log(data.nums.length);
    // console.log(data.matrices);
    // console.log(data.matrices.length);
    // console.log(data.matrices[0]);
    // console.log(data.matrices[0].length);
    // console.log(data.matrices[0][0]);
    // console.log(data.matrices[0][0].length);
    // console.log(data.matrices[0][0][0]);
    const answer = solve(data);
    console.log("part 1 answer is " + answer);
    expect(answer).toEqual(29440);
  });
  it("can solve puzzle p2 with my input", () => {
    // const data = [0];
    const data = parse(lines);
    const answer = solve_p2(data);
    console.log("part 2 answer is " + answer);
    expect(answer).toEqual(13884);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  // const puzzle = require('../../common/puzzleWithCode');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2021 day 04:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/04/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

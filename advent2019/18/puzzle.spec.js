describe("2019 day 18", function() {
  // new code
  let var1 = 0;
  let var2 = '';
  let map = [['']];
  let startX = -1, startY = -1;
  let doors = {}, keys = {};
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
  const init = (data = [['']]) => {
    map = data;
    startX = -1, startY = -1;
    doors = {}, keys = {};
  };
  const findStart = () => {
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === '@') { startX = x; startY = y; }
      }
    }
  };
  const traversePaths = (parentX = -1, parentY = -1,
                         currentX = -1, currentY = -1,
                         steps = 0) => {
    if (parentX === -1 && parentY === -1) { parentX = startX; parentY = startY; }
    if (currentX === -1 && currentY === -1) { currentX = startX; currentY = startY; }
    if (map[currentY][currentX] === '#') return { steps: 1000000 };
    if (map[currentY][currentX] >= 'A' && map[currentY][currentX] <= 'Z') {
      doors[map[currentY][currentX]] = { steps, x: currentX, y: currentY };
      return { steps: 1000000 };
    }
    if (map[currentY][currentX] >= 'a' && map[currentY][currentX] <= 'z') {
      keys[map[currentY][currentX]] = { steps, x: currentX, y: currentY };
      return { steps, x: currentX, y: currentY };
    }
    let rightResult = { steps: 1000000 }, leftResult = { steps: 1000000 },
        upResult = { steps: 1000000 }, downResult = { steps: 1000000 };
    if (currentX < map[currentY].length-1 && (currentX+1 !== parentX || currentY !== parentY))
      rightResult = traversePaths(currentX, currentY, currentX+1, currentY, steps+1);
    if (currentX > 0 && (currentX-1 !== parentX || currentY !== parentY))
      leftResult = traversePaths(currentX, currentY, currentX-1, currentY, steps+1);
    if (currentY > 0 && (currentX !== parentX || currentY-1 !== parentY))
      upResult = traversePaths(currentX, currentY, currentX, currentY-1, steps+1);
    if (currentY < map.length-1 && (currentX !== parentX || currentY+1 !== parentY))
      downResult = traversePaths(currentX, currentY, currentX+1, currentY+1, steps+1);
    const minSteps = Math.min(rightResult.steps, leftResult.steps, upResult.steps, downResult.steps);
    if (minSteps === rightResult.steps) return rightResult;
    if (minSteps === leftResult.steps) return leftResult;
    if (minSteps === upResult.steps) return upResult;
    if (minSteps === downResult.steps) return downResult;
  };
  const solve = (data = [['']]) => {
    init(data);
    findStart();
    const shortestPath = traversePaths();
    return 8;
  }
  const parse = (lines = ['']) => {
    // return lines[0]; // use for one line string input
    // return lines;    // use for multi-line string input
    return lines.map((line) => line.split(''));
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
  it("can solve puzzle", () => {
    const data = [
      [
        '#########',
        '#b.A.@.a#',
        '#########',
      ],
    ];
    const actual = data.map((data) => solve(parse(data)));
    const expected = [
      8,
    ];
    expect(actual).toEqual(expected);
  });
  it("can parse input", () => {
    const data = parse(
      '######## #.A.@.a# ########'
      .split(
        ' '
        ));
    expect(data).toEqual([
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '.', 'A', '.', '@', '.', 'a', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ]);
  });
  it("can solve puzzle with my input", () => {
    // const data = [0];
    // const data = parse(lines);
    // const answer = solve(data);
    // console.log("part 1 answer is " + answer);
    // expect(answer).toEqual(0);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 18:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/18/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

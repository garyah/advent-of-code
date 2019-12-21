describe("2019 day 20", function() {
  // new code
  let var1 = 0;
  let var2 = '';
  let map = [['']];
  let portalMap = [[{}]];
  let startX = -1, startY = -1;
  let endX = -1, endY = -1;
  let portalsSeen = {}, portalTwos = {};
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
    portalMap = [];
    for (let y = 0; y < map.length; y++) {
      portalMap[y] = [];
      for (let x = 0; x < map[y].length; x++) {
        portalMap[y][x] = {};
      }
    }
    startX = -1, startY = -1;
    endX = -1, endY = -1;
    portalsSeen = {}, portalTwos = {};
    findStart();
    findEnd();
    findPortals();
  };
  const findStart = () => {
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === '@') { startX = x; startY = y; }
      }
    }
    console.log('startX=', startX, 'startY=', startY);
  };
  const findEnd = () => {
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === '*') { endX = x; endY = y; }
      }
    }
    console.log('endX=', endX, 'endY=', endY);
  };
  const findPortals = () => {
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] >= 'A' && map[y][x] <= 'Z') {
          let name = '';
          let portalX = x, portalY = y;
          // no need to look left or up, as scan is already left-to-right, top-to-bottom
          if (x+1 < map[y].length && map[y][x+1] >= 'A' && map[y][x+1] <= 'Z') { // look right
            name = map[y][x] + map[y][x+1];
            if (name === 'AA' || name === 'ZZ') continue;
            if (x+2 < map[y].length && map[y][x+2] === '.') portalX += 2;
            else if (x-1 >= 0 && map[y][x-1] === '.') portalX -= 1;
          }
          else if (y+1 < map.length && map[y+1][x] >= 'A' && map[y+1][x] <= 'Z') { // look down
            name = map[y][x] + map[y+1][x];
            if (name === 'AA' || name === 'ZZ') continue;
            if (y+2 < map.length && map[y+2][x] === '.') portalY += 2;
            else if (y-1 >= 0 && map[y-1][x] === '.') portalY -= 1;
          }
          else { // should always find a two-letter label, but just in case...
            if (x-1 < 0 && y-1 < 0
                || y-1 < 0 && x-1 >= 0 && (map[y][x-1] < 'A' || map[y][x-1] > 'Z')
                || x-1 < 0 && y-1 >= 0 && (map[y-1][x] < 'A' || map[y-1][x] > 'Z')
                || (map[y][x-1] < 'A' || map[y][x-1] > 'Z') && (map[y-1][x] < 'A' || map[y-1][x] > 'Z'))
            console.log('found stray upper case letter=', map[y][x], ' not labeling a portal!');
            continue;
          }
          if (portalsSeen[name] != null) { // saw portal before
            portalMap[portalY][portalX] = portalsSeen[name];
            portalMap[portalsSeen[name].y][portalsSeen[name].x] = {x: portalX, y: portalY};
            console.log('other end of seen portal=', name, 'x,y=',
                        portalMap[portalsSeen[name].y][portalsSeen[name].x]);
            map[portalY][portalX] = '2';
          } else { // didn't see portal before
            portalsSeen[name] = {x: portalX, y: portalY};
            console.log('new portal=', name, 'x,y=', portalsSeen[name]);
            map[portalY][portalX] = '1';
          }
        }
      }
    }
  };
  const traversePaths = (previousX = -1, previousY = -1,
                         currentX = -1, currentY = -1,
                         steps = 0) => {
    // console.log('previousX=', previousX, 'previousY=', previousY, 'currentX=', currentX, 'currentY=', currentY, 'steps=', steps);
    if (previousX === -1 && previousY === -1) { previousX = startX; previousY = startY; }
    if (currentX === -1 && currentY === -1) { currentX = startX; currentY = startY; }
    if (currentX === endX && currentY === endY) { 
      console.log('found ending point!  x=', currentX, 'y=', currentY);
      return { steps, x: currentX, y: currentY };
    }
    if (map[currentY][currentX] === '#' || map[currentY][currentX] === ' ') return { steps: 1000000 };
    if (map[currentY][currentX] >= 'A' && map[currentY][currentX] <= 'Z') {
      if ((previousX !== startX || previousY !== startY)
          && map[previousY][previousX] !== '1' && map[previousY][previousX] !== '2') {
        console.log('warning! found a portal (or start point) with starting letter=', map[currentY][currentX]);
      }
      return { steps: 1000000 };
    }
    if (map[currentY][currentX] === '1' || map[currentY][currentX] === '2') {
      // landed on a portal, keep going this way, account for steps to warp and update position
      console.log('landed on portal at x,y=', currentX, currentY, 'going to x,y=', portalMap[currentY][currentX]);
      steps++;
      previousX = currentX;
      previousY = currentY;
      currentX = portalMap[previousY][previousX].x;
      currentY = portalMap[previousY][previousX].y;
    }
    let rightResult = { steps: 1000000 }, leftResult = { steps: 1000000 },
        upResult = { steps: 1000000 }, downResult = { steps: 1000000 };
    if (currentX < map[currentY].length-1 && (currentX+1 !== previousX || currentY !== previousY))
      rightResult = traversePaths(currentX, currentY, currentX+1, currentY, steps+1);
    if (currentX > 0 && (currentX-1 !== previousX || currentY !== previousY))
      leftResult = traversePaths(currentX, currentY, currentX-1, currentY, steps+1);
    if (currentY > 0 && (currentX !== previousX || currentY-1 !== previousY))
      upResult = traversePaths(currentX, currentY, currentX, currentY-1, steps+1);
    if (currentY < map.length-1 && (currentX !== previousX || currentY+1 !== previousY))
      downResult = traversePaths(currentX, currentY, currentX, currentY+1, steps+1);
    const minSteps = Math.min(rightResult.steps, leftResult.steps, upResult.steps, downResult.steps);
    let result = {};
    if (minSteps === rightResult.steps) result = rightResult;
    if (minSteps === leftResult.steps) result = leftResult;
    if (minSteps === upResult.steps) result = upResult;
    if (minSteps === downResult.steps) result = downResult;
    // console.log('returning result=', result);
    return result;
  };
  const solve = (data = [['']]) => {
    console.log();
    init(data);
    const shortestPath = traversePaths();
    return shortestPath.steps;
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
    // const data = [
    //   [
    //     '#########',
    //     '#b.A.@.a#',
    //     '#########',
    //   ],
    // ];
    // const actual = data.map((data) => solve(parse(data)));
    // const expected = [
    //   8,
    // ];
    // expect(actual).toEqual(expected);
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
    const data = parse(lines);
    const answer = solve(data);
    console.log("part 1 answer is " + answer);
    expect(answer).toEqual(26);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 20:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/20/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

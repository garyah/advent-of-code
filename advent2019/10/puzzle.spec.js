describe("2019 day 10", function() {
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
  // const calcNumDetectable = (map = new Map([[0, new Map([[0, 0]])]])) => {
  const calcNumDetectable = (map = [[0]]) => {
    let countMap = [[0]];
    for (let rowIdx = 0; rowIdx < map.length; rowIdx++) {
      countMap[rowIdx] = [];
    }
    for (let rowIdx1 = 0; rowIdx1 < map.length; rowIdx1++) {
      const row = map[rowIdx1];
      for (let colIdx1 = 0; colIdx1 < row.length; colIdx1++) {
        countMap[rowIdx1][colIdx1] = 0;
        if (map[rowIdx1][colIdx1] !== 1) continue;
        let numHits = 0;
        let rightHits = 0, leftHits = 0;
        let bottomHits = 0, topHits = 0;
        let rightBottomHits = {}, leftBottomHits = {};
        let rightTopHits = {}, leftTopHits = {};
        for (let rowIdx2 = 0; rowIdx2 < map.length; rowIdx2++) {
          const row2 = map[rowIdx2];
          for (let colIdx2 = 0; colIdx2 < row2.length; colIdx2++) {
            if (map[rowIdx2][colIdx2] !== 1) continue;
            if (rowIdx2 === rowIdx1 && colIdx2 === colIdx1) continue;
            // horizontal
            if (rowIdx2 === rowIdx1) {
              // to the right
              if (colIdx2 > colIdx1) rightHits = 1;
              // to the left
              if (colIdx2 < colIdx1) leftHits = 1;
              continue;
            }
            // vertical
            if (colIdx2 === colIdx1) {
              // to the bottom
              if (rowIdx2 > rowIdx1) bottomHits = 1;
              // to the top
              if (rowIdx2 < rowIdx1) topHits = 1;
              continue;
            }
            // diagonal-ish
            const slope = Math.abs((rowIdx2 - rowIdx1) / (colIdx2 - colIdx1));
            // right bottom
            if (colIdx2 > colIdx1 && rowIdx2 > rowIdx1) rightBottomHits[slope.toString()] = 1;
            // left bottom
            if (colIdx2 < colIdx1 && rowIdx2 > rowIdx1) leftBottomHits[slope.toString()] = 1;
            // right top
            if (colIdx2 > colIdx1 && rowIdx2 < rowIdx1) rightTopHits[slope.toString()] = 1;
            // left top
            if (colIdx2 < colIdx1 && rowIdx2 < rowIdx1) leftTopHits[slope.toString()] = 1;
          }
        }
        numHits += rightHits + leftHits + bottomHits + topHits
                   + Object.entries(rightBottomHits).length + Object.entries(leftBottomHits).length
                   + Object.entries(rightTopHits).length + Object.entries(leftTopHits).length;
        countMap[rowIdx1][colIdx1] = numHits;
      }
    }
    return countMap;
  }
  // const solve = (map = new Map([[0, new Map([[0, 0]])]])) => {
  const solve = (map = [[0]]) => {
    const countMap = calcNumDetectable(map);
    let maxNumDetectable = 0, maxNumDetectableRow = -1, maxNumDetectableCol = -1;
    for (let rowIdx = 0; rowIdx < map.length; rowIdx++) {
      const row = map[rowIdx];
      for (let colIdx = 0; colIdx < row.length; colIdx++) {
        if (countMap[rowIdx][colIdx] > maxNumDetectable) {
          maxNumDetectable = countMap[rowIdx][colIdx];
          maxNumDetectableRow = rowIdx;
          maxNumDetectableCol = colIdx;
        }
      }
    }
    console.log('best location=[', maxNumDetectableCol, maxNumDetectableRow, ']');
    // console.log('maxNumDetectable=', maxNumDetectable);
    // return [maxNumDetectableCol, maxNumDetectableRow];
    return maxNumDetectable;
  }
  const parse = (lines = ['']) => {
    let map = [[]];
    // let map0 = new Map([[0, new Map([[0, 0]])]]);
    // map.clear();
    // let numItems = 0;
    for (let rowIdx = 0; rowIdx < lines.length; rowIdx++) {
      map[rowIdx] = [];
    }
    for (let rowIdx = 0; rowIdx < lines.length; rowIdx++) {
      const row = lines[rowIdx].split('');
      for (let colIdx = 0; colIdx < row.length; colIdx++) {
        map[rowIdx][colIdx] = row[colIdx] === '#' ? 1 : 0;
        // if (row[colIdx] === '#') {
        //   map[rowIdx][colIdx] = 1;
        //   // if (!map0.has(colIdx)) map.set(colIdx, new Map());
        //   // map0.get(colIdx).set(rowIdx, 0);
        // }
      }
    }
    return map;
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
  it("can calculate number of detectable asteroids for each asteroid", () => {
    const data = [
      ['.#..#',
       '.....',
       '#####',
       '....#',
       '...##',],
    ];
    const actual = data.map((data) => calcNumDetectable(parse(data)));
    const expected = [
      // [7, 7, 6, 7, 7, 7, 5, 7, 8, 7],
      [[0, 7, 0, 0, 7],
       [0, 0, 0, 0, 0],
       [6, 7, 7, 7, 5],
       [0, 0, 0, 0, 7],
       [0, 0, 0, 8, 7]],
    ];
    expect(actual).toEqual(expected);
  });
  it("can solve puzzle", () => {
    const data = [
      [
        '.#..#',
        '.....',
        '#####',
        '....#',
        '...##',
      ],
      [
        '......#.#.',
        '#..#.#....',
        '..#######.',
        '.#.#.###..',
        '.#..#.....',
        '..#....#.#',
        '#..#....#.',
        '.##.#..###',
        '##...#..#.',
        '.#....####',
      ],
      // ['',
      //  '',
      //  '',
      //  '',
      //  '',],
    ];
    const actual = data.map((data) => solve(parse(data)));
    const expected = [
      8,// [3, 4],
      33,// [5, 8],
    ];
    expect(actual).toEqual(expected);
  });
  it("can parse input", () => {
    const data = parse(
      '#.# .#. #.#'
      .split(
        ' '
        ));
    expect(data).toEqual([[1, 0, 1], [0, 1, 0], [1, 0, 1]]);
    // const expected = new Map([
    //   [0, new Map([[0, 0], [2, 0]])],
    //   [2, new Map([[0, 0], [2, 0]])],
    //   [1, new Map([[1, 0]])],
    // ]);
    // expect(data).toEqual(expected);
    // expect(data).toEqual([[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]]);
  });
  it("can solve puzzle with my input", () => {
    const data = parse(lines);
    const answer = solve(data);
    console.log("part 1 answer is " + answer);
    expect(answer).toEqual(299);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 6:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/10/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

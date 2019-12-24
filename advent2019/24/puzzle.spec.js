describe("2019 day 24", function() {
  // new code
  const size = 5;
  let var1 = 0;
  let var2 = '';
  let scan = [[false]];
  let seenLayouts = [false];
  let bioRating = -1;
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
  const init = (data = [[false]]) => {
    scan = data;
    for (let row = 0; row < size; row++) {
      scan[row].unshift(false);
      scan[row].push(false);
    }
    scan.unshift([false]);
    scan.push([false]);
    seenLayouts = [];
    bioRating = -1;
  };
  const calculateBioRating = () => {
    let bioRating = 0;
    let bit = 1;
    for (let row = 1; row <= size; row++) {
      for (let col = 1; col <= size; col++) {
        bioRating |= scan[row][col] ? bit : 0;
        bit <<= 1;
      }
    }
    return bioRating;
  };
  const addScanToSeenLayouts = () => {
    let layout = calculateBioRating();
    if (seenLayouts[layout]) return false;
    seenLayouts[layout] = true;
    return true;
  };
  const updateLayout = () => {
    let numAdjacent = [[0]];
    numAdjacent[0] = [];
    // count
    for (let row = 1; row <= size; row++) {
      numAdjacent[row] = [];
      for (let col = 1; col <= size; col++) {
        numAdjacent[row][col] = 0;
        if (scan[row-1][col]) numAdjacent[row][col] += 1;
        if (scan[row+1][col]) numAdjacent[row][col] += 1;
        if (scan[row][col+1]) numAdjacent[row][col] += 1;
        if (scan[row][col-1]) numAdjacent[row][col] += 1;
      }
    }
    // update
    for (let row = 1; row <= size; row++) {
      for (let col = 1; col <= size; col++) {
        if (scan[row][col] && numAdjacent[row][col] !== 1)
          scan[row][col] = false;
        else if (!scan[row][col] && (numAdjacent[row][col] === 1 || numAdjacent[row][col] === 2))
          scan[row][col] = true;
      }
    }
  };
  const solve = (data = [[false]]) => {
    console.log();
    init(data);
    addScanToSeenLayouts();
    let numLayouts = 1;
    while (true) {
      updateLayout();
      if (!addScanToSeenLayouts()) break;
      numLayouts++;
    }
    bioRating = calculateBioRating();
    console.log('numLayouts=', numLayouts);
    console.log('seenLayouts.length=', seenLayouts.length);
    return bioRating;
  }
  const parse = (lines = ['']) => {
    return lines.map((line) => line.split('').map((symbol) => (symbol === '#' ? true : false)));
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
  it("can update layout", () => {
    const actualLines = [
      [
        '....#',
        '#..#.',
        '#..##',
        '..#..',
        '#....',
      ],
      [
        '#..#.',
        '####.',
        '###.#',
        '##.##',
        '.##..',
      ],
      [
        '#####',
        '....#',
        '....#',
        '...#.',
        '#.###',
      ],
      [
        '#....',
        '####.',
        '...##',
        '#.##.',
        '.##.#',
      ],
    ];
    const actual = actualLines.map((data) => {
      init(parse(data));
      updateLayout();
      return scan;
    });
    const expectedLines = [
      [
        '#..#.',
        '####.',
        '###.#',
        '##.##',
        '.##..',
      ],
      [
        '#####',
        '....#',
        '....#',
        '...#.',
        '#.###',
      ],
      [
        '#....',
        '####.',
        '...##',
        '#.##.',
        '.##.#',
      ],
      [
        '####.',
        '....#',
        '##..#',
        '.....',
        '##...',
      ],
    ];
    const expected = expectedLines.map((data) => {
      init(parse(data));
      return scan;
    });
    expect(actual).toEqual(expected);
  });
  it("can find first repeated layout", () => {
    const actualLines = [
      [
        '....#',
        '#..#.',
        '#..##',
        '..#..',
        '#....',
      ],
    ];
    const actual = actualLines.map((data) => {
      solve(parse(data));
      return scan;
    });
    const expectedLines = [
      [
        '.....',
        '.....',
        '.....',
        '#....',
        '.#...',
      ],
    ];
    const expected = expectedLines.map((data) => {
      init(parse(data));
      return scan;
    });
    expect(actual).toEqual(expected);
  });
  it("can solve puzzle", () => {
    const actualLines = [
      [
        '....#',
        '#..#.',
        '#..##',
        '..#..',
        '#....',
      ],
    ];
    const actual = actualLines.map((data) => solve(parse(data)));
    const expected = [
      2129920,
    ];
    expect(actual).toEqual(expected);
  });
  it("can parse input", () => {
    const data = parse(
      '##.#. #...# .##..'
      .split(
        ' '
        ));
    expect(data).toEqual([
      [true, true, false, true, false],
      [true, false, false, false, true],
      [false, true, true, false, false],
    ]);
  });
  it("can solve puzzle with my input", () => {
    const data = parse(lines);
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
    console.log("2019 day 24:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/24/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

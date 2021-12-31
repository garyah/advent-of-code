describe("2021 day 15", function() {
  // code
  const intMax = 100 * 1000 * 1000;
  let path = [{row: 0, col: 0, risk: 0}];
  let risks = [[0]];
  let minRisks = [[0]];
  let addFlags = [[false]];
  let traversed = [{row: 0, col: 0, risk: 0}];

  // priority queue implementation
  // let freeQueue = [{row: 0, col: 0, risk: 0}];

  const initVars = () => {
    riskMap = [''];

    path = [];
    risks = [[]];
    minRisks = [[]];
    addFlags = [[]];
    traversed = [];

    // priority queue implementation
    // freeQueue = [];

    minRisk = 0;
  };
  const walkMap = () => {
    // console.log('riskMap.length = ', riskMap.length);
    // console.log('riskMap[0].length = ', riskMap[0].length);
    const size = riskMap.length;
    const numSteps = (size - 1) * 2;
    // console.log('numSteps = ', numSteps);
    let r = 0, c = 0;
    path = [];
    minRisk = 0;
    // console.log('downFlags.length = ', downFlags.length, ', downFlags = ', downFlags);
    for (let n = 0; n < numSteps; n++) {
      // console.log('r = ', r, ', c = ', c, ', n = ', n, ', minRisk = ', minRisk);
      path.push({row: r, col: c, risk: minRisk});
      const riskRight = (c + 1 < size) ? parseInt(riskMap[r][c + 1]) : intMax;
      const riskDown = (r + 1 < size) ? parseInt(riskMap[r + 1][c]) : intMax;
      const riskRightRight = (c + 2 < size) ? parseInt(riskMap[r][c + 2]) : intMax;
      const riskRightDown = (r + 1 < size && c + 1 < size) ? parseInt(riskMap[r + 1][c + 1]) : intMax;
      const riskDownRight = riskRightDown;
      const riskDownDown = (r + 2 < size) ? parseInt(riskMap[r + 2][c]) : intMax;
      if (riskRight + Math.min(riskRightRight, riskRightDown) < riskDown + Math.min(riskDownRight, riskDownDown)) {
        minRisk += riskRight;
        c += 1;
        continue;
      }
      if (riskRight + Math.min(riskRightRight, riskRightDown) > riskDown + Math.min(riskDownRight, riskDownDown)) {
        minRisk += riskDown;
        r += 1;
        continue;
      }
      // console.log('could not resolve tie, will move right anyway! r = ', r, ', c = ', c);
      minRisk += riskRight;
      c += 1;
    }
    path.push({row: r, col: c, risk: minRisk});
    // console.log('path=', path);
    // console.log('r = ', r, ', c = ', c, ', minRisk = ', minRisk);
  };
  const initRisks = () => {
    // console.log('riskMap.length = ', riskMap.length);
    // console.log('riskMap[0].length = ', riskMap[0].length);
    const size = riskMap.length;
    for (let r = 0; r < size; r++) {
      risks[r] = [];
      for (let c = 0; c < size; c++) {
        risks[r][c] = parseInt(riskMap[r][c]);
      }
    }
  }
  const extendRisks = () => {
    const size = risks.length;

    // add new columns to existing rows (existing grid)
    for (let r = 0; r < size; r++) {
      for (let c = size; c < size * 5; c++) {
        risks[r][c] = (risks[r][c - size] + 1) % 10;
        if (risks[r][c] === 0) risks[r][c] = 1;
      }
    }

    // add new rows with all columns
    for (let r = size; r < size * 5; r++) {
      risks[r] = [];
      for (let c = 0; c < size * 5; c++) {
        risks[r][c] = (risks[r - size][c] + 1) % 10;
        if (risks[r][c] === 0) risks[r][c] = 1;
      }
    }

    // console.log('risks.length = ', risks.length);
    // console.log('risks[0].length = ', risks[0].length);
    // console.log('risks[size].length = ', risks[size].length);
    // console.log('risks[size * 5 - 1].length = ', risks[size * 5 - 1].length);
  };
  const calcMinRisks = () => {
    // console.log('risks.length = ', risks.length);
    // console.log('risks[0].length = ', risks[0].length);
    const size = risks.length;

    // init
    for (let r = 0; r < size; r++) {
      minRisks[r] = [];
      for (let c = 0; c < size; c++) {
        minRisks[r][c] = risks[r][c];
      }
    }

    // fan-out
    for (let s = 2; s < size; s++) {
      for (let r = s, c = 0; r >= 0 && c <= s; r--, c++) {
        if (r === 0) { minRisks[0][c] += minRisks[0][c - 1]; continue; }
        if (c === 0) { minRisks[r][0] += minRisks[r - 1][0]; continue; }
        minRisks[r][c] += Math.min(minRisks[r][c - 1], minRisks[r - 1][c]);
      }
    }

    // fan-in
    for (let s = 1; s < size - 1; s++) {
      for (let r = size - 1, c = s; r >= s && c <= size - 1; r--, c++) {
        minRisks[r][c] += Math.min(minRisks[r][c - 1], minRisks[r - 1][c]);
      }
    }

    // completion
    minRisks[size - 1][size - 1]
      += Math.min(minRisks[size - 1][size - 2], minRisks[size - 2][size - 1]);
    minRisk = minRisks[size - 1][size - 1];
  };
  const enqueue = (queue = [{}], item = {}, key = 'key', lo = -1, hi = -1) => {
    if (lo === -1) {
      if (queue.length && item[key] <= queue[0][key]
          || queue.length === 0) {
        queue.unshift(item);
        return;
      }
      if (queue.length && item[key] > queue[queue.length - 1][key]) {
        queue.push(item);
        return;
      }
      enqueue(queue, item, key, 0, queue.length - 1);
      return;
    }
    const mid = lo + Math.round((hi - lo) / 2);
    if (item[key] > queue[mid - 1][key] && item[key] <= queue[mid][key]) {
      queue.splice(mid, 0, item);
      return;
    }
    if (item[key] <= queue[mid][key]) {
      enqueue(queue, item, key, lo, mid);
      return;
    }
    enqueue(queue, item, key, mid, hi);
  }
  const dequeue = (queue = [{}], index = 0) => {
    if (queue.length === 0) {
      return null;
    }
    if (index === 0) {
      return queue.shift();
    }
    if (index === queue.length - 1) {
      return queue.pop();
    }
    return queue.splice(index, 1)[0];
  }
  const initDijkstra = () => {
    // priority queue implementation
    // freeQueue = [];

    traversed = [];
    const size = risks.length;
    for (let r = 0; r < size; r++) {
      minRisks[r] = [];
      addFlags[r] = [];
      for (let c = 0; c < size; c++) {
        minRisks[r][c] = intMax;
        addFlags[r][c] = false;

        // priority queue implementation
        // enqueue(freeQueue, {row: r, col: c, risk: intMax}, 'risk');
      }
    }
  }
  const findNextCoord = () => {
    // not priority queue implementation
    let min = intMax;
    let minRow = 0, minCol = 0;
    const size = risks.length;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!addFlags[r][c] && minRisks[r][c] <= min) {
          min = minRisks[r][c];
          minRow = r, minCol = c;
        }
      }
    }
    return {row: minRow, col: minCol, risk: min};

    // priority queue implementation
    // return dequeue(freeQueue, 0);
  }
  const calcRisk = (srcCoord = {row: 0, col: 0}, tgtRow = 0, tgtCol = 0) => {
    // console.log('srcCoord = ', srcCoord, ', tgtRow = ', tgtRow, ', tgtCol = ', tgtCol);

    // for now, just return max risk for targets not down and to the right of sources
    if (srcCoord.row > tgtRow || srcCoord.col > tgtCol) return intMax;

    let rightDownRisk = 0, downRightRisk = 0;

    // figure total risk for right down path
    let r = srcCoord.row, c = srcCoord.col + 1;
    for (; c <= tgtCol; c++) {
      rightDownRisk += risks[r][c];
      // if (srcCoord.row === 0 && srcCoord.col === 0 && tgtRow === 1 && tgtCol === 1) {
      //   console.log('moving right, rightDownRisk=', rightDownRisk, 'r=', r, 'c=', c);
      // }
    }
    r = srcCoord.row + 1, c = tgtCol;
    for (; r <= tgtRow; r++) {
      rightDownRisk += risks[r][c];
      // if (srcCoord.row === 0 && srcCoord.col === 0 && tgtRow === 1 && tgtCol === 1) {
      //   console.log('moving down, rightDownRisk=', rightDownRisk, 'r=', r, 'c=', c);
      // }
    }
    if (rightDownRisk === 0) rightDownRisk = intMax;

    // figure total risk for down right path
    r = srcCoord.row + 1, c = srcCoord.col;
    for (; r <= tgtRow; r++) {
      downRightRisk += risks[r][c];
      // if (srcCoord.row === 0 && srcCoord.col === 0 && tgtRow === 1 && tgtCol === 1) {
      //   console.log('moving down, downRightRisk=', downRightRisk, 'r=', r, 'c=', c);
      // }
    }
    r = tgtRow, c = srcCoord.col + 1;
    for (; c <= tgtCol; c++) {
      downRightRisk += risks[r][c];
      // if (srcCoord.row === 0 && srcCoord.col === 0 && tgtRow === 1 && tgtCol === 1) {
      //   console.log('moving right, downRightRisk=', downRightRisk, 'r=', r, 'c=', c);
      // }
    }
    if (downRightRisk === 0) downRightRisk = intMax;

    // if (srcCoord.row === 0 && srcCoord.col === 0 && tgtRow === 1) {
    //   console.log('rightDownRisk=', rightDownRisk, 'downRightRisk=', downRightRisk);
    // }

    const risk = Math.min(rightDownRisk, downRightRisk);
    // console.log('srcCoord = ', srcCoord, ', tgtRow = ', tgtRow, ', tgtCol = ', tgtCol, ', risk = ', risk);
    return risk;
  }
  const findMinRisk = () => {
    const size = risks.length;
    initDijkstra();
    minRisks[0][0] = 0;

    // priority queue implementation
    // dequeue(freeQueue, freeQueue.length - 1);
    // enqueue(freeQueue, {row: 0, col: 0, risk: 0}, 'risk');

    let numSpins = 0, numFlagSets = 0, numRiskCalcs = 0, numMinRiskSets = 0;
    // let numTimesAddFlagsSet = 0, numTimesMinRiskIntMax = 0;
    for (let n = 0; n < size * size - 1; n++) {
      const nextCoord = findNextCoord();

      // not priority queue implementation
      addFlags[nextCoord.row][nextCoord.col] = true;
      numFlagSets++;

      traversed.push(nextCoord);
      let r = 0, c = 0;
      // not priority queue implementation
      for (r = 0; r < size; r++) {
        for (c = 0; c < size; c++)
            // priority queue implementation
            /* (let i = 0; i < freeQueue.length; i++) */ {
          numSpins++;

          // priority queue implementation
          // r = freeQueue[i].row; c = freeQueue[i].col;

          if (!addFlags[r][c] && /*minRisks[nextCoord.row][nextCoord.col] !== intMax*/true) {
            const risk = calcRisk(nextCoord, r, c);
            numRiskCalcs++;
            if (minRisks[nextCoord.row][nextCoord.col] + risk < minRisks[r][c]) {
              minRisks[r][c] = minRisks[nextCoord.row][nextCoord.col] + risk;
              numMinRiskSets++;

              // priority queue implementation
              // let coordToUpdate = dequeue(freeQueue, i);
              // coordToUpdate.risk = minRisks[r][c];
              // enqueue(freeQueue, coordToUpdate, 'risk');
              // if (r !== freeQueue[i].row || c !== freeQueue[i].col) i--;

              /*if (r === size - 1 && c === size - 1)*/ {
                // console.log(
                //   'nextCoord', nextCoord,
                //   'r =', r, ', c =', c,
                //   'minRisks[r][c] =', minRisks[r][c],
                //   'risk =', risk);
              }
            }
          }
          // if (addFlags[r][c]) {
          //   numTimesAddFlagsSet++;
          // }
          // if (minRisks[nextCoord.row][nextCoord.col] === intMax) {
          //   numTimesMinRiskIntMax++;
          // }
        }
      }
      // if (n === 0 || n === size * size - 1) {
      //   console.log('numFlagSets=', numFlagSets, 'numSpins=', numSpins, 'numRiskCalcs=', numRiskCalcs, 'numMinRiskSets=', numMinRiskSets);
      // }
    }
    console.log('numFlagSets=', numFlagSets, 'numSpins=', numSpins, 'numRiskCalcs=', numRiskCalcs, 'numMinRiskSets=', numMinRiskSets);
    // console.log('numTimesAddFlagsSet=', numTimesAddFlagsSet, 'numTimesMinRiskIntMax=', numTimesMinRiskIntMax);
    minRisk = minRisks[size - 1][size - 1];
    traversed.push({row: size - 1, col: size - 1, risk: minRisk});
    // console.log('traversed=', traversed);
  }
  let minRisk = 0;
  const solve = () => {
    initRisks();
    // calcMinRisks();
    findMinRisk();
  }
  const solve_p2 = () => {
    initRisks();
    extendRisks();
    // calcMinRisks();
    findMinRisk();
  }
  let riskMap = [''];
  const parse = () => {
    riskMap = lines;    // use for multi-line string input
  };















  // tests
  it('enqueue() can add specified object to specified queue', () => {
    let queue = [{}];
    // console.log('queue.length=', queue.length);
    expect(queue.length).toEqual(1);
    queue.pop();
    expect(queue.length).toEqual(0);
    // console.log('queue.length=', queue.length);
    enqueue(queue, {});
    expect(queue.length).toEqual(1);
  });
  it('enqueue() can add specified object with specified sort key to front of specified queue, if value of key for object first in sort', () => {
    let queue = [{key: 1}];
    enqueue(queue, {key: 0}, 'key');
    expect(queue.length).toEqual(2);
    expect(queue[0].key).toEqual(0);
    expect(queue[1].key).toEqual(1);
  });
  it('enqueue() can add specified object with specified sort key to back of specified queue, if value of key for object last in sort', () => {
    let queue = [{key: 1}];
    enqueue(queue, {key: 2}, 'key');
    expect(queue[0].key).toEqual(1);
    expect(queue[1].key).toEqual(2);
  });
  it('enqueue() can add specified object with specified sort key to middle of specified queue, if value of key for object neither first nor last in sort', () => {
    let queue = [{key: 1}, {key: 3}];
    enqueue(queue, {key: 2}, 'key');
    expect(queue[0].key).toEqual(1);
    expect(queue[1].key).toEqual(2);
    expect(queue[2].key).toEqual(3);
    queue = [{key: 1}, {key: 3}, {key: 4}, {key: 5}, {key: 6}, {key: 7}, {key: 8}];
    enqueue(queue, {key: 2}, 'key');
    expect(queue[0].key).toEqual(1);
    expect(queue[1].key).toEqual(2);
    expect(queue[2].key).toEqual(3);
    expect(queue[3].key).toEqual(4);
    expect(queue[4].key).toEqual(5);
    expect(queue[5].key).toEqual(6);
    expect(queue[6].key).toEqual(7);
    expect(queue[7].key).toEqual(8);
    queue = [{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 6}];
    enqueue(queue, {key: 5}, 'key');
    expect(queue[0].key).toEqual(1);
    expect(queue[1].key).toEqual(2);
    expect(queue[2].key).toEqual(3);
    expect(queue[3].key).toEqual(4);
    expect(queue[4].key).toEqual(5);
    expect(queue[5].key).toEqual(6);
  });
  it('dequeue() can remove object with specified index from specified queue', () => {
    let queue = [{prop: 0, key: 1}, {prop: 1, key: 2}, {prop: 2, key: 3}];
    expect(queue.length).toEqual(3);
    let item = dequeue(queue, 0);
    expect(queue.length).toEqual(2);
    // console.log(item);
    expect(item['prop']).toEqual(0);
    queue = [{prop: 0, key: 1}, {prop: 1, key: 2}, {prop: 2, key: 3}];
    item = dequeue(queue, 1);
    expect(item['prop']).toEqual(1);
    queue = [{prop: 0, key: 1}, {prop: 1, key: 2}, {prop: 2, key: 3}];
    item = dequeue(queue, 2);
    expect(item['prop']).toEqual(2);
  });
  it('finds min risk for various 2x2 paths: obvious down, right, and tie', () => {
    riskMap = [
      '19',
      '11'
    ];
    walkMap();
    expect(minRisk).toEqual(2);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(2);
    findMinRisk();
    expect(minRisk).toEqual(2);
    riskMap = [
      '11',
      '91'
    ];
    walkMap();
    expect(minRisk).toEqual(2);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(2);
    findMinRisk();
    expect(minRisk).toEqual(2);
    riskMap = [
      '11',
      '11'
    ];
    walkMap();
    expect(minRisk).toEqual(2);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(2);
    findMinRisk();
    expect(minRisk).toEqual(2);
  });
  it('finds min risk for various 3x3 paths: obvious down, right, and tie', () => {
    riskMap = [
      '199',
      '199',
      '111'
    ];
    walkMap();
    expect(minRisk).toEqual(4);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(4);
    findMinRisk();
    expect(minRisk).toEqual(4);
    riskMap = [
      '111',
      '991',
      '991'
    ];
    walkMap();
    expect(minRisk).toEqual(4);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(4);
    findMinRisk();
    expect(minRisk).toEqual(4);
    riskMap = [
      '111',
      '111',
      '111'
    ];
    walkMap();
    expect(minRisk).toEqual(4);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(4);
    findMinRisk();
    expect(minRisk).toEqual(4);
  });
  it('finds min risk for 3x3 path with diagonal path min risk', () => {
    riskMap = [
      '199',
      '919',
      '991'
    ];
    walkMap();
    expect(minRisk).toEqual(20);
    initRisks();
    // calcMinRisks();
    // expect(minRisk).toEqual(20);
    findMinRisk();
    // expect(minRisk).toEqual(20);
  });
  it('finds min risk for 3x3 path with tricky risks requiring look-ahead more than one move', () => {
    riskMap = [
      '199',
      '949',
      '341'
    ];
    walkMap();
    expect(minRisk).toEqual(17);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(17);
    findMinRisk();
    expect(minRisk).toEqual(17);
  });
  it('finds min risk for various 4x4 paths: obvious down, right, and tie', () => {
    riskMap = [
      '1999',
      '1999',
      '1999',
      '1111'
    ];
    walkMap();
    expect(minRisk).toEqual(6);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(6);
    findMinRisk();
    expect(minRisk).toEqual(6);
    riskMap = [
      '1111',
      '9991',
      '9991',
      '9991'
    ];
    walkMap();
    expect(minRisk).toEqual(6);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(6);
    findMinRisk();
    expect(minRisk).toEqual(6);
    riskMap = [
      '1111',
      '1111',
      '1111',
      '1111'
    ];
    walkMap();
    expect(minRisk).toEqual(6);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(6);
    findMinRisk();
    expect(minRisk).toEqual(6);
  });
  it('finds min risk for 4x4 path with diagonal path min risk', () => {
    riskMap = [
      '1999',
      '9199',
      '9919',
      '9991'
    ];
    walkMap();
    expect(minRisk).toEqual(30);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(30);
    findMinRisk();
    expect(minRisk).toEqual(30);
  });
  it('finds min risk for 4x4 path with tricky risks requiring look-ahead more than two moves', () => {
    riskMap = [
      '1999',
      '9999',
      '9499',
      '3441'
    ];
    walkMap();
    // walkMap() fails this case
    // expect(minRisk).toEqual(30);
    initRisks();
    calcMinRisks();
    expect(minRisk).toEqual(30);
    findMinRisk();
    expect(minRisk).toEqual(30);
  });
  it('finds min risk for 5x5 path with detour requiring up or left moves', () => {
    riskMap = [
      '19999',
      '19111',
      '11191',
      '99991',
      '99991'
    ];
    walkMap();
    // walkMap() fails this case
    // expect(minRisk).toEqual(10);
    initRisks();
    calcMinRisks();
    // calcMinRisks() fails this case
    // expect(minRisk).toEqual(10);
    findMinRisk();
    // expect(minRisk).toEqual(10);
  });
  it("can solve puzzle with my input", () => {
    parse();
    solve();
    console.log("\npart 1 answer is " + minRisk);
    expect(minRisk).toEqual(811);
  });
  xit("can solve puzzle p2 with my input", () => {
    parse();
    solve_p2();
    console.log("\npart 2 answer is " + minRisk);
    // expect(minRisk).toEqual(2);
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
    console.log("2021 day 15:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/15/input.txt", (linesRead) => {
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

describe("2019 day 12", function() {
  // new code
  let var1 = 0;
  let var2 = '';
  let moonPos = [[0, 0, 0]];
  let moonVel = [[0, 0, 0]];
  let numMoons = 0;//, numPoints = 0, numLines = 0, numRects = 0, numCubes = 0;
  let totalEnergy = 0;
  // let moonVelHi = [[0, 0, 0]];
  // let moonVelLo = [[0, 0, 0]];
  // let moonPosHi = [[0, 0, 0]];
  // let moonPosLo = [[0, 0, 0]];
  // let moonPosRanges = [[[[0]], [[0]], [[0]]]];
  // let moonPosRanges = [[[0, 0, 0, 0, 0, 0]]];
  let moonPosRanges = [{}];
  let moonVelRanges = [[[[0]], [[0]], [[0]]]];
  let moonDimensionMaps = [new Map()];
  let universe = [];
  let stepNum = 0, numTimeStates = 0;
  const numberToString = (number = 0) => {
    if (number < -2147483648) number = -2147483648;
    if (number > 2147483647) number = 2147483647;
    number += 2147483648;
    let result = '00000000' + number.toString(16);
    return result.substr(result.length - 8);
  };
  const stringToNumber = (value = '') => {
    return parseInt(value, 16) - 2147483648;
  };
  const numbersToString = (numbers = [0]) => {
    return numbers.map((value) => numberToString(value)).join(',');
  };
  const stringToNumbers = (values = '') => {
    return values.split(',').map((value) => stringToNumber(value));
  };
  const searchUniverse = (values = '', lo = 0, hi = universe.length - 1) => {
    const mid = lo + Math.floor((hi - lo + 1) / 2);
    // console.log('values=', values, 'lo=', lo, 'mid=', mid, 'hi=', hi);
    if (values >= universe[mid][0] && values <= universe[mid][1]) return true;
    if (lo === hi) return false;
    return values < universe[mid][0] ?
            searchUniverse(values, lo, mid - 1)
            : searchUniverse(values, mid, hi);
  }
  const init = (data = [[0]]) => {
    moonPos = data;
    numMoons = moonPos.length;
    // numLines = 0, numRects = 0, numCubes = 0;
    for (let m = 0; m < numMoons; m++) {
      moonVel[m] = [0, 0, 0];
      // moonVelHi[m] = [0, 0, 0];
      // moonVelLo[m] = [0, 0, 0];
      // moonPosHi[m] = [0, 0, 0];
      // moonPosLo[m] = [0, 0, 0];
      // moonPosRanges[m] = [[[]], [[]], [[]]];
      // moonPosRanges[m] = [[moonPos[m][0], moonPos[m][1], moonPos[m][2], moonPos[m][0], moonPos[m][1], moonPos[m][2]]];
      const coordinates = moonPos[m].join(',');
      moonPosRanges[m] = {
        points: new Map([[coordinates, 0]]),
        lines: new Map(),
        rects: new Map(),
        cubes: new Map(),
      };
      // moonVelRanges[m] = [[[0, 0]], [[0, 0]], [[0, 0]]];
      moonVelRanges[m] = {
        points: new Map([['0,0,0', 0]]),
        lines: new Map(),
        rects: new Map(),
        cubes: new Map(),
      };
    }
    for (let d = 0; d < numMoons * 3 * 2; d++) {
      moonDimensionMaps[d] = new Map();
    }
    let coordinates = [];
    for (let m = 0; m < numMoons; m++) {
      for (let i = 0; i < 2; i++) {
        for (let a = 0; a < 3; a++) {
          coordinates.push((i === 0) ? moonPos[m][a] : moonVel[m][a]);
        }
      }
    }
    console.log('initial point=', coordinates);
    const initialPoint = numbersToString(coordinates);
    // console.log('initialPoint=', initialPoint);
    universe = [[initialPoint, initialPoint]];
    // numPoints = 4;
    stepNum = 0;
    numTimeStates = 0;
  };
  const step = () => {
    stepNum++;
    // update velocity
    for (let moon1 = 0; moon1 < numMoons; moon1++) {
      for (let moon2 = 0; moon2 < numMoons; moon2++) {
        if (moon1 === moon2) continue;
        if (moonPos[moon1][0] > moonPos[moon2][0]) moonVel[moon1][0] -= 1;
        if (moonPos[moon1][0] < moonPos[moon2][0]) moonVel[moon1][0] += 1;
        if (moonPos[moon1][1] > moonPos[moon2][1]) moonVel[moon1][1] -= 1;
        if (moonPos[moon1][1] < moonPos[moon2][1]) moonVel[moon1][1] += 1;
        if (moonPos[moon1][2] > moonPos[moon2][2]) moonVel[moon1][2] -= 1;
        if (moonPos[moon1][2] < moonPos[moon2][2]) moonVel[moon1][2] += 1;
      }
    }
    // update position
    for (let m = 0; m < numMoons; m++) {
      for (let a = 0; a < 3; a++) {
        moonPos[m][a] += moonVel[m][a];
      }
      // console.log(m, ': pos=<x=', moonPos[m][0], ', y=', moonPos[m][1], ', z=', moonPos[m][2],
      //             '>, vel=<x=', moonVel[m][0], ', y=', moonVel[m][1], ', z=', moonVel[m][2], '>');
    }
  };
  const updateEnergy = () => {
    // update energy
    totalEnergy = 0;
    for (let moon1 = 0; moon1 < numMoons; moon1++) {
      let potentialEnergy = 0;
      let kineticEnergy = 0;
      for (let axis = 0; axis < 3; axis++) {
        potentialEnergy += Math.abs(moonPos[moon1][axis]);
        kineticEnergy += Math.abs(moonVel[moon1][axis]);
      }
      totalEnergy += potentialEnergy * kineticEnergy;
    }
  };
  const checkAndUpdateUniverse = () => {
    // check
    let stateToFind = [];
    for (let m = 0; m < numMoons; m++) {
      for (let i = 0; i < 2; i++) {
        for (let a = 0; a < 3; a++) {
          stateToFind.push((i === 0) ? moonPos[m][a] : moonVel[m][a]);
        }
      }
    }
    // const stateToFind = numbersToString(coordinates);
    let gotMatch = false;
    for (const stateRange of universe) {
      const stateToCheck = stringToNumbers(stateRange[0]);
      let gotAllMatching = true;
      for (let d = 0; d < numMoons * 3 * 2; d++) {
        if (stateToFind[d] !== stateToCheck[d]) { gotAllMatching = false; break; }
      }
      if (gotAllMatching) {
        gotMatch = true;
        // console.log('repeat point=', numbersToString(stateToFind));
        console.log(' repeat point=', stateToFind);
        break;
      }
    }
    // update
    if (!gotMatch) universe.push([numbersToString(stateToFind), numbersToString(stateToFind)]);
    return gotMatch;
  }
  const checkAndUpdateDimensionMaps = () => {
    // check for potential match and update maps
    let gotPotentialMatch = true;
    for (let m = 0; m < numMoons; m++) {
      for (let i = 0; i < 2; i++) {
        for (let a = 0; a < 3; a++) {
          const mapIndex = m*2*3 + i*3 + a;
          const key = (i === 0) ? moonPos[m][a] : moonVel[m][a];
          if (moonDimensionMaps[mapIndex].has(key)) {
            let times = moonDimensionMaps[mapIndex].get(key);
            times.set(stepNum, 0);
            numTimeStates++;
            // moonDimensionMaps[mapIndex].set(key, times);
            // console.log('set map #', mapIndex);
            continue;
          }
          gotPotentialMatch = false;
          let times = new Map();
          times.set(stepNum, 0);
          moonDimensionMaps[mapIndex].set(key, times);
          numTimeStates++;
          // console.log('set map #', mapIndex);
        }
      }
    }
    // confirm match based on time value
    if (gotPotentialMatch) {
      let gotTimeMatch = true;
      const key = moonPos[0][0];
      const times = moonDimensionMaps[0].get(key);
      // console.log('potential match: stepNum=', stepNum, 'moonPos[0][0]=', moonPos[0][0]);
      for (const time of times.keys()) {
        if (time === stepNum) continue;
        gotTimeMatch = true;
        for (let m = 0; gotTimeMatch && m < numMoons; m++) {
          for (let i = 0; gotTimeMatch && i < 2; i++) {
            for (let a = 0; a < 3; a++) {
              if (m === 0 && i === 0 && a === 0) continue;
              const mapIndex = m*2*3 + i*3 + a;
              const key2 = (i === 0) ? moonPos[m][a] : moonVel[m][a];
              const times2 = moonDimensionMaps[mapIndex].get(key2);
              if (!times2.has(time)) {
                // console.log('time=', time, 'not found for m=', m, 'i=', i, 'a=', a);
                gotTimeMatch = false;
                break;
              }
            }
          }
        }
        if (gotTimeMatch) break;
      }
      return gotTimeMatch;
    }
    return false;
  };
  const checkAndUpdateRanges = (dimensions = [[0, 0, 0]],
                                ranges = [{points: new Map(), lines: new Map(), rects: new Map(), cubes: new Map()}]) => {
    // checking code
    let gotMatch = true;
    for (let m = 0; m < numMoons; m++) {
      const key = dimensions[m].join(',');
      if (ranges[m].points.has(key)) continue;
      // let gotRangeMatch = false;
      // for (let entry of ranges[m].lines) {
      //   if (key === entry[0] || key === entry[1]) { gotRangeMatch = true; break;}
      // }
      // if (gotRangeMatch) continue;
      // update code
      gotMatch = false;
      ranges[m].points.set(key);
    }
    return gotMatch;
  }
  const checkAndUpdatePosVelRanges = () => {
    const posResult = checkAndUpdateRanges(moonPos, moonPosRanges)
    const velResult = checkAndUpdateRanges(moonVel, moonVelRanges);
    return posResult && velResult;
  }
  const updateRanges = () => {
    // check and update position and velocity ranges
    let gotMatch = true;
    for (let m = 0; m < numMoons; m++) {
      //for (let a = 0; a < 3; a++) {
        // update position ranges
        let rangeList = moonPosRanges[m];
        let gotInserted = false;
        let grewRangeLeft = false, grewRangeRight = false;
        let gotRangeMatch = false;
        for (let i = 0; i < rangeList.length; i++) {
          // const isCube
          //      = rangeList[i][0] !== rangeList[i][3]
          //     && rangeList[i][1] !== rangeList[i][4]
          //     && rangeList[i][2] !== rangeList[i][5];
          // const isRect
          //      = rangeList[i][0] !== rangeList[i][3]
          //     && rangeList[i][1] !== rangeList[i][4]
          //     && rangeList[i][2] === rangeList[i][5]
          //     || rangeList[i][0] !== rangeList[i][3]
          //     && rangeList[i][1] === rangeList[i][4]
          //     && rangeList[i][2] !== rangeList[i][5]
          //     || rangeList[i][0] === rangeList[i][3]
          //     && rangeList[i][1] !== rangeList[i][4]
          //     && rangeList[i][2] !== rangeList[i][5];
          // const isLine
          //      = rangeList[i][0] !== rangeList[i][3]
          //     && rangeList[i][1] === rangeList[i][4]
          //     && rangeList[i][2] === rangeList[i][5]
          //     || rangeList[i][0] === rangeList[i][3]
          //     && rangeList[i][1] !== rangeList[i][4]
          //     && rangeList[i][2] === rangeList[i][5]
          //     || rangeList[i][0] === rangeList[i][3]
          //     && rangeList[i][1] === rangeList[i][4]
          //     && rangeList[i][2] !== rangeList[i][5];
          // const isPoint = !isCube && !isRect && !isLine;
          // if (((isCube || isRect)
          //      && moonPos[m][0] < rangeList[i][0] && moonPos[m][1] < rangeList[i][1] && moonPos[m][2] < rangeList[i][2])
          //  || ((isLine || isPoint)
          //      && moonPos[m][0] < rangeList[i][0] - 1 && moonPos[m][1] < rangeList[i][1] - 1 && moonPos[m][2] < rangeList[i][2] - 1)) {
          //   gotInserted = true;
          //   rangeList.splice(i, 0, [moonPos[m][0], moonPos[m][1], moonPos[m][2], moonPos[m][0], moonPos[m][1], moonPos[m][2]]);
          //   break;
          // }
          if ((isLine || isPoint) && moonPos[m][0] === rangeList[i][0] - 1) {
            rangeList[i][0] = moonPos[m][0];
            grewRangeLeft = true;
            if (i > 0 && rangeList[i][0] === rangeList[i-1][1] + 1) {
              // possible merge with another range
              rangeList[i][0] = rangeList[i-1][0];
              rangeList.splice(i-1, 1);
            }
            break;
          }
          if (moonPos[m][a] >= rangeList[i][0] && moonPos[m][a] <= rangeList[i][1]) {
            gotRangeMatch = true;
            break;
          }
          if (moonPos[m][a] === rangeList[i][1] + 1) {
            rangeList[i][1] = moonPos[m][a];
            grewRangeRight = true;
            if (i < rangeList.length - 1 && rangeList[i][1] === rangeList[i+1][0] - 1) {
              // possible merge with another range
              rangeList[i][1] = rangeList[i+1][1];
              rangeList.splice(i+1, 1);
            }
            break;
          }
        }
        if (!gotInserted && !grewRangeLeft && !grewRangeRight && !gotRangeMatch) {
          // create completely new range at end of ordered list!
          rangeList.push([moonPos[m][a], moonPos[m][a]]);
        }
        if (!gotRangeMatch) gotMatch = false;
        // update velocity ranges
        rangeList = moonVelRanges[m][a];
        gotInserted = false;
        grewRangeLeft = false; grewRangeRight = false;
        gotRangeMatch = false;
        for (let i = 0; i < rangeList.length; i++) {
          if (moonVel[m][a] < rangeList[i][0] - 1) {
            gotInserted = true;
            rangeList.splice(i, 0, [moonVel[m][a], moonVel[m][a]]);
            break;
          }
          if (moonVel[m][a] === rangeList[i][0] - 1) {
            rangeList[i][0] = moonVel[m][a];
            grewRangeLeft = true;
            if (i > 0 && rangeList[i][0] === rangeList[i-1][1] + 1) {
              // possible merge with another range
              rangeList[i][0] = rangeList[i-1][0];
              rangeList.splice(i-1, 1);
            }
            break;
          }
          if (moonVel[m][a] >= rangeList[i][0] && moonVel[m][a] <= rangeList[i][1]) {
            gotRangeMatch = true;
            break;
          }
          if (moonVel[m][a] === rangeList[i][1] + 1) {
            rangeList[i][1] = moonVel[m][a];
            grewRangeRight = true;
            if (i < rangeList.length - 1 && rangeList[i][1] === rangeList[i+1][0] - 1) {
              // possible merge with another range
              rangeList[i][1] = rangeList[i+1][1];
              rangeList.splice(i+1, 1);
            }
            break;
          }
        }
        if (!gotInserted && !grewRangeLeft && !grewRangeRight && !gotRangeMatch) {
          // create completely new range at end of ordered list!
          rangeList.push([moonVel[m][a], moonVel[m][a]]);
        }
        if (!gotRangeMatch) gotMatch = false;
      //}
    }
    if (gotMatch) console.log('found velocity and position match, step #:', stepNum);
  }
  const solve = (data = [0]) => {
    init(data);
    for (let numSteps = 0; numSteps < 1000; numSteps++) {
      step();
    }
    updateEnergy();
    return totalEnergy;
  }
  const solve_p2 = (data = [0]) => {
    // let junk = [['ghi', 'ghl'], ['abc', 'abd']];
    // let junk = [['bcde,0000', 'ghl'], ['0000,bcde', 'abd']];
    // let junk = 2 * 1000 * 1000 * 1 + 12;
    // console.log(junk);
    // junk.sort();
    // console.log(junk);
    // console.log(junk.toString(16));
    // 58d694d3a

    console.log();
    init(data);
    while (stepNum < 3 * 1 * 1000) {
      step();
      if (checkAndUpdateUniverse()) break;
    }

    console.log('universe.length=', universe.length);
    // let toPrint = '';
    // for (let d = 0; d < numMoons * 3 * 2; d++) {
    //   toPrint += '..Dim..Maps[' + d + '].size=' + moonDimensionMaps[d].size + '\t';
    //   if (d % 6 === 5) toPrint += '\r\n';
    // }
    // console.log(toPrint);
    // console.log('numTimeStates=', numTimeStates)
    // console.log('moonPosRanges[0].points.size=', moonPosRanges[0].points.size, 'moonPosRanges[1].points.size=', moonPosRanges[1].points.size,
    //             'moonPosRanges[2].points.size=', moonPosRanges[2].points.size, 'moonPosRanges[3].points.size=', moonPosRanges[3].points.size);
    // console.log('moonVelRanges[0].points.size=', moonVelRanges[0].points.size, 'moonVelRanges[1].points.size=', moonVelRanges[1].points.size,
    //             'moonVelRanges[2].points.size=', moonVelRanges[2].points.size, 'moonVelRanges[3].points.size=', moonVelRanges[3].points.size);
    // console.log('moonVelHi=', moonVelHi);
    // console.log('moonVelLo=', moonVelLo);
    // console.log('moonPosHi=', moonPosHi);
    // console.log('moonPosLo=', moonPosLo);
    return stepNum;
  }
  const parse = (lines = ['']) => {
    // return lines[0]; // use for one line string input
    // return lines;    // use for multi-line string input
    return lines.map((line) => {
      const numbers=line.split(',');
      return numbers.map((number) => parseInt(number));
    });
  };















  // new tests
  it("can turn number into string with hexadecimal with largest negative as 0 and leading zeroes", () => {
    const data = [
      -2147483649, -2147483648, 0, 2147483647, 2147483648,
    ];
    const actual = data.map((data) => numberToString(data));
    const expected = [
      '00000000', '00000000', '80000000', 'ffffffff', 'ffffffff',
    ];
    expect(actual).toEqual(expected);
  });
  it("can turn string with hexadecimal with largest negative as 0 and leading zeroes into number", () => {
    const data = [
      '00000000', '80000000', 'ffffffff',
    ];
    const actual = data.map((data) => stringToNumber(data));
    const expected = [
      -2147483648, 0, 2147483647,
    ];
    expect(actual).toEqual(expected);
  });
  it("can turn array of numbers into properly formatted string", () => {
    const data = [
      [1,0,2],
      [2,10,-7],
    ];
    const actual = data.map((data) => numbersToString(data));
    const expected = [
      '80000001,80000000,80000002',
      '80000002,8000000a,7ffffff9',
    ];
    expect(actual).toEqual(expected);
  });
  it("can turn properly formatted string into array of numbers", () => {
    const data = [
      '80000001,80000000,80000002',
      '80000002,8000000a,7ffffff9',
    ];
    const actual = data.map((data) => stringToNumbers(data));
    const expected = [
      [1,0,2],
      [2,10,-7],
    ];
    expect(actual).toEqual(expected);
  });
  it("can search universe for exact (or eventually closest match)", () => {
    universe = [
      ['80000001,80000000,80000002', '80000001,80000000,80000002'], // [1,0,2]
      ['80000002,8000000a,7ffffff9', '80000002,8000000a,7ffffff9'], // [2,10,-7]
    ];
    const data = [
      '80000001,80000000,80000001', '80000001,80000000,80000002', // [1,0,1], [1,0,2]
      '80000002,8000000a,7ffffff9', '80000002,8000000a,7ffffffa', // [2,10,-7], [2,10,-6]
    ];
    let actual = data.map((data) => searchUniverse(data));
    const expected = [
      false, true, true, false,
    ];
    expect(actual).toEqual(expected);
    universe = [
      ['80000001,80000000,80000002', '80000001,80000000,80000002'], // [1,0,2]
      ['80000002,8000000a,7ffffff9', '80000002,8000000a,7ffffff9'], // [2,10,-7]
      ['80000002,8000000a,7ffffffb', '80000002,8000000a,7ffffffb'], // [2,10,-5]
    ];
    actual = data.map((data) => searchUniverse(data));
    expect(actual).toEqual(expected);
  });
  it("can solve puzzle", () => {
    const data = [
      [1,0,2],
      [2,10,-7],
      [4,8,8],
      [3,5,-1],
    ];
    // init(data);
    // step();
    // expect(actual).toEqual(expected);

    // const actual = data.map((data) => {
    // });
    // const expected = [
    //   1,
    // ];
  });
  it("can parse input", () => {
    const data = parse(
      '-9,-1,-1 2,9,5'
      .split(
        ' '
        ));
    expect(data).toEqual([[-9,-1,-1], [2,9,5]]);
  });
  it("can solve puzzle with my input (when overridden with sample 1 input)", () => {
    const data = parse(lines);
    // const answer = solve(data);
    // console.log("part 1 answer is " + answer);
    // expect(answer).toEqual(12644);
    // expect(answer).toEqual(183);
  });
  it("can solve puzzle part 2 with my input (when overridden with sample 1 input)", () => {
    const data = parse(lines);
    // const answer = solve_p2(data);
    // console.log("part 2 answer is " + answer);
    // expect(answer).toEqual(2772);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 12:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/12/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

describe("2019 day 12", function() {
  // new code
  let var1 = 0;
  let var2 = '';
  let moonPos = [[0, 0, 0]];
  let moonVel = [[0, 0, 0]];
  let numMoons = 0;
  let totalEnergy = 0;
  // let moonVelHi = [[0, 0, 0]];
  // let moonVelLo = [[0, 0, 0]];
  // let moonPosHi = [[0, 0, 0]];
  // let moonPosLo = [[0, 0, 0]];
  let moonPosRanges = [[[[0]], [[0]], [[0]]]];
  let moonVelRanges = [[[[0]], [[0]], [[0]]]];
  let stepNum = 0;
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
  const init = (data = [[0]]) => {
    moonPos = data;
    numMoons = moonPos.length;
    for (let m = 0; m < numMoons; m++) {
      moonVel[m] = [0, 0, 0];
      // moonVelHi[m] = [0, 0, 0];
      // moonVelLo[m] = [0, 0, 0];
      // moonPosHi[m] = [0, 0, 0];
      // moonPosLo[m] = [0, 0, 0];
      moonPosRanges[m] = [[[0, 0]], [[0, 0]], [[0, 0]]];
      moonVelRanges[m] = [[[0, 0]], [[0, 0]], [[0, 0]]];
    }
    stepNum = 0;
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
    // check position and velocity ranges
    let gotMatch = true;
    for (let m = 0; gotMatch && m < numMoons; m++) {
      for (let a = 0; gotMatch && a < 3; a++) {
        // check position ranges
        let rangeList = moonPosRanges[m][a];
        let gotRangeMatch = false;
        for (let i = 0; i < rangeList.length; i++) {
          if (moonPos[m][a] >= rangeList[i][0]
              && moonPos[m][a] <= rangeList[i][1]) {
            console.log('found position match, m=', m, ', a=', a, ', i=', i, ', pos=', moonPos[m][a],
                        ', range=', rangeList[i][0], ' - ', rangeList[i][1], ', step #:', stepNum);
            gotRangeMatch = true;
            break;
          }
        }
        if (!gotRangeMatch) { gotMatch = false; continue; }
        // check velocity ranges
        rangeList = moonVelRanges[m][a];
        gotRangeMatch = false;
        for (let i = 0; i < rangeList.length; i++) {
          if (moonVel[m][a] >= rangeList[i][0]
              && moonVel[m][a] <= rangeList[i][1]) {
            gotRangeMatch = true;
            break;
          }
        }
        if (!gotRangeMatch) gotMatch = false;
      }
    }
    if (gotMatch) console.log('found velocity and position match, step #:', stepNum);
    // update position and velocity ranges
    for (let m = 0; m < numMoons; m++) {
      for (let a = 0; a < 3; a++) {
        // update position ranges
        let rangeList = moonPosRanges[m][a];
        let gotInserted = false;
        let grewRangeLeft = false, grewRangeRight = false;
        let gotRangeMatch = false;
        for (let i = 0; i < rangeList.length; i++) {
          if (moonPos[m][a] < rangeList[i][0] - 1) {
            gotInserted = true;
            rangeList.splice(i, 0, [moonPos[m][a], moonPos[m][a]]);
            break;
          }
          if (moonPos[m][a] === rangeList[i][0] - 1) {
            rangeList[i][0] = moonPos[m][a];
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
      }
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
  const solve = (data = [0]) => {
    init(data);
    for (numSteps = 0; numSteps < 1000; numSteps++) {
      step();
    }
    updateEnergy();
    return totalEnergy;
  }
  const solve_p2 = (data = [0]) => {
    init(data);
    for (numSteps = 0; numSteps < 30; numSteps++) {
      step();
    }
    // console.log('moonVelHi=', moonVelHi);
    // console.log('moonVelLo=', moonVelLo);
    // console.log('moonPosHi=', moonPosHi);
    // console.log('moonPosLo=', moonPosLo);
    return totalEnergy;
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
  it("can solve puzzle with my input", () => {
    // const data = [0];
    // const data = parse(lines);
    // const answer = solve(data);
    // console.log("part 1 answer is " + answer);
    // expect(answer).toEqual(0);
  });
  it("can solve puzzle part 2 with my input", () => {
    // const data = [0];
    const data = parse(lines);
    const answer = solve_p2(data);
    console.log("part 2 answer is " + answer);
    // expect(answer).toEqual(0);
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

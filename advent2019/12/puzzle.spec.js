describe("2019 day 12", function() {
  // new code
  let var1 = 0;
  let var2 = '';
  let moonPos = [[0, 0, 0]];
  let moonVel = [[0, 0, 0]];
  let totalEnergy = 0;
  const fn1 = (arg1 = 0, arg2 = '', arg3 = []) => {
    if (1) {}
    else if (1) {}
    else {}
    for (let i = 0;; i++) { break; continue; }
    for (const item of arg3) {}
    return 0;
  };
  const init = (data = [[0]]) => {
    moonPos = data;
    for (let moon1 = 0; moon1 < moonPos.length; moon1++) moonVel[moon1] = [0, 0, 0];
  };
  const step = () => {
    const numMoons = moonPos.length;
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
    for (let moon1 = 0; moon1 < numMoons; moon1++) {
      for (let axis = 0; axis < 3; axis++) {
        moonPos[moon1][axis] += moonVel[moon1][axis];
      }
    }
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



    // for ()
    // if (1) {}
    // else if (1) {}
    // else {}
    // for (let i = 0;; i++) { break; continue; }
    // // for (const item of arg3) {}
    // return 0;
  };
  const fn2 = () => {
    return '';
  };
  const solve = (data = [0]) => {
    init(data);
    for (numSteps = 0; numSteps < 1000; numSteps++) {
      step();
    }
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
    init(data);
    step();
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
    const data = parse(lines);
    const answer = solve(data);
    console.log("part 1 answer is " + answer);
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

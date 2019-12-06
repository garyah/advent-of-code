describe("2019 day 6", function() {
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
  const solve = (data = [0]) => {
    fn1();
    return data.reduce((sum, num) => {
      return sum + num;
    }, 0);
  }
  const parse = (lines = ['']) => {
    // return lines[0]; // use for one line string input
    // return lines;    // use for multi-line string input
    return lines.map((line) => parseInt(line)).filter((num) => num === num);
  };
  // 2019 day 5 code (extended intcode computer, based on day 2)
  let input = 0;
  let output = 0;
  const transform = (program = []) => {
    for (let ip = 0; ip < program.length; ) {
      if (program[ip] === 99) break;
      let step = 4;
      const mode_p1 = Math.floor(program[ip] / 100) % 10;
      const mode_p2 = Math.floor(program[ip] / 1000) % 10;
      const opcode = program[ip] % 100;
      if (opcode === 1) {
        program[program[ip+3]]
          = (mode_p1 ? program[ip+1] : program[program[ip+1]])
            + (mode_p2 ? program[ip+2] : program[program[ip+2]]);
      } else if (opcode === 2) {
        program[program[ip+3]]
          = (mode_p1 ? program[ip+1] : program[program[ip+1]])
            * (mode_p2 ? program[ip+2] : program[program[ip+2]]);
      } else if (opcode === 3) {
        program[program[ip+1]] = input;
        step = 2;
      } else if (opcode === 4) {
        output = mode_p1 ? program[ip+1] : program[program[ip+1]];
        // console.log(output);
        step = 2;
      } else if (opcode === 5) { // jump-if-true
        step = 3;
        if (mode_p1 ? program[ip+1] : program[program[ip+1]] !== 0) {
          ip = (mode_p2 ? program[ip+2] : program[program[ip+2]]);
          step = 0;
        }
      } else if (opcode === 6) { // jump-if-false
        step = 3;
        if ((mode_p1 ? program[ip+1] : program[program[ip+1]]) === 0) {
          ip = (mode_p2 ? program[ip+2] : program[program[ip+2]]);
          step = 0;
        }
      } else if (opcode === 7) { // less than
        if ((mode_p1 ? program[ip+1] : program[program[ip+1]])
            < (mode_p2 ? program[ip+2] : program[program[ip+2]])) {
          program[program[ip+3]] = 1;
        } else {
          program[program[ip+3]] = 0;
        }
      } else if (opcode === 8) { // equals
        if ((mode_p1 ? program[ip+1] : program[program[ip+1]])
            === (mode_p2 ? program[ip+2] : program[program[ip+2]])) {
          program[program[ip+3]] = 1;
        } else {
          program[program[ip+3]] = 0;
        }
      }
      // console.log(program[ip]);
      ip += step;
    }
    // console.log('transformed program: ' + program);
    return program;
  };
  const solve_19_05 = (program = []) => {
    input = 1;
    transform(program);
    return output;
  }
  const solve_19_05_p2 = (program = []) => {
    input = 5;
    transform(program);
    return output;
  }
  const parse_19_05 = (lines = ['']) => {
    return lines[0].split(',').map((value) => parseInt(value)).filter((num) => num === num);
  };
  // 2019 day 3 code (intersection of wires in a 2D grid)
  function isPositionSeen_p2(
    seenPositions = new Map([[0, new Map([[0, 0]])]]),
    position = {x: 0, y: 0, steps: 0},
    canUpdate = true) {
  if (seenPositions.has(position.x) && seenPositions.get(position.x).has(position.y)) return true;
  if (canUpdate) {
    if (!seenPositions.has(position.x)) seenPositions.set(position.x, new Map());
    seenPositions.get(position.x).set(position.y, position.steps);
  }
  return false;
  }
  function updatePositions_p2(
      wire = 0,
      seenPositions = new Map([[0, new Map([[0, 0]])]]),
      bestIntersected = {x: 0, y: 0, steps: 0},
      position = {x: 0, y: 0, steps: 0}) {
    if (wire === 0) {
      isPositionSeen_p2(seenPositions, position, true); // just to update seen positions
      return;
    }
    if (isPositionSeen_p2(seenPositions, position, false)) { // not updating seen positions here
      const currentSteps = position.steps + seenPositions.get(position.x).get(position.y);
      //console.log('got intersection, position = ', position, ' steps from other wire = ', currentSteps - position.steps);
      const previousSteps = bestIntersected.steps;
      if (previousSteps === 0 || currentSteps < previousSteps) {
        bestIntersected.x = position.x;
        bestIntersected.y = position.y;
        bestIntersected.steps = currentSteps;
        //console.log('updated bestIntersected = ', bestIntersected);
      }
    }
  }
  const solve_19_03_p2 = (data = ['', '']) => {
    let seenPositions = new Map([[0, new Map([[0, 0]])]]);
    let bestIntersected = {x: 0, y: 0, steps: 0};
    let position = {x: 0, y: 0, steps: 0};
    //console.log('bestIntersected = ', bestIntersected);
    for (let wire = 0; wire < 2; wire++) {
      position.x = 0;
      position.y = 0;
      position.steps = 1;
      data[wire].split(',').reduce((heading, move) => {
        if (move[0] === 'U') heading = 0;
        else if (move[0] === 'R') heading = 90;
        else if (move[0] === 'D') heading = 180;
        else if (move[0] === 'L') heading = 270;
        let x = 0, y = 0;
        switch (heading) {
          case 0:
          default:
            for (y = position.y + 1; y <= position.y + parseInt(move.substr(1)); ++y, ++(position.steps))
              updatePositions_p2(wire, seenPositions, bestIntersected, {x: position.x, y: y, steps: position.steps});
            position.y = y - 1;
            //console.log('position = ', position);
            break;
          case 90:
            for (x = position.x + 1; x <= position.x + parseInt(move.substr(1)); ++x, ++(position.steps))
              updatePositions_p2(wire, seenPositions, bestIntersected, {x: x, y: position.y, steps: position.steps});
            position.x = x - 1;
            //console.log('position = ', position);
            break;
          case 180:
            for (y = position.y - 1; y >= position.y - parseInt(move.substr(1)); --y, ++(position.steps))
              updatePositions_p2(wire, seenPositions, bestIntersected, {x: position.x, y: y, steps: position.steps});
            position.y = y + 1;
            //console.log('position = ', position);
            break;
          case 270:
            for (x = position.x - 1; x >= position.x - parseInt(move.substr(1)); --x, ++(position.steps))
              updatePositions_p2(wire, seenPositions, bestIntersected, {x: x, y: position.y, steps: position.steps});
            position.x = x + 1;
            //console.log('position = ', position);
            break;
        }
        return heading;
      }, 0);
    }
    //console.log('bestIntersected = ', bestIntersected);
    return bestIntersected.steps;
  }















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
      [],
    ];
    const actual = data.map((data) => solve(data));
    const expected = [
      1,
    ];
    // expect(actual).toEqual(expected);
  });
  it("can parse input", () => {
    const data = parse(
      '+1 +3 +2'
      .split(
        ' '
        ));
    expect(data).toEqual([1, 3, 2]);
  });
  it("can solve puzzle with my input", () => {
    // const data = [0];
    const data = parse(lines);
    const answer = solve(data);
    console.log("part 1 answer is " + answer);
    // expect(answer).toEqual(0);
  });
  // 2019 day 5 tests (extended intcode computer, based on day 2)
  it("can parse input", () => {
    const data = parse_19_05(['1,2,3']);
    expect(data).toEqual([1, 2, 3]);
  });
  it("can transform parsed input", () => {
    input = 0;
    const data = [
      [3,0,4,0,99],
      [1002,4,3,4,33]
    ];
    const actual = data.map((data) => transform(data));
    const expected = [
      [0,0,4,0,99],
      [1002,4,3,4,99]
    ];
    // console.log('actual: ', actual);
    // console.log('expected: ', expected);
    expect(actual).toEqual(expected);
  });
  it("can solve day 2019 day 5 puzzle with my input", () => {
    const data = parse_19_05(lines);
    const answer = solve_19_05(data);
    // console.log("part 1 answer is " + answer);
    expect(answer).toEqual(2845163);
  });
  it("can compare correctly", () => {
    input = 0;
    const data = [
      [8, [3,9,8,9,10,9,4,9,99,-1,8]], [7, [3,9,8,9,10,9,4,9,99,-1,8]],
      [7, [3,9,7,9,10,9,4,9,99,-1,8]], [8, [3,9,7,9,10,9,4,9,99,-1,8]],
      [8, [3,3,1108,-1,8,3,4,3,99]], [7, [3,3,1108,-1,8,3,4,3,99]],
      [7, [3,3,1107,-1,8,3,4,3,99]], [8, [3,3,1107,-1,8,3,4,3,99]],
    ];
    const actual = data.map(([inputValue, data]) => {
      input = inputValue;
      transform(data);
      return output;
    });
    const expected = [
      1, 0,
      1, 0,
      1, 0,
      1, 0,
    ];
    // console.log('actual: ', actual);
    // console.log('expected: ', expected);
    expect(actual).toEqual(expected);
  });
  it("can handle jumps correctly", () => {
    input = 0;
    const data = [
      [1, [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9]],
      [0, [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9]],
      [1, [3,3,1105,-1,9,1101,0,0,12,4,12,99,1]],
      [0, [3,3,1105,-1,9,1101,0,0,12,4,12,99,1]],
    ];
    const actual = data.map(([inputValue, data]) => {
      input = inputValue;
      transform(data);
      return output;
    });
    const expected = [
      1, 0,
      1, 0,
    ];
    // console.log('actual: ', actual);
    // console.log('expected: ', expected);
    expect(actual).toEqual(expected);
  });
  it("can handle complex programs", () => {
    input = 0;
    const data = [
      [7, [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
           1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
           999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]],
      [8, [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
           1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
           999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]],
      [9, [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
           1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
           999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]],
    ];
    const actual = data.map(([inputValue, data]) => {
      input = inputValue;
      transform(data);
      return output;
    });
    const expected = [
      999, 1000, 1001
    ];
    // console.log('actual: ', actual);
    // console.log('expected: ', expected);
    expect(actual).toEqual(expected);
  });
  it("can solve day 2019 day 5 puzzle part 2 with my input", () => {
    const data = parse_19_05(lines);
    const answer = solve_19_05_p2(data);
    // console.log("part 2 answer is " + answer);
    expect(answer).toEqual(9436229);
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
      parser.readLines("advent2019/06/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

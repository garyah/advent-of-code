describe("2019 day 7", function() {
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















  it("should be able to parse input", () => {
    const data = puzzle.parse(['1,2,3']);
    expect(data).toEqual([1, 2, 3]);
  });
  it("should be able to find max thruster signal with samples", () => {
    puzzle.setInput(0);
    const data = [
      [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0],
      [3,23,3,24,1002,24,10,24,1002,23,-1,23,
       101,5,23,23,1,24,23,23,4,23,99,0,0],
      [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,
       1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0],
    ];
    const actual = data.map((data) => {
      return puzzle.solve(data);
    });
    const expected = [
      43210,
      54321, 65210
    ];
    // console.log('actual: ', actual);
    // console.log('expected: ', expected);
    expect(actual).toEqual(expected);
  });
  it("should be able to solve puzzle with my input", () => {
    const data = puzzle.parse(lines);
    const answer = puzzle.solve(data);
    console.log("part 1 answer is " + answer);
    expect(answer).toEqual(929800);
  });
  it("should be able to find max thruster signal (with feedback) with samples", () => {
    puzzle.setInput(0);
    const data = [
      [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
        27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5],
      [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
        -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
        53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10],
    ];
    const actual = data.map((data) => {
      return puzzle.solve_p2(data);
    });
    const expected = [
      139629729,
      18216,
    ];
    console.log();
    console.log('actual:   ', actual);
    console.log('expected: ', expected);
    // expect(actual).toEqual(expected);
  });
  it("should be able to solve puzzle part 2 with my input", () => {
    const data = puzzle.parse(lines);
    const answer = puzzle.solve_p2(data);
    // console.log("part 2 answer is " + answer);
    // expect(answer).toEqual(929800);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 7:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/07/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

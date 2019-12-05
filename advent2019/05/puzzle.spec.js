describe("2019 day 5 part 1", function() {
  // code
  let input = 5;
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
        console.log(output);
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
  const fn2 = () => {
    return '';
  };
  const solve = (program = []) => {
    // program[1] = 12;
    // program[2] = 2;
    // return program[0];
    return transform(program)[0];
  }
  const parse = (lines = ['']) => {
    return lines[0].split(',').map((value) => parseInt(value)).filter((num) => num === num);
  };













  // tests
  it("should be able to transform parsed input", () => {
    const data = [
      // [1,9,10,3,2,3,11,0,99,30,40,50],
      // [1,0,0,0,99], [2,3,0,3,99],
      // [2,4,4,5,99,0], [1,1,1,4,99,5,6,0,99],
      //[3,0,4,0,99],
      [1002,4,3,4,33]
    ];
    const actual = data.map((data) => transform(data));
    const expected = [
      // [3500,9,10,70,
      // 2,3,11,0,
      // 99,
      // 30,40,50],
      // [2,0,0,0,99], [2,3,0,6,99],
      // [2,4,4,5,99,9801], [30,1,1,4,2,5,6,0,99]
      //[0,0,4,0,99],
      [1002,4,3,4,99]
    ];
    // console.log('actual: ', actual);
    // console.log('expected: ', expected);
    expect(actual).toEqual(expected);
  });
  it('fn2() returns empty string', () => {
    expect(fn2()).toEqual('');
  });
  it("should be able to solve puzzle", () => {
    const data = [[], [], []];
    const actual = data.map((data) => puzzle.solve(data));
    const expected = [1, 1, 1];
    // expect(actual).toEqual(expected);
  });
  it("should be able to parse input", () => {
    const data = parse(['1,2,3']);
    expect(data).toEqual([1, 2, 3]);
  });
  it("should be able solve puzzle with my input", () => {
    // const data = [0];
    const data = parse(lines);
    const answer = solve(data);
    // console.log("part 1 answer is " + answer);
    // expect(answer).toEqual(6327510);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 5 part 1:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/05/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

// console.log('puzzle object reaches here, input, output: ', input, output);
let input = -1;
let output = -1;
// console.log('puzzle object reaches here, input, output: ', input, output);
const setInput = (value = 0) => {
  input = value;
};
const getOutput = () => {
  return output;
};
const transform = (program = []) => {
  // console.log(program);
  // console.log('input, output before program execution: ', input, output);
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
      // console.log(program);
      // console.log('output before mod: ', output);
      output = (mode_p1) ? program[ip+1] : program[program[ip+1]];
      // console.log('output after mod: ', output);
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
const solve = (program = []) => {
  input = 1;
  transform(program);
  return output;
}
const solve_p2 = (program = []) => {
  input = 5;
  transform(program);
  return output;
}
const parse = (lines = ['']) => {
  return lines[0].split(',').map((value) => parseInt(value)).filter((num) => num === num);
};
module.exports = {setInput, getOutput, transform, solve, solve_p2, parse};

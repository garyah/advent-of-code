// 2019 day 7 code (extended intcode computer, based on days 2 and 5)
// console.log('puzzle object reaches here, input, output: ', input, output);
let input = -1;
let output = -1;
let phases = [-1, -1, -1, -1, -1];
let programs = [{memory: [0], startIp: 0, isResumed: false}];
let ampIndex = 0;
// console.log('puzzle object reaches here, input, output: ', input, output);
const setInput = (value = 0) => {
  input = value;
};
const getOutput = () => {
  return output;
};
const transform = () => {
  const program = programs[ampIndex].memory;
  // console.log(program);
  // console.log('input, output before program execution: ', input, output);
  for (let ip = programs[ampIndex].startIp; ip < program.length; ) {
    if (program[ip] === 99) { programs[ampIndex].startIp = -1; return -1; }
    let step = 4;
    const mode_p1 = Math.floor(program[ip] / 100) % 10;
    const mode_p2 = Math.floor(program[ip] / 1000) % 10;
    const opcode = program[ip] % 100;
    if (opcode === 1) { // add
      program[program[ip+3]]
        = (mode_p1 ? program[ip+1] : program[program[ip+1]])
          + (mode_p2 ? program[ip+2] : program[program[ip+2]]);
    } else if (opcode === 2) { // multiply
      program[program[ip+3]]
        = (mode_p1 ? program[ip+1] : program[program[ip+1]])
          * (mode_p2 ? program[ip+2] : program[program[ip+2]]);
    } else if (opcode === 3) { // input
      program[program[ip+1]] = programs[ampIndex].isResumed ? input : phases[ampIndex];
      programs[ampIndex].isResumed = true;
      step = 2;
    } else if (opcode === 4) { // output
      // console.log(program);
      // console.log('output before mod: ', output);
      output = (mode_p1) ? program[ip+1] : program[program[ip+1]];
      // console.log('output after mod: ', output);
      programs[ampIndex].startIp = ip + 2;
      return programs[ampIndex].startIp;
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
  programs[ampIndex].startIp = ip;
  return programs[ampIndex].startIp;
};
const solve = (program = []) => {
  // console.log('program = ', program);
  let numCombinations = 0;
  let maxOutput = -1;
  phases = [0, 1, 2, 3, 4];
  for (let p0 = 0; p0 < 5; p0++) {
    for (let p1 = 0; p1 < 5; p1++) {
      if (p1 === p0) continue;
      for (let p2 = 0; p2 < 5; p2++) {
        if (p2 === p1 || p2 === p0) continue;
        for (let p3 = 0; p3 < 5; p3++) {
          if (p3 === p2 || p3 === p1 || p3 === p0) continue;
          for (let p4 = 0; p4 < 5; p4++) {
            if (p4 === p3 || p4 === p2 || p4 === p1 || p4 === p0) continue;
            phases = [p0, p1, p2, p3, p4];
            input = 0;
            for (ampIndex = 0; ampIndex < 5; ampIndex++) {
              programs[ampIndex] = {memory: [], startIp: 0, isResumed: false};
              programs[ampIndex].memory = program.map((value) => {
                // if (ampIndex === 0) console.log(value);
                return value;
              });
              // console.log('ampIndex = ', ampIndex, 'programs.length = ', programs.length);
              // printProgram(programs[ampIndex].memory);
              // console.log('ampIndex = ', ampIndex, 'input = ', input);
              transform();
              // console.log('ampIndex = ', ampIndex, 'output = ', output);
              input = output;
            }
            if (output > maxOutput) {
              maxOutput = output;
              // console.log('found new max of ', maxOutput,
              //             ' with phase setting sequence of ', p0, p1, p2, p3, p4);
            }
            numCombinations++;
  }}}}}
  // console.log('numCombinations = ', numCombinations);
  return maxOutput;
}
const printProgram = (programMemory = [], startIp = 0) => {
  let programString = '[' +  programMemory.join(',') + ']';
  console.log(
    'ampIndex= ', ampIndex, ' phase= ', phases[ampIndex],
    ' input= ', input, ':\t\t', programString, '\toutput= ', output, 'startIp= ', startIp);
}
const solve_p2 = (program = []) => {
  // console.log('program = ', program);
  let numCombinations = 0;
  let maxOutput = -1;
  let phasesOfMax = [];
  phases = [5, 6, 7, 8, 9];
  // phases = [9, 8, 7, 6, 5];  // TEST ONLY
  // phases = [9, 7, 8, 5, 6]; // TEST ONLY
  for (let p0 = 5; p0 < 10; p0++) {
    for (let p1 = 5; p1 < 10; p1++) {
      if (p1 === p0) continue;
      for (let p2 = 5; p2 < 10; p2++) {
        if (p2 === p1 || p2 === p0) continue;
        for (let p3 = 5; p3 < 10; p3++) {
          if (p3 === p2 || p3 === p1 || p3 === p0) continue;
          for (let p4 = 5; p4 < 10; p4++) {
            if (p4 === p3 || p4 === p2 || p4 === p1 || p4 === p0) continue;
            phases = [p0, p1, p2, p3, p4];
            // console.log('programs.length = ', programs.length, ' programs = ', programs);
            for (ampIndex = 0; ampIndex < 5; ampIndex++) {
              programs[ampIndex] = {memory: [], startIp: 0, isResumed: false};
              programs[ampIndex].memory = program.map((value) => {
                // if (ampIndex === 0) console.log(value);
                return value;
              });
              // console.log('ampIndex = ', ampIndex, 'programs.length = ', programs.length);
              // printProgram(programs[ampIndex].memory);
            }
            input = 0;
            output = 0;
            let lastOutput = 0;
            for (let n = 0; n < 20; n++) { // set maximum limit on how many times to loop, just in case
              // console.log();
              for (ampIndex = 0; ampIndex < 5; ampIndex++) {
                // console.log('program at index ', ampIndex, ' program = ', programs[ampIndex]);
                // printProgram(programs[ampIndex].memory, programs[ampIndex].startIp);
                // console.log('ampIndex= ', ampIndex, 'input= ', input);
                transform();
                // printProgram(programs[ampIndex].memory, programs[ampIndex].startIp);
                // console.log('ampIndex=', ampIndex, '\tinput=', input, '\toutput=', output, '\tstartIp=', programs[ampIndex].startIp);
                if (programs[ampIndex].startIp === -1) { /*console.log('inner got halt, spin #', n, 'ampIndex=', ampIndex);*/ break; }
                input = output;
              }
              lastOutput = output;
              if (ampIndex < 5 && programs[ampIndex].startIp === -1) { /*console.log("outer got halt");*/ break; }
            }
            if (lastOutput > maxOutput) {
              maxOutput = lastOutput;
              phasesOfMax = [p0, p1, p2, p3, p4];
              // console.log('found new max of ', maxOutput,
              //             ' with phase setting sequence of ', p0, p1, p2, p3, p4);
            }
            numCombinations++;
  }}}}}
  // console.log('maxOutput=', maxOutput, 'phase setting sequence=[' +  phasesOfMax.join(',') + ']');
  // console.log('numCombinations = ', numCombinations);
  return maxOutput;
}
const parse = (lines = ['']) => {
  return lines[0].split(',').map((value) => parseInt(value)).filter((num) => num === num);
};
module.exports = {setInput, getOutput, transform, solve, solve_p2, parse};

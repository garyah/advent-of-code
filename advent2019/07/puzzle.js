// console.log('puzzle object reaches here, input, output: ', input, output);
let input = -1;
let output = -1;
let phases = [-1, -1, -1, -1, -1];
let phaseIndex = 0;
// console.log('puzzle object reaches here, input, output: ', input, output);
const setInput = (value = 0) => {
  input = value;
};
const getOutput = () => {
  return output;
};
const transform = (program = [], startIp = 0) => {
  // console.log(program);
  // console.log('input, output before program execution: ', input, output);
  let isSecondInput = false;
  for (let ip = startIp; ip < program.length; ) {
    if (program[ip] === 99) return -1;
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
      program[program[ip+1]] = isSecondInput ? input : phases[phaseIndex];
      isSecondInput = true;
      step = 2;
    } else if (opcode === 4) { // output
      // console.log(program);
      // console.log('output before mod: ', output);
      output = (mode_p1) ? program[ip+1] : program[program[ip+1]];
      // console.log('output after mod: ', output);
      return ip + 2;
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
            for (phaseIndex = 0; phaseIndex < 5; phaseIndex++) {
              const copy = program.map((value) => value);
              // console.log('program copy = ', copy);
              // console.log('phaseIndex = ', phaseIndex, 'input = ', input);
              transform(copy);
              // console.log('phaseIndex = ', phaseIndex, 'output = ', output);
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
const printProgram = (program = [], startIp = 0) => {
  let programString = '[' +  program.join(',') + ']';
  console.log(
    'phaseIndex= ', phaseIndex, ' phase= ', phases[phaseIndex],
    ' input= ', input, ':\t\t', programString, '\toutput= ', output, 'startIp= ', startIp);
}
const solve_p2 = (program = []) => {
  // console.log('program = ', program);
  let numCombinations = 0;
  let maxOutput = -1;
  phases = [0, 1, 2, 3, 4];
  phases = [9, 8, 7, 6, 5];
  // phases = [9, 7, 8, 5, 6];
  // phases = [5, 6, 7, 8, 9];
  // for (let p0 = 0; p0 < 5; p0++) {
  //   for (let p1 = 0; p1 < 5; p1++) {
  //     if (p1 === p0) continue;
  //     for (let p2 = 0; p2 < 5; p2++) {
  //       if (p2 === p1 || p2 === p0) continue;
  //       for (let p3 = 0; p3 < 5; p3++) {
  //         if (p3 === p2 || p3 === p1 || p3 === p0) continue;
  //         for (let p4 = 0; p4 < 5; p4++) {
  //           if (p4 === p3 || p4 === p2 || p4 === p1 || p4 === p0) continue;
  //           phases = [p0, p1, p2, p3, p4];
            let programs = [[]], startIps = [];
            // console.log('programs.length = ', programs.length, ' programs = ', programs);
            for (phaseIndex = 0; phaseIndex < 5; phaseIndex++) {
              programs[phaseIndex] = (program.map((value) => {
                // if (phaseIndex === 0) console.log(value);
                return value;
              }));
              // console.log('phaseIndex = ', phaseIndex, 'programs.length = ', programs.length);
              // printProgram(programs[phaseIndex]);
              startIps.push(0);
            }
            input = 0;
            output = 0;
            lastOutput = 0;
            for (let n = 0; n < 2; n++) {
              console.log();
              for (phaseIndex = 0; phaseIndex < 5; phaseIndex++) {
                // console.log('program at index ', phaseIndex, ' program = ', programs[phaseIndex]);
                // printProgram(programs[phaseIndex], startIps[phaseIndex]);
                // console.log('phaseIndex= ', phaseIndex, 'input= ', input);
                startIps[phaseIndex] = transform(programs[phaseIndex], startIps[phaseIndex]);
                printProgram(programs[phaseIndex], startIps[phaseIndex]);
                // console.log('phaseIndex=', phaseIndex, '\tinput=', input, '\toutput=', output, '\tstartIp=', startIps[phaseIndex]);
                if (startIps[phaseIndex] === -1) { console.log('inner got halt, spin #', n, 'phaseIndex=', phaseIndex); break; }
                input = output;
              }
              lastOutput = output;
              if (startIps[phaseIndex] === -1) { console.log("outer got halt"); break; }
            }
            if (lastOutput > maxOutput) {
              maxOutput = lastOutput;
              // console.log('found new max of ', maxOutput,
              //             ' with phase setting sequence of ', p0, p1, p2, p3, p4);
            }
            numCombinations++;
  // }}}}}
  // console.log('numCombinations = ', numCombinations);
  return maxOutput;
}
const parse = (lines = ['']) => {
  return lines[0].split(',').map((value) => parseInt(value)).filter((num) => num === num);
};
module.exports = {setInput, getOutput, transform, solve, solve_p2, parse};

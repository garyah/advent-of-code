// 2019 day 23 code (extended intcode computer, based on day 15)
// console.log('puzzle object reaches here, input, output: ', input, output);
const numCpus = 50;
// let input = -1;
let output = -1;
let phases = [-1, -1, -1, -1, -1];
let programs = [{
  memory: [0], startIp: 0, relativeBase: 0,
  inputState: 0, input: -1, inputQueue: [0],
  outputState: 0, outputAddress: -1, outputX: -1, outputY: -1,
}];
let cpuIndex = 0;
let finalOutputValue = -1;
// let inputState = 0;
// console.log('puzzle object reaches here, input, output: ', input, output);
// const setInput = (value = 0) => {
//   input = value;
// };
const getOutput = () => {
  return output;
};
const transform = () => {
  const program = programs[cpuIndex].memory;
  let ip = 0;
  // console.log(program);
  // console.log('input, output before program execution: ', input, output);
  for (ip = programs[cpuIndex].startIp; ip < program.length; ) {
    if (program[ip] === 99) {
      programs[cpuIndex].startIp = -1;
      return programs[cpuIndex].startIp;
    }
    let step = 4;
    const mode_p1 = Math.floor(program[ip] / 100) % 10;
    const mode_p2 = Math.floor(program[ip] / 1000) % 10;
    const mode_p3 = Math.floor(program[ip] / 10000) % 10;
    const opcode = program[ip] % 100;
    if (opcode === 1) { // add
      const result
        = ((mode_p1 == 2) ? program[programs[cpuIndex].relativeBase + program[ip+1]] : (mode_p1 == 1) ? program[ip+1] : program[program[ip+1]])
          + ((mode_p2 == 2) ? program[programs[cpuIndex].relativeBase + program[ip+2]] : (mode_p2 == 1) ? program[ip+2] : program[program[ip+2]]);
      if (mode_p3 == 2) { program[programs[cpuIndex].relativeBase + program[ip+3]] = result; } else { program[program[ip+3]] = result; }
    } else if (opcode === 2) { // multiply
      const result
        = ((mode_p1 == 2) ? program[programs[cpuIndex].relativeBase + program[ip+1]] : (mode_p1 == 1) ? program[ip+1] : program[program[ip+1]])
          * ((mode_p2 == 2) ? program[programs[cpuIndex].relativeBase + program[ip+2]] : (mode_p2 == 1) ? program[ip+2] : program[program[ip+2]]);
      if (mode_p3 == 2) { program[programs[cpuIndex].relativeBase + program[ip+3]] = result; } else { program[program[ip+3]] = result; }
    } else if (opcode === 3) { // input
      nextInput();
      if (wantToExit) { programs[cpuIndex].startIp = -1; return programs[cpuIndex].startIp; }
      const input = programs[cpuIndex].input;
      step = 2;
      programs[cpuIndex].startIp = ip + 2;
      if (mode_p1 == 2) { program[programs[cpuIndex].relativeBase + program[ip+1]] = input; } else { program[program[ip+1]] = input; }
      if (input === -1) return programs[cpuIndex].startIp;
    } else if (opcode === 4) { // output
      // console.log(program);
      const output = ((mode_p1 == 2) ? program[programs[cpuIndex].relativeBase + program[ip+1]] : (mode_p1 == 1) ? program[ip+1] : program[program[ip+1]]);
      // console.log('output after mod: ', output);
      nextOutput(output);
      if (wantToExit) { programs[cpuIndex].startIp = -1; return programs[cpuIndex].startIp; }
      step = 2;
    } else if (opcode === 5) { // jump-if-true
      step = 3;
      if (((mode_p1 == 2) ? program[programs[cpuIndex].relativeBase + program[ip+1]] : (mode_p1 == 1) ? program[ip+1] : program[program[ip+1]]) !== 0) {
        ip = (mode_p2 == 2) ? program[programs[cpuIndex].relativeBase + program[ip+2]] : (mode_p2 == 1) ? program[ip+2] : program[program[ip+2]];
        step = 0;
      }
    } else if (opcode === 6) { // jump-if-false
      step = 3;
      if (((mode_p1 == 2) ? program[programs[cpuIndex].relativeBase + program[ip+1]] : (mode_p1 == 1) ? program[ip+1] : program[program[ip+1]]) === 0) {
        ip = (mode_p2 == 2) ? program[programs[cpuIndex].relativeBase + program[ip+2]] : (mode_p2 == 1) ? program[ip+2] : program[program[ip+2]];
        step = 0;
      }
    } else if (opcode === 7) { // less than
      if (((mode_p1 == 2) ? program[programs[cpuIndex].relativeBase + program[ip+1]] : (mode_p1 == 1) ? program[ip+1] : program[program[ip+1]])
          < ((mode_p2 == 2) ? program[programs[cpuIndex].relativeBase + program[ip+2]] : (mode_p2 == 1) ? program[ip+2] : program[program[ip+2]])) {
        if (mode_p3 == 2) { program[programs[cpuIndex].relativeBase + program[ip+3]] = 1; } else { program[program[ip+3]] = 1; }
      } else {
        if (mode_p3 == 2) { program[programs[cpuIndex].relativeBase + program[ip+3]] = 0; } else { program[program[ip+3]] = 0; }
      }
    } else if (opcode === 8) { // equals
      if (((mode_p1 == 2) ? program[programs[cpuIndex].relativeBase + program[ip+1]] : (mode_p1 == 1) ? program[ip+1] : program[program[ip+1]])
          === ((mode_p2 == 2) ? program[programs[cpuIndex].relativeBase + program[ip+2]] : (mode_p2 == 1) ? program[ip+2] : program[program[ip+2]])) {
        if (mode_p3 == 2) { program[programs[cpuIndex].relativeBase + program[ip+3]] = 1; } else { program[program[ip+3]] = 1; }
      } else {
        if (mode_p3 == 2) { program[programs[cpuIndex].relativeBase + program[ip+3]] = 0; } else { program[program[ip+3]] = 0; }
      }
    } else if (opcode === 9) { // relative base offset
      programs[cpuIndex].relativeBase += ((mode_p1 == 2) ? program[programs[cpuIndex].relativeBase + program[ip+1]] : (mode_p1 == 1) ? program[ip+1] : program[program[ip+1]]);
      step = 2;
    }
    // console.log(program[ip]);
    ip += step;
  }
  // console.log('transformed program: ' + program);
  programs[cpuIndex].startIp = -1;
  return programs[cpuIndex].startIp;
};

let area = [[-1]];
const gridXSize = 40;//, gridYSize = 40; // must be even number!
let currentX = gridXSize / 2;
let currentY = gridXSize / 2;
let numOutputs = 0;
let numPainted = 0;
let numPaintedWalls = 0;
let wallsMinX = gridXSize / 2, wallsMaxX = 0;
let wallsMinY = gridXSize / 2, wallsMaxY = 0;
let wantToExit = false;
let isAggressive = false;
const getNumPainted = () => {
  return numPainted;
};
const nextInput = () => {
  if (programs[cpuIndex].inputState === 1) {
    programs[cpuIndex].input = -1;
    if (programs[cpuIndex].inputQueue.length > 0) {
      programs[cpuIndex].input = programs[cpuIndex].inputQueue.shift();
      // console.log("received input=", programs[cpuIndex].input, 'cpu=', cpuIndex);
    }
  }
  programs[cpuIndex].inputState = 1;

  // sleep code for test purposes
  // const date = Date.now();
  // let currentDate = null;
  // do {
  //   currentDate = Date.now();
  // } while (currentDate - date < 1 * 1000 / 1000);

  // console.log("request for input=", programs[cpuIndex].input, 'cpu=', cpuIndex);
};
const nextOutput = (output = 0) => {
  // console.log('output=', output, 'cpu=', cpuIndex);
  numOutputs++;
  if (programs[cpuIndex].outputState === 0) programs[cpuIndex].outputAddress = output;
  else if (programs[cpuIndex].outputState === 1) programs[cpuIndex].outputX = output;
  else if (programs[cpuIndex].outputState === 2) {
    programs[cpuIndex].outputY = output;
    if (programs[cpuIndex].outputAddress === 255) {
      console.log('got output address of 255 -- outputY=', programs[cpuIndex].outputY);
      finalOutputValue = programs[cpuIndex].outputY;
      wantToExit = true;
      return;
    }
    programs[programs[cpuIndex].outputAddress].inputQueue.push(programs[cpuIndex].outputX);
    programs[programs[cpuIndex].outputAddress].inputQueue.push(programs[cpuIndex].outputY);
    // console.log('sent outputX=', programs[cpuIndex].outputX, 'outputY=', programs[cpuIndex].outputY, 'to cpu=', programs[cpuIndex].outputAddress, 'from cpu=', cpuIndex);
  }
  programs[cpuIndex].outputState++;
  programs[cpuIndex].outputState %= 3;
};
const initState = () => {
  for (let x = 0; x < gridXSize; x++) {
    area[x] = [];
    for (let y = 0; y < gridXSize; y++) {
      area[x][y] = -1; // empty space
      // console.log(area);
    }
  }
  currentX = gridXSize / 2;
  currentY = gridXSize / 2;
  numOutputs = 0;
  numPainted = 0;
  numPaintedWalls = 0;
  wallsMinX = gridXSize / 2, wallsMaxX = 0;
  wallsMinY = gridXSize / 2, wallsMaxY = 0;
  wantToExit = false;
  isAggressive = false;
  // inputState = 0;
  finalOutputValue = -1;
};
const countPainted = () => {
  numPainted = 0;
  numPaintedWalls = 0;
  wallsMinX = gridXSize / 2, wallsMaxX = 0;
  wallsMinY = gridXSize / 2, wallsMaxY = 0;
  for (let x = 0; x < gridXSize; x++) {
    for (let y = 0; y < gridXSize; y++) {
      if (area[x][y] !== -1) numPainted++;
      if (area[x][y] === 2) {
        numPaintedWalls++;
        if (x < wallsMinX) wallsMinX = x;
        if (x > wallsMaxX) wallsMaxX = x;
        if (y < wallsMinY) wallsMinY = y;
        if (y > wallsMaxY) wallsMaxY = y;
      }
    }
  }
};
const printArea = () => {
  countPainted();
  wallsMinY = 0;
  wallsMaxY = gridXSize - 1;
  wallsMinX = 0;
  wallsMaxX = gridXSize - 1;
  for (let y = wallsMinY; y <= wallsMaxY; y++) {
    let line = '';
    for (let x = wallsMinX; x <= wallsMaxX; x++) {
      if (x === currentX && y === currentY) line += 'D'; // droid ending position
      else if (x === gridXSize / 2 && y === gridXSize / 2) line += '*'; // droid ending position
      else if (area[x][y] === -1) line += ' '; // unexplored
      // else if (area[x][y] === 1) line += 'D'; // droid
      else if (area[x][y] === 2) line += '#'; // wall
      else if (area[x][y] === 3) line += '.'; // open space (1 time visited)
      else if (area[x][y] === 4) line += 'O'; // goal: oxygen
      else if (area[x][y] === 5) line += '2'; // open space (2 or more times visited)
      else line += ' ';
    }
    console.log(line);
  }
};
const execute = (program = []) => {
  // load programs
  for (cpuIndex = 0; cpuIndex < numCpus; cpuIndex++) {
    programs[cpuIndex] = {
      memory: [], startIp: 0, relativeBase: 0,
      inputState: 0, input: cpuIndex, inputQueue: [],
      outputState: 0, outputAddress: -1, outputX: -1, outputY: -1,
    };
    programs[cpuIndex].memory = program.map((value) => {
      // if (cpuIndex === 0) console.log(value);
      return value;
    });
    for (let n = 0; n < 1000; n++) programs[cpuIndex].memory.push(0);
    // console.log('cpuIndex = ', cpuIndex, 'programs.length = ', programs.length);
    // printProgram(programs[cpuIndex].memory, programs[cpuIndex].startIp, programs[cpuIndex].input);
  }
  // run programs endlessly (or until some exit condition is reached)
  for (cpuIndex = 0; cpuIndex < numCpus; ) {
    if (wantToExit) break;
    // printProgram(programs[cpuIndex].memory, programs[cpuIndex].startIp, programs[cpuIndex].input);
    // console.log('cpuIndex = ', cpuIndex, 'input=', programs[cpuIndex].input);
    if (transform() === -1) break;
    // console.log('cpuIndex = ', cpuIndex, 'output=', output);
    cpuIndex++;
    cpuIndex %= numCpus;
  }
}
const solve = (program = []) => {
  console.log();
  initState();
  execute(program);
  return finalOutputValue;
}
const printProgram = (programMemory = [], startIp = 0, input = 0) => {
  let programString = '[' +  programMemory.join(',') + ']';
  console.log(
    'cpuIndex= ', cpuIndex, 
    ' input= ', input, ':\t\t', programString, '\toutput= ', output, 'startIp= ', startIp);
}
const solve_p2 = (program = []) => {
  console.log();
  initState();
  execute(program);
  // return numBlockTiles;
}
const parse = (lines = ['']) => {
  return lines[0].split(',').map((value) => parseInt(value)).filter((num) => num === num);
};
module.exports = {transform, solve, printProgram, solve_p2, parse,
  getNumPainted, nextInput, nextOutput, initState, countPainted, printArea};

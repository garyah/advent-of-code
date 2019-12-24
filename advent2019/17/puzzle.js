// 2019 day 17 code (extended intcode computer, based on day 15)
// console.log('puzzle object reaches here, input, output: ', input, output);
let input = -1;
let output = -1;
let phases = [-1, -1, -1, -1, -1];
let programs = [{memory: [0], startIp: 0, isResumed: false, relativeBase: 0}];
let ampIndex = 0;
// console.log('puzzle object reaches here, input, output: ', input, output);
const setInput = (value = 0) => {
  input = value;
};
const getOutput = () => {
  return output;
};
const transform = (inputProgram = []) => {
  programs[ampIndex] = {memory: [], startIp: 0, isResumed: false, relativeBase: 0};
  programs[ampIndex].memory = inputProgram.map((value) => {
    // if (ampIndex === 0) console.log(value);
    return value;
  });
  // console.log('numBlockTiles=', numBlockTiles, 'first memory=', programs[ampIndex].memory[0]);
  for (let n = 0; n < 1000; n++) programs[ampIndex].memory.push(0);
  const program = programs[ampIndex].memory;
  let ip = 0;
  // console.log(program);
  // console.log('input, output before program execution: ', input, output);
  for (ip = programs[ampIndex].startIp; ip < program.length; ) {
    if (program[ip] === 99) {
      programs[ampIndex].startIp = -1;
      return output;
    }
    let step = 4;
    const mode_p1 = Math.floor(program[ip] / 100) % 10;
    const mode_p2 = Math.floor(program[ip] / 1000) % 10;
    const mode_p3 = Math.floor(program[ip] / 10000) % 10;
    const opcode = program[ip] % 100;
    if (opcode === 1) { // add
      const result
        = ((mode_p1 == 2) ? program[programs[ampIndex].relativeBase + program[ip+1]] : (mode_p1 == 1) ? program[ip+1] : program[program[ip+1]])
          + ((mode_p2 == 2) ? program[programs[ampIndex].relativeBase + program[ip+2]] : (mode_p2 == 1) ? program[ip+2] : program[program[ip+2]]);
      if (mode_p3 == 2) { program[programs[ampIndex].relativeBase + program[ip+3]] = result; } else { program[program[ip+3]] = result; }
    } else if (opcode === 2) { // multiply
      const result
        = ((mode_p1 == 2) ? program[programs[ampIndex].relativeBase + program[ip+1]] : (mode_p1 == 1) ? program[ip+1] : program[program[ip+1]])
          * ((mode_p2 == 2) ? program[programs[ampIndex].relativeBase + program[ip+2]] : (mode_p2 == 1) ? program[ip+2] : program[program[ip+2]]);
      if (mode_p3 == 2) { program[programs[ampIndex].relativeBase + program[ip+3]] = result; } else { program[program[ip+3]] = result; }
    } else if (opcode === 3) { // input
      input = nextInput();
      if (input === -1) return output;
      if (mode_p1 == 2) { program[programs[ampIndex].relativeBase + program[ip+1]] = input; } else { program[program[ip+1]] = input; }
      // programs[ampIndex].isResumed = true;
      step = 2;
    } else if (opcode === 4) { // output
      // console.log(program);
      // console.log('output before mod: ', output);
      output = ((mode_p1 == 2) ? program[programs[ampIndex].relativeBase + program[ip+1]] : (mode_p1 == 1) ? program[ip+1] : program[program[ip+1]]);
      // console.log('output after mod: ', output);
      nextOutput(output);
      programs[ampIndex].startIp = ip + 2;
      step = 2;
      // return programs[ampIndex].startIp;
    } else if (opcode === 5) { // jump-if-true
      step = 3;
      if (((mode_p1 == 2) ? program[programs[ampIndex].relativeBase + program[ip+1]] : (mode_p1 == 1) ? program[ip+1] : program[program[ip+1]]) !== 0) {
        ip = (mode_p2 == 2) ? program[programs[ampIndex].relativeBase + program[ip+2]] : (mode_p2 == 1) ? program[ip+2] : program[program[ip+2]];
        step = 0;
      }
    } else if (opcode === 6) { // jump-if-false
      step = 3;
      if (((mode_p1 == 2) ? program[programs[ampIndex].relativeBase + program[ip+1]] : (mode_p1 == 1) ? program[ip+1] : program[program[ip+1]]) === 0) {
        ip = (mode_p2 == 2) ? program[programs[ampIndex].relativeBase + program[ip+2]] : (mode_p2 == 1) ? program[ip+2] : program[program[ip+2]];
        step = 0;
      }
    } else if (opcode === 7) { // less than
      if (((mode_p1 == 2) ? program[programs[ampIndex].relativeBase + program[ip+1]] : (mode_p1 == 1) ? program[ip+1] : program[program[ip+1]])
          < ((mode_p2 == 2) ? program[programs[ampIndex].relativeBase + program[ip+2]] : (mode_p2 == 1) ? program[ip+2] : program[program[ip+2]])) {
        if (mode_p3 == 2) { program[programs[ampIndex].relativeBase + program[ip+3]] = 1; } else { program[program[ip+3]] = 1; }
      } else {
        if (mode_p3 == 2) { program[programs[ampIndex].relativeBase + program[ip+3]] = 0; } else { program[program[ip+3]] = 0; }
      }
    } else if (opcode === 8) { // equals
      if (((mode_p1 == 2) ? program[programs[ampIndex].relativeBase + program[ip+1]] : (mode_p1 == 1) ? program[ip+1] : program[program[ip+1]])
          === ((mode_p2 == 2) ? program[programs[ampIndex].relativeBase + program[ip+2]] : (mode_p2 == 1) ? program[ip+2] : program[program[ip+2]])) {
        if (mode_p3 == 2) { program[programs[ampIndex].relativeBase + program[ip+3]] = 1; } else { program[program[ip+3]] = 1; }
      } else {
        if (mode_p3 == 2) { program[programs[ampIndex].relativeBase + program[ip+3]] = 0; } else { program[program[ip+3]] = 0; }
      }
    } else if (opcode === 9) { // relative base offset
      programs[ampIndex].relativeBase += ((mode_p1 == 2) ? program[programs[ampIndex].relativeBase + program[ip+1]] : (mode_p1 == 1) ? program[ip+1] : program[program[ip+1]]);
      step = 2;
    }
    // console.log(program[ip]);
    ip += step;
  }
  // console.log('transformed program: ' + program);
  programs[ampIndex].startIp = ip;
  return programs[ampIndex].startIp;
};

let area = [[-1]];
const gridXSize = 100;//, gridYSize = 100; // must be even number!
let currentX = 0;
let currentY = 0;
let width = 0, height = 0;
let numOutputs = 0;
let numPainted = 0;
let numIntersections = 0;
let sumAlignmentParams = 0;
let wallsMinX = gridXSize / 2, wallsMaxX = 0;
let wallsMinY = gridXSize / 2, wallsMaxY = 0;
let wantToExit = false;
let isAggressive = false;
const getNumPainted = () => {
  return numPainted;
};
const nextInput = () => {
  if (wantToExit) return -1;
  return input;
};
const nextOutput = (output = 0) => {
  // console.log('output=', output);
  process.stdout.write(String.fromCharCode(output));
  numOutputs++;
  if (currentX < area.length && currentY < area[currentX].length)
    area[currentX++][currentY] = output;
  height = currentY;
  if (output === 10) { currentY++; currentX = 0; }
  if (currentX > width) width = currentX;
};
const initState = () => {
  for (let x = 0; x < gridXSize; x++) {
    area[x] = [];
    for (let y = 0; y < gridXSize; y++) {
      area[x][y] = -1; // empty space
      // console.log(area);
    }
  }
  currentX = 0;
  currentY = 0;
  width = 0, height = 0;
  numOutputs = 0;
  numPainted = 0;
  numIntersections = 0;
  sumAlignmentParams = 0;
  wallsMinX = gridXSize / 2, wallsMaxX = 0;
  wallsMinY = gridXSize / 2, wallsMaxY = 0;
  wantToExit = false;
  isAggressive = false;
};
const countIntersections = () => {
  numIntersections = 0;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (area[x][y] === 35) {
        if (x+1 < width && x-1 >= 0 && y+1 < height && y-1 >= 0
            && area[x+1][y] === 35 && area[x-1][y] === 35
            && area[x][y+1] === 35 && area[x][y-1] === 35) {
          numIntersections++;
          sumAlignmentParams += x*y;
        }
      }
    }
  }
};
const printArea = () => {
  countIntersections();
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
const solve = (program = []) => {
  console.log();
  initState();
  transform(program);
  countIntersections();
  console.log('numOutputs=', numOutputs, 'countIntersections=', numIntersections);
  console.log('sumAlignmentParams=', sumAlignmentParams);
  return sumAlignmentParams;
}
const printProgram = (programMemory = [], startIp = 0) => {
  let programString = '[' +  programMemory.join(',') + ']';
  console.log(
    'ampIndex= ', ampIndex, ' phase= ', phases[ampIndex],
    ' input= ', input, ':\t\t', programString, '\toutput= ', output, 'startIp= ', startIp);
}
const solve_p2 = (program = []) => {
  initState();
  isAggressive = true;
  input = 1; // initially go north
  area[currentX][currentY] = 3;
  transform(program);
  // return numBlockTiles;
}
const parse = (lines = ['']) => {
  return lines[0].split(',').map((value) => parseInt(value)).filter((num) => num === num);
};
module.exports = {setInput, getOutput, transform, solve, solve_p2, parse,
  getNumPainted, nextInput, nextOutput, initState, countIntersections, printArea};

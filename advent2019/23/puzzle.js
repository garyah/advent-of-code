// 2019 day 23 code (extended intcode computer, based on day 15)
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
  if (wantToExit) return -1;
  return input;
};
const nextOutput = (output = 0) => {
  // console.log('output=', output);
  numOutputs++;
  const previousX = currentX, previousY = currentY;
  if (input === 1) currentY--; // go north
  else if (input === 2) currentY++; // go south
  else if (input === 3) currentX--; // go west
  else if (input === 4) currentX++; // go east
  if (currentX < 0) currentX = 0;
  if (currentY < 0) currentY = 0;
  if (currentX >= gridXSize) currentX = gridXSize - 1;
  if (currentY >= gridXSize) currentY = gridXSize - 1;
  if (output === 2) {
    // oxygen system found!
    area[currentX][currentY] = 4; // mark goal
    printArea();
    console.log('found oxygen!');
    if (!isAggressive) {
      wantToExit = 1;
      return;
    }
  }
  if (output === 0) {
    // hit wall
    if (area[currentX][currentY] === 2) {
      printArea();
      console.log('hit same wall again!');
      if (!isAggressive) {
        wantToExit = 1;
        return;
      }
    }
    area[currentX][currentY] = 2; // mark wall
    currentX = previousX;
    currentY = previousY;
    // if (input === 1) input = 2; // go south
    // else if (input === 2) input = 1; // go north
    // else if (input === 3) input = 4; // go east
    // else if (input === 4) input = 3; // go west
  }
  if (output === 1) {
    // open space
    // if (area[currentX][currentY] === -1 // unexplored
    //   || area[currentX][currentY] === 3) { // open space (already explored)
    // }
    if (area[currentX][currentY] === 2) console.log('saw wall as open space!'); // wall
    else if (area[currentX][currentY] === 4) console.log('saw goal as open space!'); // goal: oxygen
    if (area[currentX][currentY] === 3) {
      area[currentX][currentY] = 5; // mark open space (already explored 2 or more times)
    } else {
      area[currentX][currentY] = 3; // mark open space (already explored)
    }
  }
  {
    // prioritize unexplored over already explored for next move
    if (currentY > 0 && (currentX !== previousX || currentY-1 !== previousY) && area[currentX][currentY-1] === -1) input = 1; // go north
    else if (currentX < gridXSize && (currentX+1 !== previousX || currentY !== previousY) && area[currentX+1][currentY] === -1) input = 4; // go east
    else if (currentY < gridXSize && (currentX !== previousX || currentY+1 !== previousY) && area[currentX][currentY+1] === -1) input = 2; // go south
    else if (currentX > 0 && (currentX-1 !== previousX || currentY !== previousY) && area[currentX-1][currentY] === -1) input = 3; // go west

    else if (currentY > 0 && (currentX !== previousX || currentY-1 !== previousY) && area[currentX][currentY-1] === 3) input = 1; // go north
    else if (currentX < gridXSize && (currentX+1 !== previousX || currentY !== previousY) && area[currentX+1][currentY] === 3) input = 4; // go east
    else if (currentY < gridXSize && (currentX !== previousX || currentY+1 !== previousY) && area[currentX][currentY+1] === 3) input = 2; // go south
    else if (currentX > 0 && (currentX-1 !== previousX || currentY !== previousY) && area[currentX-1][currentY] === 3) input = 3; // go west

    else { // backtrack to where just came from, when nothing else is free
      // console.log('no where to go! last input=', input, 'output=', output);
      // wantToExit = 1;
      // printArea();
      if (input === 1) input = 2; // go south
      else if (input === 2) input = 1; // go north
      else if (input === 3) input = 4; // go east
      else if (input === 4) input = 3; // go west
    }
  }
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
const solve = (program = []) => {
  initState();
  input = 1; // initially go north
  area[currentX][currentY] = 3;
  transform(program);
  // return numBlockTiles;
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
  getNumPainted, nextInput, nextOutput, initState, countPainted, printPanels: printArea};

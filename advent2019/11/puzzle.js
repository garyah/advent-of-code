// 2019 day 11 code (extended intcode computer, based on day 9)
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


let panelMap = [[-1]];
let currentX = 5000;
let currentY = 5000;
let outputState = 0;
let heading = 0;
let numOutputs = 0;
let numPainted = 0;
let numPaintedWhite = 0;
let whiteMinX = 9999, whiteMaxX = 0;
let whiteMinY = 9999, whiteMaxY = 0;
const getNumPainted = () => {
  return numPainted;
};
const nextInput = () => {
  // if (panelMap[currentX][currentY] !== 0 && panelMap[currentX][currentY] !== 1
  //     && panelMap[currentX][currentY] !== -1)
  //   console.log("read an invalid value of panel! currentX=", currentX, "currentY=", currentY, "heading=", heading);
  // if (outputState !== 0)
  //   console.log("in an invalid output state! state=", outputState, "currentX=", currentX, "currentY=", currentY, "heading=", heading);
  // if (numOutputs < 20) console.log('panelMap[currentX][currentY]=', panelMap[currentX][currentY]);
  return panelMap[currentX][currentY] === -1 ? 0 : panelMap[currentX][currentY];
};
const nextOutput = (output = 0) => {
  if (outputState === 0) {
    outputState = 1;
    panelMap[currentX][currentY] = output;
    numOutputs++;
    // if (numOutputs < 20) console.log('currentX=', currentX, 'currentY=', currentY, 'output=', output);
    return;
  }
  if (outputState === 1) {
    outputState = 0;
    heading += 360;
    if (output) heading += 90; else heading -= 90;
    heading %= 360;
    if (heading !== 0 && heading !== 90 && heading !== 180 && heading !== 270)
      console.log("bad heading value!");
    if (heading === 0) { currentY--; }
    if (heading === 90) { currentX++; }
    if (heading === 180) { currentY++; }
    if (heading === 270) { currentX--; }
    if (currentX < 0 || currentX > panelMap[0].length
        || currentY < 0 || currentY > panelMap[0].length) {
      console.log("ran off the edge! currentX=", currentX, "currentY=", currentY, "heading=", heading);
    }
  }
};
const initState = () => {
  for (let x = 0; x < 10000; x++) {
    panelMap[x] = [];
    for (let y = 0; y < 10000; y++) {
      panelMap[x][y] = -1; // initial black
      // console.log(panelMap);
    }
  }
  // let numPainted0 = 0;
  // for (let x = 0; x < 10000; x++) {
  //   for (let y = 0; y < 10000; y++) {
  //     if (panelMap[x][y] !== -1) numPainted0++;
  //   }
  // }
  // console.log('numPainted0=', numPainted0);
  currentX = 5000;
  currentY = 5000;
  outputState = 0;
  heading = 0;
  numOutputs = 0;
  numPainted = 0;
};
const countPainted = () => {
  numPainted = 0;
  numPaintedWhite = 0;
  for (let x = 0; x < 10000; x++) {
    for (let y = 0; y < 10000; y++) {
      if (panelMap[x][y] !== -1) numPainted++;
      if (panelMap[x][y] === 1) {
        numPaintedWhite++;
        if (x < whiteMinX) whiteMinX = x;
        if (x > whiteMaxX) whiteMaxX = x;
        if (y < whiteMinY) whiteMinY = y;
        if (y > whiteMaxY) whiteMaxY = y;
      }
    }
  }
};
const printPanels = () => {
  for (let y = whiteMinY; y <= whiteMaxY; y++) {
    let line = '';
    for (let x = whiteMinX; x <= whiteMaxX; x++) {
      if (panelMap[x][y] === 1) line += '*'; else line += ' ';
    }
    console.log(line);
  }
};
const solve = (program = []) => {
  // console.log('program = ', program);
  initState();
  transform(program);
  countPainted();
  console.log('numPainted=', numPainted, 'numOutputs=', numOutputs);
  return numPainted;
}
const printProgram = (programMemory = [], startIp = 0) => {
  let programString = '[' +  programMemory.join(',') + ']';
  console.log(
    'ampIndex= ', ampIndex, ' phase= ', phases[ampIndex],
    ' input= ', input, ':\t\t', programString, '\toutput= ', output, 'startIp= ', startIp);
}
const solve_p2 = (program = []) => {
  // console.log('program = ', program);
  initState();
  panelMap[currentX][currentY] = 1;
  transform(program);
  countPainted();
  console.log('numPainted=', numPainted, 'numPaintedWhite=', numPaintedWhite, 'numOutputs=', numOutputs);
  console.log('whiteMinX=', whiteMinX, 'whiteMaxX=', whiteMaxX, 'whiteMinY=', whiteMinY, 'whiteMaxY=', whiteMaxY);
}
const parse = (lines = ['']) => {
  return lines[0].split(',').map((value) => parseInt(value)).filter((num) => num === num);
};
module.exports = {setInput, getOutput, transform, solve, solve_p2, parse,
  getNumPainted, nextInput, nextOutput, initState, countPainted, printPanels};

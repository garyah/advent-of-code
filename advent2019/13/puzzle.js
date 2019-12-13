// 2019 day 13 code (extended intcode computer, based on day 11)
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
  console.log('numBlockTiles=', numBlockTiles, 'first memory=', programs[ampIndex].memory[0]);
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

let screen = [[-1]];
const gridXSize = 50, gridYSize = 30;
// let currentX = gridSize / 2;
// let currentY = gridSize / 2;
let outputState = 0;
// let heading = 0;
let numOutputs = 0;
let numPainted = 0;
// let numPaintedWhite = 0;
let whiteMinX = gridXSize / 2, whiteMaxX = 0;
let whiteMinY = gridXSize / 2, whiteMaxY = 0;
let xPos = 0, yPos = 0, tileId = 0, numBlockTiles = 0, score = 0;
let numEmptyTiles = 0, numWallTiles = 0, numPaddleTiles = 0, numBallTiles = 0;
let paddleXPos = 0, paddleYPos = 0;
let ballXPos = 0, ballYPos = 0;
const getNumPainted = () => {
  return numPainted;
};
const nextInput = () => {
  // if (numOutputs < 20) console.log('panelMap[currentX][currentY]=', panelMap[currentX][currentY]);
  // return panelMap[currentX][currentY] === -1 ? 0 : panelMap[currentX][currentY];
  console.log('input requested, value is ', input);
  return input;
};
const nextOutput = (output = 0) => {
  // console.log(output);
  if (outputState == 0) xPos = output;
  if (outputState == 1) yPos = output;
  if (outputState == 2) {
    if (xPos === -1 && yPos === 0) { score = output; console.log('score updated to: ', score); }
    else {
      tileId = output;
      if (xPos < 0) console.log('got neg xPos!');
      if (yPos < 0) console.log('got neg xPos!');
      if (tileId === 0) numEmptyTiles++;
      else if (tileId === 1) numWallTiles++;
      else if (tileId === 2) numBlockTiles++;
      else if (tileId === 3) { numPaddleTiles++; paddleXPos = xPos; paddleYPos = yPos; }
      else if (tileId === 4) { numBallTiles++; ballXPos = xPos; ballYPos = yPos; 
        if (numPaddleTiles && ballXPos > paddleXPos) input = 1;
        if (numPaddleTiles && ballXPos === paddleXPos) input = 0;
        if (numPaddleTiles && ballXPos < paddleXPos) input = -1;
      }
      if (xPos >= 0 && xPos < gridXSize && yPos >= 0 && yPos < gridXSize) {
        screen[xPos][yPos] = tileId;
        if (tileId === 4) printScreen();
      }
    }
    numOutputs++;
  }
  outputState++;
  outputState%=3;
};
const initState = () => {
  for (let x = 0; x < gridXSize; x++) {
    screen[x] = [];
    for (let y = 0; y < gridYSize; y++) {
      screen[x][y] = -1; // initial black
      // console.log(panelMap);
    }
  }
  currentX = gridXSize / 2;
  currentY = gridXSize / 2;
  outputState = 0;
  heading = 0;
  numOutputs = 0;
  numPainted = 0;
  numPaintedWhite = 0;
  whiteMinX = gridXSize / 2, whiteMaxX = 0;
  whiteMinY = gridXSize / 2, whiteMaxY = 0;
  xPos = 0, yPos = 0, tileId = 0, numBlockTiles = 0, score = 0;
  numEmptyTiles = 0, numWallTiles = 0, numPaddleTiles = 0, numBallTiles = 0;
  paddleXPos = 0, paddleYPos = 0;
  ballXPos = 0, ballYPos = 0;
};
const countPainted = () => {
  // numPainted = 0;
  // numPaintedWhite = 0;
  // whiteMinX = gridSize / 2, whiteMaxX = 0;
  // whiteMinY = gridSize / 2, whiteMaxY = 0;
  // for (let x = 0; x < gridSize; x++) {
  //   for (let y = 0; y < gridSize; y++) {
  //     if (panelMap[x][y] !== -1) numPainted++;
  //     if (panelMap[x][y] === 1) {
  //       numPaintedWhite++;
  //       if (x < whiteMinX) whiteMinX = x;
  //       if (x > whiteMaxX) whiteMaxX = x;
  //       if (y < whiteMinY) whiteMinY = y;
  //       if (y > whiteMaxY) whiteMaxY = y;
  //     }
  //   }
  // }
};
const printScreen = () => {
  for (let y = whiteMinY; y <= whiteMaxY; y++) {
    // let line = '';
    // for (let x = whiteMinX; x <= whiteMaxX; x++) {
    //   if (screen[x][y] === -1 || screen[x][y] === 0) line += ' ';
    //   else if (screen[x][y] === 1) line += '|';
    //   else if (screen[x][y] === 2) line += '=';
    //   else if (screen[x][y] === 3) line += '-';
    //   else if (screen[x][y] === 4) line += '*';
    //   else line += '.';
    // }
    // console.log(line);
  }
  for (let y = 0; y < gridYSize; y++) {
    let line = '';
    for (let x = 0; x < gridXSize; x++) {
      if (screen[x][y] === -1 || screen[x][y] === 0) line += ' ';
      else if (screen[x][y] === 1) line += '|';
      else if (screen[x][y] === 2) line += '=';
      else if (screen[x][y] === 3) line += '-';
      else if (screen[x][y] === 4) line += '*';
      else line += '.';
    }
    console.log(line);
  }
};
const solve = (program = []) => {
  // console.log('program = ', program);
  initState();
  // console.log('numBlockTiles=', numBlockTiles, 'first memory=', programs[0].memory[0]);
  transform(program);
  // countPainted();
  console.log('numBlockTiles=', numBlockTiles, 'first memory=', programs[0].memory[0]);
  return numBlockTiles;
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
  // panelMap[currentX][currentY] = 1;
  input = 0;
  program[0] = 2;
  transform(program);
  // countPainted();
  console.log('numBlockTiles=', numBlockTiles, 'numOutputs=', numOutputs,
              'score=', score, 'first memory=', programs[0].memory[0]);
  console.log('numEmptyTiles=', numEmptyTiles, 'numWallTiles=', numWallTiles,
              'numPaddleTiles=', numPaddleTiles, 'numBallTiles=', numBallTiles);
  printScreen();
  return score;
}
const parse = (lines = ['']) => {
  return lines[0].split(',').map((value) => parseInt(value)).filter((num) => num === num);
};
module.exports = {setInput, getOutput, transform, solve, solve_p2, parse,
  getNumPainted, nextInput, nextOutput, initState, countPainted, printPanels: printScreen};

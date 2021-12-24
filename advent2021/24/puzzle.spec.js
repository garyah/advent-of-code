describe("2021 day 24", function() {
  // code
  let var1 = 0;
  let var2 = '';
  let var3 = [];
  let var4 = {};

  let regW = 0;
  let regX = 0;
  let regY = 0;
  let regZ = 0;
  const initVars = () => {
    program = [''];

    var1 = 0;
    var2 = '';
    var3 = [];
    var4 = {};

    regW = 0;
    regX = 0;
    regY = 0;
    regZ = 0;

    maxModelNum = 0;
  };
  const getRegister = (register = '') => {
    if (register.startsWith('w')) return regW;
    if (register.startsWith('x')) return regX;
    if (register.startsWith('y')) return regY;
    if (register.startsWith('z')) return regZ;
  }
  const setRegister = (register = '', value = 0) => {
    if (register.startsWith('w')) regW = value;
    if (register.startsWith('x')) regX = value;
    if (register.startsWith('y')) regY = value;
    if (register.startsWith('z')) regZ = value;
  }
  const executeInstruction = (line = '', inputNumber = '') => {
    // console.log(...);
    const parts = line.split(' ');
    const instruction = parts[0];
    const operand1 = parts[1];
    const hasOperand2 = parts.length === 3;
    const operand2 = hasOperand2 ? parts[2] : '';
    const isOperand2Register
      = operand2
       ? operand2.startsWith('w') || operand2.startsWith('x')
        || operand2.startsWith('y') || operand2.startsWith('z') : false;
    const operand2Value = isOperand2Register ? getRegister(operand2) : parseInt(operand2);

    let isInput = false;
    do {
        if (instruction === 'inp') {
          setRegister(operand1, parseInt(inputNumber[0]));
          isInput = true;
          break;
        }
        if (instruction === 'add') {
          setRegister(operand1, getRegister(operand1) + operand2Value);
          break;
        }
        if (instruction === 'mul') {
          setRegister(operand1, getRegister(operand1) * operand2Value);
          break;
        }
        if (instruction === 'div') {
          setRegister(operand1, Math.trunc(getRegister(operand1) / operand2Value + 0.4999));
          break;
        }
        if (instruction === 'mod') {
          setRegister(operand1, getRegister(operand1) % operand2Value);
          break;
        }
        if (instruction === 'eql') {
          if (getRegister(operand1) === operand2Value) { setRegister(operand1, 1); break; }
          setRegister(operand1, 0);
          break;
        }
    } while (0);

    return isInput ? inputNumber.substr(1) : inputNumber;
  }
  const printRegisters = (prefix = '') => {
    console.log(prefix, 'w=', regW, 'x=', regX, 'y=', regY, 'z=', regZ);
  }
  const executeProgram = (inputNumber = '') => {
    // console.log(...);
    // printRegisters('start, inputNumber=' + inputNumber);
    let currentInputNumber = inputNumber;
    for (let i = 0; i < program.length; i++) {
      currentInputNumber = executeInstruction(program[i], currentInputNumber);
      // printRegisters('i=' + i + ' currentInputNumber=' + currentInputNumber);
    }
    // printRegisters('end');

    return regZ === 0;
  }
  const fn2 = () => {
    // console.log(...);
    if (1) {}
    else if (1) {}
    else {}
    var2.split(' ').join(' ');
    for (let i = 0; i < var3.length; i++) { break; continue; }
    for (let j = 0;; j++) { break; continue; }
    for (const item of var3) { break; continue; }
    var3.map((num) => {
      return num;
    }).filter((num) => num === num);
    var3.reduce((sum, num) => {
      return sum + num;
    }, 0);
    return;
  };
  const fn3 = () => {
    // console.log(...);
    if (1) {}
    else if (1) {}
    else {}
    var2.split(' ').join(' ');
    for (let i = 0; i < var3.length; i++) { break; continue; }
    for (let j = 0;; j++) { break; continue; }
    for (const item of var3) { break; continue; }
    var3.map((num) => {
      return num;
    }).filter((num) => num === num);
    var3.reduce((sum, num) => {
      return sum + num;
    }, 0);
    return;
  };
  const fn4 = () => {
    // console.log(...);
    if (1) {}
    else if (1) {}
    else {}
    var2.split(' ').join(' ');
    for (let i = 0; i < var3.length; i++) { break; continue; }
    for (let j = 0;; j++) { break; continue; }
    for (const item of var3) { break; continue; }
    var3.map((num) => {
      return num;
    }).filter((num) => num === num);
    var3.reduce((sum, num) => {
      return sum + num;
    }, 0);
    return;
  };
  const fn5 = () => {
    // console.log(...);
    if (1) {}
    else if (1) {}
    else {}
    var2.split(' ').join(' ');
    for (let i = 0; i < var3.length; i++) { break; continue; }
    for (let j = 0;; j++) { break; continue; }
    for (const item of var3) { break; continue; }
    var3.map((num) => {
      return num;
    }).filter((num) => num === num);
    var3.reduce((sum, num) => {
      return sum + num;
    }, 0);
    return;
  };
  let maxModelNum = 0;
  const solve = () => {
    // console.log(...);
    // executeProgram('13579246899999');
    // executeProgram('99999999999999');
    let n = 99999999999999; // 11111111111111
    let skippedCount = 0;
    for (n = 99999999999999; n >= 11111111111111; n--) {
      const nString = n.toString();
      // console.log(nString);
      // console.log(nString.includes('0'));
      if (nString.includes('0')) { /*console.log(nString); */skippedCount += 1; continue; }
      if (n % (10 * 1000) === 1111) console.log('... skippedCount =', skippedCount);
      if (executeProgram(nString) === true) break;
    }
    console.log('n=', n);
    // TODO: maxModelNum = n;
  }
  const solve_p2 = () => {
    // console.log(...);
    executeInstruction();
    maxModelNum = 2;
    // console.log(...);
  }
  let program = [''];
  const parse = () => {
    program = lines;    // use for multi-line string input
  };















  // tests
  it("can solve puzzle with my input", () => {
    parse();
    solve();
    console.log("\npart 1 answer is " + maxModelNum);
    // expect(answer).toEqual(1);
  });
  it("can solve puzzle p2 with my input", () => {
    parse();
    // solve_p2();
    console.log("\npart 2 answer is " + maxModelNum);
    // expect(answer).toEqual(2);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  // next line for testing puzzle.spec.js in common dir
  // const Parser = require('./parser');
  const puzzle = require('../../common/puzzleWithCode');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  let linesSave = [];
  beforeAll((done) => {
    console.log("2021 day 24:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/24/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
  beforeEach((done) => {
    linesSave = lines;
    initVars();
    done();
  });
  afterEach((done) => {
    lines = linesSave;
    done();
  });
});

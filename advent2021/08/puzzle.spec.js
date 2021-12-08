describe("2021 day 08", function() {
  // code
  let top = '';
  let top_right = '';
  let bottom_right = '';
  let middle = '';
  let top_left = '';
  let bottom = '';
  let bottom_left = '';
  let outputValue = '';

  const initVars = () => {
    notes = [0];

    num1478 = 0;

    top = '';
    top_right = '';
    bottom_right = '';
    middle = '';
    top_left = '';
    bottom = '';
    bottom_left = '';
    outputValue = '';

    outputValueSum = 0;
  };
  const count1478 = () => {
    for (let i = 0; i < notes.length; i++) {
      for (let j = 0; j < notes[i].rightWords.length; j++) {
        if (notes[i].rightWords[j].length === 2
            || notes[i].rightWords[j].length === 3
            || notes[i].rightWords[j].length === 4
            || notes[i].rightWords[j].length === 7) {
              num1478++;
        }
      }
    }
  };
  const decodeLeft = (left = ['']) => {
    let rhs = '';
    let tlm = '';

    let i = 0;
    for (i = 0; i < left.length; i++) {
      if (left[i].length === 2) {// 1
        rhs = left[i]; continue;
      }
    }
    // console.log('rhs = ', rhs);
    for (i = 0; i < left.length; i++) {
      if (left[i].length === 4) {// 4
        tlm = left[i].replace(rhs[0], '').replace(rhs[1], ''); continue;
      }
    }
    // console.log('tlm = ', tlm);
    for (i = 0; i < left.length; i++) {
      if (left[i].length === 3) {// 7
        top = left[i].replace(rhs[0], '').replace(rhs[1], '');
        // console.log('top = ', top);
        continue;
      }
    }
    for (i = 0; i < left.length; i++) {
      if (left[i].length === 6) {// 0, 6, or 9
        if (left[i].replace(rhs[0], '').length !== left[i].length
            && left[i].replace(rhs[1], '').length === left[i].length) {// must be 6
          top_right = rhs[1]; bottom_right = rhs[0];
          // console.log('top_right = ', top_right, ', bottom_right = ', bottom_right);
          continue;
        }
        if (left[i].replace(rhs[1], '').length !== left[i].length
            && left[i].replace(rhs[0], '').length === left[i].length) {// must be 6
          top_right = rhs[0]; bottom_right = rhs[1];
          // console.log('top_right = ', top_right, ', bottom_right = ', bottom_right);
          continue;
        }
        if (left[i].replace(tlm[0], '').length !== left[i].length
            && left[i].replace(tlm[1], '').length === left[i].length) {// must be 0
          middle = tlm[1]; top_left = tlm[0];
          // console.log('middle = ', middle, ', top_left = ', top_left);
          continue;
        }
        if (left[i].replace(tlm[1], '').length !== left[i].length
            && left[i].replace(tlm[0], '').length === left[i].length) {// must be 0
          middle = tlm[0]; top_left = tlm[1];
          // console.log('middle = ', middle, ', top_left = ', top_left);
          continue;
        }
      }
    }
    for (i = 0; i < left.length; i++) {
      if (left[i].length === 6) {// 0, 6, or 9
        if (left[i].replace(middle, '').length !== left[i].length
            && left[i].replace(top_right, '').length !== left[i].length) {// must be 9
            bottom = left[i].replace(top, '').replace(top_right, '')
              .replace(bottom_right, '').replace(middle, '').replace(top_left, '');
            bottom_left = 'abcdefg'.replace(top, '').replace(top_right, '')
              .replace(bottom_right, '').replace(middle, '').replace(top_left, '')
              .replace(bottom, '');
            // console.log('bottom = ', bottom, ', bottom_left = ', bottom_left);
        }
      }
    }
  };
  const decodeRight = (right = ['']) => {
    outputValue = '';
    let i = 0;
    for (i = 0; i < right.length; i++) {
      if (right[i].length === 2) { // 1
        outputValue += '1';
        continue;
      }
      if (right[i].length === 4) { // 4
        outputValue += '4';
        continue;
      }
      if (right[i].length === 3) { // 7
        outputValue += '7';
        continue;
      }
      if (right[i].length === 7) { // 8
        outputValue += '8';
        continue;
      }
      if (right[i].length === 6) { // 0, 6, or 9
        if (right[i].replace(middle, '').length === right[i].length) {
          outputValue += '0';
          continue;
        }
        if (right[i].replace(top_right, '').length === right[i].length) {
          outputValue += '6';
          continue;
        }
        outputValue += '9';
        continue;
      }
      if (right[i].length === 5) { // 2, 3, or 5
        if (right[i].replace(bottom_right, '').length === right[i].length) {
          outputValue += '2';
          continue;
        }
        if (right[i].replace(top_right, '').length === right[i].length) {
          outputValue += '5';
          continue;
        }
        outputValue += '3';
        continue;
      }
    }
    // console.log('outputValue = ', outputValue);
  };
  let num1478 = 0;
  const solve = () => {
    count1478();
  }
  let outputValueSum = 0;
  const solve_p2 = () => {
    for (let i = 0; i < notes.length; i++) {
      decodeLeft(notes[i].leftWords);
      decodeRight(notes[i].rightWords);
      const the_number = parseInt(outputValue);
      outputValueSum += Number(the_number);
    }
  }
  let notes = [{}];
  const parse = () => {
    notes = parser.linesToWords(lines);
  };















  // tests (some had expects added after done for the day)
  it('decodeLeft() ...', () => {
    decodeLeft(
      'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab'
      .split(' ')
    );
    expect(top).toEqual('d');
    expect(top_right).toEqual('a');
    expect(bottom_right).toEqual('b');
    expect(middle).toEqual('f');
    expect(top_left).toEqual('e');
    expect(bottom).toEqual('c');
    expect(bottom_left).toEqual('g');
  });
  it('decodeRight() ...', () => {
    decodeLeft(
      'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab'
      .split(' ')
    );
    decodeRight(
      'cdfeb fcadb cdfeb cdbaf'
      .split(' ')
    );
    expect(outputValue).toEqual('5353');
  });
  it("can parse input", () => {
    // lines = '+1,+3,+2 1,2,3'
    //   .split(
    //     ' '
    //     );
    // parse();
    // expect(data).toEqual([1, 3, 2]);
  });
  it("can solve puzzle with my input", () => {
    parse();
    solve();
    console.log("\npart 1 answer is " + num1478);
    expect(num1478).toEqual(387);
  });
  it("can solve puzzle p2 with my input", () => {
    parse();
    solve_p2();
    console.log("\npart 2 answer is " + outputValueSum);
    expect(outputValueSum).toEqual(986034);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  // next line for testing puzzle.spec.js in common dir
  // const Parser = require('./parser');
  // const puzzle = require('../../common/puzzleWithCode');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  let linesSave = [];
  beforeAll((done) => {
    console.log("2021 day 08:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/08/input.txt", (linesRead) => {
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

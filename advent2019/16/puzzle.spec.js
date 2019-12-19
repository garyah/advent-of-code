describe("2019 day 16", function() {
  // new code
  let var1 = 0;
  let var2 = '';
  const fn1 = (arg1 = 0, arg2 = '', arg3 = []) => {
    if (1) {}
    else if (1) {}
    else {}
    for (let i = 0;; i++) { break; continue; }
    for (const item of arg3) {}
    return 0;
  };
  const fn2 = () => {
    return '';
  };
  const process = (inputDigits = [0], numTimes = 1) => {
    // console.log();
    const rootPattern = [0, 1, 0, -1];
    let basePattern = [];
    for (let count = 0; count < inputDigits.length / rootPattern.length + 1; count++) {
      for (let rootPatternIdx = 0; rootPatternIdx < rootPattern.length; rootPatternIdx++) {
        basePattern.push(rootPattern[rootPatternIdx]);
      }
    }
    // console.log(basePattern);
    let outputDigits = [];
    for (let iteration = 0; iteration < numTimes; iteration++) {
      outputDigits = [];
      let pattern = basePattern;
      for (let outIdx = 0; outIdx < inputDigits.length; outIdx++) {
        // add up all input digits factored by pattern digits
        outputDigits[outIdx] = 0;
        let toPrint = '';
        for (let inIdx = 0; inIdx < inputDigits.length; inIdx++) {
          outputDigits[outIdx] += inputDigits[inIdx] * pattern[inIdx + 1];
          // console.log('inputDigits[inIdx]=', inputDigits[inIdx], 'pattern[inIdx + 1]=', pattern[inIdx + 1]);
          toPrint += (inIdx ? ' + ' : '') + inputDigits[inIdx] + '*' + pattern[inIdx + 1];
        }
        // console.log(toPrint, '=', outputDigits[outIdx]);
        outputDigits[outIdx] = Math.abs(outputDigits[outIdx]);
        outputDigits[outIdx] %= 10;
        // console.log('outputDigit at idx=', outIdx, 'value = ', outputDigits[outIdx]);

        // make new pattern for next output digit
        pattern = [];
        for (let patternIdx = 0; patternIdx < basePattern.length; patternIdx++) {
          pattern.push(basePattern[patternIdx]);
          for (let count = 0; count <= outIdx; count++) pattern.push(basePattern[patternIdx]);
        }
        // console.log('pattern=', pattern);
      }
      inputDigits = outputDigits;
    }
    return outputDigits.join('');
  };
  const solve = (inputDigits = [0]) => {
    return process(inputDigits, 100).substr(0, 8);
  }
  const parse = (lines = ['']) => {
    // return lines[0]; // use for one line string input
    // return lines;    // use for multi-line string input
    return lines[0].split('').map((num) => parseInt(num));
  };















  // new tests
  it('fn1() returns number 0', () => {
    expect(fn1()).toEqual(
      0
      );
  });
  it('fn2() returns empty string', () => {
    expect(fn2()).toEqual(
      ''
      );
  });
  it("can solve puzzle", () => {
    const data = [
      [['12345678'], 1],
      [['12345678'], 2],
      [['12345678'], 3],
      [['12345678'], 4],
      [['12345678'], 100],
      [['80871224585914546619083218645595'], 100],
      [['19617804207202209144916044189917'], 100],
      [['69317163492948606335995924319873'], 100],
    ];
    const actual = data.map((data) => process(parse(data[0]), data[1]).substr(0, 8));
    const expected = [
      '48226158',
      '34040438',
      '03415518',
      '01029498',
      '23845678',
      '24176176',
      '73745418',
      '52432133',
    ];
    expect(actual).toEqual(expected);
  });
  it("can parse input", () => {
    const data = parse([
      '132',
    ]);
    expect(data).toEqual([1, 3, 2]);
  });
  it("can solve puzzle with my input", () => {
    const data = parse(lines);
    const answer = solve(data);
    console.log("part 1 answer is " + answer);
    expect(answer).toEqual(18933364);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 16:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/16/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

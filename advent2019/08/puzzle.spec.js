describe("2019 day 8", function() {
  // 2019 day 8 code (image processing and recognition, coded message in output)
  const printImage = (w = 1, h = 1, digits = [0]) => {
    const length = w * h;
    let image = '';
    for (let idx = 0; idx < length; idx++) {
      let digitToPrint = -1;
      for (let idx2 = digits.length - length + idx; idx2 >= 0; idx2 -= length) {
        const printDigit = (digits[idx2] === 1) ? "*" : " ";
        digitToPrint = (digits[idx2] === 0 || digits[idx2] === 1) ?
          printDigit : digitToPrint;
      }
      image += digitToPrint;
    }
    console.log();
    for (let i = 0; i < h; i++) {
      console.log(image.substr(i * w, w));
    }
  };
  const solve = (w = 1, h = 1, digits = [0]) => {
    const length = w * h;
    let minCountZeros = w * h + 1;
    let minZeroCountIndex = -1;
    for (let idx = 0; idx < digits.length; idx += length) {
      let countZeros = 0;
      for (let idx2 = idx; idx2 < idx + length; idx2++) {
        countZeros += (digits[idx2] === 0) ? 1 : 0;
      }
      if (countZeros < minCountZeros) {
        minCountZeros = countZeros;
        minZeroCountIndex = idx;
      }
    }
    let countOnes = 0;
    let countTwos = 0;
    for (let idx = minZeroCountIndex; idx < minZeroCountIndex + length; idx++) {
      countOnes += (digits[idx] === 1) ? 1 : 0;
      countTwos += (digits[idx] === 2) ? 1 : 0;
      // if ()
      // for (let idx2) {
      // }
    }
    return countOnes * countTwos;
  }
  const parse = (lines = ['']) => {
    // return lines[0]; // use for one line string input
    // return lines;    // use for multi-line string input
    return lines[0].split('').map((char) => parseInt(char)).filter((num) => num === num);
  };















  // 2019 day 8 code (image processing and recognition, coded message in output)
  it('printImage() outputs proper image', () => {
    const data = parse(lines);
    printImage(25, 6, data);
  });
  it("can solve puzzle", () => {
    const data = [
      [3, 2, [1, 2, 2, 4, 5, 6, 7, 8, 9, 0, 0, 2]],
    ];
    const actual = data.map((data) => solve(data[0], data[1], data[2]));
    const expected = [
      2,
    ];
    expect(actual).toEqual(expected);
  });
  it("can parse input", () => {
    const data = parse(
      ['120', '']
      );
    expect(data).toEqual([1, 2, 0]);
  });
  it("can solve puzzle with my input", () => {
    const data = parse(lines);
    const answer = solve(25, 6, data);
    console.log("part 1 answer is " + answer);
    expect(answer).toEqual(2064);
  });
  it("can solve puzzle part 2 with my input", () => {
    const data = parse(lines);
    printImage(25, 6, data);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 8:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/08/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

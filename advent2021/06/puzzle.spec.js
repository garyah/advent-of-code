describe("2021 day 06", function() {
  // new code
  let fishes = [0];
  let var1 = 0;
  let var2 = '';
  const simulate = (numDays = 80) => {
    for (let dayNum = 0; dayNum < numDays; dayNum++) {
      let numFishes = fishes.length;
      // console.log(numFishes);
      for (let i = 0; i < numFishes; i++) {
        fishes[i] -= 1;
        if (fishes[i] < 0) {
          fishes[i] = 6;
          fishes[fishes.length] = 8;
        }
      }
    }
    return fishes.length;
  };
  const solve = (data = [0]) => {
    fishes = data;
    return simulate();
  }
  let popByAge = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let fishPop = 0;
  const initAgePop = () => {
    for (let i = 0; i < fishes.length; i++) {
      popByAge[fishes[i]] += 1;
    }
    fishPop = fishes.length;
  };
  const simulate_v2 = (numDays = 256) => {
    for (let dayNum = 0; dayNum < numDays; dayNum++) {
      // console.log(fishPop);
      let savedZeroAge = popByAge[0];
      for (let i = 1; i <= 8; i++) {
        popByAge[i - 1] = popByAge[i];
      }
      popByAge[6] += savedZeroAge;
      fishPop += savedZeroAge;
      popByAge[8] = savedZeroAge;
    }
  };
  const solve_p2 = (data = [0]) => {
    fishes = data;
    initAgePop();
    simulate_v2(256);
    return fishPop;
  }
  const parse = (lines = ['']) => {
    return parser.lineToIntsComma(lines[0]);
  };















  // new tests
  it("can solve puzzle with my input", () => {
    const data = parse(lines);
    const answer = solve(data);
    console.log("part 1 answer is " + answer);
    expect(answer).toEqual(380243);
  });
  it("can solve puzzle p2 with my input", () => {
    const data = parse(lines);
    const answer = solve_p2(data);
    console.log("part 2 answer is " + answer);
    expect(answer).toEqual(1708791884591);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  // const puzzle = require('../../common/puzzleWithCode');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2021 day 06:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/06/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

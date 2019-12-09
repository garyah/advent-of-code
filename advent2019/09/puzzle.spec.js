describe("", function() {
  // 2019 day 9 tests (extended intcode computer, based on days 2 and 5)
  describe("2019 day 9", function() {
    it("can handle relative mode", () => {
      const data = [
        [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99],
        [1102,34915192,34915192,7,4,7,99,0],
        [104,1125899906842624,99],
      ];
      const actual = data.map((data) => puzzle.transform(data));
      const expected = [
        99,
        1219070632396864,
        1125899906842624,
      ];
      // console.log('actual=', actual);
      // console.log('actual=', expected);
      expect(actual).toEqual(expected);
    });
    it("can parse input", () => {
      const data = puzzle.parse(['1,2,3']);
      expect(data).toEqual([1, 2, 3]);
    });
    it("can solve puzzle with my input", () => {
      const data = puzzle.parse(lines);
      const answer = puzzle.solve(data);
      console.log("part 1 answer is " + answer);
      expect(answer).toEqual(3533056970);
    });
    it("can solve puzzle part 2 with my input", () => {
      const data = puzzle.parse(lines);
      const answer = puzzle.solve_p2(data);
      console.log("part 2 answer is " + answer);
      expect(answer).toEqual(72852);
    });
  });












  // boilerplate
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 9:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/09/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

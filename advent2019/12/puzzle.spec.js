describe("TestBasic", function() {
  var fs = require('fs');
  var Puzzle = require('./puzzle');
  var puzzle;
  beforeEach(function() {
    puzzle = new Puzzle();
  });
  xit("should be able solve with my input", function() {
    var input = fs.readFileSync("advent2019/12/input.txt", 'utf8').split(/\r?\n/);
    var data = puzzle.parse(input);
    var answer = puzzle.solve(data);
    expect(answer).toEqual(0);
  })
  it("should be able to parse input", function() {
    var data = puzzle.parse('+1 +3 +2'.split(' '));
    expect(data).toEqual([1, 3, 2]);
  });
  it("should be able to solve puzzle", function() {
    var data = [1, 1, -2];
    expect(puzzle.solve(data)).toEqual(0);
  });
});

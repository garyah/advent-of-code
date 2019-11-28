describe("TestBasic", function() {
  var Puzzle = require('./puzzle');
  var puzzle;
  beforeEach(function() {
    puzzle = new Puzzle();
  });
  it("should be able to parse input", function() {
    var data = puzzle.parse('+1 +3 +2'.split(' '));
    expect(data).toEqual([1, 3, 2]);
  });
  it("should be able to solve puzzle", function() {
    var data = [1, 1, -2];
    expect(puzzle.solve(data)).toEqual(0);
  });
});

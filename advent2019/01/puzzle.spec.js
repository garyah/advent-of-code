describe("puzzle", function() {
  var Parser = require('../../common/parser');
  var Puzzle = require('./puzzle');
  var parser = new Parser();
  var puzzle = new Puzzle();
  it("should be able to solve puzzle", function() {
    var data = [1, 1, -2];
    expect(puzzle.solve(data)).toEqual(0);
  });
  it("should be able to parse input", function() {
    var data = puzzle.parse('+1 +3 +2'.split(' '));
    expect(data).toEqual([1, 3, 2]);
  });
  xit("should be able solve with my input", function(done) {
    // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
    parser.readLines(undefined, (lines) => {
      var data = puzzle.parse(lines);
      expect(puzzle.solve(data)).toEqual(0);
      done();
    });
  })
});

describe("TestBasic", function() {
  var fs = require('fs');
  var Puzzle = require('./puzzle');
  var puzzle;
  beforeEach(function() {
    puzzle = new Puzzle();
  });
  it("should be able solve with my input", function(done) {
    // var readStream = fs.createReadStream("advent2019/01/input.txt", 'utf8');
    var readStream = process.stdin;
    var input;
    readStream.on('data', (data) => {
      input = input ? input + data : data;
    });
    readStream.on('end', () => {
      input = input.toString().split(/\r?\n/);
      var data = puzzle.parse(input);
      var answer = puzzle.solve(data);
      expect(answer).toEqual(0);
      done();
    });
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

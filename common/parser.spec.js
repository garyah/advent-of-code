describe("parser", function() {
  var Parser = require('./parser');
  var parser = new Parser();
  it("should be able read input file", function(done) {
    parser.readLines("common/input.txt", (lines) => {
      expect(lines).toBeDefined();
      done();
    });
  });
});

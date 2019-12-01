describe("parser", function() {
  const Parser = require('./parser');
  const parser = new Parser();
  it("should be able to read input file when path specified", function(done) {
    parser.readLines("common/input.txt", (lines) => {
      expect(lines).toBeDefined();
      done();
    });
  });
});

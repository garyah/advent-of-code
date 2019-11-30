describe("parser", function() {
  const Parser = require('./parser');
  const parser = new Parser();
  it("should be able read input file", function(done) {
    parser.readLines("common/input.txt", (lines) => {
      expect(lines).toBeDefined();
      done();
    });
  });
});

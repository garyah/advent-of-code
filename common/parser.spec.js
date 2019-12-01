describe("parser", function() {
  const Parser = require('./parser');
  const parser = new Parser();
  it("should be able to read input file when path specified", function(done) {
    parser.readLines("common/input.txt", (lines) => {
      expect(lines).toBeDefined();
      done();
    });
  });
  it("getFirstLine() returns first element of specified array of strings, empty string if no element", function() {
    expect(parser.getFirstLine("1\r\n2\r\n3")).toEqual("1");
    expect(parser.getFirstLine(["1", "2", "3"])).toEqual("1");
    expect(parser.getFirstLine([])).toEqual("");
    expect(parser.getFirstLine()).toEqual("");
  });
  it("lineToChars() returns specified string as array of single-character strings, empty array if string empty", function() {
    expect(parser.lineToChars("123")).toEqual(["1", "2", "3"]);
    expect(parser.lineToChars("")).toEqual([]);
    expect(parser.lineToChars()).toEqual([]);
  });
});

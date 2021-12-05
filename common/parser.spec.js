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
  it("lineToIntsComma() converts specified comma-delimited string to array of ints, empty array if string empty", () => {
    expect(parser.lineToIntsComma("0,+1,2,-3,")).toEqual([0, 1, 2, -3]);
    expect(parser.lineToIntsComma("0, +1, 2, -3, ")).toEqual([0, 1, 2, -3]);
    expect(parser.lineToIntsComma(",")).toEqual([]);
    expect(parser.lineToIntsComma("")).toEqual([]);
    expect(parser.lineToIntsComma()).toEqual([]);
  });
  it("lineToIntsSpace() converts specified space-delimited string to array of ints, empty array if string empty", () => {
    expect(parser.lineToIntsSpace("0 +1 2 -3 ")).toEqual([0, 1, 2, -3]);
    expect(parser.lineToIntsSpace("0  +1  2  -3  ")).toEqual([0, 1, 2, -3]);
    expect(parser.lineToIntsSpace(" ")).toEqual([]);
    expect(parser.lineToIntsSpace("")).toEqual([]);
    expect(parser.lineToIntsSpace()).toEqual([]);
  });
  it("lineToFloatsComma() converts specified comma-delimited string to array of floats, empty array if string empty", () => {
    expect(parser.lineToFloatsComma("0.0,+1.1,2,-3.2,")).toEqual([0.0, 1.1, 2.0, -3.2]);
    expect(parser.lineToFloatsComma("0.0, +1.1, 2, -3.2, ")).toEqual([0.0, 1.1, 2, -3.2]);
    expect(parser.lineToFloatsComma(",")).toEqual([]);
    expect(parser.lineToFloatsComma("")).toEqual([]);
    expect(parser.lineToFloatsComma()).toEqual([]);
  });
  it("lineToFloatsSpace() converts specified comma-delimited string to array of floats, empty array if string empty", () => {
    expect(parser.lineToFloatsSpace("0.0 +1.1 2 -3.2 ")).toEqual([0.0, 1.1, 2.0, -3.2]);
    expect(parser.lineToFloatsSpace("0.0  +1.1  2  -3.2  ")).toEqual([0.0, 1.1, 2.0, -3.2]);
    expect(parser.lineToFloatsSpace(" ")).toEqual([]);
    expect(parser.lineToFloatsSpace("")).toEqual([]);
    expect(parser.lineToFloatsSpace()).toEqual([]);
  });
  it("linesToInts() converts specified array of strings to one of ints, empty array if array empty", () => {
    expect(parser.linesToInts(["0", "+1", "2", "-3", ""])).toEqual([0, 1, 2, -3]);
    expect(parser.linesToInts([])).toEqual([]);
    expect(parser.linesToInts()).toEqual([]);
  });
  it("linesToFloats() converts specified array of strings to one of floats, empty array if array empty", () => {
    expect(parser.linesToFloats(["0.0", "+1.1", "2", "-3.2", ""])).toEqual([0.0, 1.1, 2.0, -3.2]);
    expect(parser.linesToFloats([])).toEqual([]);
    expect(parser.linesToFloats()).toEqual([]);
  });
});

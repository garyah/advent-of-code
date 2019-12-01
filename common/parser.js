function Parser() {
}
Parser.prototype.readLines = (path = '', done) => {
  const fs = require('fs');
  const readStream = path ? fs.createReadStream(path, 'utf8') : process.stdin;
  let input;
  readStream.on('data', (data) => {
    input = input ? input + data : data;
  });
  let lines;
  readStream.on('end', () => {
    lines = input ? input.toString().split(/\r?\n/) : [];
    done(lines);
  });
};
Parser.prototype.getFirstLine = (lines = []) => {
  return lines && lines.length >= 1 ? lines[0] : '';
};
Parser.prototype.lineToChars = (line = '') => {
  let result = [];
  if (!line || line.length <= 0) return result;
  for (const char of line) {
    result.push(char);
  }
  return result;
};
module.exports = Parser;

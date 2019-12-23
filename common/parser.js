function Parser() {
}
Parser.prototype.readLines = (path = '', done) => {
  const fs = require('fs');
  // console.log('path is ', path ? 'truthy' : 'falsey');
  const readStream = path ? fs.createReadStream(path, 'utf8') : process.stdin;
  let input;
  readStream.on('data', (data) => {
    input = input ? input + data : data;
    // console.log('input=', input);
  });
  let lines;
  readStream.on('end', () => {
    lines = input ? input.toString().split(/\r?\n/) : [];
    // console.log('lines=', lines);
    done(lines);
  });
};
Parser.prototype.getFirstLine = (lines = []) => {
  return lines && lines.length >= 1 ? lines[0] : '';
};
Parser.prototype.lineToChars = (line = '') => {
  // if (!line || line.length <= 0) return [];
  return [...line];
  // return Array.from(line);
  // return line.split(/(?=[\s\S])/u); // WARNING: for empty string, one element in array!
  // return line.split(''); // WARNING: may break certain Unicode chars!
  // let result = [];
  // for (const char of line) {
  //   result.push(char);
  // }
  // return result;
};
Parser.prototype.linesToInts = (lines = []) => {
  return lines.map((line) => parseInt(line)).filter((num) => num === num);
};
module.exports = Parser;

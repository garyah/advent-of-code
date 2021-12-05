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
Parser.prototype.lineToIntsComma = (line = '') => {
  return line.split(',').map((num) => parseInt(num)).filter((num) => num === num);
};
Parser.prototype.lineToIntsSpace = (line = '') => {
  return line.split(' ').map((num) => parseInt(num)).filter((num) => num === num);
};
Parser.prototype.lineToFloatsComma = (line = '') => {
  return line.split(',').map((num) => parseFloat(num)).filter((num) => num === num);
};
Parser.prototype.lineToFloatsSpace = (line = '') => {
  return line.split(' ').map((num) => parseFloat(num)).filter((num) => num === num);
};
Parser.prototype.linesToInts = (lines = []) => {
  return lines.map((line) => parseInt(line)).filter((num) => num === num);
};
Parser.prototype.linesToFloats = (lines = []) => {
  return lines.map((line) => parseFloat(line)).filter((num) => num === num);
};
Parser.prototype.linesToIntRanges = (lines = []) => {
  return lines.map((line) => line.split('-').map((num) => parseInt(num)).filter((num) => num === num)).filter((range) => range.length);
};
Parser.prototype.linesToDirCommands = (lines = []) => {
  return lines.map((line) => {
    let fields = line.split(' ');
    let dir = 0;
    if (fields[0] === 'forward') dir = 0;
    if (fields[0] === 'up') dir = -1;
    if (fields[0] === 'down') dir = 1;
    return {direction: dir, distance: parseInt(fields[1])};
  });
};
Parser.prototype.linesToBinaryInts = (lines = []) => {
  return lines.map((line) => parseInt(line, 2)).filter((num) => num === num);
};
Parser.prototype.linesToLineSegments = (lines = []) => {
  return lines.map((line) => {
    let parts = line.split(' -> ');
    let startCoord = parts[0].split(',');
    let endCoord = parts[1].split(',');
    let x1 = parseInt(startCoord[0]);
    let y1 = parseInt(startCoord[1]);
    let x2 = parseInt(endCoord[0]);
    let y2 = parseInt(endCoord[1]);
    return {x1: x1, y1: y1, x2: x2, y2: y2};
  });
};
module.exports = Parser;

function Parser() {
}
Parser.prototype.readLines = function(path = '', done) {
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
module.exports = Parser;

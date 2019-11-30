function Parser() {
}
Parser.prototype.readLines = function(path = '', done) {
  var fs = require('fs');
  var readStream = path ? fs.createReadStream(path, 'utf8') : process.stdin;
  var input;
  readStream.on('data', (data) => {
    input = input ? input + data : data;
  });
  var lines;
  readStream.on('end', () => {
    lines = input ? input.toString().split(/\r?\n/) : [];
    done(lines);
  });
};
module.exports = Parser;

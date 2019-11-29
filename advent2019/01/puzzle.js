function Puzzle() {
}
Puzzle.prototype.parse = function(lines) {
  var result = [];
  for (var line of lines) {
    var num = parseInt(line);
    if (num === num) result.push(num);
  }
  return result;
};
Puzzle.prototype.solve = function(data) {
  var result = 0;
  for (var num of data) {
    if (num === num) result += num;
  }
  return result;
}
module.exports = Puzzle;

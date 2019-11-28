function Puzzle() {
}
Puzzle.prototype.parse = function(lines) {
  var ans = [];
  for (var line of lines) {
    ans.push(parseInt(line));
  }
  return ans;
};
Puzzle.prototype.solve = function(data) {
  var total = 0;
  for (var num of data) {
    if (num === num) total += num;
  }
  return total;
}
module.exports = Puzzle;

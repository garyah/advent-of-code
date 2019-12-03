function Puzzle() {
}
Puzzle.prototype.solve = (data) => {
  return data.reduce((sum, num) => {
    return sum + num;
  }, 0);
}
Puzzle.prototype.parse = (lines) => {
  return lines.map((line) => parseInt(line)).filter((num) => num === num);
};
module.exports = Puzzle;

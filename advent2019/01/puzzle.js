function Puzzle() {
}
Puzzle.prototype.parse = (lines) => {
  return lines.map((line) => parseInt(line)).filter((num) => num === num);
};
Puzzle.prototype.solve = (data) => {
  return data.reduce((sum, num) => sum + num);
}
module.exports = Puzzle;

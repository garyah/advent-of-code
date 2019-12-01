function Puzzle() {
}
Puzzle.prototype.solve = (data = '') => {
  return [...data].reduce((sum, symbol) => {
    const move = symbol === "(" ? 1 : -1;
    return sum + move;
  }, 0);
}
Puzzle.prototype.parse = (lines = ['']) => {
  return lines[0];
};
Puzzle.prototype.solve_p2 = (data = '') => {
  let result = 0, index = 1;
  [...data].reduce((sum, symbol) => {
    const move = symbol === "(" ? 1 : -1;
    if ((sum + move) === -1 && result === 0) result = index;
    index++;
    return sum + move;
  }, 0);
  return result;
}
module.exports = Puzzle;

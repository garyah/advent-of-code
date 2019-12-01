function Puzzle() {
}
Puzzle.prototype.solve = (data = '') => {
  // return -1;
  return [...data].reduce((sum, symbol) => {
    const move = symbol === "(" ? 1 : -1;
    return sum + move;
  }, 0);
}
Puzzle.prototype.parse = (lines = ['']) => {
  return lines[0];
};
Puzzle.prototype.solve_p2 = (changes) => {
  return -1;
  let seenFrequencies = new Set([0]);
  let frequency = 0;
  while (true) {
    for (const change of changes) {
      frequency += change;
      if (seenFrequencies.has(frequency)) return frequency;
      seenFrequencies.add(frequency);
    }
  }
}
module.exports = Puzzle;

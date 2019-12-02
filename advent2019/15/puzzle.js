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
Puzzle.prototype.solve_p2 = (data) => {
  return 0;
  let seenFrequencies = new Set([0]);
  let frequency = 0;
  while (true) {
    for (const change of data) {
      frequency += change;
      if (seenFrequencies.has(frequency)) return frequency;
      seenFrequencies.add(frequency);
    }
  }
}
module.exports = Puzzle;

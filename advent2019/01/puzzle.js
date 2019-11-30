function Puzzle() {
}
Puzzle.prototype.parse = (lines) => {
  return lines.map((line) => parseInt(line)).filter((num) => num === num);
};
Puzzle.prototype.solve = (data) => {
  return data.reduce((sum, num) => sum + num);
}
Puzzle.prototype.solve_p2 = (changes) => {
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

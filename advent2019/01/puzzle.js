function Puzzle() {
}
Puzzle.prototype.solve = (data) => {
  return data.reduce((sum, mass) => {
    const fuel = Math.floor(mass / 3) - 2;
    return sum + fuel;
    //console.log(sum + fuel);
  }, 0);
}
Puzzle.prototype.parse = (lines) => {
  return lines.map((line) => parseInt(line)).filter((num) => num === num);
};
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

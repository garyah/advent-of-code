function Puzzle() {
}
Puzzle.prototype.solve = (data = '') => {
  let x = 0, y = 0;
  data.split(', ').reduce((heading, move) => {
    heading += (move[0] === 'L') ? 90 : -90;
    if (heading < 0) heading += 360;
    if (heading > 270) heading -= 360;
    switch (heading) {
      case 0:
      default:
        y += parseInt(move.substr(1));
        break;
      case 90:
        x += parseInt(move.substr(1));
        break;
      case 180:
        y -= parseInt(move.substr(1));
        break;
      case 270:
        x -= parseInt(move.substr(1));
        break;
    }
    return heading;
  }, 0);
  return Math.abs(x) + Math.abs(y);
}
Puzzle.prototype.parse = (lines) => {
  return lines[0];
  return lines.map((line) => parseInt(line)).filter((num) => num === num);
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

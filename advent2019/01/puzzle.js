function Puzzle() {
}
Puzzle.prototype.solve = (masses) => {
  return masses.reduce((sum, mass) => {
    const fuel = Math.floor(mass / 3) - 2;
    return sum + fuel;
  }, 0);
}
Puzzle.prototype.parse = (lines) => {
  return lines.map((line) => parseInt(line)).filter((num) => num === num);
};
Puzzle.prototype.solve_p2 = (masses) => {
  return masses.reduce((sum, mass) => {
    let fuelSum = 0;
    let fuel = Math.floor(mass / 3) - 2;
    while (fuel >= 0) {
      fuelSum += fuel;
      fuel = Math.floor(fuel / 3) - 2;
    }
    return sum + fuelSum;
  }, 0);
}
module.exports = Puzzle;

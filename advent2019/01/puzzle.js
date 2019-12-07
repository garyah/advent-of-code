const solve = (masses) => {
  return masses.reduce((sum, mass) => {
    const fuel = Math.floor(mass / 3) - 2;
    return sum + fuel;
  }, 0);
}
const parse = (lines) => {
  return lines.map((line) => parseInt(line)).filter((num) => num === num);
};
const solve_p2 = (masses) => {
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
module.exports = {solve, parse, solve_p2};

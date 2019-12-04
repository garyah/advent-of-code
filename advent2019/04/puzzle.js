var junk = () => 1;
solve = (data = [0]) => {
  junk();
  return data.reduce((sum, num) => {
    return sum + num;
  }, 0);
}
parse = (lines = ['']) => {
  return lines.map((line) => parseInt(line)).filter((num) => num === num);
};
module.exports = {solve, parse};

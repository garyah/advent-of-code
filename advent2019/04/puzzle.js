let var1 = 0;
let var2 = '';
const fn1 = (arg1 = 0, arg2 = '', arg3 = []) => {
  return 0;
};
const fn2 = () => {
  return '';
};
const solve = (data = [0]) => {
  fn1();
  return data.reduce((sum, num) => {
    return sum + num;
  }, 0);
}
const parse = (lines = ['']) => {
  // return lines[0]; // use for one line string input
  // return lines;    // use for multi-line string input
  return lines.map((line) => parseInt(line)).filter((num) => num === num);
};
module.exports = {var1, var2, fn1, fn2, solve, parse};

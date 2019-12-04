let var1 = 0;
let var2 = '';
const fn1 = (arg1 = 0, arg2 = '', arg3 = []) => {
  return 0;
};
const fn2 = () => {
  return '';
};
const solve = (data = [1, 100]) => {
  //fn1();
  const low = data[0];
  const high = data[1];
  let count = 0;
  for (let password = low; password <= high; password++) {
    let foundDuplicate = false;
    let digitsDecreased = false;
    for (let idx = 0; idx < 5; idx++) {
      passwordString = password.toString();
      if (passwordString[idx] === passwordString[idx + 1]) {
        foundDuplicate = true;
      }
      if (passwordString[idx + 1] < passwordString[idx]) {
        digitsDecreased = true;
      }
    }
    if (foundDuplicate && !digitsDecreased) count++;
  }
  return count;
  // return data.reduce((numPasswords, num) => {
  //   if ()
  //   return numPasswords;
  // }, 0);
}
const parse = (lines = ['']) => {
  // return lines[0]; // use for one line string input
  // return lines;    // use for multi-line string input
  return lines.map((line) => parseInt(line)).filter((num) => num === num);
};
module.exports = {var1, var2, fn1, fn2, solve, parse};

const solve = (data = [1, 100]) => {
  const low = data[0];
  const high = data[1];
  let count = 0;
  for (let password = low; password <= high; password++) {
    let foundDuplicate = false;
    let digitsDecreased = false;
    for (let idx = 0; idx < 5; idx++) {
      passwordString = password.toString();
      let idx2 = idx + 1;
      for (;
        idx2 < 6 && passwordString[idx] === passwordString[idx2];
        idx2++) {
      }
      if (idx2 - idx > 1) {
        if (idx2 - idx === 2) {
          foundDuplicate = true;
          continue;
        }
        idx = idx2 - 2;
        continue;
      }
      if (passwordString[idx + 1] < passwordString[idx]) {
        digitsDecreased = true;
      }
    }
    if (foundDuplicate && !digitsDecreased) count++;
  }
  return count;
}
const parse = (lines = ['']) => {
  return lines.map((line) => parseInt(line)).filter((num) => num === num);
};
module.exports = {solve, parse};

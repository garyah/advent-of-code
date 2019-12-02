function Puzzle() {
}
Puzzle.prototype.solve = (program = []) => {
  for (let ip = 0; ip < program.length; ) {
    if (program[ip] === 99) break;
    if (program[ip] === 1) program[program[ip+3]] = program[program[ip+1]] + program[program[ip+2]];
    if (program[ip] === 2) program[program[ip+3]] = program[program[ip+1]] * program[program[ip+2]];
    console.log(program[ip]);
    ip += 4;
  }
  return program;
  // return data.reduce((sum, num) => {
  //   return sum + num;
  // }, 0);
}
Puzzle.prototype.parse = (lines = ['']) => {
  //return lines[0].split(',').parseInt();
  return lines[0].split(',').map((value) => parseInt(value)).filter((num) => num === num);
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

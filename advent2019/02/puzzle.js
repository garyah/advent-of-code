const transform = (program = []) => {
  for (let ip = 0; ip < program.length; ) {
    if (program[ip] === 99) break;
    if (program[ip] === 1) program[program[ip+3]] = program[program[ip+1]] + program[program[ip+2]];
    else if (program[ip] === 2) program[program[ip+3]] = program[program[ip+1]] * program[program[ip+2]];
    // console.log(program[ip]);
    ip += 4;
  }
  // console.log('transformed program: ' + program);
  return program;
}
const parse = (lines = ['']) => {
  return lines[0].split(',').map((value) => parseInt(value)).filter((num) => num === num);
};
const solve = (program = []) => {
  program[1] = 12;
  program[2] = 2;
  return transform(program)[0];
}
const solve_p2 = (program = []) => {
  // save
  let savedData = [];
  for (const code of program) savedData.push(code);
  //console.log(savedData.length, savedData[0]);
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      program[1] = noun;
      program[2] = verb;
      const possibleGood = transform(program)[0];
      //if (noun % 100 === 0 && verb % 10 === 0) console.log(possibleGood);
      if (possibleGood === 19690720) {
        console.log("found it!  noun = " + noun + " and verb = " + verb);
        return 100 * noun + verb;
      }
      // restore
      program = [];
      for (const code of savedData) program.push(code);
    }
  }
}
module.exports = {transform, parse, solve, solve_p2};

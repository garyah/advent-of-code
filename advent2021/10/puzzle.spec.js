describe("2021 day 10", function() {
  // code
  const initVars = () => {
    data = [''];
    errorScore = 0;
    incompleteScore = 0;
  };
  const calcErrorScore = () => {
    // console.log(...);
    let stack = [''];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] === '('
          || data[i][j] === '['
          || data[i][j] === '{'
          || data[i][j] === '<') {
            stack.push(data[i][j]);
        }
        if (data[i][j] === ')'
          || data[i][j] === ']'
          || data[i][j] === '}'
          || data[i][j] === '>') {
            let lastChar = stack.pop();
            if (lastChar === undefined) continue;
            if (data[i][j] === ')') {
              if (lastChar === '(') continue;
              errorScore += 3; continue;
            }
            if (data[i][j] === ']') {
              if (lastChar === '[') continue;
              errorScore += 57; continue;
            }
            if (data[i][j] === '}') {
              if (lastChar === '{') continue;
              errorScore += 1197; continue;
            }
            if (data[i][j] === '>') {
              if (lastChar === '<') continue;
              errorScore += 25137; continue;
            }
        }
        // break;
        // continue;
      }
    }
  };
  const removeCorrupt = () => {
    console.log('data.length before = ', data.length);
    let stack = [''];
    let escape = false;
    for (let i = 0; i < data.length; i++) {
      // if (escape) break;
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] === '('
          || data[i][j] === '['
          || data[i][j] === '{'
          || data[i][j] === '<') {
            stack.push(data[i][j]);
        }
        if (data[i][j] === ')'
          || data[i][j] === ']'
          || data[i][j] === '}'
          || data[i][j] === '>') {
            let lastChar = stack.pop();
            if (lastChar === undefined) continue;
            if (data[i][j] === ')') {
              if (lastChar === '(') continue;
              data.splice(i--, 1); escape = true; break;
            }
            if (data[i][j] === ']') {
              if (lastChar === '[') continue;
              data.splice(i--, 1); escape = true; break;
            }
            if (data[i][j] === '}') {
              if (lastChar === '{') continue;
              data.splice(i--, 1); escape = true; break;
            }
            if (data[i][j] === '>') {
              if (lastChar === '<') continue;
              data.splice(i--, 1); escape = true; break;
            }
        }
        // break;
        // continue;
      }
    }
    console.log('data.length after = ', data.length);
  };
  const scoreIncomplete = () => {
    console.log('data.length before = ', data.length);
    let scores = [0]; scores.pop();
    for (let i = 0; i < data.length; i++) {
      let stack = ['']; stack.pop();
      let j = 0;
      for (j = 0; j < data[i].length; j++) {
        if (data[i][j] === '('
          || data[i][j] === '['
          || data[i][j] === '{'
          || data[i][j] === '<') {
            stack.push(data[i][j]);
        }
        if (data[i][j] === ')'
          || data[i][j] === ']'
          || data[i][j] === '}'
          || data[i][j] === '>') {
            /*let lastChar = */stack.pop();
        }
      }
      // console.log(stack);
      // console.log(stack.length);
      let completion = ['']; completion.pop();
      let score = 0;
      let stackLength = stack.length;
      for (j = 0; j < stackLength; j++) {
        let lastChar = stack.pop();
        if (lastChar === '(') {
          completion.push(')');
          // console.log(completion.length);
          score = score * 5 + 1; continue;
        }
        if (lastChar === '[') {
          completion.push(']');
          // console.log(completion.length);
          score = score * 5 + 2; continue;
        }
        if (lastChar === '{') {
          completion.push('}');
          // console.log(completion.length);
          score = score * 5 + 3; continue;
        }
        if (lastChar === '<') {
          completion.push('>');
          // console.log(completion.length);
          score = score * 5 + 4; continue;
        }
      }
      scores.push(score);
      // console.log(completion);
      // console.log(completion.length);
    }
    console.log('scores = ', scores);
    let scoresSorted = scores.sort((a, b) => b - a);
    console.log('scoresSorted = ', scoresSorted);
    console.log('scoresSorted.length = ', scoresSorted.length);
    console.log('scoresSorted.length / 2 = ', parseInt(scoresSorted.length / 2));
    incompleteScore = scoresSorted[parseInt(scoresSorted.length / 2)];
    console.log('incompleteScore = ', incompleteScore);
  };
  let errorScore = 0;
  const solve = () => {
    calcErrorScore();
  }
  let incompleteScore = 0;
  const solve_p2 = () => {
    removeCorrupt();
    scoreIncomplete();
  }
  let data = [''];
  const parse = () => {
    data = lines;    // use for multi-line string input
  };















  // tests
  it("can solve puzzle with my input", () => {
    parse();
    solve();
    console.log("\npart 1 answer is " + errorScore);
    expect(errorScore).toEqual(387363);
  });
  it("can solve puzzle p2 with my input", () => {
    parse();
    solve_p2();
    console.log("\npart 2 answer is " + incompleteScore);
    expect(incompleteScore).toEqual(4330777059);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  // next line for testing puzzle.spec.js in common dir
  // const Parser = require('./parser');
  // const puzzle = require('../../common/puzzleWithCode');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  let linesSave = [];
  beforeAll((done) => {
    console.log("2021 day 10:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/10/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
  beforeEach((done) => {
    linesSave = lines;
    initVars();
    done();
  });
  afterEach((done) => {
    lines = linesSave;
    done();
  });
});

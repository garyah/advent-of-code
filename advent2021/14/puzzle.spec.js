describe("2021 day 14", function() {
  // code
  let var1 = 0;
  let var2 = '';
  let var3 = [];
  let var4 = {};
  let elemQuants = [0];
  const initVars = () => {
    template = '';
    pairRules = new Map();
    var1 = 0;
    var2 = '';
    var3 = [];
    var4 = {};
    elemQuants = [0];
    elemDelta = 0;
  };
  const doStep = () => {
    for (let i = 0; i < template.length - 1; i++) {
      const value = pairRules.get(template.substr(i, 2));
      if (value) {
        template = template.substr(0, i + 1) + value + template.substr(i + 1);
        i++;
      }
      else {
        console.log('.');
      }
    }
    console.log('after inserting, template.length = ', template.length);
  };
  const calcAnswer = () => {
    for (let n = 0; n < 26; n++) {
      elemQuants[n] = 0;
    }
    console.log('elemQuants.length = ', elemQuants.length);
    for (let i = 0; i < template.length; i++) {
      elemQuants[template.substr(i, 1).charCodeAt(0) - 'A'.charCodeAt(0)] += 1;
    }
    console.log('elemQuants = ', elemQuants);
    // let elemQuantsSorted = elemQuants.sort((a, b) => b - a);
    // console.log('elemQuantsSorted = ', elemQuantsSorted);
    let elemLeastCommon = 10000000;
    let elemMostCommon = -1;
    for (let m = 0; m < 26; m++) {
      if (elemQuants[m] > elemMostCommon) { elemMostCommon = elemQuants[m]; continue; }
      if (elemQuants[m] !== 0 && elemQuants[m] < elemLeastCommon) elemLeastCommon = elemQuants[m];
    }
    console.log('elemLeastCommon = ', elemLeastCommon);
    console.log('elemMostCommon = ', elemMostCommon);
    elemDelta = elemMostCommon - elemLeastCommon;
  };
  const fn3 = () => {
    // console.log(...);
    if (1) {}
    else if (1) {}
    else {}
    var2.split(' ').join(' ');
    for (let i = 0; i < var3.length; i++) { break; continue; }
    for (let j = 0;; j++) { break; continue; }
    for (const item of var3) { break; continue; }
    var3.map((num) => {
      return num;
    }).filter((num) => num === num);
    var3.reduce((sum, num) => {
      return sum + num;
    }, 0);
    return;
  };
  const fn4 = () => {
    // console.log(...);
    if (1) {}
    else if (1) {}
    else {}
    var2.split(' ').join(' ');
    for (let i = 0; i < var3.length; i++) { break; continue; }
    for (let j = 0;; j++) { break; continue; }
    for (const item of var3) { break; continue; }
    var3.map((num) => {
      return num;
    }).filter((num) => num === num);
    var3.reduce((sum, num) => {
      return sum + num;
    }, 0);
    return;
  };
  const fn5 = () => {
    // console.log(...);
    if (1) {}
    else if (1) {}
    else {}
    var2.split(' ').join(' ');
    for (let i = 0; i < var3.length; i++) { break; continue; }
    for (let j = 0;; j++) { break; continue; }
    for (const item of var3) { break; continue; }
    var3.map((num) => {
      return num;
    }).filter((num) => num === num);
    var3.reduce((sum, num) => {
      return sum + num;
    }, 0);
    return;
  };
  let elemDelta = 0;
  const solve = () => {
    console.log(pairRules.size);
    // console.log(pairRules);
    for (let i = 0; i < 10; i++) {
      doStep();
    }
    calcAnswer();
    console.log('elemDelta = ', elemDelta);
  }
  const solve_p2 = () => {
    console.log(pairRules.size);
    // console.log(pairRules);
    for (let i = 0; i < 12; i++) {
      doStep();
    }
    calcAnswer();
    console.log('elemDelta = ', elemDelta);
  }
  let template = '';
  let pairRules = new Map();
  const parse = () => {
    template = lines[0];
    let pairRuleStrings = [{}];
    pairRuleStrings = parser.linesToPairRules(lines);
    console.log(pairRuleStrings.length);
    for (let i = 0; i < pairRuleStrings.length; i++) {
      pairRules.set(pairRuleStrings[i].pair, pairRuleStrings[i].toInsert);
    }
  };















  // tests
  it("can solve puzzle with my input", () => {
    // parse();
    // solve();
    // console.log("\npart 1 answer is " + answer);
    // expect(answer).toEqual(1);
  });
  it("can solve puzzle p2 with my input", () => {
    parse();
    solve_p2();
    // console.log("\npart 2 answer is " + answer);
    // expect(answer).toEqual(2);
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
    console.log("2021 day 14:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/14/input.txt", (linesRead) => {
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

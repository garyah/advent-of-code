describe("2021 day 14", function() {
  // code
  let firstPair = '';
  let pairCounts = new Map();
  let elemQuants = [0];
  const initVars = () => {
    template = '';
    pairRules = new Map();

    firstPair = '';
    pairCounts = new Map();
    elemQuants = [0];

    elemDelta = 0;
  };
  const initCounts = () => {
    firstPair = template.substr(0, 2);
    for (let i = 0; i < template.length - 1; i++) {
      const key = template.substr(i, 2);
      const count = pairCounts.get(key);
      pairCounts.set(key, count + 1);
    }
  };
  const doStep = () => {
    console.log('on entry, pairCounts.size = ', pairCounts.size);
    // console.log('on entry, pairCounts = ', pairCounts);
    let sum = 0;
    for (const key of pairCounts.keys()) {
      sum += pairCounts.get(key);
    }
    console.log('on entry, number of pairs = ', sum, ', on entry, length of template string = ', sum + 1);
    let newPairCounts = new Map();
    firstPair = firstPair.substr(0, 1) + pairRules.get(firstPair);
    for (const key of pairCounts.keys()) {
      const insertChar = pairRules.get(key);
      const oldCount = pairCounts.get(key);
      if (oldCount > 0) {
        const newFirstPairKey = key.substr(0, 1) + insertChar;
        const newFirstPairCount = newPairCounts.get(newFirstPairKey);
        newPairCounts.set(newFirstPairKey, (newFirstPairCount ? newFirstPairCount : 0) + oldCount);

        const newSecondPairKey = insertChar + key.substr(1);
        const newSecondPairCount = newPairCounts.get(newSecondPairKey);
        newPairCounts.set(newSecondPairKey, (newSecondPairCount ? newSecondPairCount : 0) + oldCount);
      }
    }
    // console.log('after transfer of counts, newPairCounts.size = ', newPairCounts.size);
    // console.log('after transfer of counts, newPairCounts = ', newPairCounts);

    // original crude algorithm, which blew up the space needed to store the string
    // for (let i = 0; i < template.length - 1; i++) {
    //   const value = pairRules.get(template.substr(i, 2));
    //   if (value) {
    //     template = template.substr(0, i + 1) + value + template.substr(i + 1);
    //     i++;
    //   }
    //   else {
    //     console.log('.');
    //   }
    // }
    // console.log('after inserting, template.length = ', template.length);

    pairCounts = newPairCounts;
    // console.log('after assign of counts, newPairCounts.size = ', newPairCounts.size);
    // console.log('after assign of counts, pairCounts.size = ', pairCounts.size);
    sum = 0;
    for (const key of pairCounts.keys()) {
      sum += pairCounts.get(key);
    }
    console.log('after transfer of counts, number of pairs = ', sum);
    console.log('after transfer of counts, length of template string = ', sum + 1);
  };
  const calcAnswer = () => {
    for (let n = 0; n < 26; n++) {
      elemQuants[n] = 0;
    }
    // console.log('elemQuants.length = ', elemQuants.length);

    for (const key of pairCounts.keys()) {
      const count = pairCounts.get(key);
      const firstChar = key.substr(0, 1);
      const secondChar = key.substr(1);

      elemQuants[secondChar.charCodeAt(0) - 'A'.charCodeAt(0)] += count;

      if (key === firstPair) {
        elemQuants[firstChar.charCodeAt(0) - 'A'.charCodeAt(0)] += 1;
      }
    }
    console.log('pairCounts = ', pairCounts);

    // original crude algorithm, which blew up the space needed to store the string
    // for (let i = 0; i < template.length; i++) {
    //   elemQuants[template.substr(i, 1).charCodeAt(0) - 'A'.charCodeAt(0)] += 1;
    // }
    console.log('elemQuants = ', elemQuants);

    let elemLeastCommon = 10000000000000;
    let elemMostCommon = -1;
    for (let m = 0; m < 26; m++) {
      if (elemQuants[m] > elemMostCommon) { elemMostCommon = elemQuants[m]; continue; }
      if (elemQuants[m] !== 0 && elemQuants[m] < elemLeastCommon) elemLeastCommon = elemQuants[m];
    }
    console.log('elemLeastCommon = ', elemLeastCommon);
    console.log('elemMostCommon = ', elemMostCommon);
    elemDelta = elemMostCommon - elemLeastCommon;
  };
  let elemDelta = 0;
  const solve = () => {
    // console.log(pairRules.size);
    // console.log(pairRules);
    initCounts();
    for (let i = 0; i < 10; i++) {
      doStep();
    }
    calcAnswer();
    // console.log('elemDelta = ', elemDelta);
  }
  const solve_p2 = () => {
    // console.log(pairRules.size);
    // console.log(pairRules);
    initCounts();
    for (let i = 0; i < 40; i++) {
      doStep();
    }
    calcAnswer();
    // console.log('elemDelta = ', elemDelta);
  }
  let template = '';
  let pairRules = new Map();
  const parse = () => {
    template = lines[0];
    let pairRuleStrings = [{}];
    pairRuleStrings = parser.linesToPairRules(lines);
    // console.log(pairRuleStrings.length);
    for (let i = 0; i < pairRuleStrings.length; i++) {
      pairRules.set(pairRuleStrings[i].pair, pairRuleStrings[i].toInsert);
      pairCounts.set(pairRuleStrings[i].pair, 0);
    }
  };















  // tests
  it("can solve puzzle with my input", () => {
    parse();
    solve();
    console.log("\npart 1 answer is " + elemDelta);
    expect(elemDelta).toEqual(2891);
  });
  it("can solve puzzle p2 with my input", () => {
    parse();
    solve_p2();
    console.log("\npart 2 answer is " + elemDelta);
    expect(elemDelta).toEqual(4607749009683);
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

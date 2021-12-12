describe("2021 day 12", function() {
  // code
  let graph = new Map();
  let state = new Map();
  let paths = new Map();
  let is_p2 = false;
  let isOneSmallRepeated = false;
  const initVars = () => {
    caveMap = [['']];

    graph = new Map();
    state = new Map();
    paths = new Map();
    is_p2 = false;
    isOneSmallRepeated = false;

    numPaths = 0;
  };
  const buildGraph = () => {
    console.log('caveMap.length = ', caveMap.length);
    // console.log('graph.size = ', graph.size);
    // console.log('state.size = ', state.size);

    // init graph and state
    for (let i = 0; i < caveMap.length; i++) {
      let value = [''];

      // forward direction
      value = graph.get(caveMap[i][0]);
      if (!value) value = [];
      value.push(caveMap[i][1]);
      graph.set(caveMap[i][0], value);
      state.set(caveMap[i][0], is_p2 ? 0 : false);

      // reverse direction
      value = graph.get(caveMap[i][1]);
      if (!value) value = [];
      value.push(caveMap[i][0]);
      graph.set(caveMap[i][1], value);
      state.set(caveMap[i][1], is_p2 ? 0 : false);
    }
    isOneSmallRepeated = false;
    console.log('graph.size = ', graph.size);
    console.log('state.size = ', state.size);
    // console.log('graph.keys = ', graph.keys());
    // console.log('graph.values = ', graph.values());
    console.log('graph = ', graph);
    console.log('state = ', state);
  };
  const traverseGraph = () => {
    paths = new Map();
    walkGraph('start', '');
    // console.log('paths.size = ', paths.size);
    // console.log('paths = ', paths);
    numPaths = paths.size;
  };
  const walkGraph = (startNode = '', path = '') => {
    if (startNode === 'start') {
        // check for already traversed, start node revisited
        if (state.get(startNode)) return '<<>>';
    }
    if (startNode.substr(0, 1) >= 'a' && startNode.substr(0, 1) <= 'z') {
        // check for already traversed, little cave revisited
        if (!is_p2 && state.get(startNode)) return '<<>>';
        if (state.get(startNode) >= 1 && isOneSmallRepeated) return '<<>>';
        if (state.get(startNode) === 1 && !isOneSmallRepeated) {
          isOneSmallRepeated = true;
        }
    }
    path = path + ',' + startNode;
    if (startNode === 'end') {
      // reached end node

      // add to paths map
      let numTimes = 0;
      numTimes = paths.get(path);
      if (!numTimes) numTimes = 0;
      numTimes += 1;
      paths.set(path, numTimes);
      // console.log(path);
      // console.log('*');

      return path;
    }
    state.set(startNode, is_p2 ? state.get(startNode) + 1 : true);
    const nextNodes = graph.get(startNode);
    for (const node of nextNodes) {
      walkGraph(node, path);
    }
    if (startNode.substr(0, 1) >= 'a' && startNode.substr(0, 1) <= 'z') {
      if (state.get(startNode) >= 2 && isOneSmallRepeated) {
        isOneSmallRepeated = false;
      }
    }
    state.set(startNode, is_p2 ? state.get(startNode) - 1 : false);
    return;
  };
  let numPaths = 0;
  const solve = () => {
    buildGraph();
    traverseGraph();
  }
  const solve_p2 = () => {
    is_p2 = true;
    buildGraph();
    traverseGraph();
  }
  let caveMap = [['']];
  const parse = () => {
    caveMap = parser.linesToHyphenatedWords(lines);
  };















  // tests
  it("can solve puzzle with my input", () => {
    parse();
    solve();
    console.log("\npart 1 answer is " + numPaths);
    expect(numPaths).toEqual(5104);
  });
  it("can solve puzzle p2 with my input", () => {
    parse();
    solve_p2();
    console.log("\npart 2 answer is " + numPaths);
    expect(numPaths).toEqual(149220);
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
    console.log("2021 day 12:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2021/12/input.txt", (linesRead) => {
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

describe("", function() {
  // 2019 day 6 tests (orbital map, DFS search)
  describe("2019 day 6", function() {
    it('buildForest() can build empty forest', () => {
      puzzle.buildForest();
      expect(puzzle.getForest()).toEqual(
        []
        );
    });
    it('buildForest() can build forest with single pair of nodes', () => {
      puzzle.buildForest([['TT5', 'Y6Q']]);
      expect(puzzle.getForest().length).toEqual(1);
      expect(puzzle.getForest()[0].root.name).toEqual('TT5');
      expect(puzzle.getForest()[0].root.parent).toBeFalsy();
      expect(puzzle.getForest()[0].root.children.length).toEqual(1);
      expect(puzzle.getForest()[0].root.children[0].name).toEqual('Y6Q');
      expect(puzzle.getForest()[0].root.children[0].parent.name).toEqual('TT5');
      expect(puzzle.getForest()[0].root.children[0].children).toBeFalsy();
    });
    it('buildForest() can build forest with multiple pairs of nodes, no overlap', () => {
      puzzle.buildForest([['TT5', 'Y6Q'], ['ZBC', 'Z2R']]);
      expect(puzzle.getForest().length).toEqual(2);
      expect(puzzle.getForest()[1].root.name).toEqual('ZBC');
      expect(puzzle.getForest()[1].root.children.length).toEqual(1);
      expect(puzzle.getForest()[1].root.children[0].name).toEqual('Z2R');
      expect(puzzle.getForest()[1].root.children[0].parent.name).toEqual('ZBC');
      expect(puzzle.getForest()[1].root.children[0].children).toBeFalsy();
    });
    it('buildForest() can build forest with two pairs of nodes, same parent', () => {
      puzzle.buildForest([['TT5', 'Y6Q'], ['TT5', 'Z2R']]);
      expect(puzzle.getForest().length).toEqual(1);
      expect(puzzle.getForest()[0].root.name).toEqual('TT5');
      expect(puzzle.getForest()[0].root.children.length).toEqual(2);
      expect(puzzle.getForest()[0].root.children[0].name).toEqual('Y6Q');
      expect(puzzle.getForest()[0].root.children[0].parent.name).toEqual('TT5');
      expect(puzzle.getForest()[0].root.children[1].name).toEqual('Z2R');
      expect(puzzle.getForest()[0].root.children[1].parent.name).toEqual('TT5');
    });
    it('addNodePairToForest() adds pair of nodes to empty forest', () => {
      puzzle.setForest([]);
      puzzle.addNodePairToForest('TT5', 'Y6Q');
      expect(puzzle.getForest().length).toEqual(1);
      expect(puzzle.getForest()[0].root.name).toEqual('TT5');
      expect(puzzle.getForest()[0].root.parent).toBeFalsy();
      expect(puzzle.getForest()[0].root.children.length).toEqual(1);
      expect(puzzle.getForest()[0].root.children[0].name).toEqual('Y6Q');
      expect(puzzle.getForest()[0].root.children[0].parent.name).toEqual('TT5');
      expect(puzzle.getForest()[0].root.children[0].children).toBeFalsy();
    });
    it('addNodePairToForest() adds pair of nodes to forest with neither node', () => {
      puzzle.setForest([{ root: { name: 'foo' }}]);
      puzzle.addNodePairToForest('TT5', 'Y6Q');
      expect(puzzle.getForest().length).toEqual(2);
      expect(puzzle.getForest()[1].root.name).toEqual('TT5');
      expect(puzzle.getForest()[1].root.parent).toBeFalsy();
      expect(puzzle.getForest()[1].root.children.length).toEqual(1);
      expect(puzzle.getForest()[1].root.children[0].name).toEqual('Y6Q');
      expect(puzzle.getForest()[1].root.children[0].parent.name).toEqual('TT5');
      expect(puzzle.getForest()[1].root.children[0].children).toBeFalsy();
    });
    it('addNodePairToForest() does not add or connect already seen child from pair of nodes to or in forest, if child already parented', () => {
      puzzle.setIsSkipErrorLog(true);
      let parent = { name: 'TT5' };
      puzzle.addChildToNode(parent, 'Y6Q');
      puzzle.setForest([{ root: { name: 'bar' }}, { root: parent }]);
      puzzle.addNodePairToForest('foo', 'Y6Q');
      expect(puzzle.getForest().length).toEqual(2);
      expect(puzzle.getForest()[1].root.name).toEqual('TT5');
      expect(puzzle.getForest()[1].root.parent).toBeFalsy();
      expect(puzzle.getForest()[1].root.children.length).toEqual(1);
      expect(puzzle.getForest()[1].root.children[0].name).toEqual('Y6Q');
      expect(puzzle.getForest()[1].root.children[0].parent.name).toEqual('TT5');
      expect(puzzle.getForest()[1].root.children[0].children).toBeFalsy();
    });
    it('addNodePairToForest() adds child from pair of nodes to forest with parent node existing', () => {
      let parent = { name: 'TT5' };
      puzzle.addChildToNode(parent, 'foo');
      puzzle.setForest([{ root: { name: 'bar' }}, { root: parent }]);
      puzzle.addNodePairToForest('TT5', 'Y6Q');
      expect(puzzle.getForest().length).toEqual(2);
      expect(puzzle.getForest()[1].root.name).toEqual('TT5');
      expect(puzzle.getForest()[1].root.parent).toBeFalsy();
      expect(puzzle.getForest()[1].root.children.length).toEqual(2);
      expect(puzzle.getForest()[1].root.children[1].name).toEqual('Y6Q');
      expect(puzzle.getForest()[1].root.children[1].parent.name).toEqual('TT5');
      expect(puzzle.getForest()[1].root.children[1].children).toBeFalsy();
    });
    it('addNodePairToForest() adds parent from pair of nodes to forest with child node existing', () => {
      let parent = { name: 'Y6Q' };
      puzzle.addChildToNode(parent, 'foo');
      puzzle.setForest([{ root: { name: 'bar' }}, { root: parent }]);
      puzzle.addNodePairToForest('TT5', 'Y6Q');
      expect(puzzle.getForest().length).toEqual(2);
      expect(puzzle.getForest()[1].root.name).toEqual('TT5');
      expect(puzzle.getForest()[1].root.parent).toBeFalsy();
      expect(puzzle.getForest()[1].root.children.length).toEqual(1);
      expect(puzzle.getForest()[1].root.children[0].name).toEqual('Y6Q');
      expect(puzzle.getForest()[1].root.children[0].parent.name).toEqual('TT5');
      expect(puzzle.getForest()[1].root.children[0].children.length).toEqual(1);
      expect(puzzle.getForest()[1].root.children[0].children[0].name).toEqual('foo');
    });
    it('addNodePairToForest() connects parent to child in pair of nodes, merging trees, if both nodes existing', () => {
      puzzle.setIsSkipErrorLog(true);
      let parent = { name: 'TT5' };
      puzzle.addChildToNode(parent, 'Y6Q');
      puzzle.setForest([{ root: { name: 'bar' }}, { root: parent }]);
      puzzle.addNodePairToForest('bar', 'TT5');
      expect(puzzle.getForest().length).toEqual(1);
      expect(puzzle.getForest()[0].root.children).toBeTruthy();
      expect(puzzle.getForest()[0].root.children.length).toEqual(1);
      expect(puzzle.getForest()[0].root.children[0].name).toEqual('TT5');
      expect(puzzle.getForest()[0].root.children[0].parent.name).toEqual('bar');
      expect(puzzle.getForest()[0].root.children[0].children).toBeTruthy();
      expect(puzzle.getForest()[0].root.children[0].children.length).toBeTruthy();
      expect(puzzle.getForest()[0].root.children[0].children[0].name).toEqual('Y6Q');
      expect(puzzle.getForest()[0].root.children[0].children[0].parent.name).toEqual('TT5');
    });
    it('getNode() does not return a node if forest empty', () => {
      puzzle.setForest([]);
      expect(puzzle.getNode()).toBeFalsy();
    });
    it('getNode() does not return a node if forest does not have it', () => {
      puzzle.setForest([{}]);
      expect(puzzle.getNode()).toBeFalsy();
      puzzle.setForest([{ root: { name: 'foo' }}]);
      expect(puzzle.getNode('bar')).toBeFalsy();
    });
    it('getNode() does return a node if forest has it as root of first tree', () => {
      puzzle.setForest([{ root: { name: 'foo' }}]);
      expect(puzzle.getNode('foo')).toEqual(puzzle.getForest()[0].root);
    });
    it('getNode() does return a node if forest has it as root of not first tree', () => {
      const node1 = {};
      puzzle.setForest([{ root: { name: 'bar' }}, { root: { name: 'foo' }}]);
      expect(puzzle.getNode('foo')).toEqual(puzzle.getForest()[1].root);
    });
    it('getNode() does return a node if forest has it as non-root node of any tree', () => {
      let parent = { name: 'bar' };
      puzzle.addChildToNode(parent, 'foo');
      puzzle.setForest([{ root: { name: 'bar' }}, { root: parent }]);
      expect(puzzle.getNode('foo')).toEqual(puzzle.getForest()[1].root.children[0]);
    });
    it('addChildToNode() adds child (as new node) to node', () => {
      let node = {
        name: 'TT5',
      }
      puzzle.addChildToNode(node, 'Y6Q');
      expect(node).toEqual(
        {
          name: 'TT5',
          children: [{
            name: 'Y6Q',
            parent: node,
          }],
        }
        );
    });
    it('setNodeParent() sets parent (as new node) for node', () => {
      let node = {
        name: 'Y6Q',
      }
      puzzle.setNodeParent(node, 'TT5');
      expect(node.parent).toEqual(
        {
          name: 'TT5',
          children: [{
            name: 'Y6Q',
            parent: node.parent,
          }],
        }
        );
    });
    it("can count direct and indirect orbits", () => {
      puzzle.clearCounters();
      puzzle.setIsDebug(false);
      const data = [
        ['COM', 'B'],
        ['B','C'],
        ['C', 'D'],
        ['D', 'E'],
        ['E', 'F'],
        ['B', 'G'],
        ['G', 'H'],
        ['D', 'I'],
        ['E', 'J'],
        ['J', 'K'],
        ['K', 'L']
      ];
      puzzle.buildForest(data);
      puzzle.logDebugInfo();
      expect(puzzle.countOrbits()).toEqual(42);
    });
    it("can count minimum orbital transfers", () => {
      puzzle.clearCounters();
      puzzle.setIsDebug(false);
      const data = [
        ['COM', 'B'],
        ['B','C'],
        ['C', 'D'],
        ['D', 'E'],
        ['E', 'F'],
        ['B', 'G'],
        ['G', 'H'],
        ['D', 'I'],
        ['E', 'J'],
        ['J', 'K'],
        ['K', 'L'],
        ['K', 'YOU'],
        ['I', 'SAN'],
      ];
      puzzle.buildForest(data);
      puzzle.logDebugInfo();
      expect(puzzle.countOrbits()).toEqual(54);
      expect(puzzle.countMinTransfers()).toEqual(4);
    });
    it("can parse input", () => {
      const data = puzzle.parse(
        'TT5)Y6Q ZBC)Z2R 8MQ)51V'
        .split(
          ' '
          ));
      expect(data).toEqual([['TT5', 'Y6Q'], ['ZBC', 'Z2R'], ['8MQ', '51V']]);
    });
    it("my input is valid", () => {
      puzzle.clearCounters();
      puzzle.setIsDebug(false);
      const data = puzzle.parse(lines);
      puzzle.buildForest(data);
      puzzle.logDebugInfo();
    });
    it("can solve puzzle with my input", () => {
      const data = puzzle.parse(lines);
      const answer = puzzle.solve(data);
      console.log("part 1 answer is " + answer);
      expect(answer).toEqual(268504);
    });
    it("can solve puzzle part 2 with my input", () => {
      const data = puzzle.parse(lines);
      const answer = puzzle.solve_p2(data);
      console.log("part 2 answer is " + answer);
      expect(answer).toEqual(409);
    });
  });












  // boilerplate
  const Parser = require('../../common/parser');
  const parser = new Parser();
  const puzzle = require('./puzzle');
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 6:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/06/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

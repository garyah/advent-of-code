describe("2019 day 6", function() {
  // new code
  let var1 = 0;
  let var2 = '';
  let isTest = false;
  let forest = [{}];
  let numNodesCreated = 0;
  let numTimesTwoNodesCreated = 0;
  let numTimesOneNodeCreated = 0;
  let numTimesZeroNodesCreated = 0;
  let numNodePairs = 0;
  const countMinTransfers = () => {
    if (!forest || forest.length !== 1) return -1;
    if (!forest[0] || !(forest[0].root)) return -1;
    const youNode = getNode('YOU');
    const santaNode = getNode('SAN');
    if (!youNode || !(youNode.parent)
        || !santaNode || !(santaNode.parent)) return -1;
    let youPath = [], santaPath = [];
    for (let node = youNode.parent; node; node = node.parent) {
      youPath.push(node);
    }
    for (let node = santaNode.parent; node; node = node.parent) {
      santaPath.push(node);
    }
    console.log('YOU path length is: ', youPath.length);
    console.log('SAN path length is: ', santaPath.length);
    console.log('maximum number of transfers to get from YOU to SAN: ',
                youPath.length + santaPath.length);
    for (let node = santaNode.parent; node; node = node.parent) {
      const foundIndex = youPath.indexOf(node);
      if (foundIndex !== -1) {
        const santaIndex = santaPath.indexOf(node);
        console.log('Found intersection at YOU path index of: ', foundIndex);
        console.log('Found intersection at SAN path index of: ', santaIndex);
        console.log('minimum number of transfers to get from YOU to SAN: ',
                    foundIndex + santaIndex);
        return foundIndex + santaIndex;
      }
    }
    return -1;
  };
  const countOrbits = () => {
    if (!forest || forest.length !== 1) return 0;
    if (!forest[0] || !(forest[0].root)) return 0;
    return countOrbit(forest[0].root, -1);
  };
  const countOrbit = (node = {}, count = 0) => {
    // console.log(node.name);
    count++;
    if (!node.children) return count;
    const savedCount = count;
    for (const childNode of node.children) {
      count += countOrbit(childNode, savedCount);
    }
    return count;
  };
  const buildForest = (nodePairs = [['', '']]) => {
    forest = [];
    for (const nodePair of nodePairs) {
      addNodePairToForest(nodePair[0], nodePair[1]);
    }
  };
  const addNodePairToForest = (parentName = '', childName = '') => {
    if (!parentName || !childName) return;
    numNodePairs++;
    const parentNodeFound = getNode(parentName);
    const childNodeFound = getNode(childName);
    if (!parentNodeFound && !childNodeFound) {
      const tree = {
        root: {
          name: parentName,
        }
      };
      numNodesCreated++;
      addChildToNode(tree.root, childName);
      numTimesTwoNodesCreated++;
      if (!forest) forest = [];
      forest.push(tree);
      return;
    }
    if (childNodeFound && childNodeFound.parent) {
      if (!isTest) console.log("ERROR!  child node found, won't add pair!");
      return;
    }
    if (parentNodeFound && !childNodeFound) {
      addChildToNode(parentNodeFound, childName);
      numTimesOneNodeCreated++;
      return;
    }
    if (!parentNodeFound && childNodeFound) {
      setNodeParent(childNodeFound, parentName);
      forest.find((tree) => (tree.root === childNodeFound)).root = childNodeFound.parent;
      numTimesOneNodeCreated++;
      return;
    }
    // reparent when both nodes found (parentNodeFound && childNodeFound)
    addChildNode(parentNodeFound, childNodeFound);
    numTimesZeroNodesCreated++;
    // merge trees after reparenting
    forest = forest.filter((tree) => (tree.root !== childNodeFound));
    // if () {
    //   ;
    // }
    // if (1) {}
    // else if (1) {}
    // else {}
    // for (let i = 0;; i++) { break; continue; }
    // for (const item of node) {}
    // return 0;
  };
  const getNode = (name = '') => {
    if (!forest || !forest.length) return undefined;
    for (const tree of forest) {
      if (!tree.root) continue;
      const foundNode = walkNodes(tree.root, name);
      if (foundNode) return foundNode;
    }
    return undefined;
  };
  const walkNodes = (node = {}, name = '') => {
    // console.log(node.name, name);
    if (node.name === name) return node;
    if (!node.children) return undefined;
    for (const childNode of node.children) {
      const foundNode = walkNodes(childNode, name);
      if (foundNode) return foundNode;
    }
    return undefined;
  };
  const addChildToNode = (node = {}, childName = '') => {
    const childNode = {
      name: childName,
    }
    numNodesCreated++;
    addChildNode(node, childNode);
  };
  const setNodeParent = (node = {}, parentName = '') => {
    const parentNode = {
      name: parentName,
    }
    numNodesCreated++;
    addChildNode(parentNode, node);
  };
  const addChildNode = (parentNode = {}, childNode = {}) => {
    childNode.parent = parentNode;
    if (!parentNode.children) parentNode.children = [];
    parentNode.children.push(childNode);
  };
  const fn2 = () => {
    return '';
  };
  const fn1 = (arg1 = 0, arg2 = '', arg3 = []) => {
    if (1) {}
    else if (1) {}
    else {}
    for (let i = 0;; i++) { break; continue; }
    for (const item of arg3) {}
    return 0;
  };
  const solve = (data = [['', '']]) => {
    buildForest(data);
    return countOrbits();
  }
  const solve_p2 = (data = [['', '']]) => {
    buildForest(data);
    return countMinTransfers();
  }
  const parse = (lines = ['']) => {
    // return lines[0]; // use for one line string input
    // return lines;    // use for multi-line string input
    return lines.map((line) => [line.substr(0,3), line.substr(4)]).filter(([first, second]) => first !== '' && second !== '');
  };
  // 2019 day 5 code (extended intcode computer, based on day 2)
  let input = 0;
  let output = 0;
  const transform = (program = []) => {
    for (let ip = 0; ip < program.length; ) {
      if (program[ip] === 99) break;
      let step = 4;
      const mode_p1 = Math.floor(program[ip] / 100) % 10;
      const mode_p2 = Math.floor(program[ip] / 1000) % 10;
      const opcode = program[ip] % 100;
      if (opcode === 1) {
        program[program[ip+3]]
          = (mode_p1 ? program[ip+1] : program[program[ip+1]])
            + (mode_p2 ? program[ip+2] : program[program[ip+2]]);
      } else if (opcode === 2) {
        program[program[ip+3]]
          = (mode_p1 ? program[ip+1] : program[program[ip+1]])
            * (mode_p2 ? program[ip+2] : program[program[ip+2]]);
      } else if (opcode === 3) {
        program[program[ip+1]] = input;
        step = 2;
      } else if (opcode === 4) {
        output = mode_p1 ? program[ip+1] : program[program[ip+1]];
        // console.log(output);
        step = 2;
      } else if (opcode === 5) { // jump-if-true
        step = 3;
        if (mode_p1 ? program[ip+1] : program[program[ip+1]] !== 0) {
          ip = (mode_p2 ? program[ip+2] : program[program[ip+2]]);
          step = 0;
        }
      } else if (opcode === 6) { // jump-if-false
        step = 3;
        if ((mode_p1 ? program[ip+1] : program[program[ip+1]]) === 0) {
          ip = (mode_p2 ? program[ip+2] : program[program[ip+2]]);
          step = 0;
        }
      } else if (opcode === 7) { // less than
        if ((mode_p1 ? program[ip+1] : program[program[ip+1]])
            < (mode_p2 ? program[ip+2] : program[program[ip+2]])) {
          program[program[ip+3]] = 1;
        } else {
          program[program[ip+3]] = 0;
        }
      } else if (opcode === 8) { // equals
        if ((mode_p1 ? program[ip+1] : program[program[ip+1]])
            === (mode_p2 ? program[ip+2] : program[program[ip+2]])) {
          program[program[ip+3]] = 1;
        } else {
          program[program[ip+3]] = 0;
        }
      }
      // console.log(program[ip]);
      ip += step;
    }
    // console.log('transformed program: ' + program);
    return program;
  };
  const solve_19_05 = (program = []) => {
    input = 1;
    transform(program);
    return output;
  }
  const solve_19_05_p2 = (program = []) => {
    input = 5;
    transform(program);
    return output;
  }
  const parse_19_05 = (lines = ['']) => {
    return lines[0].split(',').map((value) => parseInt(value)).filter((num) => num === num);
  };
  // 2019 day 3 code (intersection of wires in a 2D grid)
  function isPositionSeen_p2(
    seenPositions = new Map([[0, new Map([[0, 0]])]]),
    position = {x: 0, y: 0, steps: 0},
    canUpdate = true) {
  if (seenPositions.has(position.x) && seenPositions.get(position.x).has(position.y)) return true;
  if (canUpdate) {
    if (!seenPositions.has(position.x)) seenPositions.set(position.x, new Map());
    seenPositions.get(position.x).set(position.y, position.steps);
  }
  return false;
  }
  function updatePositions_p2(
      wire = 0,
      seenPositions = new Map([[0, new Map([[0, 0]])]]),
      bestIntersected = {x: 0, y: 0, steps: 0},
      position = {x: 0, y: 0, steps: 0}) {
    if (wire === 0) {
      isPositionSeen_p2(seenPositions, position, true); // just to update seen positions
      return;
    }
    if (isPositionSeen_p2(seenPositions, position, false)) { // not updating seen positions here
      const currentSteps = position.steps + seenPositions.get(position.x).get(position.y);
      //console.log('got intersection, position = ', position, ' steps from other wire = ', currentSteps - position.steps);
      const previousSteps = bestIntersected.steps;
      if (previousSteps === 0 || currentSteps < previousSteps) {
        bestIntersected.x = position.x;
        bestIntersected.y = position.y;
        bestIntersected.steps = currentSteps;
        //console.log('updated bestIntersected = ', bestIntersected);
      }
    }
  }
  const solve_19_03_p2 = (data = ['', '']) => {
    let seenPositions = new Map([[0, new Map([[0, 0]])]]);
    let bestIntersected = {x: 0, y: 0, steps: 0};
    let position = {x: 0, y: 0, steps: 0};
    //console.log('bestIntersected = ', bestIntersected);
    for (let wire = 0; wire < 2; wire++) {
      position.x = 0;
      position.y = 0;
      position.steps = 1;
      data[wire].split(',').reduce((heading, move) => {
        if (move[0] === 'U') heading = 0;
        else if (move[0] === 'R') heading = 90;
        else if (move[0] === 'D') heading = 180;
        else if (move[0] === 'L') heading = 270;
        let x = 0, y = 0;
        switch (heading) {
          case 0:
          default:
            for (y = position.y + 1; y <= position.y + parseInt(move.substr(1)); ++y, ++(position.steps))
              updatePositions_p2(wire, seenPositions, bestIntersected, {x: position.x, y: y, steps: position.steps});
            position.y = y - 1;
            //console.log('position = ', position);
            break;
          case 90:
            for (x = position.x + 1; x <= position.x + parseInt(move.substr(1)); ++x, ++(position.steps))
              updatePositions_p2(wire, seenPositions, bestIntersected, {x: x, y: position.y, steps: position.steps});
            position.x = x - 1;
            //console.log('position = ', position);
            break;
          case 180:
            for (y = position.y - 1; y >= position.y - parseInt(move.substr(1)); --y, ++(position.steps))
              updatePositions_p2(wire, seenPositions, bestIntersected, {x: position.x, y: y, steps: position.steps});
            position.y = y + 1;
            //console.log('position = ', position);
            break;
          case 270:
            for (x = position.x - 1; x >= position.x - parseInt(move.substr(1)); --x, ++(position.steps))
              updatePositions_p2(wire, seenPositions, bestIntersected, {x: x, y: position.y, steps: position.steps});
            position.x = x + 1;
            //console.log('position = ', position);
            break;
        }
        return heading;
      }, 0);
    }
    //console.log('bestIntersected = ', bestIntersected);
    return bestIntersected.steps;
  }















  // new tests
  it('buildForest() can build empty forest', () => {
    buildForest();
    expect(forest).toEqual(
      []
      );
  });
  it('buildForest() can build forest with single pair of nodes', () => {
    buildForest([['TT5', 'Y6Q']]);
    expect(forest.length).toEqual(1);
    expect(forest[0].root.name).toEqual('TT5');
    expect(forest[0].root.parent).toBeFalsy();
    expect(forest[0].root.children.length).toEqual(1);
    expect(forest[0].root.children[0].name).toEqual('Y6Q');
    expect(forest[0].root.children[0].parent.name).toEqual('TT5');
    expect(forest[0].root.children[0].children).toBeFalsy();
  });
  it('buildForest() can build forest with multiple pairs of nodes, no overlap', () => {
    buildForest([['TT5', 'Y6Q'], ['ZBC', 'Z2R']]);
    expect(forest.length).toEqual(2);
    expect(forest[1].root.name).toEqual('ZBC');
    expect(forest[1].root.children.length).toEqual(1);
    expect(forest[1].root.children[0].name).toEqual('Z2R');
    expect(forest[1].root.children[0].parent.name).toEqual('ZBC');
    expect(forest[1].root.children[0].children).toBeFalsy();
  });
  it('buildForest() can build forest with two pairs of nodes, same parent', () => {
    buildForest([['TT5', 'Y6Q'], ['TT5', 'Z2R']]);
    expect(forest.length).toEqual(1);
    expect(forest[0].root.name).toEqual('TT5');
    expect(forest[0].root.children.length).toEqual(2);
    expect(forest[0].root.children[0].name).toEqual('Y6Q');
    expect(forest[0].root.children[0].parent.name).toEqual('TT5');
    expect(forest[0].root.children[1].name).toEqual('Z2R');
    expect(forest[0].root.children[1].parent.name).toEqual('TT5');
  });
  it('addNodePairToForest() adds pair of nodes to empty forest', () => {
    forest = [];
    addNodePairToForest('TT5', 'Y6Q');
    expect(forest.length).toEqual(1);
    expect(forest[0].root.name).toEqual('TT5');
    expect(forest[0].root.parent).toBeFalsy();
    expect(forest[0].root.children.length).toEqual(1);
    expect(forest[0].root.children[0].name).toEqual('Y6Q');
    expect(forest[0].root.children[0].parent.name).toEqual('TT5');
    expect(forest[0].root.children[0].children).toBeFalsy();
  });
  it('addNodePairToForest() adds pair of nodes to forest with neither node', () => {
    forest = [{ root: { name: 'foo' }}];
    addNodePairToForest('TT5', 'Y6Q');
    expect(forest.length).toEqual(2);
    expect(forest[1].root.name).toEqual('TT5');
    expect(forest[1].root.parent).toBeFalsy();
    expect(forest[1].root.children.length).toEqual(1);
    expect(forest[1].root.children[0].name).toEqual('Y6Q');
    expect(forest[1].root.children[0].parent.name).toEqual('TT5');
    expect(forest[1].root.children[0].children).toBeFalsy();
  });
  it('addNodePairToForest() does not add or connect already seen child from pair of nodes to or in forest, if child already parented', () => {
    isTest = true;
    let parent = { name: 'TT5' };
    addChildToNode(parent, 'Y6Q');
    forest = [{ root: { name: 'bar' }}, { root: parent }];
    addNodePairToForest('foo', 'Y6Q');
    expect(forest.length).toEqual(2);
    expect(forest[1].root.name).toEqual('TT5');
    expect(forest[1].root.parent).toBeFalsy();
    expect(forest[1].root.children.length).toEqual(1);
    expect(forest[1].root.children[0].name).toEqual('Y6Q');
    expect(forest[1].root.children[0].parent.name).toEqual('TT5');
    expect(forest[1].root.children[0].children).toBeFalsy();
  });
  it('addNodePairToForest() adds child from pair of nodes to forest with parent node existing', () => {
    let parent = { name: 'TT5' };
    addChildToNode(parent, 'foo');
    forest = [{ root: { name: 'bar' }}, { root: parent }];
    addNodePairToForest('TT5', 'Y6Q');
    expect(forest.length).toEqual(2);
    expect(forest[1].root.name).toEqual('TT5');
    expect(forest[1].root.parent).toBeFalsy();
    expect(forest[1].root.children.length).toEqual(2);
    expect(forest[1].root.children[1].name).toEqual('Y6Q');
    expect(forest[1].root.children[1].parent.name).toEqual('TT5');
    expect(forest[1].root.children[1].children).toBeFalsy();
  });
  it('addNodePairToForest() adds parent from pair of nodes to forest with child node existing', () => {
    let parent = { name: 'Y6Q' };
    addChildToNode(parent, 'foo');
    forest = [{ root: { name: 'bar' }}, { root: parent }];
    addNodePairToForest('TT5', 'Y6Q');
    expect(forest.length).toEqual(2);
    expect(forest[1].root.name).toEqual('TT5');
    expect(forest[1].root.parent).toBeFalsy();
    expect(forest[1].root.children.length).toEqual(1);
    expect(forest[1].root.children[0].name).toEqual('Y6Q');
    expect(forest[1].root.children[0].parent.name).toEqual('TT5');
    expect(forest[1].root.children[0].children.length).toEqual(1);
    expect(forest[1].root.children[0].children[0].name).toEqual('foo');
  });
  it('addNodePairToForest() connects parent to child in pair of nodes, merging trees, if both nodes existing', () => {
    isTest = true;
    let parent = { name: 'TT5' };
    addChildToNode(parent, 'Y6Q');
    forest = [{ root: { name: 'bar' }}, { root: parent }];
    addNodePairToForest('bar', 'TT5');
    expect(forest.length).toEqual(1);
    expect(forest[0].root.children).toBeTruthy();
    expect(forest[0].root.children.length).toEqual(1);
    expect(forest[0].root.children[0].name).toEqual('TT5');
    expect(forest[0].root.children[0].parent.name).toEqual('bar');
    expect(forest[0].root.children[0].children).toBeTruthy();
    expect(forest[0].root.children[0].children.length).toBeTruthy();
    expect(forest[0].root.children[0].children[0].name).toEqual('Y6Q');
    expect(forest[0].root.children[0].children[0].parent.name).toEqual('TT5');
  });
  it('getNode() does not return a node if forest empty', () => {
    forest = [];
    expect(getNode()).toBeFalsy();
  });
  it('getNode() does not return a node if forest does not have it', () => {
    forest = [{}];
    expect(getNode()).toBeFalsy();
    forest = [{ root: { name: 'foo' }}];
    expect(getNode('bar')).toBeFalsy();
  });
  it('getNode() does return a node if forest has it as root of first tree', () => {
    forest = [{ root: { name: 'foo' }}];
    expect(getNode('foo')).toEqual(forest[0].root);
  });
  it('getNode() does return a node if forest has it as root of not first tree', () => {
    const node1 = {};
    forest = [{ root: { name: 'bar' }}, { root: { name: 'foo' }}];
    expect(getNode('foo')).toEqual(forest[1].root);
  });
  it('getNode() does return a node if forest has it as non-root node of any tree', () => {
    let parent = { name: 'bar' };
    addChildToNode(parent, 'foo');
    forest = [{ root: { name: 'bar' }}, { root: parent }];
    expect(getNode('foo')).toEqual(forest[1].root.children[0]);
  });
  it('addChildToNode() adds child (as new node) to node', () => {
    let node = {
      name: 'TT5',
    }
    addChildToNode(node, 'Y6Q');
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
    setNodeParent(node, 'TT5');
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
  it('fn2() returns empty string', () => {
    expect(fn2()).toEqual(
      ''
      );
  });
  it("can count direct and indirect orbits", () => {
    console.log();
    console.log('*** BEGIN TEST ***');
    numNodesCreated = 0;
    numTimesTwoNodesCreated = numTimesOneNodeCreated = numTimesZeroNodesCreated = 0;
    numNodePairs = 0;
    isTest = false;
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
    buildForest(data);
    console.log("forest:");
    console.log(forest);
    console.log("number of trees: ", forest.length);
    console.log("number of nodes created: ", numNodesCreated);
    console.log("number of times two nodes created: ", numTimesTwoNodesCreated);
    console.log("number of times one node created: ", numTimesOneNodeCreated);
    console.log("number of times zero nodes created: ", numTimesZeroNodesCreated);
    console.log("number of node pairs processed: ", numNodePairs);
    expect(countOrbits()).toEqual(42);
    console.log('*** END TEST ***');
    console.log();
  });
  it("can count minimum orbital transfers", () => {
    console.log();
    console.log('*** BEGIN TEST ***');
    numNodesCreated = 0;
    numTimesTwoNodesCreated = numTimesOneNodeCreated = numTimesZeroNodesCreated = 0;
    numNodePairs = 0;
    isTest = false;
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
    buildForest(data);
    console.log("forest:");
    console.log(forest);
    console.log("number of trees: ", forest.length);
    console.log("number of nodes created: ", numNodesCreated);
    console.log("number of times two nodes created: ", numTimesTwoNodesCreated);
    console.log("number of times one node created: ", numTimesOneNodeCreated);
    console.log("number of times zero nodes created: ", numTimesZeroNodesCreated);
    console.log("number of node pairs processed: ", numNodePairs);
    expect(countOrbits()).toEqual(54);
    expect(countMinTransfers()).toEqual(4);
    console.log('*** END TEST ***');
    console.log();
  });
  it("can parse input", () => {
    const data = parse(
      'TT5)Y6Q ZBC)Z2R 8MQ)51V'
      .split(
        ' '
        ));
    expect(data).toEqual([['TT5', 'Y6Q'], ['ZBC', 'Z2R'], ['8MQ', '51V']]);
  });
  it("my input is valid", () => {
    console.log();
    console.log('*** BEGIN TEST ***');
    numNodesCreated = 0;
    numTimesTwoNodesCreated = numTimesOneNodeCreated = numTimesZeroNodesCreated = 0;
    numNodePairs = 0;
    isTest = false;
    const data = parse(lines);
    buildForest(data);
    console.log("forest:");
    console.log(forest);
    console.log("number of trees: ", forest.length);
    console.log("number of nodes created: ", numNodesCreated);
    console.log("number of times two nodes created: ", numTimesTwoNodesCreated);
    console.log("number of times one node created: ", numTimesOneNodeCreated);
    console.log("number of times zero nodes created: ", numTimesZeroNodesCreated);
    console.log("number of node pairs processed: ", numNodePairs);
    // expect(answer).toEqual(0);
    console.log('*** END TEST ***');
    console.log();
  });
  it("can solve puzzle with my input", () => {
    const data = parse(lines);
    const answer = solve(data);
    console.log("part 1 answer is " + answer);
    expect(answer).toEqual(268504);
  });
  it("can solve puzzle part 2 with my input", () => {
    const data = parse(lines);
    const answer = solve_p2(data);
    console.log("part 2 answer is " + answer);
    expect(answer).toEqual(409);
  });
  // 2019 day 5 tests (extended intcode computer, based on day 2)
  // it("can parse input", () => {
  //   const data = parse_19_05(['1,2,3']);
  //   expect(data).toEqual([1, 2, 3]);
  // });
  // it("can transform parsed input", () => {
  //   input = 0;
  //   const data = [
  //     [3,0,4,0,99],
  //     [1002,4,3,4,33]
  //   ];
  //   const actual = data.map((data) => transform(data));
  //   const expected = [
  //     [0,0,4,0,99],
  //     [1002,4,3,4,99]
  //   ];
  //   // console.log('actual: ', actual);
  //   // console.log('expected: ', expected);
  //   expect(actual).toEqual(expected);
  // });
  // it("can solve day 2019 day 5 puzzle with my input", () => {
  //   const data = parse_19_05(lines);
  //   const answer = solve_19_05(data);
  //   // console.log("part 1 answer is " + answer);
  //   // expect(answer).toEqual(2845163);
  // });
  // it("can compare correctly", () => {
  //   input = 0;
  //   const data = [
  //     [8, [3,9,8,9,10,9,4,9,99,-1,8]], [7, [3,9,8,9,10,9,4,9,99,-1,8]],
  //     [7, [3,9,7,9,10,9,4,9,99,-1,8]], [8, [3,9,7,9,10,9,4,9,99,-1,8]],
  //     [8, [3,3,1108,-1,8,3,4,3,99]], [7, [3,3,1108,-1,8,3,4,3,99]],
  //     [7, [3,3,1107,-1,8,3,4,3,99]], [8, [3,3,1107,-1,8,3,4,3,99]],
  //   ];
  //   const actual = data.map(([inputValue, data]) => {
  //     input = inputValue;
  //     transform(data);
  //     return output;
  //   });
  //   const expected = [
  //     1, 0,
  //     1, 0,
  //     1, 0,
  //     1, 0,
  //   ];
  //   // console.log('actual: ', actual);
  //   // console.log('expected: ', expected);
  //   expect(actual).toEqual(expected);
  // });
  // it("can handle jumps correctly", () => {
  //   input = 0;
  //   const data = [
  //     [1, [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9]],
  //     [0, [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9]],
  //     [1, [3,3,1105,-1,9,1101,0,0,12,4,12,99,1]],
  //     [0, [3,3,1105,-1,9,1101,0,0,12,4,12,99,1]],
  //   ];
  //   const actual = data.map(([inputValue, data]) => {
  //     input = inputValue;
  //     transform(data);
  //     return output;
  //   });
  //   const expected = [
  //     1, 0,
  //     1, 0,
  //   ];
  //   // console.log('actual: ', actual);
  //   // console.log('expected: ', expected);
  //   expect(actual).toEqual(expected);
  // });
  // it("can handle complex programs", () => {
  //   input = 0;
  //   const data = [
  //     [7, [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
  //          1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
  //          999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]],
  //     [8, [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
  //          1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
  //          999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]],
  //     [9, [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
  //          1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
  //          999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]],
  //   ];
  //   const actual = data.map(([inputValue, data]) => {
  //     input = inputValue;
  //     transform(data);
  //     return output;
  //   });
  //   const expected = [
  //     999, 1000, 1001
  //   ];
  //   // console.log('actual: ', actual);
  //   // console.log('expected: ', expected);
  //   expect(actual).toEqual(expected);
  // });
  // it("can solve day 2019 day 5 puzzle part 2 with my input", () => {
  //   const data = parse_19_05(lines);
  //   const answer = solve_19_05_p2(data);
  //   // console.log("part 2 answer is " + answer);
  //   // expect(answer).toEqual(9436229);
  // });












  // boilerplate
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
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

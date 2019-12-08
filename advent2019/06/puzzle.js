// 2019 day 6 code (orbital map, DFS search)
let isSkipErrorLog = false;
const setIsSkipErrorLog = (value) => { isSkipErrorLog = value; };
let isDebug = false;
const setIsDebug = (value) => { isDebug = value; };
let forest = [{}];
const getForest = () => forest;
const setForest = (value) => { forest = value; };
let counters = {
  numNodesCreated: 0,
  numTimesTwoNodesCreated: 0,
  numTimesOneNodeCreated: 0,
  numTimesZeroNodesCreated: 0,
  numNodePairs: 0,
};
const getCounters = () => counters;
const clearCounters = () => {
  counters.numNodesCreated = 0;
  counters.numTimesTwoNodesCreated = 0;
  counters.numTimesOneNodeCreated = 0;
  counters.numTimesZeroNodesCreated = 0;
  counters.numNodePairs = 0;
};
const logDebugInfo = () => {
  if (!isDebug) return;
  console.log();
  console.log('*** BEGIN DEBUG INFO ***');
  console.log("forest:");
  console.log(forest);
  console.log("number of trees: ", forest.length);
  console.log("number of nodes created: ", counters.numNodesCreated);
  console.log("number of times two nodes created: ", counters.numTimesTwoNodesCreated);
  console.log("number of times one node created: ", counters.numTimesOneNodeCreated);
  console.log("number of times zero nodes created: ", counters.numTimesZeroNodesCreated);
  console.log("number of node pairs processed: ", counters.numNodePairs);
  console.log('*** END DEBUG INFO ***');
  console.log();
};
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
  if (isDebug) {
    console.log('YOU path length is: ', youPath.length);
    console.log('SAN path length is: ', santaPath.length);
    console.log('maximum number of transfers to get from YOU to SAN: ',
                youPath.length + santaPath.length);
  }
  for (let node = santaNode.parent; node; node = node.parent) {
    const foundIndex = youPath.indexOf(node);
    if (foundIndex !== -1) {
      const santaIndex = santaPath.indexOf(node);
      if (isDebug) {
        console.log('Found intersection at YOU path index of: ', foundIndex);
        console.log('Found intersection at SAN path index of: ', santaIndex);
        console.log('minimum number of transfers to get from YOU to SAN: ',
                    foundIndex + santaIndex);
      }
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
  (counters.numNodePairs)++;
  const parentNodeFound = getNode(parentName);
  const childNodeFound = getNode(childName);
  if (!parentNodeFound && !childNodeFound) {
    const tree = {
      root: {
        name: parentName,
      }
    };
    (counters.numNodesCreated)++;
    addChildToNode(tree.root, childName);
    (counters.numTimesTwoNodesCreated)++;
    if (!forest) forest = [];
    forest.push(tree);
    return;
  }
  if (childNodeFound && childNodeFound.parent) {
    if (!isSkipErrorLog) console.log("ERROR!  child node found, won't add pair!");
    return;
  }
  if (parentNodeFound && !childNodeFound) {
    addChildToNode(parentNodeFound, childName);
    (counters.numTimesOneNodeCreated)++;
    return;
  }
  if (!parentNodeFound && childNodeFound) {
    setNodeParent(childNodeFound, parentName);
    forest.find((tree) => (tree.root === childNodeFound)).root = childNodeFound.parent;
    (counters.numTimesOneNodeCreated)++;
    return;
  }
  // reparent when both nodes found (parentNodeFound && childNodeFound)
  addChildNode(parentNodeFound, childNodeFound);
  (counters.numTimesZeroNodesCreated)++;
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
  counters.numNodesCreated++; // can't use extra parens here for some reason
  addChildNode(node, childNode);
};
const setNodeParent = (node = {}, parentName = '') => {
  const parentNode = {
    name: parentName,
  }
  counters.numNodesCreated++; // can't use extra parens here for some reason
  addChildNode(parentNode, node);
};
const addChildNode = (parentNode = {}, childNode = {}) => {
  childNode.parent = parentNode;
  if (!parentNode.children) parentNode.children = [];
  parentNode.children.push(childNode);
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
module.exports = {
  setIsSkipErrorLog, setIsDebug, getForest, setForest, getCounters, clearCounters, logDebugInfo,
  countMinTransfers, countOrbits, countOrbit, buildForest, addNodePairToForest, getNode, walkNodes,
  addChildToNode, setNodeParent, addChildNode, solve, solve_p2, parse};

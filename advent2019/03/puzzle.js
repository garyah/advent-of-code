function Puzzle() {
}
function isPositionSeen(
    seenPositions = new Map([[0, new Set([0])]]),
    position = {x: 0, y: 0},
    canUpdate = true) {
  if (seenPositions.has(position.x) && seenPositions.get(position.x).has(position.y)) return true;
  if (canUpdate) {
    if (!seenPositions.has(position.x)) seenPositions.set(position.x, new Set());
    seenPositions.get(position.x).add(position.y);
  }
  return false;
}
function updatePositions(
    wire = 0,
    seenPositions = new Map([[0, new Set([0])]]),
    closestIntersected = {x: 0, y: 0},
    position = {x: 0, y: 0}) {
  if (wire === 0) {
    isPositionSeen(seenPositions, position, true); // just to update seen positions
    return;
  }
  if (isPositionSeen(seenPositions, position, false)) { // not updating seen positions here
    const currentDistance = Math.abs(position.x) + Math.abs(position.y);
    const previousDistance = Math.abs(closestIntersected.x) + Math.abs(closestIntersected.y);
    if (previousDistance === 0 || currentDistance < previousDistance) {
      closestIntersected.x = position.x;
      closestIntersected.y = position.y;
    }
  }
}
Puzzle.prototype.solve = (data = ['', '']) => {
  let seenPositions = new Map([[0, new Set([0])]]);
  let closestIntersected = {x: 0, y: 0};
  let position = {x: 0, y: 0};
  for (let wire = 0; wire < 2; wire++) {
    position.x = 0;
    position.y = 0;
    data[wire].split(',').reduce((heading, move) => {
      if (move[0] === 'U') heading = 0;
      else if (move[0] === 'R') heading = 90;
      else if (move[0] === 'D') heading = 180;
      else if (move[0] === 'L') heading = 270;
      let x = 0, y = 0;
      switch (heading) {
        case 0:
        default:
          for (y = position.y + 1; y <= position.y + parseInt(move.substr(1)); ++y)
            updatePositions(wire, seenPositions, closestIntersected, {x: position.x, y: y});
          position.y = y - 1;
          break;
        case 90:
          for (x = position.x + 1; x <= position.x + parseInt(move.substr(1)); ++x)
            updatePositions(wire, seenPositions, closestIntersected, {x: x, y: position.y});
          position.x = x - 1;
          break;
        case 180:
          for (y = position.y - 1; y >= position.y - parseInt(move.substr(1)); --y)
            updatePositions(wire, seenPositions, closestIntersected, {x: position.x, y: y});
          position.y = y + 1;
          break;
        case 270:
          for (x = position.x - 1; x >= position.x - parseInt(move.substr(1)); --x)
            updatePositions(wire, seenPositions, closestIntersected, {x: x, y: position.y});
          position.x = x + 1;
          break;
      }
        return heading;
    }, 0);
  }
  return Math.abs(closestIntersected.x) + Math.abs(closestIntersected.y);
}
Puzzle.prototype.parse = (lines) => {
  return lines;
  return lines.map((line) => parseInt(line)).filter((num) => num === num);
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

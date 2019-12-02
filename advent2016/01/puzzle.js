function Puzzle() {
}
Puzzle.prototype.solve = (data = '') => {
  let x = 0, y = 0;
  data.split(', ').reduce((heading, move) => {
    heading += (move[0] === 'L') ? 90 : -90;
    if (heading < 0) heading += 360;
    if (heading > 270) heading -= 360;
    switch (heading) {
      case 0:
      default:
        y += parseInt(move.substr(1));
        break;
      case 90:
        x += parseInt(move.substr(1));
        break;
      case 180:
        y -= parseInt(move.substr(1));
        break;
      case 270:
        x -= parseInt(move.substr(1));
        break;
    }
    return heading;
  }, 0);
  return Math.abs(x) + Math.abs(y);
}
Puzzle.prototype.parse = (lines) => {
  return lines[0];
  return lines.map((line) => parseInt(line)).filter((num) => num === num);
};
function isPositionSeen(
    seenPositions = new Set(),
    position = {x: 0, y: 0}) {
  const hashValue = position.x * 1000 + position.y;
  if (seenPositions.has(hashValue)) return true;
  seenPositions.add(hashValue);
  return false;
}
function updatePositions(
    seenPositions = new Set(),
    firstRepeatedPosition = {x: 0, y: 0},
    position = {x: 0, y: 0}) {
  if (isPositionSeen(seenPositions, position)) {
    firstRepeatedPosition.x = position.x;
    firstRepeatedPosition.y = position.y;
  }
}
Puzzle.prototype.solve_p2 = (data = '') => {
  //return -1;
  let seenPositions = new Set();
  let firstRepeatedPosition = {x: 0, y: 0};
  let position = {x: 0, y: 0};
  data.split(', ').reduce((heading, move) => {
    heading += (move[0] === 'L') ? -90 : 90;
    if (heading < 0) heading += 360;
    if (heading > 270) heading -= 360;
    let x = 0, y = 0;
    switch (heading) {
      case 0:
      default:
        for (y = position.y + 1; y <= position.y + parseInt(move.substr(1)); ++y)
          updatePositions(seenPositions, firstRepeatedPosition, {x: position.x, y: y});
        position.y = y - 1;
        break;
      case 90:
        for (x = position.x + 1; x <= position.x + parseInt(move.substr(1)); ++x)
          updatePositions(seenPositions, firstRepeatedPosition, {x: x, y: position.y});
        position.x = x - 1;
        break;
      case 180:
        for (y = position.y - 1; y >= position.y - parseInt(move.substr(1)); --y)
          updatePositions(seenPositions, firstRepeatedPosition, {x: position.x, y: y});
        position.y = y + 1;
        break;
      case 270:
        for (x = position.x - 1; x >= position.x - parseInt(move.substr(1)); --x)
          updatePositions(seenPositions, firstRepeatedPosition, {x: x, y: position.y});
        position.x = x + 1;
        break;
    }
    // updatePositions(seenPositions, firstRepeatedPosition, position);
    return heading;
  }, 0);
  return Math.abs(firstRepeatedPosition.x) + Math.abs(firstRepeatedPosition.y);
}
module.exports = Puzzle;

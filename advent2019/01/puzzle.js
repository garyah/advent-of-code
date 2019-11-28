function Puzzle() {
}
Puzzle.prototype.parse = function(lines) {
  var ans = [];
  for (var line of lines) {
    ans.push(parseInt(line));
  }
  return ans;
};
Puzzle.prototype.solve = function(data) {
  var total = 0;
  for (var num of data) {
    //console.log(num, parseInt(num));
    // if (num == NaN) console.log("num == NaN");
    // if (num === NaN) console.log("num === NaN");
    // if (num != NaN) console.log("num != NaN");
    // if (num !== NaN) console.log("num !== NaN");
    // var parsedNum = parseInt(num);
    // if (parsedNum == NaN) console.log("parsedNum == NaN");
    // if (parsedNum === NaN) console.log("parsedNum === NaN");
    // if (parsedNum != NaN) console.log("parsedNum != NaN");
    // if (parsedNum !== NaN) console.log("parsedNum !== NaN");
    if (num === num) total += num;
  }
  return total;
}
module.exports = Puzzle;

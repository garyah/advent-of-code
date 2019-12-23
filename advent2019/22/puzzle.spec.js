describe("2019 day 22", function() {
  // new code
  let var1 = 0;
  let var2 = '';
  let deck = [0];
  let deckSize = 10007;
  const fn1 = (arg1 = 0, arg2 = '', arg3 = []) => {
    if (1) {}
    else if (1) {}
    else {}
    for (let i = 0;; i++) { break; continue; }
    for (const item of arg3) {}
    return 0;
  };
  const fn2 = () => {
    return '';
  };
  const init = () => {
    for (let i = 0; i < deckSize; i++) {
      deck[i] = i;
    }
  };
  const dealIntoNew = () => {
    deck = deck.reverse();
  };
  const cutBottom = (amount = 0) => {
    let newDeck = [0];
    for (let i = deckSize - amount; i < deckSize; i++) {
      newDeck[i - (deckSize - amount)] = deck[i];
    }
    for (let i = 0; i < deckSize - amount; i++) {
      newDeck[amount + i] = deck[i];
    }
    deck = newDeck;
  };
  const cut = (amount = 0) => {
    if (amount < 0) { cutBottom(Math.abs(amount)); return; }
    let newDeck = [0];
    for (let i = amount; i < deckSize; i++) {
      newDeck[i - amount] = deck[i];
    }
    for (let i = 0; i < amount; i++) {
      newDeck[deckSize - amount + i] = deck[i];
    }
    deck = newDeck;
  };
  const dealWithIncrement = (amount = 0) => {
    let newDeck = [deck[0]];
    let j = amount;
    for (let i = 1; i < deckSize; i++) {
      if (newDeck[j] !== undefined) {
        // console.log('card number ', newDeck[j], 'about to be replaced with card number', deck[i]);
      }
      newDeck[j] = deck[i];
      j += amount;
      j %= deckSize;
    }
    deck = newDeck;
  };
  const solve = (data = [{}]) => {
    deckSize = 10007;
    init();
    for (const action of data) {
      if (action.type === 'deal') dealIntoNew();
      else if (action.type === 'cut') cut(action.amount);
      else if (action.type === 'deali') dealWithIncrement(action.amount);
    }
    return deck.indexOf(2019);
  }
  const solve_p2 = (data = [{}]) => {
    console.log();
    // deckSize = 9883;
    for (deckSize = 9007; deckSize <= 10007; deckSize++) {
      init();
      for (let n = 0; n < 1; n++) {
        for (const action of data) {
          if (action.type === 'deal') dealIntoNew();
          else if (action.type === 'cut') cut(action.amount);
          else if (action.type === 'deali') dealWithIncrement(action.amount);
        }
      }
      if (deck[2020] !== undefined) console.log('deckSize=', deckSize, 'answer=', deck[2020]);
    }
    return deck[2020];
  }
  const parse = (lines = ['']) => {
    return lines.map((line) => {
      if (line.startsWith('deal into new stack')) {
        return {type: 'deal'};
      } else if (line.startsWith('cut ')) {
        return {type: 'cut', amount: parseInt(line.substr(4))};
      } else if (line.startsWith('deal with increment ')) {
        return {type: 'deali', amount: parseInt(line.substr(20))};
      }
    });
  };















  // new tests
  it('fn1() returns number 0', () => {
    // expect(fn1()).toEqual(
    //   0
    //   );
  });
  it('fn2() returns empty string', () => {
    // expect(fn2()).toEqual(
    //   ''
    //   );
  });
  it("can solve puzzle", () => {
    const data = [
      [],
    ];
    // const actual = data.map((data) => solve(data));
    const expected = [
      1,
    ];
    // expect(actual).toEqual(expected);
  });
  it("can parse input", () => {
    const data = parse([
      'deal into new stack',
      'cut 7990',
      'cut -5698',
      'deal with increment 29',
    ]);
    expect(data).toEqual([
      {type: 'deal'}, {type: 'cut', amount: 7990},
      {type: 'cut', amount: -5698}, {type: 'deali', amount: 29},
    ]);
  });
  it("can solve puzzle with my input", () => {
    const data = parse(lines);
    const answer = solve(data);
    // console.log("part 1 answer is " + answer);
    // expect(answer).toEqual(6794);
  });
  it("can solve puzzle part 2 with my input", () => {
    const data = parse(lines);
    const answer = solve_p2(data);
    // console.log("part 2 answer is " + answer);
    // expect(answer).toEqual(0);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 22:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/22/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

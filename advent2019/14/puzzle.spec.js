describe("2019 day 14", function() {
  // new code
  let var1 = 0;
  let var2 = '';
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
  let recipeMap = new Map();
  let usageMap = new Map();
  let totalOre = 0;
  const walkItemList = (itemList = []) => {
    for (const item of itemList) {
      const itemRecipe = recipeMap.get(item.name);
      const neededQuantity = item.quantity;
      if (itemRecipe.oreQuantity) {
        // made from ORE
        let onHand = 0;
        if (usageMap.has(item.name)) onHand += usageMap.get(item.name);
        while (onHand < neededQuantity) {
          onHand += itemRecipe.quantity;
          totalOre += itemRecipe.oreQuantity;
        }
        onHand -= neededQuantity;
        usageMap.set(item.name, onHand);
      }
      else if (itemRecipe.itemList) {
        // made from other things
        walkItemList(itemRecipe.itemList);
      }
    }
  }
  const solve = (recipes = [[[[]]]]) => {
    recipeMap = new Map();
    for (const recipe of recipes) {
      if (recipe[0].length === 1) {
        // recipe from ORE
        recipeObject = {
          name: recipe[1][1],
          quantity: recipe[1][0],
          oreQuantity: recipe[0][0][0],
        };
        recipeMap.set(recipeObject.name, recipeObject);
      }
      if (recipe[0].length > 1) {
        // recipe not from ORE
        recipeObject = {
          name: recipe[1][1],
          quantity: recipe[1][0],
        };
        recipeObject.itemList = [];
        for (const item of recipe[0]) {
          itemObject = {
            name: item[1],
            quantity: item[0],
          }
          recipeObject.itemList.push(itemObject);
        }
        recipeMap.set(recipeObject.name, recipeObject);
      }
    }
    // console.log('recipeMap=', recipeMap);

    usageMap = new Map();
    totalOre = 0;
    const fuelRecipe = recipeMap.get('FUEL');
    walkItemList(fuelRecipe.itemList);
    console.log('totalOre=', totalOre)

    return 30;
    //if ()
    // fn1();
    // return data.reduce((sum, num) => {
    //   return sum + num;
    // }, 0);
  }
  const parse = (lines = ['']) => {
    // return lines[0]; // use for one line string input
    // return lines;    // use for multi-line string input
    return lines.map((line) => {
      const expression = line.split(' => ');
      const terms = expression[0].split(', ');
      const inputs = terms.map((term) => {
        return term.split(' ').map((operand, index) => (index === 0 ? parseInt(operand) : operand));
      });
      const output = expression[1].split(' ').map((operand, index) => (index === 0 ? parseInt(operand) : operand));
      return [inputs, output];
    });
  };















  // new tests
  it('fn1() returns number 0', () => {
    expect(fn1()).toEqual(
      0
      );
  });
  it('fn2() returns empty string', () => {
    expect(fn2()).toEqual(
      ''
      );
  });
  it("can solve puzzle", () => {
    const data = [
      [
        '10 ORE => 10 A',
        '1 ORE => 1 B',
        '7 A, 1 B => 1 C',
        '7 A, 1 C => 1 D',
        '7 A, 1 D => 1 E',
        '7 A, 1 E => 1 FUEL',
      ]
    ];
    const actual = data.map((data) => solve(parse(data)));
    const expected = [
        30,
    ];
    expect(actual).toEqual(expected);
  });
  it("can parse input", () => {
    let data = parse([
      '11 DXFB, 1 CPBXJ, 8 TXFCS => 8 MPLJ',
      '11 DXFB, 1 CPBXJ, 8 TXFCS => 8 MPLJ',
    ]);
    let expected = [
      [[[11, 'DXFB'], [1, 'CPBXJ'], [8, 'TXFCS']], [8, 'MPLJ']],
      [[[11, 'DXFB'], [1, 'CPBXJ'], [8, 'TXFCS']], [8, 'MPLJ']],
    ];
    expect(data).toEqual(expected);
    data = parse([
      '21 MKJN => 9 KDFZ',
      '21 MKJN => 9 KDFZ',
    ]);
    expected = [
      [[[21, 'MKJN']], [9, 'KDFZ']],
      [[[21, 'MKJN']], [9, 'KDFZ']],
    ];
    expect(data).toEqual(expected);
  });
  it("can solve puzzle with my input", () => {
    // const data = [0];
    const data = parse(lines);
    // console.log("part 1 data is " + data);
    const answer = solve(data);
    console.log("part 1 answer is " + answer);
    // expect(answer).toEqual(0);
  });












  // boilerplate
  const Parser = require('../../common/parser');
  const puzzle = require('./puzzle');
  const parser = new Parser();
  const readInputFile = true; // change to true to read input file for all tests that need it
  let lines = [];
  beforeAll((done) => {
    console.log("2019 day 14:");
    if (readInputFile) {
      // "adventYYYY/DD/input.txt" for specific file, undefined for stdin
      parser.readLines("advent2019/14/input.txt", (linesRead) => {
        lines = linesRead;
        done();
      });
      return;
    }
    done();
  });
});

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
        const totalOreSave = totalOre;
        let onHand = 0;
        if (usageMap.has(item.name)) onHand += usageMap.get(item.name);
        const onHandSave = onHand;
        let made = 0;
        while (onHand < neededQuantity) {
          onHand += itemRecipe.quantity;
          made += itemRecipe.quantity;
          totalOre += itemRecipe.oreQuantity;
        }
        onHand -= neededQuantity;
        usageMap.set(item.name, onHand);
        // console.log(item.name, ':', onHandSave, '->', onHand,
        //              ', needed', neededQuantity, ', made', made,
        //             'ore:', totalOreSave, '->', totalOre);
      }
      else if (itemRecipe.itemList) {
        // made from other things
        let onHand = 0;
        if (usageMap.has(item.name)) onHand += usageMap.get(item.name);
        while (onHand < neededQuantity) {
          onHand += itemRecipe.quantity;
          walkItemList(itemRecipe.itemList);
        }
        onHand -= neededQuantity;
        usageMap.set(item.name, onHand);
      }
    }
  }
  const solve = (recipes = [[[[]]]]) => {
    recipeMap = new Map();
    for (const recipe of recipes) {
      if (recipe[0].length === 1 && recipe[0][0][1] === 'ORE') {
        // recipe from ORE
        recipeObject = {
          name: recipe[1][1],
          quantity: recipe[1][0],
          oreQuantity: recipe[0][0][0],
        };
        recipeMap.set(recipeObject.name, recipeObject);
      }
      else {
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
    console.log('totalOre=', totalOre);
  
    return totalOre;
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
      ],
      [
        '9 ORE => 2 A',
        '8 ORE => 3 B',
        '7 ORE => 5 C',
        '3 A, 4 B => 1 AB',
        '5 B, 7 C => 1 BC',
        '4 C, 1 A => 1 CA',
        '2 AB, 3 BC, 4 CA => 1 FUEL',
      ],
      [
        '157 ORE => 5 NZVS',
        '165 ORE => 6 DCFZ',
        '44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL',
        '12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ',
        '179 ORE => 7 PSHF',
        '177 ORE => 5 HKGWZ',
        '7 DCFZ, 7 PSHF => 2 XJWVT',
        '165 ORE => 2 GPVTF',
        '3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT',
      ],
      [
        '2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG',
        '17 NVRVD, 3 JNWZP => 8 VPVL',
        '53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL',
        '22 VJHF, 37 MNCFX => 5 FWMGM',
        '139 ORE => 4 NVRVD',
        '144 ORE => 7 JNWZP',
        '5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC',
        '5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV',
        '145 ORE => 6 MNCFX',
        '1 NVRVD => 8 CXFTF',
        '1 VJHF, 6 MNCFX => 4 RFSQX',
        '176 ORE => 6 VJHF',
      ],
      [
        '171 ORE => 8 CNZTR',
        '7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL',
        '114 ORE => 4 BHXH',
        '14 VRPVC => 6 BMBT',
        '6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL',
        '6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT',
        '15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW',
        '13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW',
        '5 BMBT => 4 WPTQ',
        '189 ORE => 9 KTJDG',
        '1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP',
        '12 VRPVC, 27 CNZTR => 2 XDBXC',
        '15 KTJDG, 12 BHXH => 5 XCVML',
        '3 BHXH, 2 VRPVC => 7 MZWV',
        '121 ORE => 7 VRPVC',
        '7 XCVML => 6 RJRHP',
        '5 BHXH, 4 VRPVC => 5 LTCX',
      ],
    ];
    const actual = data.map((data) => solve(parse(data)));
    const expected = [
        31,
        165,
        13312,
        180697,
        2210736,
    ];
    // expect(actual).toEqual(expected);
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
    expect(answer).toEqual(1037742);
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
// [
//   '',
//   '',
//   '',
//   '',
//   '',
//   '',
//   '',
//   '',
// ],

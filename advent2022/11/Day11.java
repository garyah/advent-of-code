import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

enum Operater {
    Add,
    Multiply
}

class Monkey {
    public List<Long> itemWorryLevels;
    public List<ArrayList<Long>> itemWorryLevelMods;
    public Operater operater;
    public boolean isOperandVar;
    public int operand;
    public int testDivBy;
    public int trueMonkeyIdx;
    public int falseMonkeyIdx;
    public int numInspects;
    Monkey () {
        itemWorryLevels = new ArrayList<Long>();
        itemWorryLevelMods = new ArrayList<ArrayList<Long>>();
        numInspects = 0;
    }
}
public class Day11 {
    static List<Monkey> monkeys;
    static boolean isPart2;

    static void doTurn(int monkeyIdx, Monkey monkey) {
        // increase worry level during inspection, part 1 way
        for (int i = 0; i < monkey.itemWorryLevels.size(); i++) {
            long itemWorryLevel = monkey.itemWorryLevels.get(i);
            switch (monkey.operater) {
                case Add:
                    itemWorryLevel += monkey.isOperandVar ? itemWorryLevel : monkey.operand;
                    break;
                case Multiply:
                    itemWorryLevel *= monkey.isOperandVar ? itemWorryLevel : monkey.operand;
                    break;
            }
            monkey.itemWorryLevels.set(i, itemWorryLevel);
            monkey.numInspects++;
        }
        // System.out.println("Monkey " + monkeyIdx + ": Worry levels during inspection changed to = " + monkey.itemWorryLevels);

        // decrease worry level after inspection, only for part 1
        for (int i = 0; i < monkey.itemWorryLevels.size(); i++) {
            long itemWorryLevel = monkey.itemWorryLevels.get(i);
            itemWorryLevel /= 3;
            monkey.itemWorryLevels.set(i, itemWorryLevel);
        }
        // System.out.println("Monkey " + monkeyIdx + ": Worry levels after inspection changed to = " + monkey.itemWorryLevels);

        // perform tests on worry level, throwing items to other monkeys, part 1 way
        for (int i = 0; i < monkey.itemWorryLevels.size(); i++) {
            long itemWorryLevel = monkey.itemWorryLevels.get(i);
            int thrownMonkeyIdx;
            if (itemWorryLevel % monkey.testDivBy == 0) {
                // test true, throw to index of monkey for true
                thrownMonkeyIdx = monkey.trueMonkeyIdx;
            } else {
                // test false, throw to index of monkey for false
                thrownMonkeyIdx = monkey.falseMonkeyIdx;
            }
            monkey.itemWorryLevels.remove(i--);
            Monkey thrownMonkey = monkeys.get(thrownMonkeyIdx);
            thrownMonkey.itemWorryLevels.add(itemWorryLevel);
            // System.out.println("Monkey " + monkeyIdx + ": Throws item with worry level = " + itemWorryLevel + " to monkey " + thrownMonkeyIdx);
        }
    }
    static void doTurnPart2(int monkeyIdx, Monkey monkey) {
        // increase worry level mods during inspection, part 2 way
        for (int i = 0; i < monkey.itemWorryLevelMods.size(); i++) {
            ArrayList<Long> itemWorryLevelMods = monkey.itemWorryLevelMods.get(i);
            for (int otherMonkeyIdx = 0; otherMonkeyIdx < monkeys.size(); otherMonkeyIdx++) {
                long itemWorryLevelMod = itemWorryLevelMods.get(otherMonkeyIdx);
                switch (monkey.operater) {
                    case Add:
                        itemWorryLevelMod += monkey.isOperandVar ? itemWorryLevelMod : monkey.operand;
                        break;
                    case Multiply:
                        itemWorryLevelMod *= monkey.isOperandVar ? itemWorryLevelMod : monkey.operand;
                        break;
                }
                Monkey otherMonkey = monkeys.get(otherMonkeyIdx);
                itemWorryLevelMod %= otherMonkey.testDivBy;
                itemWorryLevelMods.set(otherMonkeyIdx, itemWorryLevelMod);
            }
            monkey.numInspects++;
        }
        // System.out.println("Monkey " + monkeyIdx + ": Worry modulo levels during inspection changed to = " + monkey.itemWorryLevelMods);

        // perform tests on worry level, throwing items to other monkeys, part 2 way
        for (int i = 0; i < monkey.itemWorryLevelMods.size(); i++) {
            ArrayList<Long> itemWorryLevelMods = monkey.itemWorryLevelMods.get(i);
            long itemWorryLevelMod = itemWorryLevelMods.get(monkeyIdx);
            int thrownMonkeyIdx;
            if (itemWorryLevelMod == 0) {
                // test true, throw to index of monkey for true
                thrownMonkeyIdx = monkey.trueMonkeyIdx;
            } else {
                // test false, throw to index of monkey for false
                thrownMonkeyIdx = monkey.falseMonkeyIdx;
            }
            monkey.itemWorryLevelMods.remove(i--);
            Monkey thrownMonkey = monkeys.get(thrownMonkeyIdx);
            thrownMonkey.itemWorryLevelMods.add(itemWorryLevelMods);
            // System.out.println("Monkey " + monkeyIdx + ": Throws item with worry modulo level = " + itemWorryLevelMod + " to monkey " + thrownMonkeyIdx);
        }
    }
    static void printWorryLevels() {
        for (int i = 0; i < monkeys.size(); i++) {
            System.out.println("Monkey " + i + ": Worry levels at end of round = " + monkeys.get(i).itemWorryLevels);
        }
    }
    static void printWorryLevelMods() {
        for (int i = 0; i < monkeys.size(); i++) {
            System.out.println("Monkey " + i + ": Worry modulo levels at end of round = " + monkeys.get(i).itemWorryLevelMods);
        }
    }
    static void printNumInspects() {
        for (int i = 0; i < monkeys.size(); i++) {
            System.out.println("Monkey " + i + ": inspected items " + monkeys.get(i).numInspects + " times.");
        }
    }
    static void performRound() {
        for (int i = 0; i < monkeys.size(); i++) {
            if (isPart2) {
                doTurnPart2(i, monkeys.get(i));
                continue;
             }
             doTurn(i, monkeys.get(i));
        }
    }
    static void initItemWorryLevelMods() {
        for (int currentMonkeyIdx = 0; currentMonkeyIdx < monkeys.size(); currentMonkeyIdx++) {
            Monkey currentMonkey = monkeys.get(currentMonkeyIdx);
            for (int itemIdx = 0; itemIdx < currentMonkey.itemWorryLevels.size(); itemIdx++) {
                long itemWorryLevel = currentMonkey.itemWorryLevels.get(itemIdx);
                ArrayList<Long> itemWorryLevelMods = new ArrayList<Long>();
                for (int otherMonkeyIdx = 0; otherMonkeyIdx < monkeys.size(); otherMonkeyIdx++) {
                    Monkey otherMonkey = monkeys.get(otherMonkeyIdx);
                    itemWorryLevelMods.add(itemWorryLevel % otherMonkey.testDivBy);
                }
                currentMonkey.itemWorryLevelMods.add(itemWorryLevelMods);
            }
            System.out.println("Monkey " + currentMonkeyIdx + ": Worry modulo values for starting items = " + currentMonkey.itemWorryLevelMods);
        }
    }
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\11\\sample_input.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\11\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        isPart2 = true;

        // read file
        monkeys = new ArrayList<Monkey>();
        // int currentMonkeyIdx;
        Monkey currentMonkey = null;
        for (String line : lines) {
            if (line.length() != 0) {
                // String[] fields = line.split(" ");
                if (line.contains("Monkey ")) {
                    // currentMonkeyIdx = Integer.parseInt(fields[1].substring(0, fields[1].length() - 1));
                    currentMonkey = new Monkey();
                    monkeys.add(currentMonkey);
                    // System.out.println(currentMonkeyIdx + ":");
                }
                if (line.contains("Starting items:")) {
                    String itemsString = line.substring(line.indexOf("Starting items: ") + "Starting items: ".length(), line.length());
                    String[] itemStrings = itemsString.split(", ");
                    for (String itemString : itemStrings) {
                        currentMonkey.itemWorryLevels.add(Long.parseLong(itemString));
                    }
                    // System.out.println("Starting items = " + currentMonkey.itemWorryLevels);
                }
                if (line.contains("Operation:")) {
                    String itemsString = line.substring(line.indexOf("Operation: new = old ") + "Operation: new = old ".length(), line.length());
                    String[] subfields = itemsString.split(" ");
                    char operater = subfields[0].charAt(0);
                    switch (operater) {
                        case '+':
                            currentMonkey.operater = Operater.Add;
                            break;
                        case '*':
                            currentMonkey.operater = Operater.Multiply;
                            break;
                    }
                    // System.out.println("Operation operater = " + currentMonkey.operater);
                    String operand = subfields[1];
                    currentMonkey.isOperandVar = operand.contains("old") ? true : false;
                    if (!currentMonkey.isOperandVar) currentMonkey.operand = Integer.parseInt(operand);
                    // if (!currentMonkey.isOperandVar) System.out.println("Operation operand = " + currentMonkey.operand);
                }
                if (line.contains("Test:")) {
                    String testDivByString = line.substring(line.indexOf("Test: divisible by ") + "Test: divisible by ".length(), line.length());
                    currentMonkey.testDivBy = Integer.parseInt(testDivByString);
                    // System.out.println("Test is divisible by " + currentMonkey.testDivBy);
                }
                if (line.contains("If true:")) {
                    String ifArgString = line.substring(line.indexOf("If true: throw to monkey ") + "If true: throw to monkey ".length(), line.length());
                    currentMonkey.trueMonkeyIdx = Integer.parseInt(ifArgString);
                    // System.out.println("If true monkey index = " + currentMonkey.trueMonkeyIdx);
                }
                if (line.contains("If false:")) {
                    String ifArgString = line.substring(line.indexOf("If false: throw to monkey ") + "If false: throw to monkey ".length(), line.length());
                    currentMonkey.falseMonkeyIdx = Integer.parseInt(ifArgString);
                    // System.out.println("If false monkey index = " + currentMonkey.falseMonkeyIdx);
                }
            }
        }

        System.out.println("# lines = " + lines.size());
        System.out.println("# monkeys = " + monkeys.size());

        // Part 2 only: init mod values for tests for all items at start
        if (isPart2) initItemWorryLevelMods();

        // perform set number of rounds
        int interval = isPart2 ? 1000 : 1;
        int numRounds = isPart2 ? 10000 : 20;
        for (int round = 1; round <= numRounds; round++) {
            if (round == 1 || round == 20 || round % interval == 0) System.out.println("Round: " + round);
            performRound();
            // if (!isPart2) printWorryLevels();
            // if (isPart2) printWorryLevelMods();
            if (round == 1 || round == 20 || round % interval == 0) printNumInspects();
        }

        // find most active monkeys
        int[] numInspectsArray = new int[monkeys.size()];
        for (int i = 0; i < monkeys.size(); i++) {
            numInspectsArray[i] = monkeys.get(i).numInspects;
        }
        Arrays.sort(numInspectsArray);
        long firstMonkeyNumInspects = numInspectsArray[numInspectsArray.length - 1];
        long secondMonkeyNumInspects = numInspectsArray[numInspectsArray.length - 2];
        long activityLevel = firstMonkeyNumInspects * secondMonkeyNumInspects;

        System.out.println("firstMonkeyNumInspects = " + firstMonkeyNumInspects);
        System.out.println("secondMonkeyNumInspects = " + secondMonkeyNumInspects);
        System.out.println("activityLevel = " + activityLevel);
    }

    void snippets() {
        // Basic data structures:
        // Deque<Integer> maxSums = new ArrayDeque<Integer>();
        // List<Integer> sums = new ArrayList<Integer>();
        // ArrayList<ArrayDeque<String>> stacks = new ArrayList<ArrayDeque<String>>();
        //
        // Use of Integer.parseInt():
        // sum += Integer.parseInt(line);
        //
        // Use of replaceAll() and split():
        // String[] fields = line.replaceAll("\\s+$", "").split(" ");
        //
        // Use of substring():
        // String comp1 = line.substring(0, line.length() / 2);
        // String comp2 = line.substring(line.length() / 2, line.length());
        //
        // Use of indexOf():
        // if (comp2.indexOf(duplicate) > -1) {
        //     break;
        // }
        //
        // Ranges in input:
        // String[] ranges = line.split(",");
        // String range1 = ranges[0];
        // String range2 = ranges[1];
        // String[] range1Bounds = range1.split("\\-");
        // int range1Lo = Integer.parseInt(range1Bounds[0]);
        // int range1Hi = Integer.parseInt(range1Bounds[1]);
        // String[] range2Bounds = range2.split("\\-");
        // int range2Lo = Integer.parseInt(range2Bounds[0]);
        // int range2Hi = Integer.parseInt(range2Bounds[1]);
        //
        // Moving from one deque to another, as stack:
        // destStack.addLast(sourceStack.removeLast());
        //
        // Using toArray to convert to array, print it out:
        // Object[] stack = stacks.get(i).toArray();
        // for (int j = 0; j < stack.length; j++) {
        //     System.out.print(stack[j] + " ");
        // }
        // System.out.println();
        //
        // Part 2 flagging:
        // boolean isPart2 = true;
    }
}

import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

enum Operater {
    Add,
    Subtract,
    Multiply,
    Divide
}

class Monkey {
    public List<Long> itemWorryLevels;
    public Operater operater;
    public boolean isOperandVar;
    public int operand;
    public int testDivBy;
    public List<Integer> trueList;
    public List<Integer> falseList;
    public int numInspects;
    Monkey (/*Operater operater, boolean isOperandVarOrConst, int operand, int testDivBy*/) {
        itemWorryLevels = new ArrayList<Long>();
        // this.operater = operater;
        // this.isOperandVarOrConst = isOperandVarOrConst;
        // this.operand = operand;
        // this.testDivBy = testDivBy;
        trueList = new ArrayList<Integer>();
        falseList = new ArrayList<Integer>();
        numInspects = 0;
    }
}
public class Day11 {
    static List<Monkey> monkeys;

    static void doTurn(int monkeyIdx, Monkey monkey) {
        // increase worry level during inspection
        for (int i = 0; i< monkey.itemWorryLevels.size(); i++) {
            long itemWorryLevel = monkey.itemWorryLevels.get(i);
            switch (monkey.operater) {
                case Add:
                    itemWorryLevel += monkey.isOperandVar ? itemWorryLevel : monkey.operand;
                    break;
                case Multiply:
                    itemWorryLevel *= monkey.isOperandVar ? itemWorryLevel : monkey.operand;
                    break;
                default:
                    break;
            }
            monkey.itemWorryLevels.set(i, itemWorryLevel);
            monkey.numInspects++;
        }
        // System.out.println("Monkey " + monkeyIdx + ": Worry levels during inspection changed to = " + monkey.itemWorryLevels);

        // decrease worry level after inspection
        for (int i = 0; i< monkey.itemWorryLevels.size(); i++) {
            long itemWorryLevel = monkey.itemWorryLevels.get(i);
            itemWorryLevel /= 3;
            monkey.itemWorryLevels.set(i, itemWorryLevel);
        }
        // System.out.println("Monkey " + monkeyIdx + ": Worry levels after inspection changed to = " + monkey.itemWorryLevels);

        // perform tests on worry level, throwing items to other monkeys
        for (int i = 0; i < monkey.itemWorryLevels.size(); i++) {
            long itemWorryLevel = monkey.itemWorryLevels.get(i);
            int thrownMonkeyIdx;
            if (itemWorryLevel % monkey.testDivBy == 0) {
                // test true, throw to monkey on true list
                thrownMonkeyIdx = monkey.trueList.get(0);
            } else {
                // test false, throw to monkey on false list
                thrownMonkeyIdx = monkey.falseList.get(0);
            }
            monkey.itemWorryLevels.remove(i--);
            Monkey thrownMonkey = monkeys.get(thrownMonkeyIdx);
            thrownMonkey.itemWorryLevels.add(itemWorryLevel);
            // System.out.println("Monkey " + monkeyIdx + ": Throws item with worry level = " + itemWorryLevel + " to monkey " + thrownMonkeyIdx);
        }
    }
    static void printWorryLevels() {
        for (int i = 0; i < monkeys.size(); i++) {
            System.out.println("Monkey " + i + ": Worry levels at end of round = " + monkeys.get(i).itemWorryLevels);
        }
    }
    static void printNumInspects() {
        for (int i = 0; i < monkeys.size(); i++) {
            // System.out.println("Monkey " + i + ": inspected items " + monkeys.get(i).numInspects + " times.");
        }
    }
    static void performRound() {
        for (int i = 0; i < monkeys.size(); i++) {
            doTurn(i, monkeys.get(i));
        }
        printWorryLevels();
        printNumInspects();
    }
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\11\\sample_input.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\11\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);

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
                        // case '-':
                        // case '/':
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
                    currentMonkey.trueList.add(Integer.parseInt(ifArgString));
                    // System.out.println("If true list = " + currentMonkey.trueList);
                }
                if (line.contains("If false:")) {
                    String ifArgString = line.substring(line.indexOf("If false: throw to monkey ") + "If false: throw to monkey ".length(), line.length());
                    currentMonkey.falseList.add(Integer.parseInt(ifArgString));
                    // System.out.println("If false list = " + currentMonkey.falseList);
                }
            }
        }

        System.out.println("# lines = " + lines.size());
        System.out.println("# monkeys = " + monkeys.size());

        // Part 1

        // perform set number of rounds
        for (int n = 0; n < 20; n++) {
            System.out.println("Round: " + (n + 1));
            performRound();
        }

        // find most active monkeys
        int[] numInspectsArray = new int[monkeys.size()];
        for (int i = 0; i < monkeys.size(); i++) {
            numInspectsArray[i] = monkeys.get(i).numInspects;
        }
        Arrays.sort(numInspectsArray);
        int firstMonkeyNumInspects = numInspectsArray[numInspectsArray.length - 1];
        int secondMonkeyNumInspects = numInspectsArray[numInspectsArray.length - 2];
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

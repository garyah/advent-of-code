import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;
import java.text.DecimalFormat;

public class Day13 {
    // static boolean isPart2;

    static List<Object> fromString(String string) {
        // String[] numberStrings = string.replace("[", "").replace("]", "").split(",");
        String[] numberStrings = string.split(",");
        // int result[] = new int[strings.length];
        // for (int i = 0; i < result.length; i++) {
        //     result[i] = Integer.parseInt(strings[i]);
        // }
        List<Object> result = new ArrayList<Object>();
        for (String numberString : numberStrings) {
            result.add(Integer.parseInt(numberString));
        }
        return result;
    }
    static List<Object> parseLine(String line) {
        List<Object> parseResult = new ArrayList<Object>();
        return parseResult;
    }
    static int compareObjects(Object firstObj, Object secondObj) {
        // compare two numbers
        if (firstObj.getClass() == Integer.class && secondObj.getClass() == Integer.class) {
            Integer firstNum = (Integer)firstObj;
            Integer secondNum = (Integer)secondObj;
            return Integer.compare(firstNum, secondNum); // right order when this returns < 0, indicating first less than right
        }

        // compare number with list or list with number, need to convert number to list
        if (firstObj.getClass() == Integer.class && secondObj.getClass() == ArrayList.class) {
            // compare number with list
            List<Object> tempList = new ArrayList<Object>();
            tempList.add(firstObj);
            firstObj = tempList;
        }
        else if (firstObj.getClass() == ArrayList.class && secondObj.getClass() == Integer.class) {
            // compare list with number
            List<Object> tempList = new ArrayList<Object>();
            tempList.add(secondObj);
            secondObj = tempList;
        }

        // at this point, must be compare two lists
        List<Object> firstList = (List<Object>)firstObj;
        List<Object> secondList = (List<Object>)secondObj;

        // compare two lists, number of elements can be same or different
        int index = 0;
        int numFirstElems = firstList.size();
        int numSecondElems = secondList.size();
        for (; index < numFirstElems && index < numSecondElems; index++) {
            Object firstElem = firstList.get(index);
            Object secondElem = secondList.get(index);
            int elemCompare = compareObjects(firstElem, secondElem);
            if (elemCompare != 0) return elemCompare;
        }

        // ran out of elements to compare, need to base things on number of elements at this point
        if (numSecondElems > numFirstElems) return -1; // right order
        if (numSecondElems < numFirstElems) return 1; // wrong order
        return 0;
    }
    static int comparePackets(List<Object> firstPacket, List<Object> secondPacket) {
        int result = compareObjects(firstPacket, secondPacket);
        if (result == 0) {
            System.out.println("Packets cannot be compared, firstPacket = " + firstPacket + ", secondPacket = " + secondPacket);
        }
        return result;
    }
    public static void main(String[] args) throws IOException {
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\13\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\13\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        // isPart2 = true;
        int sumCorrectOrderIndices = 0;

        // read file
        boolean isFirst = true;
        List<Object> firstPacket = null;
        List<Object> secondPacket = null;
        int currentIndex = 1;
        for (String line : lines) {
            if (line.length() != 0) {
                if (isFirst) {
                    firstPacket = parseLine(line);
                    isFirst = false;
                    continue;
                }
                // !isFirst (second packet)
                secondPacket = parseLine(line);
                isFirst = true;
                if (comparePackets(firstPacket, secondPacket) == -1) {
                    sumCorrectOrderIndices += currentIndex;
                }
                currentIndex++;
            }
        }

        System.out.println("# lines = " + lines.size());

        System.out.println("currentIndex = " + currentIndex);
        System.out.println("sumCorrectOrderIndices = " + sumCorrectOrderIndices);

        testCompare();
    }

    static void testCompare() {
        // TEST CASES FOR COMPARISON, FOR PART 1

        List<Object> firstPacket = null;
        List<Object> secondPacket = null;
        int result;
        int expectedResult;
        List<Object> tempList1;
        List<Object> tempList2;

        firstPacket = new ArrayList<Object>();
        firstPacket.add(1);
        firstPacket.add(1);
        firstPacket.add(3);
        firstPacket.add(1);
        firstPacket.add(1);
        secondPacket = new ArrayList<Object>();
        secondPacket.add(1);
        secondPacket.add(1);
        secondPacket.add(5);
        secondPacket.add(1);
        secondPacket.add(1);
        result = comparePackets(firstPacket, secondPacket);
        System.out.println("firstPacket = " + firstPacket);
        System.out.println("secondPacket = " + secondPacket);
        System.out.println("result = " + result + (result < 0 ? " (right order)" : " (wrong order)"));
        expectedResult = -1;
        System.out.println("test 1 " + (result == expectedResult ? "PASS" : "FAIL"));

        firstPacket = new ArrayList<Object>();
        tempList1 = new ArrayList<Object>();
        tempList1.add(1);
        firstPacket.add(tempList1);
        tempList1 = new ArrayList<Object>();
        tempList1.add(2);
        tempList1.add(3);
        tempList1.add(4);
        firstPacket.add(tempList1);
        secondPacket = new ArrayList<Object>();
        tempList1 = new ArrayList<Object>();
        tempList1.add(1);
        secondPacket.add(tempList1);
        secondPacket.add(4);
        result = comparePackets(firstPacket, secondPacket);
        System.out.println("firstPacket = " + firstPacket);
        System.out.println("secondPacket = " + secondPacket);
        System.out.println("result = " + result + (result < 0 ? " (right order)" : " (wrong order)"));
        expectedResult = -1;
        System.out.println("test 2 " + (result == expectedResult ? "PASS" : "FAIL"));

        firstPacket = new ArrayList<Object>();
        firstPacket.add(9);
        secondPacket = new ArrayList<Object>();
        tempList1 = new ArrayList<Object>();
        tempList1.add(8);
        tempList1.add(7);
        tempList1.add(6);
        secondPacket.add(tempList1);
        result = comparePackets(firstPacket, secondPacket);
        System.out.println("firstPacket = " + firstPacket);
        System.out.println("secondPacket = " + secondPacket);
        System.out.println("result = " + result + (result < 0 ? " (right order)" : " (wrong order)"));
        expectedResult = 1;
        System.out.println("test 3 " + (result == expectedResult ? "PASS" : "FAIL"));

        firstPacket = new ArrayList<Object>();
        tempList1 = new ArrayList<Object>();
        tempList1.add(4);
        tempList1.add(4);
        firstPacket.add(tempList1);
        firstPacket.add(4);
        firstPacket.add(4);
        secondPacket = new ArrayList<Object>();
        secondPacket.add(tempList1);
        secondPacket.add(4);
        secondPacket.add(4);
        secondPacket.add(4);
        result = comparePackets(firstPacket, secondPacket);
        System.out.println("firstPacket = " + firstPacket);
        System.out.println("secondPacket = " + secondPacket);
        System.out.println("result = " + result + (result < 0 ? " (right order)" : " (wrong order)"));
        expectedResult = -1;
        System.out.println("test 4 " + (result == expectedResult ? "PASS" : "FAIL"));

        firstPacket = new ArrayList<Object>();
        firstPacket.add(7);
        firstPacket.add(7);
        firstPacket.add(7);
        firstPacket.add(7);
        secondPacket = new ArrayList<Object>();
        secondPacket.add(7);
        secondPacket.add(7);
        result = comparePackets(firstPacket, secondPacket);
        System.out.println("firstPacket = " + firstPacket);
        System.out.println("secondPacket = " + secondPacket);
        System.out.println("result = " + result + (result < 0 ? " (right order)" : " (wrong order)"));
        expectedResult = 1;
        System.out.println("test 5 " + (result == expectedResult ? "PASS" : "FAIL"));

        firstPacket = new ArrayList<Object>();
        secondPacket = new ArrayList<Object>();
        secondPacket.add(3);
        result = comparePackets(firstPacket, secondPacket);
        System.out.println("firstPacket = " + firstPacket);
        System.out.println("secondPacket = " + secondPacket);
        System.out.println("result = " + result + (result < 0 ? " (right order)" : " (wrong order)"));
        expectedResult = -1;
        System.out.println("test 6 " + (result == expectedResult ? "PASS" : "FAIL"));

        firstPacket = new ArrayList<Object>();
        tempList1 = new ArrayList<Object>();
        tempList2 = new ArrayList<Object>();
        tempList1.add(tempList2);
        firstPacket.add(tempList1);
        secondPacket = new ArrayList<Object>();
        secondPacket.add(tempList2);
        result = comparePackets(firstPacket, secondPacket);
        System.out.println("firstPacket = " + firstPacket);
        System.out.println("secondPacket = " + secondPacket);
        System.out.println("result = " + result + (result < 0 ? " (right order)" : " (wrong order)"));
        expectedResult = 1;
        System.out.println("test 7 " + (result == expectedResult ? "PASS" : "FAIL"));

        List<Object> tempList3, tempList4;
        firstPacket = new ArrayList<Object>();
        firstPacket.add(1);
        tempList1 = new ArrayList<Object>();
        tempList1.add(2);
        tempList2 = new ArrayList<Object>();
        tempList2.add(3);
        tempList3 = new ArrayList<Object>();
        tempList3.add(4);
        tempList4 = new ArrayList<Object>();
        tempList4.add(5);
        tempList4.add(6);
        tempList4.add(7);
        tempList3.add(tempList4);
        tempList2.add(tempList3);
        tempList1.add(tempList2);
        firstPacket.add(tempList1);
        firstPacket.add(8);
        firstPacket.add(9);
        secondPacket = new ArrayList<Object>();
        secondPacket.add(1);
        tempList1 = new ArrayList<Object>();
        tempList1.add(2);
        tempList2 = new ArrayList<Object>();
        tempList2.add(3);
        tempList3 = new ArrayList<Object>();
        tempList3.add(4);
        tempList4 = new ArrayList<Object>();
        tempList4.add(5);
        tempList4.add(6);
        tempList4.add(0);
        tempList3.add(tempList4);
        tempList2.add(tempList3);
        tempList1.add(tempList2);
        secondPacket.add(tempList1);
        secondPacket.add(8);
        secondPacket.add(9);
        result = comparePackets(firstPacket, secondPacket);
        System.out.println("firstPacket = " + firstPacket);
        System.out.println("secondPacket = " + secondPacket);
        System.out.println("result = " + result + (result < 0 ? " (right order)" : " (wrong order)"));
        expectedResult = 1;
        System.out.println("test 8 " + (result == expectedResult ? "PASS" : "FAIL"));
    }

    void snippets() {
        // Basic data structures:
        // Deque<Integer> maxSums = new ArrayDeque<Integer>();
        // List<Integer> sums = new ArrayList<Integer>();
        // ArrayList<ArrayDeque<String>> stacks = new ArrayList<ArrayDeque<String>>();

        // Use of Integer.parseInt():
        // sum += Integer.parseInt(line);

        // Use of replaceAll() and split():
        // String[] fields = line.replaceAll("\\s+$", "").split(" ");

        // Use of substring():
        // String comp1 = line.substring(0, line.length() / 2);
        // String comp2 = line.substring(line.length() / 2, line.length());

        // Use of indexOf():
        // if (comp2.indexOf(duplicate) > -1) {
        //     break;
        // }

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

        // Moving from one deque to another, as stack:
        // destStack.addLast(sourceStack.removeLast());

        // Using toArray to convert to array, print it out:
        // Object[] stack = stacks.get(i).toArray();
        // for (int j = 0; j < stack.length; j++) {
        //     System.out.print(stack[j] + " ");
        // }
        // System.out.println();

        // Part 2 flagging:
        // boolean isPart2 = true;

        // Perform set number of rounds:
        // int interval = isPart2 ? 1000 : 1;
        // int numRounds = isPart2 ? 10000 : 20;
        // for (int round = 1; round <= numRounds; round++) {
        //     if (round == 1 || round == 20 || round % interval == 0) System.out.println("Round: " + round);
        //     performRound();
        //     // if (!isPart2) printWorryLevels();
        //     // if (isPart2) printWorryLevelMods();
        //     if (round == 1 || round == 20 || round % interval == 0) printNumInspects();
        // }

        // Rows and columns to make a greid:
        // numRows = lines.size();
        // numCols = lines.get(0).length();
        // numPoints = numRows * numCols;
        // grid = new char[numRows][numCols];
    }
}

import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

public class Day11 {
    static int cycleNum;
    static int xRegValue;
    static int totalSignalStrength;
    static void tick() {
        // Part 2
        int delta = Math.abs((cycleNum % 40) - xRegValue);
        // System.out.println("cycleNum % 40 = " + cycleNum % 40 + ", xRegValue = " + xRegValue + ", delta = " + delta);
        System.out.print((delta <= 1) ? "#" : ".");
        if (cycleNum > 0 && cycleNum % 40 == 39) System.out.println();

        cycleNum += 1;

        // Part 1
        if (cycleNum == 20 || ((cycleNum - 20) % 40 == 0 && cycleNum <= 220)) {
            int signalStrength = cycleNum * xRegValue;
            totalSignalStrength += signalStrength;
            // System.out.println(
            //     "cycleNum = " + cycleNum + ", xRegValue = " + xRegValue + ", signalStrength = " + signalStrength
            //      + ", new totalSignalStrength = " + totalSignalStrength);
        }
    }

    public static void main(String[] args) throws IOException {
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\11\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\11\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);

        // read file
        cycleNum = 0;
        xRegValue = 1;
        totalSignalStrength = 0;
        for (String line : lines) {
            if (line.length() != 0) {
                String[] fields = line.split(" ");
                String instruction = fields[0];
                if (instruction.equals("noop")) {
                    tick();
                    continue;
                }
                if (instruction.equals("addx")) {
                    int argument = Integer.parseInt(fields[1]);
                    tick();
                    tick();
                    xRegValue += argument;
                    continue;
                }
            }
        }

        System.out.println("# lines = " + lines.size());

        // Part 1

        System.out.println("cycleNum = " + cycleNum);
        System.out.println("xRegValue = " + xRegValue);
        System.out.println("totalSignalStrength = " + totalSignalStrength);
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

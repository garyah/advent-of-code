import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

// class Coordinates {
//     public int x;
//     public int y;
//     Coordinates(int x, int y) {
//         this.x = x;
//         this.y = y;
//     }
//     boolean equals(Coordinates other) {
//         return (this.x == other.x && this.y == other.y);
//     }
// }

public class Day10 {
    static Set<String> visited;
    static int xHead;
    static int yHead;
    static int xTail;
    static int yTail;
    static int numTailVisited;
    static boolean isHeadUp() {
        return xHead == xTail && yHead > yTail;
    }
    static boolean isHeadUpAndRight() {
        return xHead > xTail && yHead > yTail;
    }
    static boolean isHeadRight() {
        return xHead > xTail && yHead == yTail;
    }
    static boolean isHeadDownAndRight() {
        return xHead > xTail && yTail > yHead;
    }
    static boolean isHeadDown() {
        return xHead == xTail && yTail > yHead;
    }
    static boolean isHeadDownAndLeft() {
        return xTail > xHead && yTail > yHead;
    }
    static boolean isHeadLeft() {
        return xTail > xHead && yTail == yHead;
    }
    static boolean isHeadUpAndLeft() {
        return xTail > xHead && yHead > yTail;
    }
    static void updatePositions(String command) {
        int xDelta = command.equals("R") ? 1 : (command.equals("L") ? -1 : 0);
        int yDelta = command.equals("U") ? 1 : (command.equals("D") ? -1 : 0);
        if (isHeadUp() && yDelta == 1 || isHeadDown() && yDelta == -1) {
            yTail += yDelta;
        } else if (isHeadRight() && xDelta == 1 || isHeadLeft() && xDelta == -1) {
            xTail += xDelta;
        } else if (isHeadUpAndRight() && (yDelta == 1 || xDelta == 1)) {
            xTail += 1;
            yTail += 1;
        } else if (isHeadDownAndRight() && (yDelta == -1 || xDelta == 1)) {
            xTail += 1;
            yTail -= 1;
        } else if (isHeadDownAndLeft() && (yDelta == -1 || xDelta == -1)) {
            xTail -= 1;
            yTail -= 1;
        } else if (isHeadUpAndLeft() && (yDelta == 1 || xDelta == -1)) {
            xTail -= 1;
            yTail += 1;
        }
        String tailCoordinates = new String(xTail + "," + yTail);
        xHead += xDelta;
        yHead += yDelta;
        if (!visited.contains(tailCoordinates)) {
            // System.out.println("newly visited: head x = " + xHead + " y = " + yHead + ", tail x = " + xTail + " y = " + yTail);
            numTailVisited++;
            visited.add(tailCoordinates);
        }
        // System.out.println("after: head x = " + xHead + " y = " + yHead + ", tail x = " + xTail + " y = " + yTail);
    }


    static int cycleNum;
    static int xRegValue;
    static int totalSignalStrength;
    static void tick() {
        cycleNum += 1;
        if (cycleNum == 20 || ((cycleNum - 20) % 40 == 0 && cycleNum <= 220)) {
            int signalStrength = cycleNum * xRegValue;
            totalSignalStrength += signalStrength;
            System.out.println(
                "cycleNum = " + cycleNum + ", xRegValue = " + xRegValue + ", signalStrength = " + signalStrength
                 + ", new totalSignalStrength = " + totalSignalStrength);
        }
    }

    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\10\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\10\\sample_input_2.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\10\\input.txt");
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
                    if (argument == -1) {
                        System.out.println("before addx -1, cycleNum = " + cycleNum + ", xRegValue = " + xRegValue);
                    }
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

        // Part 2
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

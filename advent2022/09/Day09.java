import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

public class Day09 {
    static int xHead;
    static int yHead;
    static int xTail;
    static int yTail;
    static Set<String> visited;
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
        // System.out.println("before: head x = " + xHead + " y = " + yHead + ", tail x = " + xTail + " y = " + yTail);
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
    static void drawGrid() {
        for (int y = 4; y >= 0; y--) {
            for (int x = 0; x < 6; x++) {
                if (x == xHead && y == yHead) {
                    System.out.print("H");
                    continue;
                }
                if (x == xTail && y == yTail) {
                    System.out.print("T");
                    continue;
                }
                if (x == 0 && y == 0) {
                    System.out.print("s");
                    continue;
                }
                System.out.print(".");
            }
            System.out.println();
        }
        System.out.println();
    }
    static void drawVisited() {
        for (int y = 4; y >= 0; y--) {
            for (int x = 0; x < 6; x++) {
                if (x == 0 && y == 0) {
                    System.out.print("s");
                    continue;
                }
                String tailCoordinates = new String(x + "," + y);
                if (visited.contains(tailCoordinates)) {
                    System.out.print("#");
                    continue;
                }
                System.out.print(".");
            }
            System.out.println();
        }
        System.out.println();
    }
    public static void main(String[] args) throws IOException {
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\09\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\09\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);

        // read file, updating positions in line
        xHead = 0;
        yHead = 0;
        xTail = 0;
        yTail = 0;
        visited = new HashSet<String>();
        visited.add(new String(0 + "," + 0));
        numTailVisited = 1;
        drawGrid();
        for (String line : lines) {
            if (line.length() != 0) {
                System.out.println(line);
                String[] fields = line.split(" ");
                String command = fields[0];
                int distance = Integer.parseInt(fields[1]);
                for (int i = 0; i < distance; i++) {
                    updatePositions(command);
                    drawGrid();
                }
            }
        }
        drawVisited();

        System.out.println("# lines = " + lines.size());
        System.out.println("head x = " + xHead + " y = " + yHead + ", tail x = " + xTail + " y = " + yTail);

        // Part 1, 2 knots in the rope

        System.out.println("numTailVisited = " + numTailVisited);

        // Part 2, 10 knots in the rope
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
        //
        // A grid of rows and cols:
        // int numRows = lines.size();
        // int numCols = lines.get(0).length();
        // int[][] grid = new int[numRows][numCols];
    }
}

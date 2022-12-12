import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;
import java.text.DecimalFormat;

public class Day12 {
    static int numRows;
    static int numCols;
    static int numPoints;
    static char[][] grid;
    static int startRow;
    static int startCol;
    static int endRow;
    static int endCol;
    static long[] pathWeight;
    static int[] previous;
    static DecimalFormat decimalFormat = new DecimalFormat("00000000000000000000");
    static PriorityQueue<String> remaining;
    static boolean isPart2;

    static void printGrid() {
        for (int row = 0; row < numRows; row++) {
            for (int col = 0; col < numCols; col++) {
                if (row == startRow && col == startCol) {
                    System.out.print("S");
                    continue;
                }
                if (row == endRow && col == endCol) {
                    System.out.print("E");
                    continue;
                }
                System.out.print((char)(grid[row][col] + 'a'));
            }
            System.out.println();
        }
        System.out.println();
    }
    static List<Integer> getAdjacentPoints(int pointIdx) {
        List<Integer> adjacentPoints = new ArrayList<Integer>();
        int row = pointIdx / numCols;
        int col = pointIdx % numCols;

        // end point has nothing adjacent
        if (row == endRow && col == endCol) return adjacentPoints;

        if (col > 0 && grid[row][col - 1] <= grid[row][col] + 1) adjacentPoints.add(pointIdx - 1);
        if (col < numCols - 1 && grid[row][col + 1] <= grid[row][col] + 1) adjacentPoints.add(pointIdx + 1);
        if (row > 0 && grid[row - 1][col] <= grid[row][col] + 1) adjacentPoints.add(pointIdx - numCols);
        if (row < numRows - 1 && grid[row + 1][col] <= grid[row][col] + 1) adjacentPoints.add(pointIdx + numCols);
        return adjacentPoints;
    }
    static void initDijkstra() {
        pathWeight = new long[numPoints];
        previous = new int[numPoints];
        remaining = new PriorityQueue<String>();

        int pointIdx = 0;
        for (int row = 0; row < numRows; row++) {
            for (int col = 0; col < numCols; col++, pointIdx++) {
                if (row == startRow && col == startCol) {
                    pathWeight[pointIdx] = 0;
                    String point = decimalFormat.format(0) + "," + decimalFormat.format(pointIdx);
                    // System.out.println(point);
                    remaining.add(point);
                    continue;
                }
                pathWeight[pointIdx] = Long.MAX_VALUE;
                String point = decimalFormat.format(Long.MAX_VALUE) + "," + decimalFormat.format(pointIdx);
                // System.out.println(point);
                remaining.add(point);
            }
        }
    }
    static boolean dijkstra() {
        initDijkstra();
        while (!remaining.isEmpty()) {
            String point = remaining.remove();
            // System.out.print(point + ": ");
            String[] fields = point.split(",");
            int pointIdx = Integer.parseInt(fields[1]);

            if (pathWeight[pointIdx] == Long.MAX_VALUE) { // nothing but infinite weights left, done!
                // System.out.println();
                continue;
            }
            List<Integer> adjacentPoints = getAdjacentPoints(pointIdx);
            // if (adjacentPoints.isEmpty()) break; // reached the end point (but other points can trip this prematurely!)

            for (int adjacentPointIdx : adjacentPoints) {
                // System.out.print(adjacentPointIdx + " ");

                long candidateWeight = pathWeight[pointIdx] + 1;
                if (candidateWeight < 0) {
                    System.out.println("Overflow detected, pointIdx = " + pointIdx + ", candidateWeight = " + candidateWeight);
                    return false;
                    // throw new Exception("Overflow");
                }
                long currentWeight = pathWeight[adjacentPointIdx];
                if (candidateWeight < currentWeight) {
                    pathWeight[adjacentPointIdx] = candidateWeight;
                    previous[adjacentPointIdx] = pointIdx;

                    String adjacentPoint = decimalFormat.format(currentWeight) + "," + decimalFormat.format(adjacentPointIdx);
                    remaining.remove(adjacentPoint);
                    adjacentPoint = decimalFormat.format(candidateWeight) + "," + decimalFormat.format(adjacentPointIdx);
                    remaining.add(adjacentPoint);
                }
            }
            // System.out.println();
        }
        return true;
    }
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\12\\sample_input.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\12\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        numRows = lines.size();
        numCols = lines.get(0).length();
        numPoints = numRows * numCols;
        grid = new char[numRows][numCols];
        // isPart2 = true;

        // read file
        int row = 0;
        for (String line : lines) {
            // if (lineLength != 0) {
            // }
            for (int i = 0; i < line.length() && i < numCols; i++) {
                char c = line.charAt(i);
                if (c == 'S') {
                    startRow = row;
                    startCol = i;
                    c = 'a';
                }
                if (c == 'E') {
                    endRow = row;
                    endCol = i;
                    c = 'z';
                }
                grid[row][i] = (char)(c - 'a');
            }
            row++;
        }

        System.out.println("# lines = " + lines.size() + ", numRows = " + numRows + ", numCols = " + numCols + ", numPoints = " + numPoints);

        // print grid
        printGrid();

        // run Dijkstra on the grid
        if (!dijkstra()) {
            System.out.println("Overflow detected");
            return;
        }
        int endPointIdx = endRow * numCols + endCol;
        long minNumSteps = pathWeight[endPointIdx];
        System.out.println("minNumSteps = " + minNumSteps);
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
    }
}

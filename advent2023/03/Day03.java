import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

public class Day03 {
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\03\\sample_input.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\03\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int nRows = lines.size();
        System.out.println("# lines / nRows = " + nRows);
        int nCols = lines.get(0).length();
        System.out.println("first line length / nCols = " + nCols);

        char[][] grid = new char[nRows][nCols];

        makeGrid(lines, grid);

        // Part 1: find sum of part numbers (with adjacent non-periods)
        System.out.println("part 1: sum of part numbers = " + findSumPartNumbers(grid));

        // Part 2: find sum of gear ratios (product of part numbers adjacent to *)
        System.out.println("part 2: sum of gear ratios = " + findSumGearRatios(grid));
    }

    private static void makeGrid(List<String> lines, char[][] grid) {
        int r = 0;
        int c = 0;
        for (String line : lines) {
            if (line.length() != 0) {
                for (int i = 0; i < line.length(); i++) {
                    grid[r][c++] = line.charAt(i);
                }
                c = 0;
                r++;
            }
        }
    }

    private static int findSumPartNumbers(char[][] grid) {
        int sumPartNumbers = 0;

        int nRows = grid.length;
        int nCols = grid[0].length;
        StringBuilder partNumber = new StringBuilder();
        for (int r = 0; r < nRows; r++) {
            for (int c = 0; c <= nCols; c++) {
                if (c < nCols && Character.isDigit(grid[r][c])) {
                    partNumber.append(grid[r][c]);
                    continue;
                }
                if (partNumber.length() > 0 && isAdjacentNonPeriod(grid, r, c - partNumber.length(), c - 1)) {
                    // System.out.println(Integer.parseInt(partNumber.toString()));
                    sumPartNumbers += Integer.parseInt(partNumber.toString());
                }
                partNumber = new StringBuilder();
            }
        }

        return sumPartNumbers;
    }

    private static boolean isAdjacentNonPeriod(char[][] grid, int row, int startCol, int endCol) {
        // System.out.println(row + ", " + startCol + ", " + endCol);
        int nRows = grid.length;
        int nCols = grid[0].length;
        int r = -1;
        if (startCol > 0) {
            if (grid[row][startCol - 1] != '.') {/*System.out.println(row + ", " + (startCol - 1));*/ return true;}
        }
        if (endCol < nCols - 1) {
            if (grid[row][endCol + 1] != '.') {/*System.out.println(row + ", " + (endCol + 1));*/ return true;}
        }
        if (row > 0) {
            r = row - 1;
            for (int c = (startCol > 0 ? startCol - 1 : startCol);
                c <= (endCol < nCols - 1 ? endCol + 1 : endCol);
                c++) {
                if (grid[r][c] != '.') {/*System.out.println(r + ", " + c);*/ return true;}
            }
        }
        if (row < nRows - 1) {
            r = row + 1;
            for (int c = (startCol > 0 ? startCol - 1 : startCol);
                c <= (endCol < nCols - 1 ? endCol + 1 : endCol);
                c++) {
                if (grid[r][c] != '.') {/*System.out.println(r + ", " + c);*/ return true;}
            }
        }
        return false;
    }

    private static int findSumGearRatios(char[][] grid) {
        int sumGearRatios = 0;

        int nRows = grid.length;
        int nCols = grid[0].length;
        StringBuilder partNumber = new StringBuilder();
        Map<Integer, Integer[]> starMap = new HashMap<>();
        for (int r = 0; r < nRows; r++) {
            for (int c = 0; c <= nCols; c++) {
                if (c < nCols && Character.isDigit(grid[r][c])) {
                    partNumber.append(grid[r][c]);
                    continue;
                }
                if (partNumber.length() > 0) {
                    int starPos = adjacentStar(grid, r, c - partNumber.length(), c - 1);
                    if (starPos != -1) {
                        // System.out.println(Integer.parseInt(partNumber.toString()));
                        int partNum = Integer.parseInt(partNumber.toString());

                        if (starMap.containsKey(starPos)) {
                            Integer[] value = starMap.get(starPos);
                            value[1] = value[1] == 0 ? partNum : -value[1];
                            starMap.put(starPos, value);
                        } else {
                            starMap.put(starPos, new Integer[] {partNum, 0});
                        }
                    }
                }
                partNumber = new StringBuilder();
            }
        }

        for (Map.Entry<Integer, Integer[]> entry : starMap.entrySet()) {
            Integer[] value = entry.getValue();
            if (value[1] <= 0) continue;
            sumGearRatios += value[0] * value[1];
        }

        return sumGearRatios;
    }

    private static int adjacentStar(char[][] grid, int row, int startCol, int endCol) {
        // System.out.println(row + ", " + startCol + ", " + endCol);
        int nRows = grid.length;
        int nCols = grid[0].length;
        int r = -1;
        if (startCol > 0) {
            if (grid[row][startCol - 1] == '*') {/*System.out.println(row + ", " + (startCol - 1));*/ return row * nCols + startCol - 1;}
        }
        if (endCol < nCols - 1) {
            if (grid[row][endCol + 1] == '*') {/*System.out.println(row + ", " + (endCol + 1));*/ return row * nCols + endCol + 1;}
        }
        if (row > 0) {
            r = row - 1;
            for (int c = (startCol > 0 ? startCol - 1 : startCol);
                c <= (endCol < nCols - 1 ? endCol + 1 : endCol);
                c++) {
                if (grid[r][c] == '*') {/*System.out.println(r + ", " + c);*/ return r * nCols + c;}
            }
        }
        if (row < nRows - 1) {
            r = row + 1;
            for (int c = (startCol > 0 ? startCol - 1 : startCol);
                c <= (endCol < nCols - 1 ? endCol + 1 : endCol);
                c++) {
                if (grid[r][c] == '*') {/*System.out.println(r + ", " + c);*/ return r * nCols + c;}
            }
        }
        return -1;
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

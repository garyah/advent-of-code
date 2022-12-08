import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

public class Day09 {
    static boolean isVisible(int[][] grid, int numRows, int numCols, int row, int col) {
        int height = grid[row][col];
        boolean isVisible;

        // go right
        isVisible = true;
        for (int c = col + 1; c < numCols; c++) {
            if (height <= grid[row][c]) isVisible = false;
        }
        if (isVisible) return true;

        // go down
        isVisible = true;
        for (int r = row + 1; r < numRows; r++) {
            if (height <= grid[r][col]) isVisible = false;
        }
        if (isVisible) return true;

        // go left
        isVisible = true;
        for (int c = col - 1; c >= 0; c--) {
            if (height <= grid[row][c]) isVisible = false;
        }
        if (isVisible) return true;

        // go up
        isVisible = true;
        for (int r = row - 1; r >= 0; r--) {
            if (height <= grid[r][col]) isVisible = false;
        }
        if (isVisible) return true;

        return isVisible;
    }

    static int getScore(int[][] grid, int numRows, int numCols, int row, int col) {
        int height = grid[row][col];
        // int score;

        // go right
        int rightDistance = 0;
        for (int c = col + 1; c < numCols; c++) {
            rightDistance++;
            if (height <= grid[row][c]) break;
        }

        // go down
        int downDistance = 0;
        for (int r = row + 1; r < numRows; r++) {
            downDistance++;
            if (height <= grid[r][col]) break;
        }

        // go left
        int leftDistance = 0;
        for (int c = col - 1; c >= 0; c--) {
            leftDistance++;
            if (height <= grid[row][c]) break;
        }

        // go up
        int upDistance = 0;
        for (int r = row - 1; r >= 0; r--) {
            upDistance++;
            if (height <= grid[r][col]) break;
        }

        int score = rightDistance * downDistance * leftDistance * upDistance;

        // DEBUG
        if (row == 3 && col == 2) {
            // System.out.println(upDistance);
            // System.out.println(leftDistance);
            // System.out.println(rightDistance);
            // System.out.println(downDistance);
            // System.out.println(score);
        }

        return score;
    }

    public static void main(String[] args) throws IOException {
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\09\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\09\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int numRows = lines.size();
        int numCols = lines.get(0).length();
        int[][] grid = new int[numRows][numCols];

        // read file
        int row = 0;
        for (String line : lines) {
            if (line.length() != 0) {
                for (int col = 0; col < numCols; col++) {
                    grid[row][col] = line.charAt(col);
                }
            }
            row++;
        }

        System.out.println("# lines = " + lines.size());
        System.out.println("numRows = " + numRows);
        System.out.println("numCols = " + numCols);

        // Part 1

        int numVisible = 0;
        numVisible += (numRows * 2 + numCols * 2 - 4);

        // traverse grid
        for (row = 1; row < numRows - 1; row++) {
            for (int col = 1; col < numCols - 1; col++) {
                if (isVisible(grid, numRows, numCols, row, col)) numVisible++;
            }
        }

        System.out.println("numVisible = " + numVisible);

        // Part 2

        int maxScore = 0;

        // traverse grid
        for (row = 1; row < numRows - 1; row++) {
            for (int col = 1; col < numCols - 1; col++) {
                maxScore = Math.max(maxScore, getScore(grid, numRows, numCols, row, col));
            }
        }

        System.out.println("maxScore = " + maxScore);
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

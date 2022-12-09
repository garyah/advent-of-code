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

    static Set<String> visited;
    static int xHead;
    static int yHead;
    static int xTail;
    static int yTail;
    static int numTailVisited;
    // static boolean isOverlapping() {
    //     return xHead == xTail && yHead == yTail;
    // }
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
    // static boolean isDiagonallyAdjacent() {
    //     return isHeadUpAndRight() || isHeadDownAndRight() || isHeadDownAndLeft() || isHeadUpAndLeft();
    // }
    // static void updatePositionsOld(int xDelta, int yDelta) {
    //     // System.out.println("before: head x = " + xHead + " y = " + yHead + ", tail x = " + xTail + " y = " + yTail);
    //     // System.out.println("move xDelta = " + xDelta + ", yDelta = " + yDelta);
    //     if (isOverlapping()) {
    //         // tail tracks head exactly for horizontal and vertical cases, beyond distance 1
    //         xTail += (xDelta + ((xDelta > 0) ? -1 : ((xDelta == 0) ? 0 : 1)));
    //         yTail += (yDelta + ((yDelta > 0) ? -1 : ((yDelta == 0) ? 0 : 1)));
    //     }
    //     else if (!isDiagonallyAdjacent()) {
    //         // tail tracks head exactly for horizontal and vertical cases
    //         xTail += xDelta;
    //         yTail += yDelta;
    //     }
    //     else if (isHeadUpAndRight()) {
    //         if (xDelta < 0 || yDelta < 0) {
    //             // left or down, no tail movement???
    //         }
    //     }
    //     else if (isHeadUpAndRight() && (xDelta < 0 || yDelta < 0) // left or down
    //              || isHeadDownAndRight() && (xDelta < 0 || yDelta > 0) // left or up
    //              || isHeadDownAndLeft() && (xDelta > 0 || yDelta > 0) // right or up
    //              || isHeadUpAndLeft() && (xDelta > 0 || yDelta < 0)) { // right or down
    //         // no tail movement for these diagonal cases
    //     }
    //     else if (isHeadUpAndRight() && yDelta > 0) { // up
    //         xTail += 1;
    //         yTail += yDelta;
    //     }
    //     else if (isHeadUpAndRight() && xDelta > 0) { // right
    //         xTail += xDelta;
    //         yTail += 1;
    //     }
    //     else if (isHeadDownAndRight() && yDelta < 0) { // down
    //         xTail += 1;
    //         yTail += yDelta;
    //     }
    //     else if (isHeadDownAndRight() && xDelta > 0) { // right
    //         xTail += xDelta;
    //         yTail -= 1;
    //     }
    //     else if (isHeadDownAndLeft() && yDelta < 0) { // down
    //         xTail -= 1;
    //         yTail += yDelta;
    //     }
    //     else if (isHeadDownAndLeft() && xDelta < 0) { // left
    //         xTail += xDelta;
    //         yTail -= 1;
    //     }
    //     else if (isHeadUpAndLeft() && yDelta > 0) { // up
    //         xTail -= 1;
    //         yTail += yDelta;
    //     }
    //     else if (isHeadUpAndLeft() && xDelta < 0) { // left
    //         xTail += xDelta;
    //         yTail += 1;
    //     }
    //     xHead += xDelta;
    //     yHead += yDelta;
    //     // System.out.println("after: head x = " + xHead + " y = " + yHead + ", tail x = " + xTail + " y = " + yTail);
    // }
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
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\09\\sample_input.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\09\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        // int numRows = lines.size();
        // int numCols = lines.get(0).length();
        // int[][] grid = new int[numRows][numCols];

        // read file
        xHead = 0;
        yHead = 0;
        xTail = 0;
        yTail = 0;
        numTailVisited = 1;
        visited = new HashSet<String>();
        visited.add(new String(0 + "," + 0));
        for (String line : lines) {
            if (line.length() != 0) {
                String[] fields = line.split(" ");
                String command = fields[0];
                int distance = Integer.parseInt(fields[1]);
                for (int i = 0; i < distance; i++) {
                    updatePositions(command);
                }
                // if (command.equals("R")) {
                //     updatePositions(distance, 0);
                //     continue;
                // }
                // if (command.equals("L")) {
                //     updatePositions(-distance, 0);
                //     continue;
                // }
                // if (command.equals("D")) {
                //     updatePositions(0, -distance);
                //     continue;
                // }
                // if (command.equals("U")) {
                //     updatePositions(0, distance);
                //     continue;
                // }
            }
        }

        System.out.println("# lines = " + lines.size());
        System.out.println("head x = " + xHead + " y = " + yHead + ", tail x = " + xTail + " y = " + yTail);

        // Part 1

        System.out.println("numTailVisited = " + numTailVisited);

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

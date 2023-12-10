import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

class Day10Answer {
    long numStepsFarthest;
    // long sumExtrapolatedP2;
}

public class Day10 {
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\10\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\10\\sample_input2.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\10\\input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int nRows = lines.size();
        System.out.println("# lines / nRows = " + nRows);
        int nCols = lines.get(0).length();
        System.out.println("first line length / nCols = " + nCols);
        // Scanner scanner = new Scanner(myPath);

        Day10Answer answer = solve(lines, nRows, nCols/*, scanner*/);

        // Part 1: Number of steps to farthest point on loop
        System.out.println("part 1: Number of steps to farthest point on loop = " + answer.numStepsFarthest);

        // Part 2: ...
        // System.out.println("part 2: ... = " + answer.sumExtrapolatedP2);
    }

    private static Day10Answer solve(List<String> lines, int nRows, int nCols/*, Scanner scanner */) {
        Day10Answer answer = new Day10Answer();
        
        char[][] sketch = parseSketch(lines, nRows, nCols);

        // Part 1
        answer.numStepsFarthest = findNumStepsFarthest(sketch, nRows, nCols);

        // Part 2
        // answer.sumExtrapolatedP2 = findSumExtrapolatedP2(sketch);

        return answer;
    }

    private static int findNumStepsFarthest(char[][] sketch, int nRows, int nCols) {
        // int numStepsFarthest = 0;

        // find S (starting point)
        Integer[] startCoords = getStartCoords(sketch, nRows, nCols);
        int startRow = startCoords[0];
        int startCol = startCoords[1];

        // walk loop in both directions, distances increasing
        // when same point reached in both directions, should be farthest point on loop from start
        return walkLoop(sketch, nRows, nCols, startRow, startCol);

        // return numStepsFarthest;
    }

    private static int walkLoop(char[][] sketch, int nRows, int nCols, int startRow, int startCol) {
        int numStepsFarthest = 0;

        System.out.println("startRow = " + startRow + ", startCol = " + startCol);

        boolean[][][] visited = new boolean[nRows][nCols][2];
        visited[startRow][startCol][0] = true;
        visited[startRow][startCol][1] = true;
        Integer[][] p = new Integer[][] {{startRow, startCol}, {startRow, startCol}};
        Integer[] startDirs = getDirs(sketch, nRows, nCols, startRow, startCol);
        for (int i = 0; i < p.length && i < startDirs.length; i++) {
            Integer[] dirs = new Integer[] {startDirs[i]};
            updatePos(p, i, dirs, visited);
        }
        numStepsFarthest++;
        do {
            for (int i = 0; i < p.length; i++) {
                Integer[] dirs = getDirs(sketch, nRows, nCols, p[i][0], p[i][1]);
                updatePos(p, i, dirs, visited);

                // System.out.println("point #" + i + ", row = " + p[i][0] + ", col = " + p[i][1]);
            }
            numStepsFarthest++;
        } while (p[0][0] != p[1][0] || p[0][1] != p[1][1]);

        return numStepsFarthest;
    }

    private static void updatePos(Integer[][] p, int idx, Integer[] dirs, boolean[][][] visited) {
        int r = p[idx][0];
        int c = p[idx][1];
        boolean done = false;
        for (int i = 0; i < dirs.length; i++) {
            switch (dirs[i]) {
                case 0:
                    // go right, if not visited
                    if (visited[r][c + 1][idx]) continue;
                    c++;
                    done = true;
                    break;
                case 1:
                    // go down, if not visited
                    if (visited[r + 1][c][idx]) continue;
                    r++;
                    done = true;
                    break;
                case 2:
                    // go left, if not visited
                    if (visited[r][c - 1][idx]) continue;
                    c--;
                    done = true;
                    break;
                case 3:
                    // go up, if not visited
                    if (visited[r - 1][c][idx]) continue;
                    r--;
                    done = true;
                    break;
                default:
                    break;
            }
            if (done) break;
        }
        p[idx][0] = r;
        p[idx][1] = c;
        visited[r][c][idx] = true;
    }

    private static Integer[] getDirs(char[][] sketch, int nRows, int nCols, int startRow, int startCol) {
        Integer[] startDirs = new Integer[] {-1, -1};

        // System.out.println("getDirs(): startRow = " + startRow + ", startCol = " + startCol);

        int i = 0;
        char c0 = sketch[startRow][startCol];
        char c = '.';
        if (startCol + 1 < nCols) { // look right
            if (c0 == '-' || c0 == 'F' || c0 == 'L' || c0 == 'S') {
                c = sketch[startRow][startCol + 1];
                if (c == '-' || c == '7' || c == 'J') startDirs[i++] = 0;
            }
        }
        if (startRow + 1 < nRows) { // look down
            if (c0 == '|' || c0 == 'F' || c0 == '7' || c0 == 'S') {
                c = sketch[startRow + 1][startCol];
                if (c == '|' || c == 'L' || c == 'J') startDirs[i++] = 1;
            }
        }
        if (startCol - 1 >= 0) { // look left
            if (c0 == '-' || c0 == '7' || c0 == 'J' || c0 == 'S') {
                c = sketch[startRow][startCol - 1];
                if (c == '-' || c == 'F' || c == 'L') startDirs[i++] = 2;
            }
        }
        if (startRow - 1 >= 0) { // look up
            if (c0 == '|' || c0 == 'L' || c0 == 'J' || c0 == 'S') {
                c = sketch[startRow - 1][startCol];
                if (c == '|' || c == 'F' || c == '7') startDirs[i++] = 3;
            }
        }

        // System.out.println("getDirs(): startDirs[0] = " + startDirs[0] + ", startDirs[1] = " + startDirs[1]);

        return startDirs;
    }

    private static Integer[] getStartCoords(char[][] sketch, int nRows, int nCols) {
        Integer[] startCoords = new Integer[] {-1, -1};

        for (int r = 0; r < nRows; r++) {
            for (int c = 0; c < nCols; c++) {
                if (sketch[r][c] == 'S') {
                    startCoords[0] = r;
                    startCoords[1] = c;
                    return startCoords;
                }
            }
        }

        return startCoords;
    }

    private static char[][] parseSketch(List<String> lines, int nRows, int nCols) {
        char[][] sketch = new char[nRows][nCols];

        int r = 0;
        for (String line : lines) {
            for (int c = 0; c < line.length(); c++) {
                sketch[r][c] = line.charAt(c);
            }
            r++;
        }

        // // scanner.useDelimiter("[ \\r]+");
        // while (scanner.hasNextLine()) {
        //     List<Long> history = new ArrayList<>();
        //     while (scanner.hasNextLong()) {
        //         Long value = scanner.nextLong();
        //         // System.out.print(value + " ");
        //         history.add(value);
        //     }
        //     sketch.add(history);
        //     scanner.nextLine();
        //     // System.out.println();
        // }

        return sketch;
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

        // Rows and columns to make a grid:
        // numRows = lines.size();
        // numCols = lines.get(0).length();
        // numPoints = numRows * numCols;
        // grid = new char[numRows][numCols];
    }
}

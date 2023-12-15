import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

class Day15Answer {
    long totalLoadP1;
    long totalLoadP2;
}

public class Day15 {
    public static void main(String[] args) throws IOException {
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\15\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\15\\sample_input2.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\15\\input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int nRows = lines.size();
        System.out.println("# lines / nRows = " + nRows);
        int nCols = 0; // lines.get(0).length();
        System.out.println("first line length / nCols = " + nCols);
        // Scanner scanner = new Scanner(myPath);

        Day15Answer answer = solve(lines, nRows, nCols/*, scanner*/);

        // Part 1: ...
        System.out.println("part 1: ... = " + answer.totalLoadP1);

        // Part 2: ...
        System.out.println("part 2: ... = " + answer.totalLoadP2);
    }

    private static Day15Answer solve(List<String> lines, int nRows, int nCols/*, Scanner scanner*/) {
        Day15Answer answer = new Day15Answer();
        
        char[][] pattern = parseInput(lines, nRows, nCols);

        // Part 1
        answer.totalLoadP1 = findAnswerP1(pattern, nRows, nCols);

        // Part 2
        answer.totalLoadP2 = findAnswerP2(pattern, nRows, nCols, 1000000000);

        return answer;
    }

    private static long findAnswerP2(char[][] pattern, int nRows, int nCols, int nCycles) {
        // for (int dir = 0; dir < 4; dir++) {
        //     moveAllInDir(pattern, nRows, nCols, dir);
        // }
        // char[][] savePattern = copyPattern(pattern, nRows, nCols);
        // int m = 0;
        // do {
        //     for (int dir = 0; dir < 4; dir++) {
        //         moveAllInDir(pattern, nRows, nCols, dir);
        //     }
        //     m++;
        //     if (m % 1000000 == 0) System.out.print(".");
        // } while (!arePatternsEqual(savePattern, nRows, nCols, pattern));
        // System.out.println("m = " + m);

        // move Os to top, left, bottom, right, in cycle, for certain number of cycles
        // for (int n = 0; n < nCycles; n++) {
        //     if (n % 1000000 == 0) System.out.print(".");
        //     for (int dir = 0; dir < 4; dir++) {
        //         moveAllInDir(pattern, nRows, nCols, dir);
        //     }
        // }

        // sum the loads of Os
        // return calcLoad(pattern, nRows, nCols);
        return 0;
    }

    private static long findAnswerP1(char[][] pattern, int nRows, int nCols) {
        // // move Os to top
        // for (int r = 0; r < nRows; r++) {
        //     for (int c = 0; c < nCols; c++) {
        //         if (pattern[r][c] == 'O') moveOneToTop(pattern, nRows, nCols, r, c);
        //     }
        // }

        // // sum the loads of Os
        // return calcLoad(pattern, nRows, nCols);
        return 0;
    }

    private static char[][] parseInput(
        List<String> lines, int nRows, int nCols
        // Scanner scanner
    ) {
        char[][] pattern = new char[nRows][nCols];

        int r = 0;
        for (String line : lines) {
            for (int c = 0; c < nCols; c++) {
                pattern[r][c] = line.charAt(c);
            }
            r++;
        }

        return pattern;

        // List<List<String>> patterns = new ArrayList<>();
        // List<String> pattern = new ArrayList<>();

        // for (String line : lines) {
        //     if (line.length() != 0) {
        //         pattern.add(line);
        //         // System.out.println(line);
        //         continue;
        //     }
        //     if (pattern.size() != 0) {
        //         patterns.add(pattern);
        //         pattern = new ArrayList<>();
        //     }
        //     // System.out.println();
        // }

        // if (pattern.size() != 0) {
        //     patterns.add(pattern);
        // }
        // return patterns;

        // scanner.useDelimiter("[ \\r]+");
        // scanner.useDelimiter("[ ]+");
        // while (scanner.hasNextLine()) {
        //     while (scanner.hasNext()) {
        //         String row = scanner.next();
        //         // pattern.add(row);
        //         System.out.println(row);
        //         scanner.nextLine();
        //     }
        //     while (scanner.hasNextLine() && !scanner.hasNext()) {
        //         System.out.println();
        //         scanner.nextLine();
        //     }
        // }
    }

    private static String reverse(String s) {
        StringBuilder sb = new StringBuilder(s);
        for (int i = 0, j = s.length() - 1; i < j; i++, j--) {
            char c = sb.charAt(i);
            sb.setCharAt(i, sb.charAt(j));
            sb.setCharAt(j, c);
        }
        return sb.toString();
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

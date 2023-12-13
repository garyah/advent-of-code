import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

class Day13Answer {
    long patternsSummaryP1;
    // long sumShortestPathsP2;
}

public class Day13 {
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\13\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\13\\sample_input2.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\13\\input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int nRows = lines.size();
        System.out.println("# lines / nRows = " + nRows);
        // int nCols = lines.get(0).length();
        // System.out.println("first line length / nCols = " + nCols);
        // Scanner scanner = new Scanner(myPath);

        Day13Answer answer = solve(lines/*, nRows, nCols, scanner*/);

        // Part 1: Summary of pattern reflections
        // 24923 is too low!!!
        // 594123 is too high!!!
        System.out.println("part 1: Summary of pattern reflections = " + answer.patternsSummaryP1);

        // Part 2: Sum of shortest paths
        // System.out.println("part 2: Sum of shortest paths, with much more expansion = " + answer.sumShortestPathsP2);
    }

    private static Day13Answer solve(List<String> lines/*, int nRows, int nCols, Scanner scanner*/) {
        Day13Answer answer = new Day13Answer();
        
        List<List<String>> patterns = parseInput(lines);

        // Part 1
        answer.patternsSummaryP1 = findAnswerP1(patterns);

        // Part 2
        // answer.sumShortestPathsP2 = findAnswerP2(input);

        return answer;
    }

    private static long findAnswerP1(List<List<String>> patterns) {
        long patternsSummaryP1 = 0;

        for (int i = 0; i < patterns.size(); i++) {
            List<String> pattern = patterns.get(i);

            patternsSummaryP1 += summarizePattern(pattern);
        }

        return patternsSummaryP1;
    }

    private static long summarizePattern(List<String> pattern) {
        int nCols = pattern.get(0).length();
        for (int c = 0; c < nCols - 1; c++) {
            if (isReflectedVertically(pattern, nCols, c)) {
                return c + 1;
            }
        }

        int nRows = pattern.size();
        for (int r = 0; r < nRows - 1; r++) {
            if (isReflectedHorizontally(pattern, nRows, r)) {
                return (r + 1) * 100;
            }
        }

        System.out.println("Something is wrong, no reflection found in pattern!");
        return 0L;
    }

    private static boolean isReflectedVertically(List<String> pattern, int nCols, int c) {
        int mid = nCols / 2;
        for (String row : pattern) {
            if (c < mid && row.substring(0, c + 1).equals(reverse(row.substring(c + 1, (c + 1) << 1)))
                || c >= mid && row.substring(((c + 1) << 1) - nCols, c + 1).equals(reverse(row.substring(c + 1, nCols)))) continue;
            return false;
        }
        return true;
    }

    private static boolean isReflectedHorizontally(List<String> pattern, int nRows, int r) {
        int mid = nRows / 2;
        if (r < mid) {
            for (int i = r, j = r + 1; i >= 0 && j < (r + 1) << 1; i--, j++) {
                if (pattern.get(i).equals(pattern.get(j))) continue;
                return false;
            }
            return true;
        }
        if (r >= mid) {
            for (int i = r, j = r + 1; i >= ((r + 1) << 1) - nRows && j < nRows; i--, j++) {
                if (pattern.get(i).equals(pattern.get(j))) continue;
                return false;
            }
            return true;
        }
        // not expected to be reached
        return false;
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

    private static List<List<String>> parseInput(
        List<String> lines/*, int nRows, int nCols, */
        // Scanner scanner
    ) {
        List<List<String>> patterns = new ArrayList<>();
        List<String> pattern = new ArrayList<>();

        for (String line : lines) {
            if (line.length() != 0) {
                pattern.add(line);
                // System.out.println(line);
                continue;
            }
            if (pattern.size() != 0) {
                patterns.add(pattern);
                pattern = new ArrayList<>();
            }
            // System.out.println();
        }

        if (pattern.size() != 0) {
            patterns.add(pattern);
        }
        return patterns;

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

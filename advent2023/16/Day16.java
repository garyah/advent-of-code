import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

class Day16Answer {
    long sumOfHashesP1;
    long focusPowerP2;
}

public class Day16 {
    public static void main(String[] args) throws IOException {
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\16\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\16\\sample_input2.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\16\\input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int nRows = lines.size();
        System.out.println("# lines / nRows = " + nRows);
        int nCols = 0; // lines.get(0).length();
        System.out.println("first line length / nCols = " + nCols);
        Scanner scanner = new Scanner(myPath);

        // Day16Answer answer = solve(lines, nRows, nCols, scanner);

        // Part 1: Sum of hashes
        // System.out.println("part 1: Sum of hashes = " + answer.sumOfHashesP1);

        // Part 2: Focusing power
        // System.out.println("part 2: Focusing power = " + answer.focusPowerP2);
    }

    private static Day16Answer solve(List<String> lines, int nRows, int nCols, Scanner scanner) {
        Day16Answer answer = new Day16Answer();
        
        List<String> steps = parseInput(/*lines, nRows, nCols*/scanner);

        // Part 1
        answer.sumOfHashesP1 = findAnswerP1(steps/*, nRows, nCols*/);

        // Part 2
        answer.focusPowerP2 = findAnswerP2(steps/*, nRows, nCols*/);

        return answer;
    }

    private static long findAnswerP2(List<String> steps/*, int nRows, int nCols, int nCycles*/) {
        long focusPowerP2 = 0;

        return focusPowerP2;
    }

    private static long findAnswerP1(List<String> steps/*, int nRows, int nCols*/) {
        long sumOfHashesP1 = 0;

        return sumOfHashesP1;
    }

    private static List<String> parseInput(
        // List<String> lines, int nRows, int nCols
        Scanner scanner
    ) {
        // char[][] pattern = new char[nRows][nCols];

        // int r = 0;
        // for (String line : lines) {
        //     for (int c = 0; c < nCols; c++) {
        //         pattern[r][c] = line.charAt(c);
        //     }
        //     r++;
        // }

        // return pattern;

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

        List<String> steps = new ArrayList<>();

        // scanner.useDelimiter("[ \\r]+");
        scanner.useDelimiter("[ \\r,]+");
        if (scanner.hasNextLine()) {
            while (scanner.hasNext()) {
                String step = scanner.next();
                steps.add(step);
                // System.out.println(step + ",");
                // scanner.nextLine();
            }
            // while (scanner.hasNextLine() && !scanner.hasNext()) {
            //     System.out.println();
            //     scanner.nextLine();
            // }
        }

        return steps;
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

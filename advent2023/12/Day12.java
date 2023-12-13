import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

class Day12Answer {
    long numTotalArrangementsP1;
    // long sumShortestPathsP2;
}

public class Day12 {
    public static void main(String[] args) throws IOException {
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\12\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\12\\sample_input2.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\12\\input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int nRows = lines.size();
        System.out.println("# lines / nRows = " + nRows);
        // int nCols = lines.get(0).length();
        // System.out.println("first line length / nCols = " + nCols);
        Scanner scanner = new Scanner(myPath);

        Day12Answer answer = solve(/*lines, nRows, nCols,*/ scanner);

        // Part 1: Total number of possible arrangements
        System.out.println("part 1: Total number of possible arrangements = " + answer.numTotalArrangementsP1);

        // Part 2: Sum of shortest paths
        // System.out.println("part 2: Sum of shortest paths, with much more expansion = " + answer.sumShortestPathsP2);
    }

    private static Day12Answer solve(/*List<String> lines, int nRows, int nCols, */ Scanner scanner) {
        Day12Answer answer = new Day12Answer();
        
        List<String> records = new ArrayList<>();
        List<List<Integer>> damageInfos = new ArrayList<>();
        parseInput(scanner, records, damageInfos);

        // Part 1
        answer.numTotalArrangementsP1 = findAnswerP1(records, damageInfos);

        // Part 2
        // answer.sumShortestPathsP2 = findAnswerP2(input);

        return answer;
    }

    private static long findAnswerP1(List<String> records, List<List<Integer>> damageInfos) {
        long numTotalArrangementsP1 = 0;

        for (int i = 0; i < records.size() && i < damageInfos.size(); i++) {
            String record = records.get(i);
            List<Integer> damageInfo = damageInfos.get(i);

            numTotalArrangementsP1 += recurse(record, 0, damageInfo, 0, new StringBuilder());
        }

        return numTotalArrangementsP1;
    }

    private static long recurse(String record, int recordIdx, List<Integer> damageInfo, int damageInfoIdx, StringBuilder processed) {
        int numDamaged = 0;
        while (recordIdx < record.length() && record.charAt(recordIdx) == '#') {
            numDamaged++;
            recordIdx++;
        }
        while (recordIdx < record.length() && record.charAt(recordIdx) == '.' || recordIdx == record.length()) {
            if (numDamaged > 0) {
                if (damageInfo.get(damageInfoIdx) != numDamaged) return 0;
                if (damageInfoIdx == damageInfo.size() - 1) return 1;
                damageInfoIdx++;
                numDamaged = 0;
            }
            if (recordIdx == record.length()) return 0;
            recordIdx++;
        }
        return 0;
    }

    private static void parseInput(
        /*List<String> lines, int nRows, int nCols, */
        Scanner scanner,
        List<String> records,
        List<List<Integer>> damageInfos
    ) {
        // for (String line : lines) {
        //     StringBuilder inputRow = new StringBuilder(line);
        //     input.add(inputRow);
        // }

        scanner.useDelimiter("[ \\r,]+");
        while (scanner.hasNextLine()) {
            String record = scanner.next();
            records.add(record);
            // System.out.print(record + " ");
            List<Integer> damageInfo = new ArrayList<>();
            while (scanner.hasNextInt()) {
                int value = scanner.nextInt();
                damageInfo.add(value);
                // System.out.print(value + ",");
            }
            damageInfos.add(damageInfo);
            // System.out.println();
            scanner.nextLine();
        }
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

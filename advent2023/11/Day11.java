import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

class Day11Answer {
    long sumShortestPaths;
    long sumShortestPathsP2;
}

public class Day11 {
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\11\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\11\\sample_input2.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\11\\input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int nRows = lines.size();
        System.out.println("# lines / nRows = " + nRows);
        int nCols = lines.get(0).length();
        System.out.println("first line length / nCols = " + nCols);
        // Scanner scanner = new Scanner(myPath);

        Day11Answer answer = solve(lines, nRows, nCols/*, scanner*/);

        // Part 1: Sum of shortest paths
        System.out.println("part 1: Sum of shortest paths = " + answer.sumShortestPaths);

        // Part 2: Sum of shortest paths
        System.out.println("part 2: Sum of shortest paths, with much more expansion = " + answer.sumShortestPathsP2);
    }

    private static Day11Answer solve(List<String> lines, int nRows, int nCols/*, Scanner scanner */) {
        Day11Answer answer = new Day11Answer();
        
        // List<StringBuilder> input = parseInput(lines);

        // List<StringBuilder> expanded = expandInput(input);
        // System.out.println("solve(): universe nRows = " + expanded.size());
        // System.out.println("solve(): universe nCols = " + expanded.get(0).length());

        // Part 1
        Integer[] rowIndices = new Integer[nRows];
        Integer[] colIndices = new Integer[nCols];
        setIndicesForExpansion(lines, 1, rowIndices, colIndices);
        List<Integer[]> galaxies = processGalaxiesImproved(lines, rowIndices, colIndices);
        System.out.println("solve(): number of galaxies = " + galaxies.size());
        answer.sumShortestPaths = findSumShortestPaths(galaxies);

        // Part 2
        rowIndices = new Integer[nRows];
        colIndices = new Integer[nCols];
        setIndicesForExpansion(lines, 1000 * 1000 - 1, rowIndices, colIndices);
        galaxies = processGalaxiesImproved(lines, rowIndices, colIndices);
        System.out.println("solve(): number of galaxies = " + galaxies.size());
        answer.sumShortestPathsP2 = findSumShortestPaths(galaxies);

        return answer;
    }

    private static List<Integer[]> processGalaxiesImproved(List<String> input, Integer[] rowIndices, Integer[] colIndices) {
        List<Integer[]> galaxies = new ArrayList<>();

        int r = 0;
        for (String row : input) {
            for (int c = 0; c < row.length(); c++) {
                if (row.charAt(c) == '#') {
                    galaxies.add(new Integer[] {rowIndices[r], colIndices[c]});
                }
            }
            r++;
        }

        return galaxies;
    }

    private static void setIndicesForExpansion(List<String> input, int expansionLevel, Integer[] rowIndices, Integer[] colIndices) {
        int nCols = colIndices.length;
        boolean[] isEmptyCols = new boolean[nCols];
        for (int c = 0; c < nCols; c++) {
            isEmptyCols[c] = true;
        }

        for (int r = 0; r < input.size(); r++) {
            String row = input.get(r);
            boolean isEmptyRow = true;
            for (int c = 0; c < row.length(); c++) {
                if (row.charAt(c) == '#') {
                    isEmptyRow = false;
                    isEmptyCols[c] = false;
                }
            }
            rowIndices[r] = (r == 0) ? 0 : rowIndices[r - 1] + 1;
            if (isEmptyRow) {
                rowIndices[r] += expansionLevel;
            }
        }

        for (int c = 0; c < nCols; c++) {
            colIndices[c] = (c == 0) ? 0 : colIndices[c - 1] + 1;
            if (isEmptyCols[c]) {
                colIndices[c] += expansionLevel;
            }
        }
    }

    private static long findSumShortestPaths(List<Integer[]> galaxies) {
        long sumShortestPaths = 0;

        // permute pairs of galaxies, to find their shortest paths, summing lengths
        int numGalaxies = galaxies.size();
        for (int i = 0; i < numGalaxies; i++) {
            for (int j = i + 1; j < numGalaxies; j++) {
                sumShortestPaths += manhattan(galaxies.get(i), galaxies.get(j));
            }
        }

        return sumShortestPaths;
    }

    private static int manhattan(Integer[] p1, Integer[] p2) {
        return Math.abs(p2[0] - p1[0]) + Math.abs(p2[1] - p1[1]);
    }

    private static List<Integer[]> processGalaxies(List<StringBuilder> expanded) {
        List<Integer[]> galaxies = new ArrayList<>();

        int r = 0;
        for (StringBuilder row : expanded) {
            for (int c = 0; c < row.length(); c++) {
                if (row.charAt(c) == '#') {
                    galaxies.add(new Integer[] {r, c});
                }
            }
            r++;
        }

        return galaxies;
    }

    private static List<StringBuilder> expandInput(List<StringBuilder> input) {
        List<StringBuilder> expanded = new ArrayList<>();

        int nCols = input.get(0).length();
        boolean[] isEmptyCols = new boolean[nCols];
        for (int c = 0; c < nCols; c++) {
            isEmptyCols[c] = true;
        }

        for (int i = 0; i < input.size(); i++) {
            StringBuilder row = input.get(i);
            expanded.add(row);
            boolean isEmptyRow = true;
            for (int j = 0; j < row.length(); j++) {
                if (row.charAt(j) == '#') {
                    isEmptyRow = false;
                    isEmptyCols[j] = false;
                }
            }
            if (isEmptyRow) {
                expanded.add(new StringBuilder(row));
            }
        }

        for (int i = 0; i < expanded.size(); i++) {
            StringBuilder row = expanded.get(i);
            for (int j = row.length() - 1; j >= 0; j--) {
                if (isEmptyCols[j]) {
                    row.insert(j, '.');
                }
            }
        }

        return expanded;
    }

    private static List<StringBuilder> parseInput(List<String> lines) {
        List<StringBuilder> input = new ArrayList<>();

        for (String line : lines) {
            StringBuilder inputRow = new StringBuilder(line);
            input.add(inputRow);
        }

        // // scanner.useDelimiter("[ \\r]+");
        // while (scanner.hasNextLine()) {
        //     List<Long> history = new ArrayList<>();
        //     while (scanner.hasNextLong()) {
        //         Long value = scanner.nextLong();
        //         // System.out.print(value + " ");
        //         history.add(value);
        //     }
        //     universe.add(history);
        //     scanner.nextLine();
        //     // System.out.println();
        // }

        return input;
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

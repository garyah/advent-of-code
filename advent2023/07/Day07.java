import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

class Day07Answer {
    // long waysProduct;
}

public class Day07 {
    public static void main(String[] args) throws IOException {
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\07\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\07\\input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int nRows = lines.size();
        System.out.println("# lines / nRows = " + nRows);
        // int nCols = lines.get(0).length();
        // System.out.println("first line length / nCols = " + nCols);
        Scanner scanner = new Scanner(myPath);

        Day07Answer answer = solve(lines, scanner);

        // Part 1: ...
        // System.out.println("part 1: ... = " + answer.waysProduct);

        // Part 2: ...
        // System.out.println("part 2: ... = " + answer.closestP2);
    }

    private static Day07Answer solve(List<String> lines, Scanner scanner) {
        Day07Answer answer = new Day07Answer();
        
        // List<Long> times = parseTimes(scanner);
        // List<Long> distances = parseDistances(scanner);

        // Part 1
        // answer.waysProduct = findWaysProduct(times, distances);

        // Part 2
        // Map<Long, Long> seedMap = seedListToMap(seeds);
        // List<Map<Long, Long[]>> sectionMaps = sectionsListToMap(sections);
        // answer.closestP2 = findClosestP2(seedMap, sectionMaps);

        return answer;
    }

    private static List<Long> parseTimes(Scanner scanner) {
        List<Long> times = new ArrayList<>();

        // scanner.useDelimiter("[\\p{javaWhitespace}]+");
        scanner.next("Time:");
        while (scanner.hasNextLong()) {
            long time = scanner.nextLong();
            times.add(time);
            // System.out.print(time + " ");
        }
        scanner.nextLine();
        // System.out.println();

        return times;
    }

    private static List<Long> parseDistances(Scanner scanner) {
        List<Long> distances = new ArrayList<>();

        // scanner.useDelimiter("[\\p{javaWhitespace}]+");
        scanner.next("Distance:");
        while (scanner.hasNextLong()) {
            long distance = scanner.nextLong();
            distances.add(distance);
            // System.out.print(distance + " ");
        }
        scanner.nextLine();
        // System.out.println();

        return distances;
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

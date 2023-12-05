import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

class Day05Answer {
    long closest;
}

public class Day05 {
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\sample_input2.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int nRows = lines.size();
        System.out.println("# lines / nRows = " + nRows);
        // int nCols = lines.get(0).length();
        // System.out.println("first line length / nCols = " + nCols);
        Scanner scanner = new Scanner(myPath);

        Day05Answer answer = solve(lines, scanner);

        // Part 1: closest location
        System.out.println("part 1: closest location = " + answer.closest);

        // Part 2: ...
        System.out.println("part 2: ... = " + answer);
    }

    private static Day05Answer solve(List<String> lines, Scanner scanner) {
        Day05Answer answer = new Day05Answer();
        
        List<Long> seeds = parseSeeds(scanner);
        List<List<Long[]>> sections = parseSections(scanner);

        // Part 1
        answer.closest = findClosest(seeds, sections);

        // Part 2

        return answer;
    }

    private static long findClosest(List<Long> seeds, List<List<Long[]>> sections) {
        long closest = Integer.MAX_VALUE;

        for (long value : seeds) {
            for (List<Long[]> section : sections) {
                for (Long[] rangeValues : section) {
                    if (value >= rangeValues[1] && value < rangeValues[1] + rangeValues[2]) {
                        value = rangeValues[0] + (value - rangeValues[1]);
                        break;
                    }
                }
            }

            closest = Math.min(closest, value);
        }

        return closest;
    }

    private static List<Long> parseSeeds(Scanner scanner) {
        List<Long> seeds = new ArrayList<>();

        // scanner.useDelimiter("[\\p{javaWhitespace}]+");
        scanner.next("seeds:");
        while (scanner.hasNextLong()) {
            long seed = scanner.nextLong();
            seeds.add(seed);
            // System.out.print(seed + " ");
        }
        // System.out.println();
        // System.out.println(scanner.nextLine());
        // System.out.println(scanner.nextLine());

        return seeds;
    }

    private static List<List<Long[]>> parseSections(Scanner scanner) {
        List<List<Long[]>> sections = new ArrayList<List<Long[]>>();

        String[] sectionTitles = {
            "seed-to-soil",
            "soil-to-fertilizer",
            "fertilizer-to-water",
            "water-to-light",
            "light-to-temperature",
            "temperature-to-humidity",
            "humidity-to-location",
        };
        int i = 0;
        for (String sectionTitle : sectionTitles) {
            sections.add(new ArrayList<>());
            processSection(scanner, sectionTitle, sections.get(i++));
        }

        return sections;
    }

    private static void processSection(Scanner scanner, String sectionTitle, List<Long[]> sectionValues) {
        // System.out.println(sectionTitle);
        scanner.next(sectionTitle);
        scanner.next("map:");
        scanner.nextLine();
        while (scanner.hasNextLong()) {
            Long[] values = new Long[] {scanner.nextLong(), scanner.nextLong(), scanner.nextLong()};
            sectionValues.add(values);
            scanner.nextLine();
        }
        if (scanner.hasNextLine()) scanner.nextLine();
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

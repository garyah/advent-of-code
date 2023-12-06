import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

class Day06Answer {
    // long closestP1;
    // long closestP2;
}

public class Day06 {
    public static void main(String[] args) throws IOException {
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\06\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\06\\sample_input2.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int nRows = lines.size();
        System.out.println("# lines / nRows = " + nRows);
        // int nCols = lines.get(0).length();
        // System.out.println("first line length / nCols = " + nCols);
        Scanner scanner = new Scanner(myPath);

        Day06Answer answer = solve(lines, scanner);

        // Part 1: ...
        // System.out.println("part 1: ... = " + answer.closestP1);

        // Part 2: ...
        // System.out.println("part 2: ... = " + answer.closestP2);
    }

    private static Day06Answer solve(List<String> lines, Scanner scanner) {
        Day06Answer answer = new Day06Answer();
        
        // List<Long> seeds = parseSeeds(scanner);
        // List<List<Long[]>> sections = parseSections(scanner);

        // Part 1
        // answer.closestP1 = findClosestP1(seeds, sections);

        // Part 2
        // Map<Long, Long> seedMap = seedListToMap(seeds);
        // List<Map<Long, Long[]>> sectionMaps = sectionsListToMap(sections);
        // answer.closestP2 = findClosestP2(seedMap, sectionMaps);

        return answer;
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
        List<List<Long[]>> sections = new ArrayList<>();

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
            parseSection(scanner, sectionTitle, sections.get(i++));
        }

        return sections;
    }

    private static void parseSection(Scanner scanner, String sectionTitle, List<Long[]> sectionValues) {
        // System.out.println(sectionTitle);
        scanner.next(sectionTitle);
        scanner.next("map:");
        scanner.nextLine();
        while (scanner.hasNextLong()) {
            Long[] rangeValues = new Long[] {scanner.nextLong(), scanner.nextLong(), scanner.nextLong()};
            sectionValues.add(rangeValues);
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

import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

class Day05Answer {
    long closestP1;
    long closestP2;
}

public class Day05 {
    public static void main(String[] args) throws IOException {
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\sample_input2.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int nRows = lines.size();
        System.out.println("# lines / nRows = " + nRows);
        // int nCols = lines.get(0).length();
        // System.out.println("first line length / nCols = " + nCols);
        Scanner scanner = new Scanner(myPath);

        Day05Answer answer = solve(lines, scanner);

        // Part 1: closest location, with discrete list of seeds
        System.out.println("part 1: closest location = " + answer.closestP1);

        // Part 2: closest location, with seed list describing ranges
        System.out.println("part 2: closest location = " + answer.closestP2);
    }

    private static Day05Answer solve(List<String> lines, Scanner scanner) {
        Day05Answer answer = new Day05Answer();
        
        List<Long> seeds = parseSeeds(scanner);
        List<List<Long[]>> sections = parseSections(scanner);

        // Part 1
        answer.closestP1 = findClosestP1(seeds, sections);

        // Part 2
        Map<Long, Long> seedMap = seedListToMap(seeds);
        List<Map<Long, Long[]>> sectionMaps = sectionsListToMap(sections);
        answer.closestP2 = findClosestP2(seedMap, sectionMaps);

        return answer;
    }

    private static long findClosestP2(Map<Long, Long> seedMap, List<Map<Long, Long[]>> sectionMaps) {
        long target = -1;

        Map<Long, Long[]> lastSectionMap = sectionMaps.get(sectionMaps.size() - 1);
        for (Map.Entry<Long, Long[]> entry : lastSectionMap.entrySet()) {
            target = entry.getKey();
            Long[] srcValues = entry.getValue();
            int i = sectionMaps.size() - 2;
            for (; i >= 0; i--) {
                Map<Long, Long[]> nextSectionMap = sectionMaps.get(i);
                boolean canContinue = false;
                for (Map.Entry<Long, Long[]> nextEntry : nextSectionMap.entrySet()) {
                    long nextTarget = nextEntry.getKey();
                    Long[] nextSrcValues = nextEntry.getValue();
                    if (srcValues[0] >= nextTarget
                        && srcValues[0] + srcValues[1] <= nextTarget + nextSrcValues[1]) {
                        srcValues[0] = nextSrcValues[0];
                        srcValues[1] = nextSrcValues[1];
                        canContinue = true;
                        break;
                    }
                }
                if (!canContinue) break;
            }
            if (i < 0) {
                for (Map.Entry<Long, Long> seedEntry : seedMap.entrySet()) {
                    long seedStart = seedEntry.getKey();
                    long seedDelta = seedEntry.getValue();
                    if (srcValues[0] >= seedStart
                        && srcValues[0] + srcValues[1] <= seedStart + seedDelta) {
                        ;
                    }
                }
                break;
            }
        }

        return target;
    }

    private static Map<Long, Long> seedListToMap(List<Long> seeds) {
        Map<Long, Long> seedMap = new TreeMap<>();

        for (int i = 0; i < seeds.size(); i += 2) {
            seedMap.put(seeds.get(i), seeds.get(i + 1));
        }

        return seedMap;
    }

    private static List<Map<Long, Long[]>> sectionsListToMap(List<List<Long[]>> sections) {
        List<Map<Long, Long[]>> sectionMaps = new ArrayList<>();

        for (List<Long[]> section : sections) {
            Map<Long, Long[]> sectionMap = new TreeMap<>();
            for (Long[] rangeValues : section) {
                Long[] srcValues = new Long[] {rangeValues[1], rangeValues[2]};
                sectionMap.put(rangeValues[0], srcValues);
            }

            // copy keys, before iterating with map modification
            List<Long> sectionKeys = new ArrayList<>();
            for (long key : sectionMap.keySet()) {
                sectionKeys.add(key);
            }

            // fixup map, for gaps in mapping
            long dest1Value = sectionKeys.get(0);
            if (dest1Value > 0) {
                System.out.println("gap in front!");
                Long[] nextSrcValues = new Long[] {0L, dest1Value};
                sectionMap.put(0L, nextSrcValues);
            }
            int i = 0;
            for (; i < sectionKeys.size() - 1; i++) {
                dest1Value = sectionKeys.get(i);
                Long[] src1Values = sectionMap.get(dest1Value);
                long nextDestValue = dest1Value + src1Values[1];
                long dest2Value = sectionKeys.get(i + 1);
                if (nextDestValue < dest2Value) {
                    System.out.println("gap in middle!");
                    Long[] nextSrcValues = new Long[] {nextDestValue, dest2Value - nextDestValue};
                    sectionMap.put(nextDestValue, nextSrcValues);
                }
            }
            dest1Value = sectionKeys.get(i);
            Long[] src1Values = sectionMap.get(dest1Value);
            long nextDestValue = dest1Value + src1Values[1];
            if (nextDestValue <= Long.MAX_VALUE) {
                System.out.println("gap in back!");
                Long[] nextSrcValues = new Long[] {nextDestValue, Long.MAX_VALUE - nextDestValue};
                sectionMap.put(nextDestValue, nextSrcValues);
            }

            sectionMaps.add(sectionMap);
        }

        return sectionMaps;
    }

    private static long findClosestP1(List<Long> seeds, List<List<Long[]>> sections) {
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

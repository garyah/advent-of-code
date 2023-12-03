import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;
import java.util.regex.MatchResult;

public class Day01UsingScanner {
    public static void main(String[] args) throws IOException {
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\01\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\01\\sample_input2.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\01\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        System.out.println("# lines = " + lines.size());

        Scanner scanner = new Scanner(myPath);
        System.out.println("content = " + scanner.toString());
        System.out.println("delimiter = " + scanner.delimiter());

        // find answers
        System.out.println("part 1 sum = " + sumOfDigitPairs(lines, true));
        System.out.println("part 2 sum = " + sumOfDigitPairs(lines, false));
        System.out.println("part 2 sum = " + sumOfDigitPairsWithScanner(scanner, false));
    }

    private static int sumOfDigitPairs(List<String> lines, boolean isPart1) {
        int sum = 0;
        for (String line : lines) {
            if (line.length() != 0) {
                int num = -1;
                int digitSave = -1;
                for (int i = 0; i < line.length(); i++) {
                    // Part 1
                    if (isPart1) {
                        char c = line.charAt(i);
                        if (c >= '0' && c <= '9') {
                            int digit = c - '0';
                            if (num < 0) {
                                num = digit * 10 + digit;
                            } else {
                                num -= digitSave;
                                num += digit;
                            }
                            digitSave = digit;
                        }
                        continue;
                    }

                    // Part 2
                    String s = line.substring(i);
                    int digit = -1;
                    char c = line.charAt(i);
                    if (c >= '0' && c <= '9') {
                        digit = c - '0';
                    } else if (s.startsWith("one")) {
                        digit = 1;
                    } else if (s.startsWith("two")) {
                        digit = 2;
                    } else if (s.startsWith("three")) {
                        digit = 3;
                    } else if (s.startsWith("four")) {
                        digit = 4;
                    } else if (s.startsWith("five")) {
                        digit = 5;
                    } else if (s.startsWith("six")) {
                        digit = 6;
                    } else if (s.startsWith("seven")) {
                        digit = 7;
                    } else if (s.startsWith("eight")) {
                        digit = 8;
                    } else if (s.startsWith("nine")) {
                        digit = 9;
                    }
                    if (digit >= 0) {
                        if (num < 0) {
                            num = digit * 10 + digit;
                        } else {
                            num -= digitSave;
                            num += digit;
                        }
                        digitSave = digit;
                    }
                }

                if (num >= 0) {
                    sum += num;
                }
            }
        }
        return sum;
    }

    private static int sumOfDigitPairsWithScanner(Scanner scanner, boolean isPart1) {
        int sum = 0;
        while (scanner.hasNextLine()) {
            try {
                // scanner.next(".*([1-9])+.*([1-9])*.*");
                scanner.next("(.*([1-9]).*)+");
                MatchResult matchResult = scanner.match();
                System.out.println("number of groups = " + matchResult.groupCount());
                for (int i = 0; i < matchResult.groupCount(); i++) {
                    System.out.println("group #" + (i+1) + " = " + matchResult.group(i+1));
                }
            } catch (Exception e) {
                System.out.println("not found on this line");
            }
            scanner.nextLine();
        }
        return sum;
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

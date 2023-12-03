import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;
import java.util.regex.MatchResult;

class Answer {
    int idSum;
    int powerSum;
}

public class Day02 {
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\02\\sample_input.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\02\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        System.out.println("# lines = " + lines.size());
        Scanner scanner = new Scanner(myPath);

        Answer answer = solve(scanner);

        System.out.println("part 1: sum of game ids = " + answer.idSum);
        System.out.println("part 2: sum of color powers = " + answer.powerSum);
    }

    private static Answer solve(Scanner scanner) {
        Answer answer = new Answer();

        // Part 1
        answer.idSum = 0;
        int startNumRed = 12;
        int startNumGreen = 13;
        int startNumBlue = 14;

        // Part 2
        answer.powerSum = 0;

        scanner.useDelimiter("[\\p{javaWhitespace}:,;]+");
        while (scanner.hasNextLine()) {
            scanner.next("Game");
            int id = scanner.nextInt();

            int maxNumRed = 0;
            int maxNumGreen = 0;
            int maxNumBlue = 0;
            boolean isPossible = true;

            while (scanner.hasNextInt()) {
                int numRed = 0;
                int numGreen = 0;
                int numBlue = 0;

                int quantity = scanner.nextInt();
                scanner.next("(red|green|blue)");
                MatchResult matchResult = scanner.match();
                String color = matchResult.group(1);
                if (color.equals("red")) {
                    numRed = quantity;
                } else if (color.equals("green")) {
                    numGreen = quantity;
                } else { // "blue"
                    numBlue = quantity;
                }

                // Part 1
                if (numRed > startNumRed || numGreen > startNumGreen || numBlue > startNumBlue) {
                    isPossible = false;
                }

                // Part 2
                maxNumRed = Math.max(maxNumRed, numRed);
                maxNumGreen = Math.max(maxNumGreen, numGreen);
                maxNumBlue = Math.max(maxNumBlue, numBlue);
            }

            // Part 1
            if (isPossible) {
                answer.idSum += id;
            }

            // Part 2
            int power = maxNumRed * maxNumGreen * maxNumBlue;
            answer.powerSum += power;

            scanner.nextLine();
        }

        return answer;
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

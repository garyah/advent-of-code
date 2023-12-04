import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;
// import java.util.regex.MatchResult;

class Day04Answer {
    int pointsSum;
    int numCards;
}

public class Day04 {
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\04\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\04\\sample_input2.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\04\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int nRows = lines.size();
        System.out.println("# lines / nRows = " + nRows);
        // int nCols = lines.get(0).length();
        // System.out.println("first line length / nCols = " + nCols);
        Scanner scanner = new Scanner(myPath);

        Day04Answer answer = solve(lines, scanner);

        // Part 1: sum of card points
        System.out.println("part 1: sum of card points = " + answer.pointsSum);

        // Part 2: total number of cards
        System.out.println("part 2: total number of cards = " + answer.numCards);
    }

    private static Day04Answer solve(List<String> lines, Scanner scanner) {
        Day04Answer answer = new Day04Answer();

        // Part 1
        answer.pointsSum = 0;

        // Part 2
        answer.numCards = 0;
        List<Integer> cardInventory = new ArrayList<>();

        scanner.useDelimiter("[\\p{javaWhitespace}:]+");
        while (scanner.hasNextLine()) {
            scanner.next("Card");
            int id = scanner.nextInt();
            // System.out.print(id + ": ");

            if (cardInventory.size() < id) {
                System.out.println("adding count of 1 for card " + id);
                cardInventory.add(1);
            } else {
                System.out.println("setting count of " + (cardInventory.get(id - 1) + 1) + " for card " + id);
                cardInventory.set(id - 1, cardInventory.get(id - 1) + 1);
            }

            // winning numbers
            Set<Integer> winNums = new HashSet<>();
            while (scanner.hasNextInt()) {
                int number = scanner.nextInt();
                // System.out.print(number + " ");
                winNums.add(number);
                // MatchResult matchResult = scanner.match();
            }

            scanner.next("\\|");
            // System.out.print(" | ");

            // have these numbers
            List<Integer> haveNums = new ArrayList<>();
            while (scanner.hasNextInt()) {
                int number = scanner.nextInt();
                // System.out.print(number + " ");
                haveNums.add(number);
                // MatchResult matchResult = scanner.match();
            }

            // System.out.println();

            // Part 1
            // Match have numbers to winning numbers, scoring based on number of winning numbers
            int numPoints = 0;
            for (Integer haveNum : haveNums) {
                if (winNums.contains(haveNum)) {
                    if (numPoints == 0) {
                        numPoints = 1;
                    } else {
                        numPoints *= 2;
                    }
                }
            }
            answer.pointsSum += numPoints;

            // Part 2
            // Match have numbers to winning numbers, scoring based on total resulting number of cards
            int numWinNums = 0;
            for (Integer haveNum : haveNums) {
                if (winNums.contains(haveNum)) {
                    numWinNums++;
                }
            }
            int numberToCopyFrom = cardInventory.get(id - 1);
            while (numWinNums > 0) {
                if (cardInventory.size() < id + 1) {
                    System.out.println("adding count of " + numberToCopyFrom + " for card " + (id + 1));
                    cardInventory.add(numberToCopyFrom);
                } else {
                    System.out.println("setting count of " + (cardInventory.get(id) + numberToCopyFrom) + " for card " + (id + 1));
                    cardInventory.set(id, cardInventory.get(id) + numberToCopyFrom);
                }
                numWinNums--;
                id++;
            }

            scanner.nextLine();
        }

        // Part 2
        // Tally up the total resulting number of cards
        for (Integer cardCount : cardInventory) {
            answer.numCards += cardCount;
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

import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

class Day07Answer {
    long totalWinningsP1;
    long totalWinningsP2;
}

public class Day07 {
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\07\\sample_input.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\07\\input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int nRows = lines.size();
        System.out.println("# lines / nRows = " + nRows);
        // int nCols = lines.get(0).length();
        // System.out.println("first line length / nCols = " + nCols);
        Scanner scanner = new Scanner(myPath);

        Day07Answer answer = solve(lines, scanner);

        // Part 1: Total winnings, using J as Jack
        System.out.println("part 1: Total winnings = " + answer.totalWinningsP1);

        // Part 2: Total winnings, using J as Joker
        System.out.println("part 2: ... = " + answer.totalWinningsP2);
    }

    private static Day07Answer solve(List<String> lines, Scanner scanner) {
        Day07Answer answer = new Day07Answer();
        
        Map<String, Integer> handsToBids = parse(scanner);

        // Part 1
        answer.totalWinningsP1 = findTotalWinnings(scoreHandsP1(handsToBids), handsToBids);

        // Part 2
        answer.totalWinningsP2 = findTotalWinnings(scoreHandsP2(handsToBids), handsToBids);

        return answer;
    }

    private static int findTotalWinnings(Map<Integer, List<String>> typesToHands, Map<String, Integer> handsToBids) {
        int totalWinnings = 0;

        int rank = 1;
        for (Map.Entry<Integer, List<String>> entry : typesToHands.entrySet()) {
            List<String> hands = entry.getValue();
            for (String hand : hands) {
                int bid = handsToBids.get(hand);
                totalWinnings += bid * rank++;
            }
        }

        return totalWinnings;
    }

    private static Map<Integer, List<String>> scoreHandsP2(Map<String, Integer> handsToBids) {
        Map<Integer, List<String>> typesToHands = new TreeMap<>();

        for (String hand : handsToBids.keySet()) {
            int numPairs = 0;
            boolean isThreeOfKind = false;
            boolean isFourOfKind = false;
            boolean isFiveOfKind = false;

            Map<Character, Integer> countOfCard = new HashMap<>();
            for (int i = 0; i < hand.length(); i++) {
                char c = hand.charAt(i);
                int count = countOfCard.getOrDefault(c, 0) + 1;
                countOfCard.put(c, count);
                if (c == 'J') continue;

                if (count == 2) numPairs++;
                else if (count == 3) {
                    numPairs--;
                    isThreeOfKind = true;
                } else if (count == 4) {
                    isThreeOfKind = false;
                    isFourOfKind = true;
                } else if (count == 5) {
                    isFourOfKind = false;
                    isFiveOfKind = true;
                }
            }

            boolean isOnePair = false;
            boolean isTwoPair = false;
            if (numPairs == 1) {
                isOnePair = true;
            } else if (numPairs == 2) {
                isTwoPair = true;
            }

            boolean isFullHouse = false;
            if (isOnePair && isThreeOfKind) {
                isOnePair = false;
                isThreeOfKind = false;
                isFullHouse = true;
            }

            int numJokers = countOfCard.getOrDefault('J', 0);
            int type = 0;
            if (isFiveOfKind || isFourOfKind && numJokers == 1 || isThreeOfKind && numJokers == 2 || isOnePair && numJokers == 3 || numJokers == 4 || numJokers == 5) type = 6;
            else if (isFourOfKind || isThreeOfKind && numJokers == 1 || isOnePair && numJokers == 2 || numJokers == 3) type = 5;
            else if (isFullHouse || isThreeOfKind && numJokers == 2 || isTwoPair && numJokers == 1) type = 4;
            else if (isThreeOfKind || isOnePair && numJokers == 1 || numJokers == 2) type = 3;
            else if (isTwoPair) type = 2;
            else if (isOnePair || numJokers == 1) type = 1;
            else type = 0;

            List<String> hands = typesToHands.getOrDefault(type, new ArrayList<>());
            if (hands.isEmpty()) {
                hands.add(hand);
            } else {
                boolean isInserted = false;
                for (int i = 0; i < hands.size() && !isInserted; i++) {
                    String handToCheck = hands.get(i);
                    for (int j = 0; j < hand.length() && j < handToCheck.length(); j++) {
                        char c1 = hand.charAt(j);
                        char c2 = handToCheck.charAt(j);
                        if (c1 == c2) continue;
                        if (isWeakerP2(c1, c2)) {
                            hands.add(i, hand);
                            isInserted = true;
                        }
                        break;
                    }
                }
                if (!isInserted) hands.add(hand);
            }
            typesToHands.put(type, hands);
        }

        return typesToHands;
    }

    private static boolean isWeakerP2(char c1, char c2) {
        if (c1 == 'J') return true;
        if (c1 == '2' && c2 != 'J') return true;
        if (c1 == '3' && c2 != 'J' && c2 != '2') return true;
        if (c1 == '4' && c2 != 'J' && c2 != '3' && c2 != '2') return true;
        if (c1 == '5' && c2 != 'J' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == '6' && c2 != 'J' && c2 != '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == '7' && c2 != 'J' && c2 != '6' && c2 != '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == '8' && c2 != 'J' && c2 != '7' && c2 != '6' && c2 != '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == '9' && c2 != 'J' && c2 != '8' && c2 != '7' && c2 != '6' && c2 != '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == 'T' && c2 != 'J' && c2 != '9' && c2 != '8' && c2 != '7' && c2 != '6' && c2 != '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == 'J' && c2 != 'J' && c2 != 'T' && c2 != '9' && c2 != '8' && c2 != '7' && c2 != '6' && c2 != '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == 'Q' && c2 != 'J' && c2 != 'J' && c2 != 'T' && c2 != '9' && c2 != '8' && c2 != '7' && c2 != '6' && c2 != '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == 'K' && c2 != 'J' && c2 != 'Q' && c2 != 'J' && c2 != 'T' && c2 != '9' && c2 != '8' && c2 != '7' && c2 != '6' && c2 != '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        return false;
    }

    private static Map<Integer, List<String>> scoreHandsP1(Map<String, Integer> handsToBids) {
        Map<Integer, List<String>> typesToHands = new TreeMap<>();

        for (String hand : handsToBids.keySet()) {
            int numPairs = 0;
            boolean isThreeOfKind = false;
            boolean isFourOfKind = false;
            boolean isFiveOfKind = false;

            Map<Character, Integer> countOfCard = new HashMap<>();
            for (int i = 0; i < hand.length(); i++) {
                char c = hand.charAt(i);
                int count = countOfCard.getOrDefault(c, 0) + 1;
                countOfCard.put(c, count);

                if (count == 2) numPairs++;
                else if (count == 3) {
                    numPairs--;
                    isThreeOfKind = true;
                } else if (count == 4) {
                    isThreeOfKind = false;
                    isFourOfKind = true;
                } else if (count == 5) {
                    isFourOfKind = false;
                    isFiveOfKind = true;
                }
            }

            boolean isOnePair = false;
            boolean isTwoPair = false;
            if (numPairs == 1) {
                isOnePair = true;
            } else if (numPairs == 2) {
                isTwoPair = true;
            }

            boolean isFullHouse = false;
            if (isOnePair && isThreeOfKind) {
                isOnePair = false;
                isThreeOfKind = false;
                isFullHouse = true;
            }

            int type = 0;
            if (isFiveOfKind) type = 6;
            else if (isFourOfKind) type = 5;
            else if (isFullHouse) type = 4;
            else if (isThreeOfKind) type = 3;
            else if (isTwoPair) type = 2;
            else if (isOnePair) type = 1;
            else type = 0;

            List<String> hands = typesToHands.getOrDefault(type, new ArrayList<>());
            if (hands.isEmpty()) {
                hands.add(hand);
            } else {
                boolean isInserted = false;
                for (int i = 0; i < hands.size() && !isInserted; i++) {
                    String handToCheck = hands.get(i);
                    for (int j = 0; j < hand.length() && j < handToCheck.length(); j++) {
                        char c1 = hand.charAt(j);
                        char c2 = handToCheck.charAt(j);
                        if (c1 == c2) continue;
                        if (isWeakerP1(c1, c2)) {
                            hands.add(i, hand);
                            isInserted = true;
                        }
                        break;
                    }
                }
                if (!isInserted) hands.add(hand);
            }
            typesToHands.put(type, hands);
        }

        return typesToHands;
    }

    private static boolean isWeakerP1(char c1, char c2) {
        if (c1 == '2') return true;
        if (c1 == '3' && c2 != '2') return true;
        if (c1 == '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == '6' && c2 != '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == '7' && c2 != '6' && c2 != '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == '8' && c2 != '7' && c2 != '6' && c2 != '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == '9' && c2 != '8' && c2 != '7' && c2 != '6' && c2 != '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == 'T' && c2 != '9' && c2 != '8' && c2 != '7' && c2 != '6' && c2 != '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == 'J' && c2 != 'T' && c2 != '9' && c2 != '8' && c2 != '7' && c2 != '6' && c2 != '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == 'Q' && c2 != 'J' && c2 != 'T' && c2 != '9' && c2 != '8' && c2 != '7' && c2 != '6' && c2 != '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        if (c1 == 'K' && c2 != 'Q' && c2 != 'J' && c2 != 'T' && c2 != '9' && c2 != '8' && c2 != '7' && c2 != '6' && c2 != '5' && c2 != '4' && c2 != '3' && c2 != '2') return true;
        return false;
    }

    private static Map<String, Integer> parse(Scanner scanner) {
        Map<String, Integer> handsToBids = new TreeMap<>();

        // scanner.useDelimiter("[\\p{javaWhitespace}]+");
        while (scanner.hasNext()) {
            String hand = scanner.next();
            // hands.add(hand);
            // System.out.print(hand + " ");

            int bid = scanner.nextInt();
            // bids.add(bid);
            // System.out.print(bid);
            // System.out.println();

            handsToBids.put(hand, bid);
            scanner.nextLine();
        }
        // System.out.println();

        return handsToBids;
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

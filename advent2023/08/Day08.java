import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

class Day08Answer {
    long numSteps;
    // long totalWinningsP2;
}

public class Day08 {
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\08\\sample_input.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\08\\input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int nRows = lines.size();
        System.out.println("# lines / nRows = " + nRows);
        // int nCols = lines.get(0).length();
        // System.out.println("first line length / nCols = " + nCols);
        Scanner scanner = new Scanner(myPath);

        Day08Answer answer = solve(lines, scanner);

        // Part 1: Number of steps
        System.out.println("part 1: Number of steps = " + answer.numSteps);

        // Part 2: ...
        // System.out.println("part 2: ... = " + answer.totalWinningsP2);
    }

    private static Day08Answer solve(List<String> lines, Scanner scanner) {
        Day08Answer answer = new Day08Answer();
        
        List<Integer> steps = parseSteps(scanner);
        Map<String, String[]> nodes = parseNodes(scanner);

        // Part 1
        answer.numSteps = findNumSteps(steps, nodes);

        // Part 2
        // answer.totalWinningsP2 = findTotalWinnings(scoreHandsP2(handsToBids), handsToBids);

        return answer;
    }

    private static int findNumSteps(List<Integer> steps, Map<String, String[]> nodes) {
        int numSteps = 0;

        String currentNode = "AAA";
        String targetNode = "ZZZ";
        int s = 0;
        do {
            String[] nextNodes = nodes.get(currentNode);
            currentNode = nextNodes[steps.get(s)];
            s++;
            s %= steps.size();
            numSteps++;
        } while (!currentNode.equals(targetNode));

        return numSteps;
    }

    private static List<Integer> parseSteps(Scanner scanner) {
        List<Integer> steps = new ArrayList<>();

        // scanner.useDelimiter("[\\p{javaWhitespace}]+");
        String stepsInput = scanner.next();
        System.out.println(stepsInput);
        scanner.nextLine();
        scanner.nextLine();

        for (int i = 0; i < stepsInput.length(); i++) {
            char c = stepsInput.charAt(i);
            steps.add((c == 'L') ? 0 : 1);
        }

        return steps;
    }

    private static Map<String, String[]> parseNodes(Scanner scanner) {
        Map<String, String[]> nodes = new HashMap<>();

        scanner.useDelimiter("[\\p{javaWhitespace}=,)(]+");
        while (scanner.hasNext()) {
            String node = scanner.next();
            System.out.print(node + " = ");

            String[] nextNodes = new String[2];
            nextNodes[0] = scanner.next();
            System.out.print("(" + nextNodes[0] + ", ");
            nextNodes[1] = scanner.next();
            System.out.println(nextNodes[1] + ")");

            nodes.put(node, nextNodes);
            scanner.nextLine();
        }

        return nodes;
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

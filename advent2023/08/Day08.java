import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

class Day08Answer {
    int numSteps;
    long numStepsP2;
}

public class Day08 {
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\08\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\08\\sample_input2.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\08\\input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int nRows = lines.size();
        System.out.println("# lines / nRows = " + nRows);
        // int nCols = lines.get(0).length();
        // System.out.println("first line length / nCols = " + nCols);
        Scanner scanner = new Scanner(myPath);

        Day08Answer answer = solve(lines, scanner);

        // Part 1: Number of steps, with one path
        System.out.println("part 1: Number of steps = " + answer.numSteps);

        // Part 2: Number of steps, with simultaneous paths
        System.out.println("part 2: Number of steps = " + answer.numStepsP2);
    }

    private static Day08Answer solve(List<String> lines, Scanner scanner) {
        Day08Answer answer = new Day08Answer();
        
        List<Integer> steps = parseSteps(scanner);
        Map<String, String[]> nodes = parseNodes(scanner);

        // Part 1
        answer.numSteps = findNumStepsP1(steps, nodes);

        // Part 2
        answer.numStepsP2 = findNumStepsP2(steps, nodes);

        return answer;
    }

    private static long findNumStepsP2(List<Integer> steps, Map<String, String[]> nodes) {
        long numSteps = 0;

        System.out.println("# steps = " + steps.size());

        List<String> currentNodes = getNodesEndingWith(nodes, "A");
        System.out.println("# current nodes = " + currentNodes.size());

        List<String> targetNodes = getNodesEndingWith(nodes, "Z");
        System.out.println("# target nodes = " + targetNodes.size());

        List<Integer> currentNodesNumSteps = new ArrayList<>();
        for (String currentNode : currentNodes) {
            int numStepsForNode = findNumSteps(currentNode, "Z", steps, nodes);
            System.out.println("from node " + currentNode + " to a node ending in Z, number of steps = " + numStepsForNode);
            currentNodesNumSteps.add(numStepsForNode);
        }
        numSteps = LCM.lcmFind(currentNodesNumSteps);

        return numSteps;
    }

    private static List<String> getNodesEndingWith(Map<String, String[]> nodes, String endsWith) {
        List<String> nodesEndingWith = new ArrayList<>();

        for (String node : nodes.keySet()) {
            if (node.endsWith(endsWith)) {
                nodesEndingWith.add(node);
            }
        }

        return nodesEndingWith;
    }

    private static int findNumStepsP1(List<Integer> steps, Map<String, String[]> nodes) {
        return findNumSteps("AAA", "ZZZ", steps, nodes);
    }

    private static int findNumSteps(String currentNode, String targetNodeEnding, List<Integer> steps, Map<String, String[]> nodes) {
        int numSteps = 0;

        int s = 0;
        do {
            String[] nextNodes = nodes.get(currentNode);
            currentNode = nextNodes[steps.get(s)];
            s++;
            s %= steps.size();
            numSteps++;
        } while (!currentNode.endsWith(targetNodeEnding));

        return numSteps;
    }

    private static List<Integer> parseSteps(Scanner scanner) {
        List<Integer> steps = new ArrayList<>();

        // scanner.useDelimiter("[\\p{javaWhitespace}]+");
        String stepsInput = scanner.next();
        // System.out.println(stepsInput);
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
            // System.out.print(node + " = ");

            String[] nextNodes = new String[2];
            nextNodes[0] = scanner.next();
            // System.out.print("(" + nextNodes[0] + ", ");
            nextNodes[1] = scanner.next();
            // System.out.println(nextNodes[1] + ")");

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

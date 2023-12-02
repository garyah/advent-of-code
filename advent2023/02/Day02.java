import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

public class Day02 {
    // static boolean isPart2;

    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\02\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\02\\sample_input2.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\02\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        // isPart2 = true;

        // Part 1
        // int idSum = 0;
        // int maxNumRed = 12;
        // int maxNumGreen = 13;
        // int maxNumBlue = 14;

        // Part 2
        int powerSum = 0;

        // read file
        for (String line : lines) {
            if (line.length() != 0) {
                String[] fields = line.replaceAll("\\s+$", "").split(": ");

                String[] gameIdFields = fields[0].split(" ");
                int id = Integer.parseInt(gameIdFields[1]);

                String[] turnFields = fields[1].split("; ");

                // Part 2
                int maxNumRed = 0;
                int maxNumGreen = 0;
                int maxNumBlue = 0;

                int i = 0;
                for (; i < turnFields.length; i++) {
                    int numRed = 0;
                    int numGreen = 0;
                    int numBlue = 0;

                    String[] rgbFields = turnFields[i].split(", ");
                    for (int j = 0; j < rgbFields.length; j++) {
                        String[] colorFields = rgbFields[j].split(" ");
                        String color = colorFields[1];
                        if (color.equals("red")) {
                            numRed = Integer.parseInt(colorFields[0]);
                        } else if (color.equals("green")) {
                            numGreen = Integer.parseInt(colorFields[0]);
                        } else { // "blue"
                            numBlue = Integer.parseInt(colorFields[0]);
                        }
                    }

                    // Part 1
                    // if (numRed > maxNumRed || numGreen > maxNumGreen || numBlue > maxNumBlue) {
                    //     break;
                    // }

                    // Part 2
                    maxNumRed = Math.max(maxNumRed, numRed);
                    maxNumGreen = Math.max(maxNumGreen, numGreen);
                    maxNumBlue = Math.max(maxNumBlue, numBlue);
                }

                // Part 1
                // if (i >= turnFields.length) {
                //     idSum += id;
                // }

                // Part 2
                int power = maxNumRed * maxNumGreen * maxNumBlue;
                powerSum += power;
            }
        }

        System.out.println("# lines = " + lines.size());

        // Part 1
        // System.out.println("idSum = " + idSum);

        // Part 2
        System.out.println("powerSum = " + powerSum);
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

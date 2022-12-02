import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

public class Day02 {
    public static void main(String[] args) throws IOException {
        // Solution embedded in main()!

        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\02\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        // Deque<Integer> maxSums = new ArrayDeque<Integer>();
        // List<Integer> sums = new ArrayList<Integer>();
        // int maxSum = 0;
        int totalScore = 0;
        for (String line : lines) {
            if (line.length() != 0) {
                String[] fields = line.replaceAll("\\s+$", "").split(" ");
                // sum += Integer.parseInt(line);
                int score = processTurn(fields);
                totalScore += score;
                continue;
            }
            // if (sum > maxSum) {
            //     maxSum = sum;
            //     maxSums.push(maxSum);
            // }
            // sums.add(sum);
            // sum = 0;
        }

        System.out.println("# lines = " + lines.size());
        System.out.println("totalScore = " + totalScore);

        // System.out.println("number of sums = " + sums.size());
        // System.out.println("sums = " + sums);
        // System.out.println("maxSum = " + maxSum);
        // System.out.println("number of successive maxSum values = " + maxSums.size());
        // System.out.println("maxSums = " + maxSums);

        // Object[] sumArray = sums.toArray();
        // Arrays.sort(sumArray);
        // System.out.println("sum of top 3 = " + ((int)sumArray[sumArray.length - 1] + (int)sumArray[sumArray.length - 2] + (int)sumArray[sumArray.length - 3]));
    }

    static int processTurn(String[] fields) {
        String theirs = fields[0];
        String mine = fields[1];
        if (theirs.equals("A")) {
            // Rock
            if (mine.equals("X")) {
                // Rock
                return 1 + 3;
            } if (mine.equals("Y")) {
                // Paper
                return 2 + 6;
            } if (mine.equals("Z")) {
                // Scissors
                return 3 + 0;
            }
        } if (theirs.equals("B")) {
            // Paper
            if (mine.equals("X")) {
                // Rock
                return 1 + 0;
            } if (mine.equals("Y")) {
                // Paper
                return 2 + 3;
            } if (mine.equals("Z")) {
                // Scissors
                return 3 + 6;
            }
        } if (theirs.equals("C")) {
            // Scissors
            if (mine.equals("X")) {
                // Rock
                return 1 + 6;
            } if (mine.equals("Y")) {
                // Paper
                return 2 + 0;
            } if (mine.equals("Z")) {
                // Scissors
                return 3 + 3;
            }
        }
        return 0;
    }
}

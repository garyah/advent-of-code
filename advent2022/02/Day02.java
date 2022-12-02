import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

public class Day02 {
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\02\\sample_input.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\02\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int totalScore = 0;
        int totalScorePart2 = 0;
        for (String line : lines) {
            if (line.length() != 0) {
                String[] fields = line.replaceAll("\\s+$", "").split(" ");
                // sum += Integer.parseInt(line);
                totalScore += processTurn(fields);
                totalScorePart2 += processTurnPart2(fields);
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
        System.out.println("totalScore for part2 = " + totalScorePart2);
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

    static int processTurnPart2(String[] fields) {
        String theirs = fields[0];
        String mine = fields[1];
        if (theirs.equals("A")) {
            // Rock
            if (mine.equals("X")) {
                // Lose, Scissors
                return 3 + 0;
            } if (mine.equals("Y")) {
                // Draw, Rock
                return 1 + 3;
            } if (mine.equals("Z")) {
                // Win, Paper
                return 2 + 6;
            }
        } if (theirs.equals("B")) {
            // Paper
            if (mine.equals("X")) {
                // Lose, Rock
                return 1 + 0;
            } if (mine.equals("Y")) {
                // Draw, Paper
                return 2 + 3;
            } if (mine.equals("Z")) {
                // Win, Scissors
                return 3 + 6;
            }
        } if (theirs.equals("C")) {
            // Scissors
            if (mine.equals("X")) {
                // Lose, Paper
                return 2 + 0;
            } if (mine.equals("Y")) {
                // Draw, Scissors
                return 3 + 3;
            } if (mine.equals("Z")) {
                // Win, Rock
                return 1 + 6;
            }
        }
        return 0;
    }
}

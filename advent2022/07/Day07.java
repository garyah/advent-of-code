import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

public class Day07 {
    // Basic data structures:
    // Deque<Integer> maxSums = new ArrayDeque<Integer>();
    // List<Integer> sums = new ArrayList<Integer>();
    // ArrayList<ArrayDeque<String>> stacks = new ArrayList<ArrayDeque<String>>();
    //
    // Use of Integer.parseInt():
    // sum += Integer.parseInt(line);
    //
    // Use of replaceAll() and split():
    // String[] fields = line.replaceAll("\\s+$", "").split(" ");
    //
    // Use of substring():
    // String comp1 = line.substring(0, line.length() / 2);
    // String comp2 = line.substring(line.length() / 2, line.length());
    //
    // Use of indexOf():
    // if (comp2.indexOf(duplicate) > -1) {
    //     break;
    // }
    //
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
    //
    // Moving from one deque to another, as stack:
    // destStack.addLast(sourceStack.removeLast());
    //
    // Using toArray to convert to array, print it out:
    // Object[] stack = stacks.get(i).toArray();
    // for (int j = 0; j < stack.length; j++) {
    //     System.out.print(stack[j] + " ");
    // }
    // System.out.println();

    public static void main(String[] args) throws IOException {
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\07\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\07\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        boolean isPart2 = true;
        int numDistinct = isPart2 ? 14 : 4;
        int foundIndex = -1;
        for (String line : lines) {
            if (line.length() != 0) {
                // Part 1

                boolean isMarker = false;
                int i = 0;
                for (; i <= line.length() - numDistinct; i++) {
                    isMarker = true;
                    for (int j = i; j < i + numDistinct; j++) {
                        int k = i;
                        for (; k < i + numDistinct; k++) {
                            if (j == k) continue;
                            if (line.charAt(j) == line.charAt(k)) break;
                        }
                        if (k < i + numDistinct && (line.charAt(j) == line.charAt(k))) {
                            isMarker = false;
                            break;
                        }
                    }
                    if (isMarker) break;
                }
                if (isMarker) foundIndex = i + numDistinct;

            }
        }

        System.out.println("# lines = " + lines.size());
        System.out.println("foundIndex = " + foundIndex);
    }
}

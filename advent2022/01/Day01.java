import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

public class Day01 {
    public static void main(String[] args) throws IOException {
        // Solution embedded in main()!

        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\01\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        Deque<Integer> maxSums = new ArrayDeque<Integer>();
        List<Integer> sums = new ArrayList<Integer>();
        int maxSum = 0;
        int sum = 0;
        for (String line : lines) {
            if (line.length() != 0) {
                sum += Integer.parseInt(line);
                continue;
            }
            if (sum > maxSum) {
                maxSum = sum;
                maxSums.push(maxSum);
            }
            sums.add(sum);
            sum = 0;
        }

        System.out.println("number of sums = " + sums.size());
        System.out.println("sums = " + sums);
        System.out.println("maxSum = " + maxSum);
        System.out.println("number of successive maxSum values = " + maxSums.size());
        System.out.println("maxSums = " + maxSums);

        Object[] sumArray = sums.toArray();
        Arrays.sort(sumArray);
        // System.out.println("sum of top 3 = " + (maxSums.pop() + maxSums.pop() + maxSums.pop()));
        System.out.println("sum of top 3 = " + ((int)sumArray[sumArray.length - 1] + (int)sumArray[sumArray.length - 2] + (int)sumArray[sumArray.length - 3]));
    }
}

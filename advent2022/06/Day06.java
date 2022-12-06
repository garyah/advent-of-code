import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

public class Day06 {
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\06\\sample_input.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\06\\input.txt");
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

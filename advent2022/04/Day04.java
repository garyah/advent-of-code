import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

public class Day04 {
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\04\\sample_input.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\04\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int numFullyContained = 0;
        int numOverlapped = 0;
        // String[] group = new String[3];
        // int groupIndex = 0;
        // int totalPriorityPart2 = 0;
        for (String line : lines) {
            if (line.length() != 0) {
                // Part 1
                String[] ranges = line.split(",");
                String range1 = ranges[0];
                String range2 = ranges[1];

                String[] range1Bounds = range1.split("\\-");
                int range1Lo = Integer.parseInt(range1Bounds[0]);
                int range1Hi = Integer.parseInt(range1Bounds[1]);

                String[] range2Bounds = range2.split("\\-");
                int range2Lo = Integer.parseInt(range2Bounds[0]);
                int range2Hi = Integer.parseInt(range2Bounds[1]);

                if (range1Lo <= range2Lo && range1Hi >= range2Hi
                    || range2Lo <= range1Lo && range2Hi >= range1Hi) {
                    numFullyContained++;
                }

                // Part 2
                if (!(range1Lo < range2Lo && range1Hi < range2Lo)
                    && !(range1Lo > range2Hi && range1Hi > range2Hi)) {
                        numOverlapped++;
                }
            }
        }

        System.out.println("# lines = " + lines.size());
        System.out.println("numFullyContained = " + numFullyContained);
        System.out.println("numOverlapped for part2 = " + numOverlapped);
    }
}

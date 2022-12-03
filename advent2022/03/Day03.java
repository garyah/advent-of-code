import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

public class Day03 {
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\03\\sample_input.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\03\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int totalPriority = 0;
        String[] group = new String[3];
        int groupIndex = 0;
        int totalPriorityPart2 = 0;
        for (String line : lines) {
            if (line.length() != 0) {
                // Part 1
                String comp1 = line.substring(0, line.length() / 2);
                String comp2 = line.substring(line.length() / 2, line.length());
                char duplicate = 0;
                for (int i = 0; i < comp1.length(); i++) {
                    duplicate = comp1.charAt(i);
                    if (comp2.indexOf(duplicate) > -1) {
                        break;
                    }
                }
                int priority = (duplicate >= 'a' && duplicate <= 'z') ? duplicate - 'a' + 1 : duplicate - 'A' + 27;
                totalPriority += priority;

                // Part 2
                group[groupIndex] = line;
                if (groupIndex == 2) {
                    duplicate = 0;
                    for (int i = 0; i < group[0].length(); i++) {
                        duplicate = group[0].charAt(i);
                        if (group[1].indexOf(duplicate) > -1 && group[2].indexOf(duplicate) > -1) {
                            break;
                        }
                    }
                    priority = (duplicate >= 'a' && duplicate <= 'z') ? duplicate - 'a' + 1 : duplicate - 'A' + 27;
                    totalPriorityPart2 += priority;
                    groupIndex = 0;
                } else {
                    groupIndex++;
                }
            }
        }

        System.out.println("# lines = " + lines.size());
        System.out.println("totalPriority = " + totalPriority);
        System.out.println("totalPriority for part2 = " + totalPriorityPart2);
    }
}

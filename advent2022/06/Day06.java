import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

public class Day06 {
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\06\\sample_input.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\06\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        // int numStacks = 3;
        // int numStacks = 9;
        // boolean isPart2 = false;
        // ArrayList<ArrayDeque<String>> stacks = new ArrayList<ArrayDeque<String>>();
        // for (int i = 0; i < numStacks; i++) {
        //     stacks.add(new ArrayDeque<String>());
        // }
        // boolean isMoveSection = false;
        int foundIndex = -1;
        for (String line : lines) {
            if (line.length() != 0) {
                // Part 1

                boolean isMarker = false;
                int i = 0;
                for (; i <= line.length() - 4; i++) {
                    isMarker = true;
                    for (int j = i; j < i + 4; j++) {
                        int k = i;
                        for (; k < i + 4; k++) {
                            if (j == k) continue;
                            if (line.charAt(j) == line.charAt(k)) break;
                        }
                        if (k < i + 4 && (line.charAt(j) == line.charAt(k))) {
                            isMarker = false;
                            break;
                        }
                    }
                    if (isMarker) break;
                    // if (line.charAt(i) != line.charAt(i + 1)
                    //     && line.charAt(i + 1) != line.charAt(i + 2))
                    // if (line.charAt(i) == 'm') System.out.println("found m");
                }
                if (isMarker) foundIndex = i + 4;

                // if (isMoveSection == false) {
                //     // stack configuration section
                //     int fromIndex = 0;
                //     while ((fromIndex = line.indexOf("[", fromIndex)) > -1) {
                //         fromIndex++;
                //         int stackIndex = fromIndex / 4;
                //         ArrayDeque<String> stack = stacks.get(stackIndex);
                //         stack.addFirst(line.substring(fromIndex, fromIndex + 1));
                //     }
                //     continue;
                // }

                // printStacks(stacks);

                // move section, common code
                // String[] words = line.split(" ");
                // int quantity = Integer.parseInt(words[1]);
                // int sourceIndex = Integer.parseInt(words[3]) - 1;
                // int destIndex = Integer.parseInt(words[5]) - 1;
                // ArrayDeque<String> sourceStack = stacks.get(sourceIndex);
                // ArrayDeque<String> destStack = stacks.get(destIndex);

                // move section, part 1
                // if (isPart2 == false) {
                //     for (int n = 0; n < quantity; n++) {
                //         destStack.addLast(sourceStack.removeLast());
                //     }
                //     continue;
                // }

                // move section, part 2
                // ArrayDeque<String> tempStack = new ArrayDeque<String>();
                // for (int n = 0; n < quantity; n++) {
                //     tempStack.addLast(sourceStack.removeLast());
                // }
                // for (int n = 0; n < quantity; n++) {
                //     destStack.addLast(tempStack.removeLast());
                // }

                // continue;
            }
            // isMoveSection = true;
        }

        // printStacks(stacks);

        // StringBuilder message = new StringBuilder();
        // for (int i = 0; i < numStacks; i++) {
        //     ArrayDeque<String> stack = stacks.get(i);
        //     message.append(stack.removeLast());
        // }

        System.out.println("# lines = " + lines.size());
        System.out.println("foundIndex = " + foundIndex);
    }

    // static void printStacks(ArrayList<ArrayDeque<String>> stacks) {
    //     int numStacks = stacks.size();
    //     for (int i = 0; i < numStacks; i++) {
    //         System.out.print("stack[" + (i + 1) + "] = ");
    //         Object[] stack = stacks.get(i).toArray();
    //         for (int j = 0; j < stack.length; j++) {
    //             System.out.print(stack[j] + " ");
    //         }
    //         System.out.println();
    //     }
    //     System.out.println();
    // }
}

import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

public class Day05 {
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\05\\sample_input.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\05\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        // int numStacks = 3;
        int numStacks = 9;
        ArrayList<ArrayDeque<String>> stacks = new ArrayList<ArrayDeque<String>>();
        for (int i = 0; i < numStacks; i++) {
            stacks.add(new ArrayDeque<String>());
        }
        boolean isMoveSection = false;
        for (String line : lines) {
            if (line.length() != 0) {
                // Part 1

                if (isMoveSection == false) {
                    // stack configuration section
                    int fromIndex = 0;
                    while ((fromIndex = line.indexOf("[", fromIndex)) > -1) {
                        fromIndex++;
                        int stackIndex = fromIndex / 4;
                        ArrayDeque<String> stack = stacks.get(stackIndex);
                        stack.addFirst(line.substring(fromIndex, fromIndex + 1));
                    }
                    continue;
                }

                printStacks(stacks);

                // move section
                String[] words = line.split(" ");
                int quantity = Integer.parseInt(words[1]);
                int sourceIndex = Integer.parseInt(words[3]) - 1;
                int destIndex = Integer.parseInt(words[5]) - 1;
                ArrayDeque<String> sourceStack = stacks.get(sourceIndex);
                ArrayDeque<String> destStack = stacks.get(destIndex);
                for (int n = 0; n < quantity; n++) {
                    destStack.addLast(sourceStack.removeLast());
                }

                // Part 2

                continue;
            }
            isMoveSection = true;
        }

        printStacks(stacks);

        StringBuilder message = new StringBuilder();
        for (int i = 0; i < numStacks; i++) {
            ArrayDeque<String> stack = stacks.get(i);
            message.append(stack.removeLast());
        }

        System.out.println("# lines = " + lines.size());
        System.out.println("message = " + message.toString());
    }

    static void printStacks(ArrayList<ArrayDeque<String>> stacks) {
        int numStacks = stacks.size();
        for (int i = 0; i < numStacks; i++) {
            System.out.print("stack[" + (i + 1) + "] = ");
            Object[] stack = stacks.get(i).toArray();
            for (int j = 0; j < stack.length; j++) {
                System.out.print(stack[j] + " ");
            }
            System.out.println();
        }
        System.out.println();
    }
}

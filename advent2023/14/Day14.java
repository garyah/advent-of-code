import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

class Day13Answer {
    long totalLoadP1;
    long totalLoadP2;
}

public class Day14 {
    public static void main(String[] args) throws IOException {
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\14\\sample_input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\14\\sample_input2.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\14\\input.txt");
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2023\\05\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int nRows = lines.size();
        System.out.println("# lines / nRows = " + nRows);
        int nCols = lines.get(0).length();
        System.out.println("first line length / nCols = " + nCols);
        // Scanner scanner = new Scanner(myPath);

        Day13Answer answer = solve(lines, nRows, nCols/*, scanner*/);

        // Part 1: Total load
        System.out.println("part 1: Total load = " + answer.totalLoadP1);

        // Part 2: Total load after 1000000000 cycles
        System.out.println("part 2: Total load after 1000000000 cycles = " + answer.totalLoadP2);
    }

    private static Day13Answer solve(List<String> lines, int nRows, int nCols/*, Scanner scanner*/) {
        Day13Answer answer = new Day13Answer();
        
        char[][] pattern = parseInput(lines, nRows, nCols);

        // Part 1
        // answer.totalLoadP1 = findAnswerP1(pattern, nRows, nCols);

        // Part 2
        answer.totalLoadP2 = findAnswerP2(pattern, nRows, nCols, 1000000000);

        return answer;
    }

    private static long findAnswerP2(char[][] pattern, int nRows, int nCols, int nCycles) {
        // move Os to top, left, bottom, right, in cycle
        for (int dir = 0; dir < 4; dir++) {
            moveAllInDir(pattern, nRows, nCols, dir);
        }

        // sum the loads of Os
        return calcLoad(pattern, nRows, nCols);
    }

    private static void moveAllInDir(char[][] pattern, int nRows, int nCols, int dir) {
        int delta = 0;
        switch (dir) {
            case 0:
            case 2:
                delta = (dir == 0) ? 1 : -1;
                for (int r = (dir == 0) ? 0 : nRows - 1; dir == 0 && r < nRows || dir == 2 && r >= 0; r += delta) {
                    for (int c = (dir == 0) ? 0 : nCols - 1; dir == 0 && c < nCols || dir == 2 && c >= 0; c += delta) {
                        if (pattern[r][c] == 'O') moveOneInDir(pattern, nRows, nCols, r, c, dir);
                    }
                }

                break;
            case 1:
            case 3:
            default:
                delta = (dir == 1) ? 1 : -1;
                for (int c = (dir == 1) ? 0 : nCols - 1; dir == 1 && c < nCols || dir == 3 && c >= 0; c += delta) {
                    for (int r = (dir == 1) ? 0 : nRows - 1; dir == 1 && r < nRows || dir == 3 && r >= 0; r += delta) {
                        if (pattern[r][c] == 'O') moveOneInDir(pattern, nRows, nCols, r, c, dir);
                    }
                }

                break;
        }

        // for (int r = 0; r < nRows; r++) {
        //     for (int c = 0; c < nCols; c++) {
        //         if (pattern[r][c] == 'O') moveOneInDir(pattern, nRows, nCols, r, c, dir);
        //     }
        // }
    }

    private static void moveOneInDir(char[][] pattern, int nRows, int nCols, int r0, int c0, int dir) {
        int delta = 0;
        switch (dir) {
            case 0:
            case 2:
                delta = (dir == 0) ? -1 : 1;
                int r = r0 + delta;
                for (; dir == 0 && r >= 0 || dir == 2 && r < nRows; r += delta) {
                    if (pattern[r][c0] == 'O' || pattern[r][c0] == '#') break;
                }
                pattern[r0][c0] = '.';
                pattern[r - delta][c0] = 'O';

                break;
            case 1:
            case 3:
            default:
                delta = (dir == 1) ? -1 : 1;
                int c = c0 + delta;
                for (; dir == 1 && c >= 0 || dir == 3 && c < nCols; c += delta) {
                    if (pattern[r0][c] == 'O' || pattern[r0][c] == '#') break;
                }
                pattern[r0][c0] = '.';
                pattern[r0][c - delta] = 'O';

                break;
        }
    }

    private static long findAnswerP1(char[][] pattern, int nRows, int nCols) {
        // move Os to top
        for (int r = 0; r < nRows; r++) {
            for (int c = 0; c < nCols; c++) {
                if (pattern[r][c] == 'O') moveOneToTop(pattern, nRows, nCols, r, c);
            }
        }

        // sum the loads of Os
        return calcLoad(pattern, nRows, nCols);
    }

    private static void moveOneToTop(char[][] pattern, int nRows, int nCols, int r0, int c0) {
        int r = r0 - 1;
        for (; r >= 0; r--) {
            if (pattern[r][c0] == 'O' || pattern[r][c0] == '#') break;
        }
        pattern[r0][c0] = '.';
        pattern[r + 1][c0] = 'O';
    }

    private static long calcLoad(char[][] pattern, int nRows, int nCols) {
        long load = 0;

        for (int r = 0; r < nRows; r++) {
            for (int c = 0; c < nCols; c++) {
                if (pattern[r][c] == 'O') {
                    load += nRows - r;
                }
            }
        }

        return load;
    }

    private static String reverse(String s) {
        StringBuilder sb = new StringBuilder(s);
        for (int i = 0, j = s.length() - 1; i < j; i++, j--) {
            char c = sb.charAt(i);
            sb.setCharAt(i, sb.charAt(j));
            sb.setCharAt(j, c);
        }
        return sb.toString();
    }

    private static char[][] parseInput(
        List<String> lines, int nRows, int nCols
        // Scanner scanner
    ) {
        char[][] pattern = new char[nRows][nCols];

        int r = 0;
        for (String line : lines) {
            for (int c = 0; c < nCols; c++) {
                pattern[r][c] = line.charAt(c);
            }
            r++;
        }

        return pattern;

        // List<List<String>> patterns = new ArrayList<>();
        // List<String> pattern = new ArrayList<>();

        // for (String line : lines) {
        //     if (line.length() != 0) {
        //         pattern.add(line);
        //         // System.out.println(line);
        //         continue;
        //     }
        //     if (pattern.size() != 0) {
        //         patterns.add(pattern);
        //         pattern = new ArrayList<>();
        //     }
        //     // System.out.println();
        // }

        // if (pattern.size() != 0) {
        //     patterns.add(pattern);
        // }
        // return patterns;

        // scanner.useDelimiter("[ \\r]+");
        // scanner.useDelimiter("[ ]+");
        // while (scanner.hasNextLine()) {
        //     while (scanner.hasNext()) {
        //         String row = scanner.next();
        //         // pattern.add(row);
        //         System.out.println(row);
        //         scanner.nextLine();
        //     }
        //     while (scanner.hasNextLine() && !scanner.hasNext()) {
        //         System.out.println();
        //         scanner.nextLine();
        //     }
        // }
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

        // Rows and columns to make a grid:
        // numRows = lines.size();
        // numCols = lines.get(0).length();
        // numPoints = numRows * numCols;
        // grid = new char[numRows][numCols];
    }
}

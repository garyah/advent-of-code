import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;
import java.util.Map.Entry;

public class Day08 {
    static Map<String, Object> createDir(String dirName) {
        Map<String, Object> newDir = new HashMap<String, Object>();
        newDir.put("0size", 0);
        newDir.put("0name", dirName);
        return newDir;
    }
    static Map<String, Object> changeParentDir(Map<String, Object> currDir, ArrayDeque<Map<String, Object>> pathStack) {
        Integer currDirSize = (Integer)(currDir.get("0size"));
        Map<String, Object> parentDir = pathStack.removeLast();
        /*int parentNewSize = */updateSize(parentDir, currDirSize);
        // System.out.println("for parentDir = " + parentDir + ", new size = " + parentNewSize);
        return parentDir;
    }
    static Map<String, Object> changeDir(Map<String, Object> currDir, String dirName, ArrayDeque<Map<String, Object>> pathStack) {
        if (currDir != null) {
            pathStack.addLast(currDir);
            if (currDir.containsKey(dirName)) {
                System.out.println("been here before! dirName = " + dirName);
                return (Map<String, Object>)(currDir.get(dirName));
            }
        }
        Map<String, Object> newDir = createDir(dirName);
        if (currDir != null) currDir.put(dirName, newDir);
        return newDir;
    }
    static int updateSize(Map<String, Object> dir, int fileOrDirSize) {
        Integer dirSize = (Integer)(dir.get("0size"));
        dirSize += fileOrDirSize;
        dir.put("0size", dirSize);
        // System.out.println("for dir = " + dir + ", new size = " + dirSize);
        return dirSize;
    }
    static int walkTree(Map<String, Object> rootDir, int maxSize) {
        int totalSize = 0;
        int rootDirSize = (Integer)(rootDir.get("0size"));
        if (rootDirSize <= maxSize) {
            totalSize = rootDirSize;
            // System.out.println("dir passes filter, totalSize set to " + totalSize + ", rootDir = " + rootDir);
        }
        for (Entry<String, Object> entry : rootDir.entrySet()) {
            if (entry.getKey().startsWith("0")) continue;
            Map<String, Object> dir = (Map<String, Object>)(entry.getValue());
            totalSize += walkTree(dir, maxSize);
            // System.out.println("totalSize increased to " + totalSize + ", rootDir = " + rootDir);
        }
        // System.out.println("totalSize returned as " + totalSize + ", rootDir = " + rootDir);
        return totalSize;
    }
    static int walkTreeP2(Map<String, Object> rootDir, int targetSizeToDelete, int sizeOfDirToDelete) {
        // int sizeOfDirToDelete = Integer.MAX_VALUE;
        int rootDirSize = (Integer)(rootDir.get("0size"));
        if (rootDirSize >= targetSizeToDelete) {
            sizeOfDirToDelete = Math.min(sizeOfDirToDelete, rootDirSize);
            // System.out.println("sizeOfDirToDelete set to " + sizeOfDirToDelete + ", rootDir = " + rootDir);
        }
        for (Entry<String, Object> entry : rootDir.entrySet()) {
            if (entry.getKey().startsWith("0")) continue;
            Map<String, Object> dir = (Map<String, Object>)(entry.getValue());
            sizeOfDirToDelete = walkTreeP2(dir, targetSizeToDelete, sizeOfDirToDelete);
            // System.out.println("sizeOfDirToDelete set to " + sizeOfDirToDelete + ", rootDir = " + rootDir);
        }
        // System.out.println("sizeOfDirToDelete returned as " + sizeOfDirToDelete + ", rootDir = " + rootDir);
        return sizeOfDirToDelete;
    }

    static boolean isVisible(int[][] grid, int numRows, int numCols, int row, int col) {
        int height = grid[row][col];
        boolean isVisible;

        // go right
        isVisible = true;
        for (int c = col + 1; c < numCols; c++) {
            if (height <= grid[row][c]) isVisible = false;
        }
        if (isVisible) return true;

        // go down
        isVisible = true;
        for (int r = row + 1; r < numRows; r++) {
            if (height <= grid[r][col]) isVisible = false;
        }
        if (isVisible) return true;

        // go left
        isVisible = true;
        for (int c = col - 1; c >= 0; c--) {
            if (height <= grid[row][c]) isVisible = false;
        }
        if (isVisible) return true;

        // go up
        isVisible = true;
        for (int r = row - 1; r >= 0; r--) {
            if (height <= grid[r][col]) isVisible = false;
        }
        if (isVisible) return true;

        return isVisible;
    }
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\08\\sample_input.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\08\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        int numRows = lines.size();
        int numCols = lines.get(0).length();
        int[][] grid = new int[numRows][numCols];
        // int level = 0;
        // Map<String, Object> currDir = null;
        // ArrayDeque<Map<String, Object>> pathStack = new ArrayDeque<Map<String, Object>>();
        int numVisible = 0;

        // read file
        int row = 0;
        for (String line : lines) {
            if (line.length() != 0) {
                for (int col = 0; col < numCols; col++) {
                    grid[row][col] = line.charAt(col);
                }
                // String[] fields = line.split(" ");
                // if (line.startsWith("$ ")) {
                //     // commands
                //     if (line.contains("cd ")) {
                //         // change dir
                //         if (line.contains("..")) {
                //             // go up one level of dir
                //             currDir = changeParentDir(currDir, pathStack);
                //             level--;
                //             continue;
                //         }
                //         // go down one level of dir
                //         currDir = changeDir(currDir, fields[2], pathStack);
                //         level++;
                //         continue;
                //     }
                //     if (line.contains("ls ")) {
                //         // list dir
                //         continue;
                //     }
                //     continue;
                // }

                // results
                // if (line.startsWith("dir ")) {
                //     // directory
                //     continue;
                // }
                // file
                // int fileSize = Integer.parseInt(fields[0]);
                // updateSize(currDir, fileSize);

                // Part 1

            }
            row++;
        }

        // traverse grid
        numVisible += (numRows * 2 + numCols * 2 - 4);
        for (row = 1; row < numRows - 1; row++) {
            for (int col = 1; col < numCols - 1; col++) {
                if (isVisible(grid, numRows, numCols, row, col)) numVisible++;
            }
        }

        // navigate current directory back to root
        // System.out.println("pathStack.size() = " + pathStack.size());
        // while (!pathStack.isEmpty()) {
        //     currDir = changeParentDir(currDir, pathStack);
        // }

        // walk whole tree, to get total of all sizes below a certain size
        // int totalSize = walkTree(currDir, 100000);

        System.out.println("# lines = " + lines.size());
        System.out.println("numRows = " + numRows);
        System.out.println("numCols = " + numCols);
        System.out.println("numVisible = " + numVisible);
        // System.out.println("file ended at level = " + level);

        // Part 2

        // walk whole tree, to get smallest directory to meet free space threshold
        // int rootDirSize = (Integer)(currDir.get("0size"));
        // int currentUnused = 70000000 - rootDirSize;
        // int targetSizeToDelete = 30000000 - currentUnused;
        // int sizeOfDirToDelete = walkTreeP2(currDir, targetSizeToDelete, Integer.MAX_VALUE);

        // System.out.println("currentUnused = " + currentUnused);
        // System.out.println("targetSizeToDelete = " + targetSizeToDelete);
        // System.out.println("sizeOfDirToDelete = " + sizeOfDirToDelete);
    }

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
    //
    // Part 2 flagging:
    // boolean isPart2 = true;
}

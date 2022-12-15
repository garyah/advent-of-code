import java.io.*;
import java.nio.charset.*;
import java.nio.file.*;
import java.util.*;

enum Type {
    Sensor,
    Beacon
}

public class Day15 {
    // static boolean isPart2;
    static int targetY;
    static int targetYMinX;
    static int targetYMaxX;
    static int minX;
    static int minY;
    static int maxX;
    static int maxY;
    static Set<Integer> targetYBeacons;
    static Set<Integer> targetYExcluded;
    // static int numTargetYBeacons;
    // static Map<String, Type> grid;
    // static List<String> sensorList;
    // static List<String> beaconList;

    static int[] coordsFromString(String coords) {
        int[] result = new int[2];
        String[] fields = coords.split(", ");
        result[0] = Integer.parseInt(fields[0].substring(2));
        result[1] = Integer.parseInt(fields[1].substring(2));
        return result;
    }
    static int manhattan(int x1, int x2, int y1, int y2) {
        return Math.abs(x2 - x1) + Math.abs(y2 - y1);
    }
    public static void main(String[] args) throws IOException {
        // Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\15\\sample_input.txt");
        Path myPath = Paths.get("C:\\Users\\garya\\ws\\advent-of-code\\advent2022\\15\\input.txt");
        List<String> lines = Files.readAllLines(myPath, StandardCharsets.UTF_8);
        // isPart2 = true;
        // targetY = 10;
        targetY = 2000000;
        minX = Integer.MAX_VALUE;
        minY = Integer.MAX_VALUE;
        maxX = Integer.MIN_VALUE;
        maxY = Integer.MIN_VALUE;
        targetYMinX = Integer.MAX_VALUE;
        targetYMaxX = Integer.MIN_VALUE;
        targetYBeacons = new HashSet<Integer>();
        targetYExcluded = new HashSet<Integer>();
        // numTargetYBeacons = 0;
        // grid = new HashMap<String, Type>();
        // sensorList = new ArrayList<String>();
        // beaconList = new ArrayList<String>();

        // read file
        int numExcludedPositions = 0;
        for (String line : lines) {
            if (line.length() != 0) {
                int sensorCoordsIdx = line.indexOf("x=");
                String sensorCoords = line.substring(sensorCoordsIdx).split(": ")[0];
                String beaconCoords = line.substring(line.indexOf("x=", sensorCoordsIdx + 1));
                // System.out.println(sensorCoords);
                // System.out.println(beaconCoords);

                int sensorX = coordsFromString(sensorCoords)[0];
                int sensorY = coordsFromString(sensorCoords)[1];
                System.out.print("sensorCoords x = " + sensorX + ", y = " + sensorY);

                int beaconX = coordsFromString(beaconCoords)[0];
                int beaconY = coordsFromString(beaconCoords)[1];
                System.out.print(", beaconCoords x = " + beaconX + ", y = " + beaconY);

                minX = Math.min(minX, sensorX);
                minX = Math.min(minX, beaconX);
                minY = Math.min(minY, sensorY);
                minY = Math.min(minY, beaconY);

                maxX = Math.max(maxX, sensorX);
                maxX = Math.max(maxX, beaconX);
                maxY = Math.max(maxY, sensorY);
                maxY = Math.max(maxY, beaconY);

                int sensorToBeaconDistance = manhattan(sensorX, beaconX, sensorY, beaconY);
                int sensorToTargetYDeltaY = Math.abs(targetY - sensorY);
                int targetYDeltaX = Math.abs(sensorToBeaconDistance - sensorToTargetYDeltaY);
                int targetYLoX = sensorX - targetYDeltaX;
                int targetYHiX = sensorX + targetYDeltaX;
                System.out.print(", sensorToBeaconDistance = " + sensorToBeaconDistance);
                System.out.print(", sensorToTargetYDeltaY = " + sensorToTargetYDeltaY);
                System.out.print(", targetYDeltaX = " + targetYDeltaX);
                System.out.println(", targetYLoX = " + targetYLoX + ", targetYHiX = " + targetYHiX);

                targetYMinX = Math.min(targetYMinX, targetYLoX);
                targetYMaxX = Math.max(targetYMaxX, targetYHiX);

                if (beaconY == targetY) targetYBeacons.add(beaconX);

                for (int x = targetYLoX; x <= targetYHiX; x++) {
                    if (!targetYExcluded.contains(x)) {
                        numExcludedPositions++;
                        targetYExcluded.add(x);
                    }
                }

                // grid.put(sensorCoords, Type.Sensor);
                // grid.put(beaconCoords, Type.Beacon);
                // sensorList.add(sensorCoords);
                // beaconList.add(beaconCoords);
            }
        }
        // numExcludedPositions = targetYMaxX - targetYMinX + 1 - targetYBeacons.size();
        // numExcludedPositions -= targetYBeacons.size();
        numExcludedPositions = targetYExcluded.size() - targetYBeacons.size();

        System.out.println("# lines = " + lines.size());
        // System.out.println("# sensors = " + sensorList.size());
        // System.out.println("# beacons = " + beaconList.size());

        System.out.println("targetY = " + targetY);
        System.out.print("min x = " + minX + ", y = " + minY);
        System.out.println(", max x = " + maxX + ", y = " + maxY);

        System.out.println("targetY min x = " + targetYMinX + ", max x = " + targetYMaxX);
        System.out.println("number of targetY beacons = " + targetYBeacons.size());
        System.out.println("numExcludedPositions = " + numExcludedPositions);
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

        // Rows and columns to make a greid:
        // numRows = lines.size();
        // numCols = lines.get(0).length();
        // numPoints = numRows * numCols;
        // grid = new char[numRows][numCols];
    }
}

import java.io.*;
import java.util.*;

public class Day01AIf {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int sum = 0;
        Map<String, String> digitMap = new LinkedHashMap<>();
        digitMap.put("one", "1");
        digitMap.put("two", "2");
        digitMap.put("three", "3");
        digitMap.put("four", "4");
        digitMap.put("five", "5");
        digitMap.put("six", "6");
        digitMap.put("seven", "7");
        digitMap.put("eight", "8");
        digitMap.put("nine", "9");

        while ((line = reader.readLine()) != null) {
            int minIndex = Integer.MAX_VALUE;
            String minWord = "";
            while (true) {
                for (Map.Entry<String, String> entry : digitMap.entrySet()) {
                    int index = line.indexOf(entry.getKey());
                    if (index != -1 && index < minIndex) {
                        minIndex = index;
                        minWord = entry.getKey();
                    }
                }
                if (minWord.equals("")) {
                    break;
                }
                line = line.substring(0, minIndex) + digitMap.get(minWord) + line.substring(minIndex + minWord.length());
                minIndex = Integer.MAX_VALUE;
                minWord = "";
            }
            String firstDigit = "", lastDigit = "";
            for (char c : line.toCharArray()) {
                if (Character.isDigit(c)) {
                    if (firstDigit.isEmpty()) {
                        firstDigit = Character.toString(c);
                    }
                    lastDigit = Character.toString(c);
                }
            }
            if (!firstDigit.isEmpty() && !lastDigit.isEmpty()) {
                sum += Integer.parseInt(firstDigit + lastDigit);
            }
        }
        System.out.println("The sum of all calibration values is: " + sum);
    }
}

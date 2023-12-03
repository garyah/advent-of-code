import java.io.*;
import java.util.*;

public class Day01AId {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int sum = 0;
        Map<String, Integer> digitMap = new HashMap<>();
        digitMap.put("one", 1);
        digitMap.put("two", 2);
        digitMap.put("three", 3);
        digitMap.put("four", 4);
        digitMap.put("five", 5);
        digitMap.put("six", 6);
        digitMap.put("seven", 7);
        digitMap.put("eight", 8);
        digitMap.put("nine", 9);

        while ((line = reader.readLine()) != null) {
            String firstDigit = "", lastDigit = "";
            for (Map.Entry<String, Integer> entry : digitMap.entrySet()) {
                int index = line.indexOf(entry.getKey());
                if (index != -1) {
                    String digit = entry.getValue().toString();
                    if (firstDigit.isEmpty() || index < line.indexOf(firstDigit)) {
                        firstDigit = digit;
                    }
                    if (lastDigit.isEmpty() || index > line.lastIndexOf(lastDigit)) {
                        lastDigit = digit;
                    }
                    line = line.replace(entry.getKey(), "");
                }
            }
            for (char c : line.toCharArray()) {
                if (Character.isDigit(c)) {
                    String digit = Character.toString(c);
                    if (firstDigit.isEmpty() || line.indexOf(digit) < line.indexOf(firstDigit)) {
                        firstDigit = digit;
                    }
                    if (lastDigit.isEmpty() || line.lastIndexOf(digit) > line.lastIndexOf(lastDigit)) {
                        lastDigit = digit;
                    }
                }
            }
            if (!firstDigit.isEmpty() && !lastDigit.isEmpty()) {
                System.out.println("The modified line is: " + line);
                System.out.println("The calibration value is: " + Integer.parseInt(firstDigit + lastDigit));
                sum += Integer.parseInt(firstDigit + lastDigit);
            }
        }
        System.out.println("The sum of all calibration values is: " + sum);
    }
}

import java.io.*;
import java.util.*;

public class Day01AIg {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int sum = 0;
        Map<String, String> digitMap = new HashMap<>();
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
            List<String> digitsInLine = new ArrayList<>();
            String currentWord = "";
            for (char c : line.toCharArray()) {
                if (Character.isDigit(c)) {
                    digitsInLine.add(Character.toString(c));
                } else if (Character.isLetter(c)) {
                    currentWord += c;
                    if (digitMap.containsKey(currentWord)) {
                        digitsInLine.add(digitMap.get(currentWord));
                        currentWord = "";
                    }
                }
            }
            if (digitsInLine.size() >= 2) {
                sum += Integer.parseInt(digitsInLine.get(0) + digitsInLine.get(digitsInLine.size() - 1));
            }
        }
        System.out.println("The sum of all calibration values is: " + sum);
    }
}

import java.io.*;
import java.util.*;

public class Day01AIh {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int sum = 0;
        String[] words = {"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};
        String[] digits = {"1", "2", "3", "4", "5", "6", "7", "8", "9"};

        while ((line = reader.readLine()) != null) {
            for (int i = 0; i < words.length; i++) {
                line = line.replace(words[i], digits[i]);
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

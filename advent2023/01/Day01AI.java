import java.io.*;
import java.util.*;

public class Day01AI {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int sum = 0;

        while ((line = reader.readLine()) != null) {
            char firstDigit = ' ', lastDigit = ' ';
            for (char c : line.toCharArray()) {
                if (Character.isDigit(c)) {
                    if (firstDigit == ' ') {
                        firstDigit = c;
                    }
                    lastDigit = c;
                }
            }
            if (firstDigit != ' ' && lastDigit != ' ') {
                sum += Integer.parseInt("" + firstDigit + lastDigit);
            }
        }
        System.out.println("The sum of all calibration values is: " + sum);
    }
}

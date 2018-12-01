cat tests_input.txt | ./template > tests_output.txt
diff tests_output_expected.txt tests_output.txt

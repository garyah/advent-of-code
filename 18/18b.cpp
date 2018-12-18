#include <iostream>
#include <stdio.h>

#include "../advent2018/LumberCalculator.hpp"

using namespace std;
using namespace Advent2018;

int main()
{
	LumberCalculator calculator(0, 0, "");
	do
	{
		char line[80 + 1] = { 0 };
		cin.getline(line, _countof(line));
		auto first = 0u;
		auto second = 0;
		char third[10 + 1] = { 0 };
		(void)sscanf_s(line, "unsigned %u, int %d, string %10s",
			&first, &second, third, 10);
		calculator.method1(first, second, third);
	} while (!cin.eof());

	calculator.method2();
	cout << calculator._field1 << ", " << calculator._field2 << ", |" << calculator._field3 << "|" << endl;
	cout << calculator._field1 << endl;
	return 0;
}

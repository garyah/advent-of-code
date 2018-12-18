#include <iostream>
#include <stdio.h>

#include "../advent2018/LumberCalculator.hpp"

using namespace std;
using namespace Advent2018;

int main()
{
	LumberCalculator calculator;
	do
	{
		char line[80 + 1] = { 0 };
		cin.getline(line, _countof(line));
		calculator.addRow(line);
	} while (!cin.eof());

	int n1 = 1;
	for (; n1 <= 100 * 1000; ++n1)
	{
		calculator.updateArea();
	}

	for (int n2 = n1; n2 < n1 + 200; ++n2)
	{
		cout << n2 << ": " << calculator._numOpen << ", " << calculator._numWithTrees << ", " << calculator._numYards << endl;
		unsigned resourceValue;
		calculator.getResourceValue(resourceValue);
		cout << "resource value = " << resourceValue << endl;
		calculator.updateArea();
	}
	return 0;
}

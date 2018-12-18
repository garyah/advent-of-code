#include <iostream>
#include <stdio.h>

#include "../advent2018/LumberCalculator.hpp"

using namespace std;
using namespace Advent2018;

int main()
{
	// unit testing
	{
		//LumberCalculator calculator;
		//auto out1 = 0u;
		//string out2;
		//calculator.helper1(0u, 0, out1, out2);
		//cout << "helper1 test 1: expected 0 and ||, actual ";
		//cout << out1 << " and |" << out2 << "|" << endl;
	}
	{
		//LumberCalculator calculator;
		//calculator.addRow(0u, 0, "");
		//cout << "addRow test 1: expected 0, actual " << calculator._numOpen << endl;
	}

	LumberCalculator calculator;
	do
	{
		char line[80 + 1] = { 0 };
		cin.getline(line, _countof(line));
		calculator.addRow(line);
	} while (!cin.eof());

	for (int n = 1; n <= 1; ++n)
	{
		calculator.updateArea();
	}

	cout << calculator._numOpen << ", " << calculator._numWithTrees << ", " << calculator._numYards << endl;
	unsigned resourceValue;
	calculator.getResourceValue(resourceValue);
	cout << "resource value = " << resourceValue << endl;
	return 0;
}

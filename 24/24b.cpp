#include <iostream>
#include <stdio.h>
#include <string.h>

#include "../advent2018/ImmuneSimulator.hpp"

using namespace std;
using namespace Advent2018;

int main()
{
	char line[80 + 1] = { 0 };
	cin.getline(line, _countof(line));
	ImmuneSimulator simulator(0, 0, "");
	do
	{
		cin.getline(line, _countof(line));
		if (strlen(line) == 0) break;
		auto first = 0u;
		auto second = 0;
		char third[10 + 1] = { 0 };
		(void)sscanf_s(line, "%u units each with %u hit points (%s) with",
			&first, &second, third, 10);
		//simulator.addGroup(first, second, third);
	} while (!cin.eof());

	//simulator.method2();
	//cout << simulator._field1 << ", " << simulator._field2 << ", |" << simulator._field3 << "|" << endl;
	//cout << simulator._field1 << endl;
	return 0;
}

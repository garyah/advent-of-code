#include <iostream>
#include <stdio.h>

#include "../advent2018/ImmuneSimulator.hpp"

using namespace std;
using namespace Advent2018;

int main()
{
	// unit testing
	//{
	//	ImmuneSimulator simulator(0, 0, "");
	//	auto out1 = 0u;
	//	string out2;
	//	simulator.helper1(0u, 0, out1, out2);
	//	cout << "helper1 test 1: expected 0 and ||, actual ";
	//	cout << out1 << " and |" << out2 << "|" << endl;
	//}
	//{
	//	ImmuneSimulator simulator(0, 0, "");
	//	simulator.method1(0u, 0, "");
	//	cout << "method1 test 1: expected 0, actual " << simulator._field1 << endl;
	//}

	ImmuneSimulator simulator(0, 0, "");
	do
	{
		char line[80 + 1] = { 0 };
		cin.getline(line, _countof(line));
		auto first = 0u;
		auto second = 0;
		char third[10 + 1] = { 0 };
		(void)sscanf_s(line, "unsigned %u, int %d, string %10s",
			&first, &second, third, 10);
		simulator.method1(first, second, third);
	} while (!cin.eof());

	simulator.method2();
	cout << simulator._field1 << ", " << simulator._field2 << ", |" << simulator._field3 << "|" << endl;
	cout << simulator._field1 << endl;
	return 0;
}

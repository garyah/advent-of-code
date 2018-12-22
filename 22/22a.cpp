#include <iostream>
#include <stdio.h>

#include "../advent2018/CaveAssessor.hpp"

using namespace std;
using namespace Advent2018;

int main()
{
	// unit testing
	//{
	//	CaveAssessor assessor(0, 0, "");
	//	auto out1 = 0u;
	//	string out2;
	//	assessor.helper1(0u, 0, out1, out2);
	//	cout << "helper1 test 1: expected 0 and ||, actual ";
	//	cout << out1 << " and |" << out2 << "|" << endl;
	//}
	//{
	//	CaveAssessor assessor(0, 0, "");
	//	assessor.method1(0u, 0, "");
	//	cout << "method1 test 1: expected 0, actual " << assessor._field1 << endl;
	//}

	char line[80 + 1] = { 0 };
	cin.getline(line, _countof(line));
	auto depth = 0u;
	(void)sscanf_s(line, "depth: %u", &depth);

	cin.getline(line, _countof(line));
	auto targetX = 0u;
	auto targetY = 0u;
	(void)sscanf_s(line, "target: %u,%u", &targetX, &targetY);
	CaveAssessor assessor(depth, targetX, targetY);

	assessor.method2();
	//cout << assessor._field1 << ", " << assessor._field2 << ", |" << assessor._field3 << "|" << endl;
	//cout << assessor._field1 << endl;
	return 0;
}

#include <iostream>
#include <stdio.h>

#include "../advent2018/ConstellationFinder.hpp"

using namespace std;
using namespace Advent2018;

int main()
{
	// unit testing
	//{
	//	ConstellationFinder finder(0, 0, "");
	//	auto out1 = 0u;
	//	string out2;
	//	finder.helper1(0u, 0, out1, out2);
	//	cout << "helper1 test 1: expected 0 and ||, actual ";
	//	cout << out1 << " and |" << out2 << "|" << endl;
	//}
	//{
	//	ConstellationFinder finder(0, 0, "");
	//	finder.addPoint(0u, 0, "");
	//	cout << "addPoint test 1: expected 0, actual " << finder._field1 << endl;
	//}

	ConstellationFinder finder(0, 0, "");
	do
	{
		char line[80 + 1] = { 0 };
		cin.getline(line, _countof(line));
		if (strlen(line) == 0) break;
		auto x = 0, y = 0, z = 0, t = 0;
		(void)sscanf_s(line, "%u, %u, %u, %u", &x, &y, &z, &t);
		finder.addPoint(x, y, z, t);
	} while (!cin.eof());

	finder.countConstellations();
	cout << finder._numCloseDistances << endl;
	cout << finder._numConstellations << endl;
	return 0;
}

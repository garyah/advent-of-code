#include <iostream>
#include <stdio.h>

#include "../advent2018/ConstellationFinder.hpp"

using namespace std;
using namespace Advent2018;

int main()
{
	ConstellationFinder finder(0, 0, "");
	do
	{
		char line[80 + 1] = { 0 };
		cin.getline(line, _countof(line));
		auto x = 0, y = 0, z = 0, t = 0;
		(void)sscanf_s(line, "%u, %u, %u, %u", &x, &y, &z, &t);
		finder.addPoint(x, y, z, t);
	} while (!cin.eof());

	//finder.method2();
	//cout << finder._field1 << ", " << finder._field2 << ", |" << finder._field3 << "|" << endl;
	//cout << finder._field1 << endl;
	return 0;
}

#include <iostream>
#include <stdio.h>

#include "../advent2018/CombatGame.hpp"

using namespace std;
using namespace Advent2018;

int main()
{
	// unit testing
	{
		CombatGame game(0, 0, "");
		auto out1 = 0u;
		string out2;
		game.helper1(0u, 0, out1, out2);
		cout << "helper1 test 1: expected 0 and ||, actual ";
		cout << out1 << " and |" << out2 << "|" << endl;
	}
	{
		CombatGame game(0, 0, "");
		game.method1(0u, 0, "");
		cout << "method1 test 1: expected 0, actual " << game._field1 << endl;
	}

	CombatGame game(0, 0, "");
	do
	{
		char line[80 + 1] = { 0 };
		cin.getline(line, _countof(line));
		auto first = 0u;
		auto second = 0;
		char third[10 + 1] = { 0 };
		(void)sscanf_s(line, "unsigned %u, int %d, string %10s",
			&first, &second, third, 10);
		game.method1(first, second, third);
	} while (!cin.eof());

	game.method2();
	cout << game._field1 << ", " << game._field2 << ", |" << game._field3 << "|" << endl;
	cout << game._field1 << endl;
	return 0;
}

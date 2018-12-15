#include <iostream>
#include <stdio.h>

#include "../advent2018/CombatGame.hpp"

using namespace Advent2018;

int main()
{
	CombatGame game(0, 0, "");
	do
	{
		char line[80 + 1] = { 0 };
		std::cin.getline(line, _countof(line));
		auto first = 0u;
		auto second = 0;
		char third[10 + 1] = { 0 };
		(void)sscanf_s(line, "unsigned %u, int %d, string %10s",
			&first, &second, third, 10);
		game.method1(first, second, third);
	} while (!std::cin.eof());

	game.method2();
	std::cout << game._field1 << ", " << game._field2 << ", |" << game._field3 << "|" << std::endl;
	std::cout << game._field1 << std::endl;
	return 0;
}

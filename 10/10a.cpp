#include <iostream>
#include <stdio.h>

#include "../advent2018/StarMessageFinder.hpp"

using namespace Advent2018;

int main()
{
	char line[80 + 1] = { 0 };
	std::cin.getline(line, _countof(line));
	auto numPlayers = 0u;
	auto lastMarble = 0u;
	(void)sscanf_s(line, "%u players; last marble is worth %u points", &numPlayers, &lastMarble);

	StarMessageFinder finder;
	finder.method1("");
	std::cout << finder.method2() << std::endl;
	return 0;
}

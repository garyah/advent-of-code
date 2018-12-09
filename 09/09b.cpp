#include <iostream>
#include <stdio.h>

#include "../advent2018/MarbleGame.hpp"

using namespace Advent2018;

int main()
{
	char line[80 + 1] = { 0 };
	std::cin.getline(line, _countof(line));
	auto numPlayers = 0u;
	auto lastMarble = 0u;
	(void)sscanf_s(line, "%u players; last marble is worth %u points", &numPlayers, &lastMarble);

	MarbleGame game;
	game.method1(numPlayers, lastMarble);
	std::cout << game.method2();
	return 0;
}

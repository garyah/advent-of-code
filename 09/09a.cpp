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
	game.setNumPlayersAndLastMarble(numPlayers, lastMarble);
	game.playGame();
	//std::cout << game.getCurrentPlayer() << std::endl;
	//std::cout << game.getIndexOfCurrentMarble() << std::endl;
	std::cout << game.getWinningScore() << std::endl;
	return 0;
}

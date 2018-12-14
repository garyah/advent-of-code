#include <iostream>
#include <stdio.h>

#include "../advent2018/RecipeScorer.hpp"

using namespace Advent2018;

int main()
{
	RecipeScorer scorer;

	std::string scoresToFind;
	std::cin >> scoresToFind;
	int scoresSkipped = -1;
	scorer.getNumScoresSkipped(scoresToFind, scoresSkipped);
	std::cout << scoresSkipped << std::endl;
	return 0;
}

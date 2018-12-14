#include <iostream>
#include <stdio.h>

#include "../advent2018/RecipeScorer.hpp"

using namespace Advent2018;

int main()
{
	RecipeScorer scorer;

	int numScoresToSkip = 0;
	std::cin >> numScoresToSkip;
	std::string tenScores;
	scorer.getTenScoresAfterSkipping(numScoresToSkip, tenScores);
	std::cout << tenScores << std::endl;
	return 0;
}

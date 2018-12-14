#include <iostream>
#include <stdio.h>

#include "../advent2018/RecipeScorer.hpp"

using namespace Advent2018;

int main()
{
	// unit testing
	{
		RecipeScorer scorer(0, 0, "");
		auto firstScore = -1, secondScore = -1;
		scorer.makeNewScores(3, 7, firstScore, secondScore);
		std::cout << "makeNewScores test 1: expected 1 and 0, actual ";
		std::cout << firstScore << " and " << secondScore << std::endl;
	}
	{
		RecipeScorer scorer(0, 0, "");
		auto firstScore = -1, secondScore = -1;
		scorer.makeNewScores(2, 3, firstScore, secondScore);
		std::cout << "makeNewScores test 2: expected 5 and -1, actual ";
		std::cout << firstScore << " and " << secondScore << std::endl;
	}
	{
		RecipeScorer scorer;
		scorer.addNewScoresToBoard();
		std::cout << "addNewScoresToBoard test 1: expected score board size of 4 ending with 1 and 0, actual ";
		std::cout << "size of " << scorer.getScoreBoard().size() << " ending with ";
		std::cout << *(scorer.getScoreBoard().cend() - 2) << " and ";
		std::cout << *(scorer.getScoreBoard().cend() - 1) << std::endl;
	}
	{
		RecipeScorer scorer(0, 0, "");
		scorer.method1(0u, 0, "");
		//std::cout << "method1 test 1: expected 0, actual " << scorer.getFirstElfCurrentIndex() << std::endl;
	}

	RecipeScorer scorer(0, 0, "");
	do
	{
		char line[80 + 1] = { 0 };
		std::cin.getline(line, _countof(line));
		auto first = 0u;
		auto second = 0;
		char third[10 + 1] = { 0 };
		(void)sscanf_s(line, "unsigned %u, int %d, string %10s",
						&first, &second, third, 10);
		scorer.method1(first, second, third);
	} while (!std::cin.eof());

	scorer.method2();
	std::cout << scorer.getFirstElfCurrentIndex() << ", " << scorer.getSecondElfCurrentIndex() << ", |" << scorer.getField3() << "|" << std::endl;
	std::cout << scorer.getFirstElfCurrentIndex() << std::endl;
	return 0;
}

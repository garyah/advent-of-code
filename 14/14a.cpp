#include <iostream>
#include <stdio.h>

#include "../advent2018/RecipeScorer.hpp"

using namespace Advent2018;

int main()
{
	// unit testing
	{
		RecipeScorer scorer(0, 0, "");
		auto numScoresToSkipScore = -1, secondScore = -1;
		scorer.makeNewScores(3, 7, numScoresToSkipScore, secondScore);
		std::cout << "makeNewScores test 1: expected 1 and 0, actual ";
		std::cout << numScoresToSkipScore << " and " << secondScore << std::endl;
	}
	{
		RecipeScorer scorer(0, 0, "");
		auto numScoresToSkipScore = -1, secondScore = -1;
		scorer.makeNewScores(2, 3, numScoresToSkipScore, secondScore);
		std::cout << "makeNewScores test 2: expected 5 and -1, actual ";
		std::cout << numScoresToSkipScore << " and " << secondScore << std::endl;
	}
	{
		RecipeScorer scorer;
		scorer.addNewScoresToBoard();
		std::cout << "addNewScoresToBoard test 1: called once, expected score board size of 4 ending with 1 and 0, actual ";
		std::cout << "size of " << scorer.getScoreBoard().size() << " ending with ";
		std::cout << *(scorer.getScoreBoard().cend() - 2) << " and ";
		std::cout << *(scorer.getScoreBoard().cend() - 1) << std::endl;
	}
	{
		RecipeScorer scorer;
		size_t index = 0;
		scorer.advanceElf(index, 1 + 3, 4);
		std::cout << "advanceElf test 1: advance index 0 by 1 + 3 = 4 with size 4, expected index 0, actual " << index << std::endl;
	}
	{
		RecipeScorer scorer;
		size_t index = 1;
		scorer.advanceElf(index, 1 + 7, 4);
		std::cout << "advanceElf test 2: advance index 1 by 1 + 7 = 8 with size 4, expected index 1, actual " << index << std::endl;
	}
	{
		RecipeScorer scorer;
		size_t index = 6;
		scorer.advanceElf(index, 2, 8);
		std::cout << "advanceElf test 3: advance index 6 by 2 with size 8, expected index 0, actual " << index << std::endl;
	}
	{
		RecipeScorer scorer;
		scorer.updateScoreBoard();
		std::cout << "updateScoreBoard test 1: called once, expected score board size of 4 with current elf scores of 3 and 7, actual ";
		std::cout << "size of " << scorer.getScoreBoard().size() << " with scores of ";
		std::cout << scorer.getScoreBoard()[scorer.getFirstElfCurrentIndex()] << " and ";
		std::cout << scorer.getScoreBoard()[scorer.getSecondElfCurrentIndex()] << std::endl;
	}
	{
		RecipeScorer scorer;
		scorer.updateScoreBoard();
		scorer.updateScoreBoard();
		std::cout << "updateScoreBoard test 2: called twice, expected score board size of 6 with current elf scores of 1 and 0, actual ";
		std::cout << "size of " << scorer.getScoreBoard().size() << " with scores of ";
		std::cout << scorer.getScoreBoard()[scorer.getFirstElfCurrentIndex()] << " and ";
		std::cout << scorer.getScoreBoard()[scorer.getSecondElfCurrentIndex()] << std::endl;
	}

	RecipeScorer scorer;

	int numScoresToSkip = 0;
	std::cin >> numScoresToSkip;
	std::string tenScores;
	scorer.getTenScoresAfterSkipping(numScoresToSkip, tenScores);
	std::cout << tenScores << std::endl;
	return 0;
}

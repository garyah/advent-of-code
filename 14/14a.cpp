#include <iostream>
#include <stdio.h>

#include "../advent2018/RecipeScorer.hpp"

using namespace Advent2018;

int main()
{
	// unit testing
	{
		RecipeScorer scorer(0, 0, "");
		scorer.helper1(0u, 0, "");
		std::cout << "helper1 test 1: expected 0, actual " << scorer.getField1() << std::endl;
	}
	{
		RecipeScorer scorer(0, 0, "");
		scorer.method1(0u, 0, "");
		std::cout << "method1 test 1: expected 0, actual " << scorer.getField1() << std::endl;
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
	std::cout << scorer.getField1() << ", " << scorer.getField2() << ", |" << scorer.getField3() << "|" << std::endl;
	std::cout << scorer.getField1() << std::endl;
	return 0;
}

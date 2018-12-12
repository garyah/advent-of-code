#include <iostream>
#include <stdio.h>

#include "../advent2018/BlankClass.hpp"

using namespace Advent2018;

int main()
{
	// unit testing
	{
		BlankClass blank;
		blank.executeRule("..#..", "..#..", '.');
		std::cout << "executeRule test 1: for ..#.. => .  expected . actual " << blank.getRuleOutput() << std::endl;
	}
	{
		BlankClass blank;
		blank.executeRule("##.##", "##.##", '.');
		std::cout << "executeRule test 2: for ##.## => .  expected . actual " << blank.getRuleOutput() << std::endl;
	}
	{
		BlankClass blank;
		blank.executeRule(".##.#", ".##.#", '#');
		std::cout << "executeRule test 3: for .##.# => #  expected # actual " << blank.getRuleOutput() << std::endl;
	}
	{
		//BlankClass blank;
		//blank.addRule(".##.#", false);
		//std::cout << "addRule test 1: expected 0, actual " << blank.getCurrentState() << std::endl;
	}

	char line[200 + 1] = { 0 };
	std::cin.getline(line, _countof(line));
	char initialState[120 + 1] = { 0 };
	(void)sscanf_s(line, "initial state: %s", initialState, 121);
	BlankClass blank(initialState);
	std::cin.getline(line, _countof(line));
	do
	{
		std::cin.getline(line, _countof(line));
		char pattern[5 + 1] = { 0 };
		char outcome = 0;
		(void)sscanf_s(line, "%s %*s %c", pattern, 6, &outcome);
		blank.addRule(pattern, outcome);
	} while (!std::cin.eof());

	//blank.method2();
	std::cout << blank.getCurrentState() << std::endl;
	for (int i = 1; i <= 20; ++i)
	{
		blank.processState();
		//std::cout << blank.getCurrentState() << std::endl;
		//std::cout << blank.getNumPlants() << std::endl;
	}
	std::cout << blank.getNumPlants() << std::endl;
	return 0;
}

#include <iostream>
#include <stdio.h>

#include "../advent2018/PlantForecaster.hpp"

using namespace Advent2018;

int main()
{
	char line[200 + 1] = { 0 };
	std::cin.getline(line, _countof(line));
	char initialState[120 + 1] = { 0 };
	(void)sscanf_s(line, "initial state: %s", initialState, 121);
	PlantForecaster forecaster(initialState);
	std::cin.getline(line, _countof(line));
	do
	{
		std::cin.getline(line, _countof(line));
		char pattern[5 + 1] = { 0 };
		char outcome = 0;
		(void)sscanf_s(line, "%s %*s %c", pattern, 6, &outcome);
		forecaster.addRule(pattern, outcome);
	} while (!std::cin.eof());

	std::cout << forecaster.getCurrentState() << std::endl;
	for (int i = 1; i <= 200 * 1000; ++i)
	{
		forecaster.processState();
		if (i % (10 * 1000) == 0)
		{
			std::cout << "after " << i << " iterations,";
			std::cout << " # pots = " << forecaster.getCurrentSize() << std::endl;
		}
		//std::cout << forecaster.getCurrentState() << std::endl;
		//std::cout << forecaster.getNumPlants() << std::endl;
	}
	forecaster.countPlants();
	std::cout << forecaster.getNumPlants() << std::endl;
	return 0;
}

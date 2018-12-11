#include <iostream>
#include <stdio.h>

#include "../advent2018/PowerFinder.hpp"

using namespace Advent2018;

int main()
{
	PowerFinder finder;
	//do
	//{
	//	char line[80 + 1] = { 0 };
	//	std::cin.getline(line, _countof(line));
	//	//auto xPos = 0, yPos = 0;
	//	//auto xVel = 0, yVel = 0;
	//	//(void)sscanf_s(line, "position=< %d, %d> velocity=< %d, %d>",
	//	//	&xPos, &yPos, &xVel, &yVel);
	//	finder.method1(/*xPos, yPos, xVel, yVel*/line);
	//} while (!std::cin.eof());

	//finder.statPoints();
	auto number = 0u;
	std::cin >> number;
	//finder.method1(number);
	std::cout << finder.method2(number) << std::endl;
	return 0;
}

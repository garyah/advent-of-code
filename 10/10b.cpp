#include <iostream>
#include <stdio.h>

#include "../advent2018/StarMessageFinder.hpp"

using namespace Advent2018;

int main()
{
	StarMessageFinder finder;
	do
	{
		char line[80 + 1] = { 0 };
		std::cin.getline(line, _countof(line));
		auto xPos = 0, yPos = 0;
		auto xVel = 0, yVel = 0;
		(void)sscanf_s(line, "position=< %d, %d> velocity=< %d, %d>",
								&xPos, &yPos, &xVel, &yVel);
		finder.addPoint(xPos, yPos, xVel, yVel);
	} while (!std::cin.eof());

	std::cout << finder.drawPoints() << std::endl;
	for (int i = 0; i < 4; ++i)
	{
		std::cout << finder.drawPoints() << std::endl;
	}
	//std::cout << finder.method2() << std::endl;
	return 0;
}

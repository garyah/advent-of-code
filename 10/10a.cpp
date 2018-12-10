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

	//std::cout << "initially:" << std::endl;
	//std::cout << finder.statPoints() << std::endl;
	auto numSecondsBegin = 10 * 1000u + 593u;
	auto i = 0u;
	for (; i < numSecondsBegin; ++i)
	{
		finder.movePoints();
	}
	auto numSecondsEnd = 10 * 1000u + 609u + 1u;
	for (; i < numSecondsEnd; ++i)
	{
		finder.movePoints();
		std::cout << "after " << i << " seconds:" << std::endl;
		finder.statPoints();
		std::cout << finder.drawPoints() << std::endl;
	}
	return 0;
}

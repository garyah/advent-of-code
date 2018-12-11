#include <iostream>
#include <stdio.h>

#include "../advent2018/BlankClass.hpp"

using namespace Advent2018;

int main()
{
	BlankClass blank;
	do
	{
		char line[80 + 1] = { 0 };
		std::cin.getline(line, _countof(line));
		//auto xPos = 0, yPos = 0;
		//auto xVel = 0, yVel = 0;
		//(void)sscanf_s(line, "position=< %d, %d> velocity=< %d, %d>",
		//	&xPos, &yPos, &xVel, &yVel);
		blank.method1(/*xPos, yPos, xVel, yVel*/line);
	} while (!std::cin.eof());

	//blank.statPoints();
	std::cout << blank.method2() << std::endl;
	return 0;
}

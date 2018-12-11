#include <iostream>
#include <stdio.h>

#include "../advent2018/PowerFinder.hpp"

using namespace Advent2018;

int main()
{
	auto gridSerial = 0u;
	std::cin >> gridSerial;
	PowerFinder finder(gridSerial);
	std::cout << finder.getMaxAnyPower() << std::endl;
	return 0;
}

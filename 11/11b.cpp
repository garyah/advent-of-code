#include <iostream>
#include <stdio.h>

#include "../advent2018/PowerFinder.hpp"

using namespace Advent2018;

int main()
{
	PowerFinder finder;
	auto number = 0u;
	std::cin >> number;
	std::cout << finder.getMax3x3Power(number) << std::endl;
	return 0;
}

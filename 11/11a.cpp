#include <iostream>
#include <stdio.h>

#include "../advent2018/PowerFinder.hpp"

using namespace Advent2018;

int main()
{
	{
		PowerFinder finder1(8u);
		finder1.calculatePower(3u, 5u);
		PowerFinder finder2(57u);
		finder2.calculatePower(122u, 79u);
		PowerFinder finder3(39u);
		finder3.calculatePower(217u, 196u);
		PowerFinder finder4(71u);
		finder4.calculatePower(101u, 153u);
	}
	auto gridSerial = 0u;
	std::cin >> gridSerial;
	PowerFinder finder(gridSerial);
	std::cout << finder.getMax3x3Power() << std::endl;
	return 0;
}

#include <iostream>
#include <stdio.h>

#include "../advent2018/CaveAssessor.hpp"

using namespace std;
using namespace Advent2018;

int main()
{
	char line[80 + 1] = { 0 };
	cin.getline(line, _countof(line));
	auto depth = 0u;
	(void)sscanf_s(line, "depth: %u", &depth);

	cin.getline(line, _countof(line));
	auto targetX = 0u;
	auto targetY = 0u;
	(void)sscanf_s(line, "target: %u,%u", &targetX, &targetY);
	CaveAssessor assessor(depth, targetX, targetY);

	assessor.calculateErosionLevels();
	return 0;
}

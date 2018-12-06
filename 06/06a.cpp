#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2018/ChronalOptimizer.hpp"

using namespace Common;
using namespace Advent2018;

int main()
{
    ChronalOptimizer optimizer;
    char *line = NULL;
	while ((line = InputReader::ReadLine()) != NULL)
	{
        optimizer.addCoordinate(line);
	}
    (void)printf("%u\n", optimizer.getSizeOfLargestArea());
    return 0;
}

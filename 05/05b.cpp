#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2018/PolymerReactor.hpp"

using namespace Common;
using namespace Advent2018;

int main()
{
    PolymerReactor reactor;
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
		(void)printf("%u\n", reactor.getLengthOfShortestPolymerAfterReactionRemovingUnitType(line));
	}
    return 0;
}

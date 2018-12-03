#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2018/FabricOverlapCalculator.hpp"

using namespace Common;
using namespace Advent2018;

int main()
{
    FabricOverlapCalculator blank;
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        blank.addClaim(line);
    }
    (void)printf("%u\n", blank.getOverlappedArea());
    return 0;
}

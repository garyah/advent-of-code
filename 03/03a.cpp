#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2018/FabricOverlapCalculator.hpp"

using namespace Common;
using namespace Advent2018;

int main()
{
    FabricOverlapCalculator calculator;
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        calculator.addClaim(line);
    }
    (void)printf("%u\n", calculator.getOverlappedArea());
    return 0;
}

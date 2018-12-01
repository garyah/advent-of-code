#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2017/VirusCarrier.hpp"

using namespace Common;
using namespace Advent2017;

int main()
{
    VirusCarrier carrier;
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        // carrier.addMapRow(line);
    }
    // carrier.moveCarrier();
    //(void)printf("%u\n", carrier.getNumberInfectedByMoves());
    return 0;
}

#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2017/ProgramDancer.hpp"

using namespace Common;
using namespace Advent2017;

int main()
{
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        std::string finalPositions;
        ProgramDancer::DanceWithNumberOfProgramsAndMoveListAndReturnFinalPositions(
            16, line, finalPositions);
        (void)printf("%s\n", finalPositions.data());
    }
    return 0;
}

#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2017/StreamProcessor.hpp"

using namespace Common;
using namespace Advent2017;

unsigned StreamProcessor::TotalGroupScore = 0;

int main()
{
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        StreamProcessor::TotalGroupScore = 0;
        auto numGroups = 0u;
        auto groupScore = 0u;
        (void)StreamProcessor::EatGroup(line, numGroups, &groupScore);
    }
    (void)printf("%u\n", StreamProcessor::TotalGroupScore);
    return 0;
}

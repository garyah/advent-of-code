#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2018/GuardTimeTracker.hpp"

using namespace Common;
using namespace Advent2018;

int main()
{
    GuardTimeTracker tracker;
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        tracker.addRecord(line);
    }
    //(void)printf("%u\n", tracker.method2());
    return 0;
}

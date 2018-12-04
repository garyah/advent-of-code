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
    tracker.sortAndProcessRecords();
    (void)printf("%u\n", tracker.getIdOfSleepiestGuardTimesItsSleepiestMinute());
    return 0;
}

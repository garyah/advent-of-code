#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2016/GoodIPFinder.hpp"

using namespace Common;
using namespace Advent2016;

int main()
{
    GoodIPFinder finder;
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        finder.addBlacklistRule(line);
    }
    finder.findGoodIPCount();
    (void)printf("%u\n", finder.getGoodIPCount());
    return 0;
}

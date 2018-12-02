#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2018/CheckSummer.hpp"

using namespace Common;
using namespace Advent2018;

int main()
{
    CheckSummer summer;
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        summer.addBoxId(line);
    }
    (void)printf("%u\n", summer.getChecksum());
    return 0;
}

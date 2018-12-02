#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2018/BlankClass.hpp"

using namespace Common;
using namespace Advent2018;

int main()
{
    BlankClass blank;
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        blank.method1(line);
    }
    (void)printf("%u\n", blank.method2());
    return 0;
}

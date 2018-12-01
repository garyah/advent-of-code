#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2017/Day23AssemblyParser.hpp"

using namespace Common;
using namespace Advent2017;

int main()
{
    Day23AssemblyParser parser;
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        parser.parseInstruction(line);
    }
    parser.executeProgram();
    (void)printf("%u\n", parser.getnumberOfMulsInvoked());
    return 0;
}

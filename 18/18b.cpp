#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2017/AssemblyParser.hpp"

using namespace Common;
using namespace Advent2017;

int main()
{
    AssemblyParser parser;
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        parser.parseInstruction(line);
    }
    parser.executeProgramV2();
    (void)printf("%u\n", parser.getnumberOfSends());
    return 0;
}

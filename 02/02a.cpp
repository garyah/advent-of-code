#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2016/KeypadMoveParser.hpp"

using namespace Common;
using namespace Advent2016;

int main()
{
    KeypadMoveParser parser;
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        parser.parseInstructionFor3x3(line);
    }
    (void)printf("%s\n", parser.getCode());
    return 0;
}

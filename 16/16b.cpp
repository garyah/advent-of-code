#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2016/ChecksumGenerator.hpp"

using namespace Common;
using namespace Advent2016;

int main()
{
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        ChecksumGenerator generator;
        // this program seems to take forever to finish!
        generator.expandAndGenerate(line, 35651584);
        (void)printf("%s\n", generator.getChecksum());
    }
    return 0;
}

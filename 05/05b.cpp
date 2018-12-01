#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2016/PasswordGenerator.hpp"

using namespace Common;
using namespace Advent2016;

int main()
{
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        PasswordGenerator generator;
        generator.generateByPosition(line);
        (void)printf("%s\n", generator.getPassword());
    }
    return 0;
}

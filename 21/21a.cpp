#include <stdio.h>

#include "../common/InputReader.hpp"
#include "../advent2016/PasswordScrambler.hpp"

using namespace Common;
using namespace Advent2016;

int main()
{
    PasswordScrambler scrambler;
    char *line = NULL;
    while ((line = InputReader::ReadLine()) != NULL)
    {
        //scrambler.addRule(line);
    }
    //scrambler.scramble("abcdefgh");
    //(void)printf("%s\n", scrambler.getPassword());
    return 0;
}

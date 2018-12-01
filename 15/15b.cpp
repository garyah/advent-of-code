#include <limits.h>
#include <stdint.h>
#include <stdio.h>

#include "../advent2017/GeneratorDriver.hpp"

using namespace Advent2017;

int main()
{
    auto generatorAInitial = 618u;
    auto generatorBInitial = 814u;
    (void)printf("%u\n", GeneratorDriver::DriveAndReturnNumberOfMatches(generatorAInitial, generatorBInitial, 5u*1000u*1000u, true));
    return 0;
}
